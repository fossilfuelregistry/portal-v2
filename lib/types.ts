import {Country} from 'components/Map/types'
import {DatabaseRecord} from 'lib/calculations/calculation-constants/types'
import {PrefixRecord} from 'lib/calculations/prefix-conversion'
import { CO2EEmissions, VintageScopes } from './calculations/types'

export type FossilFuelType = 'oil' | 'gas' | 'coal'
export type FuelSubType =
	| 'Subbituminous'
	| 'Anthracite'
	| 'Bituminous'
	| 'Lignite'
	| 'Coking Coal'

export type ConversionFactorInStore = {
	id: number
	authority: string
	description: null | string
	fossilFuelType: null | FossilFuelType | ''
	fromUnit: string
	toUnit: string
	high: null | number
	factor: number
	low: null | number
	country: null | string
	modifier: null | string
	subtype: null | string
	fullFuelType: null | string
}

export interface ICMSImage {
	data: {
		attributes: {
			url: string
		}
	}
}

export interface ArticleCategory {
	id: string,
	attributes: {
		Category: string,
		Color: string
	}
}

export interface Page {
	slug: string | string[]
	Content: Array<any>
	Title: string
}

export interface ICMSPage {
	id: string
	attributes: Page
}

export interface Article {
	id: number
	Headline: string
	article_categories: {
		data: ArticleCategory[]
	}
	slug: string
	Content: Array<any>
	Image: ICMSImage
	Inverted_headline_color: boolean
}

export interface ICMSArticle {
	id: string
	attributes: Article
}

export interface Datapoint {
	fossilFuelType: string
	subtype: string
}

export type MenuItem = {
	id: string
	URL: string
	Text: string
	Page: { data: ICMSPage }
	Article: { data: ICMSArticle }
	Submenu: Array<any>
	Column: number
}

export interface FooterProps {
	Items: MenuItem[]
	Copyright: string
}

export interface StaticData {
	countryName?: string
	countries: Country[]
	texts: Record<string, string>
	conversions: ConversionFactorInStore[]
	constants: DatabaseRecord[]
	prefixConversions: PrefixRecord[]
}

export type EmissionsData = {
	sourceId: number;
	production: {
		co2: VintageScopes;
		co2e: CO2EEmissions | null;
		fossilFuelType: "oil" | "coal" | "gas";
		sourceId: number;
		volume: number;
		unit: string;
		year: number;
	}[];
	totalCO2E: number;
  }[] | null | undefined