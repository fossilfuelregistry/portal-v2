/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import {useEffect, useMemo, useState} from 'react'
import {useQuery} from '@apollo/client'
import {GQL_projectProduction, GQL_projectProjection, GQL_projectReserves,} from 'queries/country'
import settings from 'settings'
import * as Sentry from '@sentry/nextjs'
import {MinimalDataset, RawDataset,} from 'lib/calculate'
import {ConversionFactorInStore} from "lib/types"
import {useConversionHooks} from './conversionHooks'
import {Source, StableProduction,} from './types-legacy'
import {DatabaseRecord} from './calculations/calculation-constants/types'
import {PrefixRecord} from './calculations/prefix-conversion'

const DEBUG = false

type Props = {
  project?: { id: number };
  projectId: number;
  texts: Record<string, string>
  projectionSources: RawDataset[]
  gwp: string
  reservesSourceId: number
  projectionSourceId: number
  productionSourceId: number
  country: string
  conversionConstants: ConversionFactorInStore[]
  allSources: Source[]
  constants: DatabaseRecord[]
  prefixes: PrefixRecord[]
}

const useProjectData = ({
  projectId,

  texts,
  gwp,
  reservesSourceId,
  projectionSourceId,
  productionSourceId,
  country,
  conversionConstants,
  allSources,
  constants,
  prefixes: conversionPrefixes,
}: Props) => {
  const [ limits, setLimits ] = useState( {} )
	const [ grades, set_grades ] = useState( {} )

  const [stableProduction, setStableProduction] = useState<
    Partial<StableProduction> | undefined
  >(undefined)
  
  const {
    co2FromVolume,
    reservesProduction,
    co2eFromVolume,
	projectCO2,
  } = useConversionHooks({
    conversionConstants,
    allSources,
    gwp,
    country,
    // @ts-ignore
    stableProduction,
    texts,
    constants,
    prefixes: conversionPrefixes,
  })

  const _co2 = (dataset: MinimalDataset[]) => {
		try {
			return ( dataset ?? [] )
				.filter( datapoint => datapoint.fossilFuelType === 'gas' || datapoint.fossilFuelType === 'oil' || datapoint.fossilFuelType === 'coal' )
				.map( datapoint => ({
          ...datapoint,
          id: undefined,
          country,
          __typename: undefined,
          co2: co2FromVolume( {...datapoint, country} ),
          co2e: co2eFromVolume( {...datapoint, country} ),
        }))

		} catch( e ) {
			Sentry.captureException( e )
			return dataset
		}
	}

  const {
		data: productionData,
		loading: loadingProduction,
		error: errorLoadingProduction
	} = useQuery( GQL_projectProduction, {
		variables: { id: projectId},
		skip: !projectId
	} )


  const production = useMemo( () => {
		DEBUG && console.info( '_co2( productionData )', productionData?.projectDataPoints?.nodes )
		return _co2( productionData?.projectDataPoints?.nodes )
	}, [ productionData?.projectDataPoints?.nodes, productionData?.projectDataPoints?.nodes?.length, productionSourceId, gwp ] )


  const {
		data: projectionData,
		loading: loadingProjection,
		error: errorLoadingProjection
	} = useQuery( GQL_projectProjection, {
		variables: { id: projectId },
		skip: !projectId
	} )

  DEBUG && console.info( 'LoadProjectData', { productionData, production } )


  const projection = useMemo( () => {
		try {
			// Synthesize stable projection data points if selected
			if( projectionSourceId === settings.stableProductionSourceId ) {
				if( !stableProduction?.oil ) return []

				const stableProj = []
				for( let year = 2020; year <= settings.year.end; year++ ) {
					stableProj.push( { ...stableProduction.oil, year, sourceId: settings.stableProductionSourceId } )
					stableProj.push( { ...stableProduction.gas, year, sourceId: settings.stableProductionSourceId } )
					stableProj.push( { ...stableProduction.coal, year, sourceId: settings.stableProductionSourceId } )
				}
				DEBUG && console.info( { stableProj } )
				return stableProj
			} return _co2( projectionData?.projectDataPoints?.nodes )
		} catch( e ) {
			Sentry.captureException( e )
			console.error( { message: 'Error in calculation', description: (e as Error).message } )
			return []
		}
	}, [ projectionData?.projectDataPoints?.nodes, projectionSourceId, stableProduction, gwp ] )


  const {
		data: reservesData,
		loading: loadingReserves,
		error: errorLoadingReserves
	} = useQuery( GQL_projectReserves, {
		variables: { id: projectId },
		skip: !projectId
	} )

	const reserves = useMemo( () => _co2( reservesData?.projectDataPoints?.nodes ),
		[ reservesData?.projectDataPoints?.nodes, gwp ] )

  // Find stable production
	useEffect( () => {
		const reverse = [ ...production ].reverse()
		const oil = reverse.find( d => d.fossilFuelType === 'oil' )
		const gas = reverse.find( d => d.fossilFuelType === 'gas' )
		const coal = reverse.find( d => d.fossilFuelType === 'coal' )
    // @ts-ignore
    setStableProduction({ oil, gas, coal })
	}, [ production, productionSourceId, gwp ] )

  // Figure out available years when data loaded.
  useEffect( () => {
		DEBUG && console.info( 'useEffect Production', production?.length, limits )
		if( !(production?.length > 0 )) return
		const newLimits = production.reduce( ( _limits, datapoint ) => {
			if( datapoint.sourceId !== productionSourceId ) return _limits
			const l = _limits[ datapoint.fossilFuelType ]
      // @ts-ignore
			l.firstYear = Math.min( l.firstYear, datapoint.year )
			l.lastYear = Math.max( l.lastYear, datapoint.year )
			return _limits
		}, { 
			oil: { firstYear: settings.year.end, lastYear: 0 }, 
			gas: { firstYear: settings.year.end, lastYear: 0 },
			coal: { firstYear: settings.year.end, lastYear: 0 },
		} )

		// Check if no data
    // @ts-ignore
		if( newLimits.oil.firstYear === settings.year.end ) newLimits.oil.firstYear = 0
    // @ts-ignore
		if( newLimits.gas.firstYear === settings.year.end ) newLimits.gas.firstYear = 0
    // @ts-ignore
		if( newLimits.coal.firstYear === settings.year.end ) newLimits.coal.firstYear = 0

		setLimits( l => ( { ...l, production: newLimits } ) )
		DEBUG && console.info( 'useEffect Production', { newLimits } )
	}, [ production, productionSourceId ] )

  useEffect( () => {
		DEBUG && console.info( 'useEffect projection', { projection, limits } )
		if( !(projection?.length > 0 )) return

    // @ts-ignore
		let newLimits

		if( projectionSourceId === settings.stableProductionSourceId ) {
			newLimits = {
				oil: { firstYear: new Date().getFullYear() - 1, lastYear: settings.year.end },
				gas: { firstYear: new Date().getFullYear() - 1, lastYear: settings.year.end },
				coal: { firstYear: new Date().getFullYear() - 1, lastYear: settings.year.end }
			}
		} else {
      // @ts-ignore
			newLimits = projection.reduce( ( _limits, datapoint ) => {
				if( datapoint.sourceId !== projectionSourceId ) return _limits
				const l = _limits[ datapoint.fossilFuelType ]
				l.firstYear = Math.min( l.firstYear, datapoint.year )
				l.lastYear = Math.max( l.lastYear, datapoint.year )
				return _limits
			}, {
				oil: { firstYear: settings.year.end, lastYear: 0 },
				gas: { firstYear: settings.year.end, lastYear: 0 },
				coal: { firstYear: settings.year.end, lastYear: 0 }
			} )
		}

		// Check if no data
		if( newLimits.oil.firstYear === settings.year.end ) newLimits.oil.firstYear = 0
		if( newLimits.gas.firstYear === settings.year.end ) newLimits.gas.firstYear = 0
		if( newLimits.coal.firstYear === settings.year.end ) newLimits.coal.firstYear = 0

    // @ts-ignore
		setLimits( l => ( { ...l, projection: newLimits } ) )
	}, [ projection, projectionSourceId ] )

  useEffect( () => {
		DEBUG && console.info( 'useEffect reserves', { limits, reserves } )
		if( !( reserves?.length > 0 ) ) return
		const newLimits = reserves.reduce( ( _limits, datapoint ) => {
      // @ts-ignore
			_limits.firstYear = ( _limits.firstYear === undefined || datapoint.year < _limits.firstYear ) ? datapoint.year : _limits.firstYear
      // @ts-ignore
			_limits.lastYear = ( _limits.lastYear === undefined || datapoint.year > _limits.lastYear ) ? datapoint.year : _limits.lastYear
			return _limits
		}, {} )

		setLimits( l => ( { ...l, reserves: newLimits } ) )
	}, [ reserves ] )

	DEBUG && console.info( { limits, projectId, production, projection, reserves } )

  // Figure out available grades when reserves loaded.
  useEffect( () => {
		DEBUG && console.info( 'useEffect Reserve Grades', { reserves, reservesSourceId } )
		if( !( reserves?.length > 0 ) ) return
		const _grades = reserves
			.filter( r => r.sourceId === reservesSourceId )
			.reduce( ( g, r ) => {
        // @ts-ignore
				g[ r.grade ] = false
				return g
			}, {} )
		// console.info( _grades )
		set_grades( _grades )
	}, [ reserves?.length, reservesSourceId ] )

	// Match projected production with reserves.

	const projectedProduction = useMemo( () => {
		if( !productionSourceId ) return []
		if( !projectionSourceId ) return []
		if( !reservesSourceId ) return []
		DEBUG && console.info( 'useMemo projectedProduction', { projection, reserves } )
		try {
      // @ts-ignore
			return reservesProduction( projection, reserves, projectionSourceId, reservesSourceId, limits, grades )
		} catch( e ) {
			Sentry.captureException( e )
			console.error( {
				message: 'Error in projected production calculation',
				description: (e as Error).message,
			} )
			return []
		}
	}, [ projection, reserves, productionSourceId, projectionSourceId, reservesSourceId, limits, grades ] )


  // Don't try to render a chart until all data looks good
  if (
    // @ts-ignore
    (!limits.production?.oil?.lastYear &&
      // @ts-ignore
      !limits.production?.gas?.lastYear &&
      // @ts-ignore
      !limits.production?.coal?.lastYear) ||
    // @ts-ignore

    !production?.length > 0
  ) {
    DEBUG && console.info('What to do?', { limits, production })
  }

  const isLoading = loadingProduction || loadingProjection || loadingReserves

  return {
    isLoading,
    production,
    projection,
    reserves,
    projectedProduction,
	projectCO2
  }
}

export default useProjectData
