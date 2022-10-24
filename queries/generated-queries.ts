/* eslint-disable no-use-before-define */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
// import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigInt: any;
  BitString: any;
  Cursor: any;
  Datetime: any;
  GeoJSON: any;
  JSON: any;
  UUID: any;
};

/** A filter to be used against BigInt fields. All fields are combined with a logical ‘and.’ */
export type BigIntFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BigInt']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BigInt']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against BitString fields. All fields are combined with a logical ‘and.’ */
export type BitStringFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['BitString']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['BitString']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against Boolean fields. All fields are combined with a logical ‘and.’ */
export type BooleanFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Boolean']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Boolean']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type CalculationConstant = Node & {
  __typename?: 'CalculationConstant';
  authority: Scalars['String'];
  constantType: ConstantTypeEnum;
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  factor: Scalars['Float'];
  fossilFuelType?: Maybe<Scalars['String']>;
  high?: Maybe<Scalars['Float']>;
  id: Scalars['UUID'];
  low?: Maybe<Scalars['Float']>;
  modifier?: Maybe<ModifierEnum>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Project` that is related to this `CalculationConstant`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  reference?: Maybe<Scalars['String']>;
  subtype?: Maybe<Scalars['String']>;
  unit: Scalars['String'];
};

/**
 * A condition to be used against `CalculationConstant` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type CalculationConstantCondition = {
  /** Checks for equality with the object’s `authority` field. */
  authority?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `constantType` field. */
  constantType?: InputMaybe<ConstantTypeEnum>;
  /** Checks for equality with the object’s `country` field. */
  country?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `factor` field. */
  factor?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `high` field. */
  high?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `low` field. */
  low?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `modifier` field. */
  modifier?: InputMaybe<ModifierEnum>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `quality` field. */
  quality?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `reference` field. */
  reference?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `subtype` field. */
  subtype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `unit` field. */
  unit?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `CalculationConstant` object types. All fields are combined with a logical ‘and.’ */
export type CalculationConstantFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CalculationConstantFilter>>;
  /** Filter by the object’s `authority` field. */
  authority?: InputMaybe<StringFilter>;
  /** Filter by the object’s `constantType` field. */
  constantType?: InputMaybe<ConstantTypeEnumFilter>;
  /** Filter by the object’s `country` field. */
  country?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `factor` field. */
  factor?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `high` field. */
  high?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `low` field. */
  low?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `modifier` field. */
  modifier?: InputMaybe<ModifierEnumFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CalculationConstantFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CalculationConstantFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** A related `project` exists. */
  projectExists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `quality` field. */
  quality?: InputMaybe<IntFilter>;
  /** Filter by the object’s `reference` field. */
  reference?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subtype` field. */
  subtype?: InputMaybe<StringFilter>;
  /** Filter by the object’s `unit` field. */
  unit?: InputMaybe<StringFilter>;
};

/** A connection to a list of `CalculationConstant` values. */
export type CalculationConstantsConnection = {
  __typename?: 'CalculationConstantsConnection';
  /** A list of edges which contains the `CalculationConstant` and cursor to aid in pagination. */
  edges: Array<CalculationConstantsEdge>;
  /** A list of `CalculationConstant` objects. */
  nodes: Array<Maybe<CalculationConstant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CalculationConstant` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CalculationConstant` edge in the connection. */
export type CalculationConstantsEdge = {
  __typename?: 'CalculationConstantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CalculationConstant` at the end of the edge. */
  node?: Maybe<CalculationConstant>;
};

/** Methods to use when ordering `CalculationConstant`. */
export enum CalculationConstantsOrderBy {
  AuthorityAsc = 'AUTHORITY_ASC',
  AuthorityDesc = 'AUTHORITY_DESC',
  ConstantTypeAsc = 'CONSTANT_TYPE_ASC',
  ConstantTypeDesc = 'CONSTANT_TYPE_DESC',
  CountryAsc = 'COUNTRY_ASC',
  CountryDesc = 'COUNTRY_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  FactorAsc = 'FACTOR_ASC',
  FactorDesc = 'FACTOR_DESC',
  FossilFuelTypeAsc = 'FOSSIL_FUEL_TYPE_ASC',
  FossilFuelTypeDesc = 'FOSSIL_FUEL_TYPE_DESC',
  HighAsc = 'HIGH_ASC',
  HighDesc = 'HIGH_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LowAsc = 'LOW_ASC',
  LowDesc = 'LOW_DESC',
  ModifierAsc = 'MODIFIER_ASC',
  ModifierDesc = 'MODIFIER_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  QualityAsc = 'QUALITY_ASC',
  QualityDesc = 'QUALITY_DESC',
  ReferenceAsc = 'REFERENCE_ASC',
  ReferenceDesc = 'REFERENCE_DESC',
  SubtypeAsc = 'SUBTYPE_ASC',
  SubtypeDesc = 'SUBTYPE_DESC',
  UnitAsc = 'UNIT_ASC',
  UnitDesc = 'UNIT_DESC'
}

export type Co2Cost = Node & {
  __typename?: 'Co2Cost';
  costPerTon: Scalars['Int'];
  currency: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  source: Scalars['String'];
  year: Scalars['Int'];
};

/** A condition to be used against `Co2Cost` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type Co2CostCondition = {
  /** Checks for equality with the object’s `costPerTon` field. */
  costPerTon?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `currency` field. */
  currency?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `source` field. */
  source?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `Co2Cost` object types. All fields are combined with a logical ‘and.’ */
export type Co2CostFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<Co2CostFilter>>;
  /** Filter by the object’s `costPerTon` field. */
  costPerTon?: InputMaybe<IntFilter>;
  /** Filter by the object’s `currency` field. */
  currency?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<Co2CostFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<Co2CostFilter>>;
  /** Filter by the object’s `source` field. */
  source?: InputMaybe<StringFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

/** An input for mutations affecting `Co2Cost` */
export type Co2CostInput = {
  costPerTon: Scalars['Int'];
  currency?: InputMaybe<Scalars['String']>;
  source: Scalars['String'];
  year: Scalars['Int'];
};

/** Represents an update to a `Co2Cost`. Fields that are set will be updated. */
export type Co2CostPatch = {
  costPerTon?: InputMaybe<Scalars['Int']>;
  currency?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<Scalars['String']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `Co2Cost` values. */
export type Co2CostsConnection = {
  __typename?: 'Co2CostsConnection';
  /** A list of edges which contains the `Co2Cost` and cursor to aid in pagination. */
  edges: Array<Co2CostsEdge>;
  /** A list of `Co2Cost` objects. */
  nodes: Array<Maybe<Co2Cost>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Co2Cost` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Co2Cost` edge in the connection. */
export type Co2CostsEdge = {
  __typename?: 'Co2CostsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Co2Cost` at the end of the edge. */
  node?: Maybe<Co2Cost>;
};

/** Methods to use when ordering `Co2Cost`. */
export enum Co2CostsOrderBy {
  CostPerTonAsc = 'COST_PER_TON_ASC',
  CostPerTonDesc = 'COST_PER_TON_DESC',
  CurrencyAsc = 'CURRENCY_ASC',
  CurrencyDesc = 'CURRENCY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SourceAsc = 'SOURCE_ASC',
  SourceDesc = 'SOURCE_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export enum ConstantTypeEnum {
  BarrelsOfOilEquivalent = 'BARRELS_OF_OIL_EQUIVALENT',
  BarrelsPerTon = 'BARRELS_PER_TON',
  BoePerE6M3 = 'BOE_PER_E6_M3',
  CombustionEmissionsCo2EFactor = 'COMBUSTION_EMISSIONS_CO2_E_FACTOR',
  EiaNonFuelUseRatio = 'EIA_NON_FUEL_USE_RATIO',
  IpccEnergyToEmissions = 'IPCC_ENERGY_TO_EMISSIONS',
  IpccMassToEnergy = 'IPCC_MASS_TO_ENERGY',
  MethaneFactorisation = 'METHANE_FACTORISATION',
  MethaneIntensity = 'METHANE_INTENSITY',
  PetajoulesPerMillionCubicMetresGas = 'PETAJOULES_PER_MILLION_CUBIC_METRES_GAS',
  ProductionCo2Factor = 'PRODUCTION_CO2_FACTOR'
}

/** A filter to be used against ConstantTypeEnum fields. All fields are combined with a logical ‘and.’ */
export type ConstantTypeEnumFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<ConstantTypeEnum>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<ConstantTypeEnum>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type ConversionConstant = Node & {
  __typename?: 'ConversionConstant';
  authority: Scalars['String'];
  country?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  factor: Scalars['Float'];
  fossilFuelType?: Maybe<Scalars['String']>;
  fromUnit: Scalars['String'];
  high?: Maybe<Scalars['Float']>;
  id: Scalars['Int'];
  low?: Maybe<Scalars['Float']>;
  modifier?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Project` that is related to this `ConversionConstant`. */
  project?: Maybe<Project>;
  projectId?: Maybe<Scalars['Int']>;
  quality?: Maybe<Scalars['Int']>;
  reference?: Maybe<Scalars['String']>;
  subtype?: Maybe<Scalars['String']>;
  toUnit: Scalars['String'];
};

/**
 * A condition to be used against `ConversionConstant` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ConversionConstantCondition = {
  /** Checks for equality with the object’s `authority` field. */
  authority?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `country` field. */
  country?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `factor` field. */
  factor?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `fromUnit` field. */
  fromUnit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `high` field. */
  high?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `low` field. */
  low?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `modifier` field. */
  modifier?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `quality` field. */
  quality?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `reference` field. */
  reference?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `subtype` field. */
  subtype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `toUnit` field. */
  toUnit?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `ConversionConstant` object types. All fields are combined with a logical ‘and.’ */
export type ConversionConstantFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ConversionConstantFilter>>;
  /** Filter by the object’s `authority` field. */
  authority?: InputMaybe<StringFilter>;
  /** Filter by the object’s `country` field. */
  country?: InputMaybe<StringFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `factor` field. */
  factor?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fromUnit` field. */
  fromUnit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `high` field. */
  high?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `low` field. */
  low?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `modifier` field. */
  modifier?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ConversionConstantFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ConversionConstantFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** A related `project` exists. */
  projectExists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `quality` field. */
  quality?: InputMaybe<IntFilter>;
  /** Filter by the object’s `reference` field. */
  reference?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subtype` field. */
  subtype?: InputMaybe<StringFilter>;
  /** Filter by the object’s `toUnit` field. */
  toUnit?: InputMaybe<StringFilter>;
};

/** A connection to a list of `ConversionConstant` values. */
export type ConversionConstantsConnection = {
  __typename?: 'ConversionConstantsConnection';
  /** A list of edges which contains the `ConversionConstant` and cursor to aid in pagination. */
  edges: Array<ConversionConstantsEdge>;
  /** A list of `ConversionConstant` objects. */
  nodes: Array<Maybe<ConversionConstant>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ConversionConstant` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ConversionConstant` edge in the connection. */
export type ConversionConstantsEdge = {
  __typename?: 'ConversionConstantsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ConversionConstant` at the end of the edge. */
  node?: Maybe<ConversionConstant>;
};

/** Methods to use when ordering `ConversionConstant`. */
export enum ConversionConstantsOrderBy {
  AuthorityAsc = 'AUTHORITY_ASC',
  AuthorityDesc = 'AUTHORITY_DESC',
  CountryAsc = 'COUNTRY_ASC',
  CountryDesc = 'COUNTRY_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  FactorAsc = 'FACTOR_ASC',
  FactorDesc = 'FACTOR_DESC',
  FossilFuelTypeAsc = 'FOSSIL_FUEL_TYPE_ASC',
  FossilFuelTypeDesc = 'FOSSIL_FUEL_TYPE_DESC',
  FromUnitAsc = 'FROM_UNIT_ASC',
  FromUnitDesc = 'FROM_UNIT_DESC',
  HighAsc = 'HIGH_ASC',
  HighDesc = 'HIGH_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LowAsc = 'LOW_ASC',
  LowDesc = 'LOW_DESC',
  ModifierAsc = 'MODIFIER_ASC',
  ModifierDesc = 'MODIFIER_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  QualityAsc = 'QUALITY_ASC',
  QualityDesc = 'QUALITY_DESC',
  ReferenceAsc = 'REFERENCE_ASC',
  ReferenceDesc = 'REFERENCE_DESC',
  SubtypeAsc = 'SUBTYPE_ASC',
  SubtypeDesc = 'SUBTYPE_DESC',
  ToUnitAsc = 'TO_UNIT_ASC',
  ToUnitDesc = 'TO_UNIT_DESC'
}

/** A connection to a list of `Country` values. */
export type CountriesConnection = {
  __typename?: 'CountriesConnection';
  /** A list of edges which contains the `Country` and cursor to aid in pagination. */
  edges: Array<CountriesEdge>;
  /** A list of `Country` objects. */
  nodes: Array<Maybe<Country>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Country` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Country` edge in the connection. */
export type CountriesEdge = {
  __typename?: 'CountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Country` at the end of the edge. */
  node?: Maybe<Country>;
};

/** Methods to use when ordering `Country`. */
export enum CountriesOrderBy {
  EnAsc = 'EN_ASC',
  EnDesc = 'EN_DESC',
  EsAsc = 'ES_ASC',
  EsDesc = 'ES_DESC',
  FrAsc = 'FR_ASC',
  FrDesc = 'FR_DESC',
  Iso3166_2Asc = 'ISO3166_2_ASC',
  Iso3166_2Desc = 'ISO3166_2_DESC',
  Iso3166Asc = 'ISO3166_ASC',
  Iso3166Desc = 'ISO3166_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProductionCo2EAsc = 'PRODUCTION_CO2E_ASC',
  ProductionCo2EDesc = 'PRODUCTION_CO2E_DESC',
  ProductionSnapshotDataAsc = 'PRODUCTION_SNAPSHOT_DATA_ASC',
  ProductionSnapshotDataDesc = 'PRODUCTION_SNAPSHOT_DATA_DESC',
  SvAsc = 'SV_ASC',
  SvDesc = 'SV_DESC'
}

export type Country = Node & {
  __typename?: 'Country';
  /** Reads and enables pagination through a set of `CountryDataPoint`. */
  countryDataPointsByIso3166AndIso31662: CountryDataPointsConnection;
  en: Scalars['String'];
  es?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  productionCo2E?: Maybe<Scalars['JSON']>;
  productionSnapshotData?: Maybe<Scalars['JSON']>;
  /** Reads and enables pagination through a set of `Project`. */
  projectsByIso3166AndIso31662: ProjectsConnection;
  sv?: Maybe<Scalars['String']>;
};


export type CountryCountryDataPointsByIso3166AndIso31662Args = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CountryDataPointCondition>;
  filter?: InputMaybe<CountryDataPointFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CountryDataPointsOrderBy>>;
};


export type CountryProjectsByIso3166AndIso31662Args = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** A condition to be used against `Country` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type CountryCondition = {
  /** Checks for equality with the object’s `en` field. */
  en?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `es` field. */
  es?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `fr` field. */
  fr?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso3166` field. */
  iso3166?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso31662` field. */
  iso31662?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `productionCo2E` field. */
  productionCo2E?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `productionSnapshotData` field. */
  productionSnapshotData?: InputMaybe<Scalars['JSON']>;
  /** Checks for equality with the object’s `sv` field. */
  sv?: InputMaybe<Scalars['String']>;
};

export type CountryCount = {
  __typename?: 'CountryCount';
  count?: Maybe<Scalars['BigInt']>;
  en?: Maybe<Scalars['String']>;
  es?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  iso3166?: Maybe<Scalars['String']>;
  iso31662?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `CountryCount` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CountryCountCondition = {
  /** Checks for equality with the object’s `count` field. */
  count?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `en` field. */
  en?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `es` field. */
  es?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `fr` field. */
  fr?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso3166` field. */
  iso3166?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso31662` field. */
  iso31662?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `sv` field. */
  sv?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `CountryCount` object types. All fields are combined with a logical ‘and.’ */
export type CountryCountFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CountryCountFilter>>;
  /** Filter by the object’s `count` field. */
  count?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `en` field. */
  en?: InputMaybe<StringFilter>;
  /** Filter by the object’s `es` field. */
  es?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fr` field. */
  fr?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso3166` field. */
  iso3166?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso31662` field. */
  iso31662?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CountryCountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CountryCountFilter>>;
  /** Filter by the object’s `sv` field. */
  sv?: InputMaybe<StringFilter>;
};

/** A connection to a list of `CountryCount` values. */
export type CountryCountsConnection = {
  __typename?: 'CountryCountsConnection';
  /** A list of edges which contains the `CountryCount` and cursor to aid in pagination. */
  edges: Array<CountryCountsEdge>;
  /** A list of `CountryCount` objects. */
  nodes: Array<Maybe<CountryCount>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CountryCount` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CountryCount` edge in the connection. */
export type CountryCountsEdge = {
  __typename?: 'CountryCountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CountryCount` at the end of the edge. */
  node?: Maybe<CountryCount>;
};

/** Methods to use when ordering `CountryCount`. */
export enum CountryCountsOrderBy {
  CountAsc = 'COUNT_ASC',
  CountDesc = 'COUNT_DESC',
  EnAsc = 'EN_ASC',
  EnDesc = 'EN_DESC',
  EsAsc = 'ES_ASC',
  EsDesc = 'ES_DESC',
  FrAsc = 'FR_ASC',
  FrDesc = 'FR_DESC',
  Iso3166_2Asc = 'ISO3166_2_ASC',
  Iso3166_2Desc = 'ISO3166_2_DESC',
  Iso3166Asc = 'ISO3166_ASC',
  Iso3166Desc = 'ISO3166_DESC',
  Natural = 'NATURAL',
  SvAsc = 'SV_ASC',
  SvDesc = 'SV_DESC'
}

export type CountryDataPoint = Node & {
  __typename?: 'CountryDataPoint';
  column13?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `CountryDataPoint`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  dataType: DataPointType;
  fossilFuelType?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  iso3166?: Maybe<Scalars['String']>;
  iso31662: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  quality?: Maybe<Scalars['Int']>;
  sourceId?: Maybe<Scalars['Int']>;
  subtype?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `CountryDataPoint` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CountryDataPointCondition = {
  /** Checks for equality with the object’s `column13` field. */
  column13?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointType>;
  /** Checks for equality with the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `grade` field. */
  grade?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `iso3166` field. */
  iso3166?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso31662` field. */
  iso31662?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `quality` field. */
  quality?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `subtype` field. */
  subtype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `unit` field. */
  unit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `volume` field. */
  volume?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `CountryDataPoint` object types. All fields are combined with a logical ‘and.’ */
export type CountryDataPointFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CountryDataPointFilter>>;
  /** Filter by the object’s `column13` field. */
  column13?: InputMaybe<StringFilter>;
  /** Filter by the object’s `countryByIso3166AndIso31662` relation. */
  countryByIso3166AndIso31662?: InputMaybe<CountryFilter>;
  /** A related `countryByIso3166AndIso31662` exists. */
  countryByIso3166AndIso31662Exists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointTypeFilter>;
  /** Filter by the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `grade` field. */
  grade?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `iso3166` field. */
  iso3166?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso31662` field. */
  iso31662?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CountryDataPointFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CountryDataPointFilter>>;
  /** Filter by the object’s `quality` field. */
  quality?: InputMaybe<IntFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `subtype` field. */
  subtype?: InputMaybe<StringFilter>;
  /** Filter by the object’s `unit` field. */
  unit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `volume` field. */
  volume?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

/** An input for mutations affecting `CountryDataPoint` */
export type CountryDataPointInput = {
  column13?: InputMaybe<Scalars['String']>;
  dataType: DataPointType;
  fossilFuelType?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  iso3166?: InputMaybe<Scalars['String']>;
  iso31662?: InputMaybe<Scalars['String']>;
  quality?: InputMaybe<Scalars['Int']>;
  sourceId?: InputMaybe<Scalars['Int']>;
  subtype?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** Represents an update to a `CountryDataPoint`. Fields that are set will be updated. */
export type CountryDataPointPatch = {
  column13?: InputMaybe<Scalars['String']>;
  dataType?: InputMaybe<DataPointType>;
  fossilFuelType?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  iso3166?: InputMaybe<Scalars['String']>;
  iso31662?: InputMaybe<Scalars['String']>;
  quality?: InputMaybe<Scalars['Int']>;
  sourceId?: InputMaybe<Scalars['Int']>;
  subtype?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `CountryDataPoint` values. */
export type CountryDataPointsConnection = {
  __typename?: 'CountryDataPointsConnection';
  /** A list of edges which contains the `CountryDataPoint` and cursor to aid in pagination. */
  edges: Array<CountryDataPointsEdge>;
  /** A list of `CountryDataPoint` objects. */
  nodes: Array<Maybe<CountryDataPoint>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CountryDataPoint` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CountryDataPoint` edge in the connection. */
export type CountryDataPointsEdge = {
  __typename?: 'CountryDataPointsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CountryDataPoint` at the end of the edge. */
  node?: Maybe<CountryDataPoint>;
};

/** Methods to use when ordering `CountryDataPoint`. */
export enum CountryDataPointsOrderBy {
  Column13Asc = 'COLUMN13_ASC',
  Column13Desc = 'COLUMN13_DESC',
  DataTypeAsc = 'DATA_TYPE_ASC',
  DataTypeDesc = 'DATA_TYPE_DESC',
  FossilFuelTypeAsc = 'FOSSIL_FUEL_TYPE_ASC',
  FossilFuelTypeDesc = 'FOSSIL_FUEL_TYPE_DESC',
  GradeAsc = 'GRADE_ASC',
  GradeDesc = 'GRADE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Iso3166_2Asc = 'ISO3166_2_ASC',
  Iso3166_2Desc = 'ISO3166_2_DESC',
  Iso3166Asc = 'ISO3166_ASC',
  Iso3166Desc = 'ISO3166_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  QualityAsc = 'QUALITY_ASC',
  QualityDesc = 'QUALITY_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  SubtypeAsc = 'SUBTYPE_ASC',
  SubtypeDesc = 'SUBTYPE_DESC',
  UnitAsc = 'UNIT_ASC',
  UnitDesc = 'UNIT_DESC',
  VolumeAsc = 'VOLUME_ASC',
  VolumeDesc = 'VOLUME_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** A filter to be used against `Country` object types. All fields are combined with a logical ‘and.’ */
export type CountryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<CountryFilter>>;
  /** Filter by the object’s `countryDataPointsByIso3166AndIso31662` relation. */
  countryDataPointsByIso3166AndIso31662?: InputMaybe<CountryToManyCountryDataPointFilter>;
  /** Some related `countryDataPointsByIso3166AndIso31662` exist. */
  countryDataPointsByIso3166AndIso31662Exist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `en` field. */
  en?: InputMaybe<StringFilter>;
  /** Filter by the object’s `es` field. */
  es?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fr` field. */
  fr?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso3166` field. */
  iso3166?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso31662` field. */
  iso31662?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<CountryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<CountryFilter>>;
  /** Filter by the object’s `productionCo2E` field. */
  productionCo2E?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `productionSnapshotData` field. */
  productionSnapshotData?: InputMaybe<JsonFilter>;
  /** Filter by the object’s `projectsByIso3166AndIso31662` relation. */
  projectsByIso3166AndIso31662?: InputMaybe<CountryToManyProjectFilter>;
  /** Some related `projectsByIso3166AndIso31662` exist. */
  projectsByIso3166AndIso31662Exist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `sv` field. */
  sv?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Country` */
export type CountryInput = {
  en: Scalars['String'];
  es?: InputMaybe<Scalars['String']>;
  fr?: InputMaybe<Scalars['String']>;
  iso3166: Scalars['String'];
  iso31662?: InputMaybe<Scalars['String']>;
  productionCo2E?: InputMaybe<Scalars['JSON']>;
  productionSnapshotData?: InputMaybe<Scalars['JSON']>;
  sv?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `Country`. Fields that are set will be updated. */
export type CountryPatch = {
  en?: InputMaybe<Scalars['String']>;
  es?: InputMaybe<Scalars['String']>;
  fr?: InputMaybe<Scalars['String']>;
  iso3166?: InputMaybe<Scalars['String']>;
  iso31662?: InputMaybe<Scalars['String']>;
  productionCo2E?: InputMaybe<Scalars['JSON']>;
  productionSnapshotData?: InputMaybe<Scalars['JSON']>;
  sv?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against many `CountryDataPoint` object types. All fields are combined with a logical ‘and.’ */
export type CountryToManyCountryDataPointFilter = {
  /** Every related `CountryDataPoint` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CountryDataPointFilter>;
  /** No related `CountryDataPoint` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CountryDataPointFilter>;
  /** Some related `CountryDataPoint` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CountryDataPointFilter>;
};

/** A filter to be used against many `Project` object types. All fields are combined with a logical ‘and.’ */
export type CountryToManyProjectFilter = {
  /** Every related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectFilter>;
  /** No related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectFilter>;
  /** Some related `Project` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectFilter>;
};

/** All input for the create `Co2Cost` mutation. */
export type CreateCo2CostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Co2Cost` to be created by this mutation. */
  co2Cost: Co2CostInput;
};

/** The output of our create `Co2Cost` mutation. */
export type CreateCo2CostPayload = {
  __typename?: 'CreateCo2CostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Co2Cost` that was created by this mutation. */
  co2Cost?: Maybe<Co2Cost>;
  /** An edge for our `Co2Cost`. May be used by Relay 1. */
  co2CostEdge?: Maybe<Co2CostsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Co2Cost` mutation. */
export type CreateCo2CostPayloadCo2CostEdgeArgs = {
  orderBy?: InputMaybe<Array<Co2CostsOrderBy>>;
};

/** All input for the create `CountryDataPoint` mutation. */
export type CreateCountryDataPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `CountryDataPoint` to be created by this mutation. */
  countryDataPoint: CountryDataPointInput;
};

/** The output of our create `CountryDataPoint` mutation. */
export type CreateCountryDataPointPayload = {
  __typename?: 'CreateCountryDataPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `CountryDataPoint`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  /** The `CountryDataPoint` that was created by this mutation. */
  countryDataPoint?: Maybe<CountryDataPoint>;
  /** An edge for our `CountryDataPoint`. May be used by Relay 1. */
  countryDataPointEdge?: Maybe<CountryDataPointsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `CountryDataPoint` mutation. */
export type CreateCountryDataPointPayloadCountryDataPointEdgeArgs = {
  orderBy?: InputMaybe<Array<CountryDataPointsOrderBy>>;
};

/** All input for the create `Country` mutation. */
export type CreateCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Country` to be created by this mutation. */
  country: CountryInput;
};

/** The output of our create `Country` mutation. */
export type CreateCountryPayload = {
  __typename?: 'CreateCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Country` that was created by this mutation. */
  country?: Maybe<Country>;
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Country` mutation. */
export type CreateCountryPayloadCountryEdgeArgs = {
  orderBy?: InputMaybe<Array<CountriesOrderBy>>;
};

/** All input for the create `ProjectDataPoint` mutation. */
export type CreateProjectDataPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `ProjectDataPoint` to be created by this mutation. */
  projectDataPoint: ProjectDataPointInput;
};

/** The output of our create `ProjectDataPoint` mutation. */
export type CreateProjectDataPointPayload = {
  __typename?: 'CreateProjectDataPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Project` that is related to this `ProjectDataPoint`. */
  project?: Maybe<Project>;
  /** The `ProjectDataPoint` that was created by this mutation. */
  projectDataPoint?: Maybe<ProjectDataPoint>;
  /** An edge for our `ProjectDataPoint`. May be used by Relay 1. */
  projectDataPointEdge?: Maybe<ProjectDataPointsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ProjectDataPoint` mutation. */
export type CreateProjectDataPointPayloadProjectDataPointEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectDataPointsOrderBy>>;
};

/** All input for the create `Project` mutation. */
export type CreateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Project` to be created by this mutation. */
  project: ProjectInput;
};

/** The output of our create `Project` mutation. */
export type CreateProjectPayload = {
  __typename?: 'CreateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `Project`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  /** The `Project` that was created by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Project` mutation. */
export type CreateProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the create `Source` mutation. */
export type CreateSourceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Source` to be created by this mutation. */
  source: SourceInput;
};

/** The output of our create `Source` mutation. */
export type CreateSourcePayload = {
  __typename?: 'CreateSourcePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Source` that was created by this mutation. */
  source?: Maybe<Source>;
  /** An edge for our `Source`. May be used by Relay 1. */
  sourceEdge?: Maybe<SourcesEdge>;
};


/** The output of our create `Source` mutation. */
export type CreateSourcePayloadSourceEdgeArgs = {
  orderBy?: InputMaybe<Array<SourcesOrderBy>>;
};

export enum DataPointType {
  Production = 'PRODUCTION',
  Projection = 'PROJECTION',
  Reserve = 'RESERVE'
}

/** A filter to be used against DataPointType fields. All fields are combined with a logical ‘and.’ */
export type DataPointTypeFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<DataPointType>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<DataPointType>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** All input for the `deleteCo2CostByNodeId` mutation. */
export type DeleteCo2CostByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Co2Cost` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteCo2Cost` mutation. */
export type DeleteCo2CostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  costPerTon: Scalars['Int'];
  currency: Scalars['String'];
  source: Scalars['String'];
  year: Scalars['Int'];
};

/** The output of our delete `Co2Cost` mutation. */
export type DeleteCo2CostPayload = {
  __typename?: 'DeleteCo2CostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Co2Cost` that was deleted by this mutation. */
  co2Cost?: Maybe<Co2Cost>;
  /** An edge for our `Co2Cost`. May be used by Relay 1. */
  co2CostEdge?: Maybe<Co2CostsEdge>;
  deletedCo2CostNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Co2Cost` mutation. */
export type DeleteCo2CostPayloadCo2CostEdgeArgs = {
  orderBy?: InputMaybe<Array<Co2CostsOrderBy>>;
};

/** All input for the `deleteCountryByNodeId` mutation. */
export type DeleteCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Country` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteCountryDataPointByNodeId` mutation. */
export type DeleteCountryDataPointByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CountryDataPoint` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteCountryDataPoint` mutation. */
export type DeleteCountryDataPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `CountryDataPoint` mutation. */
export type DeleteCountryDataPointPayload = {
  __typename?: 'DeleteCountryDataPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `CountryDataPoint`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  /** The `CountryDataPoint` that was deleted by this mutation. */
  countryDataPoint?: Maybe<CountryDataPoint>;
  /** An edge for our `CountryDataPoint`. May be used by Relay 1. */
  countryDataPointEdge?: Maybe<CountryDataPointsEdge>;
  deletedCountryDataPointNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `CountryDataPoint` mutation. */
export type DeleteCountryDataPointPayloadCountryDataPointEdgeArgs = {
  orderBy?: InputMaybe<Array<CountryDataPointsOrderBy>>;
};

/** All input for the `deleteCountry` mutation. */
export type DeleteCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
};

/** The output of our delete `Country` mutation. */
export type DeleteCountryPayload = {
  __typename?: 'DeleteCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Country` that was deleted by this mutation. */
  country?: Maybe<Country>;
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountriesEdge>;
  deletedCountryNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Country` mutation. */
export type DeleteCountryPayloadCountryEdgeArgs = {
  orderBy?: InputMaybe<Array<CountriesOrderBy>>;
};

/** All input for the `deleteProjectByNodeId` mutation. */
export type DeleteProjectByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Project` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteProjectDataPointByNodeId` mutation. */
export type DeleteProjectDataPointByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ProjectDataPoint` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteProjectDataPoint` mutation. */
export type DeleteProjectDataPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ProjectDataPoint` mutation. */
export type DeleteProjectDataPointPayload = {
  __typename?: 'DeleteProjectDataPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedProjectDataPointNodeId?: Maybe<Scalars['ID']>;
  /** Reads a single `Project` that is related to this `ProjectDataPoint`. */
  project?: Maybe<Project>;
  /** The `ProjectDataPoint` that was deleted by this mutation. */
  projectDataPoint?: Maybe<ProjectDataPoint>;
  /** An edge for our `ProjectDataPoint`. May be used by Relay 1. */
  projectDataPointEdge?: Maybe<ProjectDataPointsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ProjectDataPoint` mutation. */
export type DeleteProjectDataPointPayloadProjectDataPointEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectDataPointsOrderBy>>;
};

/** All input for the `deleteProject` mutation. */
export type DeleteProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Project` mutation. */
export type DeleteProjectPayload = {
  __typename?: 'DeleteProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `Project`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  deletedProjectNodeId?: Maybe<Scalars['ID']>;
  /** The `Project` that was deleted by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Project` mutation. */
export type DeleteProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `deleteSourceByNodeId` mutation. */
export type DeleteSourceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Source` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteSource` mutation. */
export type DeleteSourceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  sourceId: Scalars['Int'];
};

/** The output of our delete `Source` mutation. */
export type DeleteSourcePayload = {
  __typename?: 'DeleteSourcePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedSourceNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Source` that was deleted by this mutation. */
  source?: Maybe<Source>;
  /** An edge for our `Source`. May be used by Relay 1. */
  sourceEdge?: Maybe<SourcesEdge>;
};


/** The output of our delete `Source` mutation. */
export type DeleteSourcePayloadSourceEdgeArgs = {
  orderBy?: InputMaybe<Array<SourcesOrderBy>>;
};

/** A connection to a list of `ExcelCountry` values. */
export type ExcelCountriesConnection = {
  __typename?: 'ExcelCountriesConnection';
  /** A list of edges which contains the `ExcelCountry` and cursor to aid in pagination. */
  edges: Array<ExcelCountriesEdge>;
  /** A list of `ExcelCountry` objects. */
  nodes: Array<Maybe<ExcelCountry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ExcelCountry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ExcelCountry` edge in the connection. */
export type ExcelCountriesEdge = {
  __typename?: 'ExcelCountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ExcelCountry` at the end of the edge. */
  node?: Maybe<ExcelCountry>;
};

/** Methods to use when ordering `ExcelCountry`. */
export enum ExcelCountriesOrderBy {
  DataTypeAsc = 'DATA_TYPE_ASC',
  DataTypeDesc = 'DATA_TYPE_DESC',
  EnAsc = 'EN_ASC',
  EnDesc = 'EN_DESC',
  FossilFuelTypeAsc = 'FOSSIL_FUEL_TYPE_ASC',
  FossilFuelTypeDesc = 'FOSSIL_FUEL_TYPE_DESC',
  GradeAsc = 'GRADE_ASC',
  GradeDesc = 'GRADE_DESC',
  Iso3166_2Asc = 'ISO3166_2_ASC',
  Iso3166_2Desc = 'ISO3166_2_DESC',
  Iso3166Asc = 'ISO3166_ASC',
  Iso3166Desc = 'ISO3166_DESC',
  Natural = 'NATURAL',
  QualityAsc = 'QUALITY_ASC',
  QualityDesc = 'QUALITY_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  SubtypeAsc = 'SUBTYPE_ASC',
  SubtypeDesc = 'SUBTYPE_DESC',
  UnitAsc = 'UNIT_ASC',
  UnitDesc = 'UNIT_DESC',
  VolumeAsc = 'VOLUME_ASC',
  VolumeDesc = 'VOLUME_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

export type ExcelCountry = {
  __typename?: 'ExcelCountry';
  dataType?: Maybe<DataPointType>;
  en?: Maybe<Scalars['String']>;
  fossilFuelType?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  iso3166?: Maybe<Scalars['String']>;
  iso31662?: Maybe<Scalars['String']>;
  quality?: Maybe<Scalars['Int']>;
  sourceId?: Maybe<Scalars['Int']>;
  subtype?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `ExcelCountry` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ExcelCountryCondition = {
  /** Checks for equality with the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointType>;
  /** Checks for equality with the object’s `en` field. */
  en?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `grade` field. */
  grade?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso3166` field. */
  iso3166?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso31662` field. */
  iso31662?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `quality` field. */
  quality?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `subtype` field. */
  subtype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `unit` field. */
  unit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `volume` field. */
  volume?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `ExcelCountry` object types. All fields are combined with a logical ‘and.’ */
export type ExcelCountryFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ExcelCountryFilter>>;
  /** Filter by the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointTypeFilter>;
  /** Filter by the object’s `en` field. */
  en?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `grade` field. */
  grade?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso3166` field. */
  iso3166?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso31662` field. */
  iso31662?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ExcelCountryFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ExcelCountryFilter>>;
  /** Filter by the object’s `quality` field. */
  quality?: InputMaybe<IntFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `subtype` field. */
  subtype?: InputMaybe<StringFilter>;
  /** Filter by the object’s `unit` field. */
  unit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `volume` field. */
  volume?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

export type ExcelProject = {
  __typename?: 'ExcelProject';
  dataType?: Maybe<DataPointType>;
  dataYear?: Maybe<Scalars['Int']>;
  fossilFuelType?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  iso3166?: Maybe<Scalars['String']>;
  iso31662?: Maybe<Scalars['String']>;
  projectIdentifier?: Maybe<Scalars['String']>;
  projectType?: Maybe<ProjectType>;
  quality?: Maybe<Scalars['Int']>;
  sourceId?: Maybe<Scalars['Int']>;
  subtype?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `ExcelProject` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ExcelProjectCondition = {
  /** Checks for equality with the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointType>;
  /** Checks for equality with the object’s `dataYear` field. */
  dataYear?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `grade` field. */
  grade?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso3166` field. */
  iso3166?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso31662` field. */
  iso31662?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectIdentifier` field. */
  projectIdentifier?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectType` field. */
  projectType?: InputMaybe<ProjectType>;
  /** Checks for equality with the object’s `quality` field. */
  quality?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `subtype` field. */
  subtype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `unit` field. */
  unit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `volume` field. */
  volume?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `ExcelProject` object types. All fields are combined with a logical ‘and.’ */
export type ExcelProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ExcelProjectFilter>>;
  /** Filter by the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointTypeFilter>;
  /** Filter by the object’s `dataYear` field. */
  dataYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `grade` field. */
  grade?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso3166` field. */
  iso3166?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso31662` field. */
  iso31662?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ExcelProjectFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ExcelProjectFilter>>;
  /** Filter by the object’s `projectIdentifier` field. */
  projectIdentifier?: InputMaybe<StringFilter>;
  /** Filter by the object’s `projectType` field. */
  projectType?: InputMaybe<ProjectTypeFilter>;
  /** Filter by the object’s `quality` field. */
  quality?: InputMaybe<IntFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `subtype` field. */
  subtype?: InputMaybe<StringFilter>;
  /** Filter by the object’s `unit` field. */
  unit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `volume` field. */
  volume?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

/** A connection to a list of `ExcelProject` values. */
export type ExcelProjectsConnection = {
  __typename?: 'ExcelProjectsConnection';
  /** A list of edges which contains the `ExcelProject` and cursor to aid in pagination. */
  edges: Array<ExcelProjectsEdge>;
  /** A list of `ExcelProject` objects. */
  nodes: Array<Maybe<ExcelProject>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ExcelProject` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ExcelProject` edge in the connection. */
export type ExcelProjectsEdge = {
  __typename?: 'ExcelProjectsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ExcelProject` at the end of the edge. */
  node?: Maybe<ExcelProject>;
};

/** Methods to use when ordering `ExcelProject`. */
export enum ExcelProjectsOrderBy {
  DataTypeAsc = 'DATA_TYPE_ASC',
  DataTypeDesc = 'DATA_TYPE_DESC',
  DataYearAsc = 'DATA_YEAR_ASC',
  DataYearDesc = 'DATA_YEAR_DESC',
  FossilFuelTypeAsc = 'FOSSIL_FUEL_TYPE_ASC',
  FossilFuelTypeDesc = 'FOSSIL_FUEL_TYPE_DESC',
  GradeAsc = 'GRADE_ASC',
  GradeDesc = 'GRADE_DESC',
  Iso3166_2Asc = 'ISO3166_2_ASC',
  Iso3166_2Desc = 'ISO3166_2_DESC',
  Iso3166Asc = 'ISO3166_ASC',
  Iso3166Desc = 'ISO3166_DESC',
  Natural = 'NATURAL',
  ProjectIdentifierAsc = 'PROJECT_IDENTIFIER_ASC',
  ProjectIdentifierDesc = 'PROJECT_IDENTIFIER_DESC',
  ProjectTypeAsc = 'PROJECT_TYPE_ASC',
  ProjectTypeDesc = 'PROJECT_TYPE_DESC',
  QualityAsc = 'QUALITY_ASC',
  QualityDesc = 'QUALITY_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  SubtypeAsc = 'SUBTYPE_ASC',
  SubtypeDesc = 'SUBTYPE_DESC',
  UnitAsc = 'UNIT_ASC',
  UnitDesc = 'UNIT_DESC',
  VolumeAsc = 'VOLUME_ASC',
  VolumeDesc = 'VOLUME_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** A filter to be used against Float fields. All fields are combined with a logical ‘and.’ */
export type FloatFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Float']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Float']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** All geometry XY types implement this interface */
export type GeometryGeometry = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

export type GeometryGeometryCollection = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryGeometryCollection';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometry>>>;
  srid: Scalars['Int'];
};

export type GeometryGeometryCollectionM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryGeometryCollectionM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometryM>>>;
  srid: Scalars['Int'];
};

export type GeometryGeometryCollectionZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryGeometryCollectionZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometryZ>>>;
  srid: Scalars['Int'];
};

export type GeometryGeometryCollectionZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryGeometryCollectionZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  geometries?: Maybe<Array<Maybe<GeometryGeometryZm>>>;
  srid: Scalars['Int'];
};

/** All geometry XYM types implement this interface */
export type GeometryGeometryM = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geometry XYZ types implement this interface */
export type GeometryGeometryZ = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geometry XYZM types implement this interface */
export type GeometryGeometryZm = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

/** All geometry types implement this interface */
export type GeometryInterface = {
  /** Converts the object to GeoJSON */
  geojson?: Maybe<Scalars['GeoJSON']>;
  /** Spatial reference identifier (SRID) */
  srid: Scalars['Int'];
};

export type GeometryLineString = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryLineString';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPoint>>>;
  srid: Scalars['Int'];
};

export type GeometryLineStringM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryLineStringM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointM>>>;
  srid: Scalars['Int'];
};

export type GeometryLineStringZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryLineStringZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZ>>>;
  srid: Scalars['Int'];
};

export type GeometryLineStringZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryLineStringZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZm>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineString = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryMultiLineString';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineString>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineStringM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryMultiLineStringM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineStringM>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineStringZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryMultiLineStringZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineStringZ>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiLineStringZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryMultiLineStringZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  lines?: Maybe<Array<Maybe<GeometryLineStringZm>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPoint = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryMultiPoint';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPoint>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPointM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryMultiPointM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointM>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPointZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryMultiPointZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZ>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPointZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryMultiPointZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  points?: Maybe<Array<Maybe<GeometryPointZm>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygon = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryMultiPolygon';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygon>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygonM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryMultiPolygonM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygonM>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygonZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryMultiPolygonZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygonZ>>>;
  srid: Scalars['Int'];
};

export type GeometryMultiPolygonZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryMultiPolygonZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  polygons?: Maybe<Array<Maybe<GeometryPolygonZm>>>;
  srid: Scalars['Int'];
};

export type GeometryPoint = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryPoint';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPointM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryPointM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPointZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryPointZ';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPointZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryPointZM';
  geojson?: Maybe<Scalars['GeoJSON']>;
  srid: Scalars['Int'];
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type GeometryPolygon = GeometryGeometry & GeometryInterface & {
  __typename?: 'GeometryPolygon';
  exterior?: Maybe<GeometryLineString>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineString>>>;
  srid: Scalars['Int'];
};

export type GeometryPolygonM = GeometryGeometryM & GeometryInterface & {
  __typename?: 'GeometryPolygonM';
  exterior?: Maybe<GeometryLineStringM>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineStringM>>>;
  srid: Scalars['Int'];
};

export type GeometryPolygonZ = GeometryGeometryZ & GeometryInterface & {
  __typename?: 'GeometryPolygonZ';
  exterior?: Maybe<GeometryLineStringZ>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineStringZ>>>;
  srid: Scalars['Int'];
};

export type GeometryPolygonZm = GeometryGeometryZm & GeometryInterface & {
  __typename?: 'GeometryPolygonZM';
  exterior?: Maybe<GeometryLineStringZm>;
  geojson?: Maybe<Scalars['GeoJSON']>;
  interiors?: Maybe<Array<Maybe<GeometryLineStringZm>>>;
  srid: Scalars['Int'];
};

/** A connection to a list of `GetCountryCurrentProductionRecord` values. */
export type GetCountryCurrentProductionConnection = {
  __typename?: 'GetCountryCurrentProductionConnection';
  /** A list of edges which contains the `GetCountryCurrentProductionRecord` and cursor to aid in pagination. */
  edges: Array<GetCountryCurrentProductionEdge>;
  /** A list of `GetCountryCurrentProductionRecord` objects. */
  nodes: Array<Maybe<GetCountryCurrentProductionRecord>>;
  /** The count of *all* `GetCountryCurrentProductionRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `GetCountryCurrentProductionRecord` edge in the connection. */
export type GetCountryCurrentProductionEdge = {
  __typename?: 'GetCountryCurrentProductionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetCountryCurrentProductionRecord` at the end of the edge. */
  node?: Maybe<GetCountryCurrentProductionRecord>;
};

/** The return type of our `getCountryCurrentProduction` query. */
export type GetCountryCurrentProductionRecord = {
  __typename?: 'GetCountryCurrentProductionRecord';
  fossilFuelType?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  sourceId?: Maybe<Scalars['Int']>;
  subtype?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Int']>;
};

/** A `GetCountrySourcesRecord` edge in the connection. */
export type GetCountrySourceEdge = {
  __typename?: 'GetCountrySourceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetCountrySourcesRecord` at the end of the edge. */
  node?: Maybe<GetCountrySourcesRecord>;
};

/** A connection to a list of `GetCountrySourcesRecord` values. */
export type GetCountrySourcesConnection = {
  __typename?: 'GetCountrySourcesConnection';
  /** A list of edges which contains the `GetCountrySourcesRecord` and cursor to aid in pagination. */
  edges: Array<GetCountrySourceEdge>;
  /** A list of `GetCountrySourcesRecord` objects. */
  nodes: Array<Maybe<GetCountrySourcesRecord>>;
  /** The count of *all* `GetCountrySourcesRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** The return type of our `getCountrySources` query. */
export type GetCountrySourcesRecord = {
  __typename?: 'GetCountrySourcesRecord';
  dataPoints?: Maybe<Scalars['BigInt']>;
  dataType?: Maybe<DataPointType>;
  description?: Maybe<Scalars['String']>;
  documentUrl?: Maybe<Scalars['String']>;
  grades?: Maybe<Array<Maybe<Scalars['String']>>>;
  latestCurationAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  namePretty?: Maybe<Scalars['String']>;
  quality?: Maybe<Scalars['Int']>;
  records?: Maybe<Scalars['BigInt']>;
  sourceId?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
  year?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `GetProducingIso3166Record` values. */
export type GetProducingIso3166Connection = {
  __typename?: 'GetProducingIso3166Connection';
  /** A list of edges which contains the `GetProducingIso3166Record` and cursor to aid in pagination. */
  edges: Array<GetProducingIso3166Edge>;
  /** A list of `GetProducingIso3166Record` objects. */
  nodes: Array<Maybe<GetProducingIso3166Record>>;
  /** The count of *all* `GetProducingIso3166Record` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `GetProducingIso3166Record` edge in the connection. */
export type GetProducingIso3166Edge = {
  __typename?: 'GetProducingIso3166Edge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetProducingIso3166Record` at the end of the edge. */
  node?: Maybe<GetProducingIso3166Record>;
};

/** The return type of our `getProducingIso3166` query. */
export type GetProducingIso3166Record = {
  __typename?: 'GetProducingIso3166Record';
  borders?: Maybe<GeometryInterface>;
  centroid?: Maybe<GeometryInterface>;
  en?: Maybe<Scalars['String']>;
  es?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  iso3166?: Maybe<Scalars['String']>;
  iso31662?: Maybe<Scalars['String']>;
  productionCo2E?: Maybe<Scalars['JSON']>;
  productionSnapshotData?: Maybe<Scalars['JSON']>;
  sv?: Maybe<Scalars['String']>;
};

/** A `GetProducingIso3166WithEmissionsRecord` edge in the connection. */
export type GetProducingIso3166WithEmissionEdge = {
  __typename?: 'GetProducingIso3166WithEmissionEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetProducingIso3166WithEmissionsRecord` at the end of the edge. */
  node?: Maybe<GetProducingIso3166WithEmissionsRecord>;
};

/** A connection to a list of `GetProducingIso3166WithEmissionsRecord` values. */
export type GetProducingIso3166WithEmissionsConnection = {
  __typename?: 'GetProducingIso3166WithEmissionsConnection';
  /** A list of edges which contains the `GetProducingIso3166WithEmissionsRecord` and cursor to aid in pagination. */
  edges: Array<GetProducingIso3166WithEmissionEdge>;
  /** A list of `GetProducingIso3166WithEmissionsRecord` objects. */
  nodes: Array<Maybe<GetProducingIso3166WithEmissionsRecord>>;
  /** The count of *all* `GetProducingIso3166WithEmissionsRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** The return type of our `getProducingIso3166WithEmissions` query. */
export type GetProducingIso3166WithEmissionsRecord = {
  __typename?: 'GetProducingIso3166WithEmissionsRecord';
  en?: Maybe<Scalars['String']>;
  es?: Maybe<Scalars['String']>;
  fr?: Maybe<Scalars['String']>;
  iso3166?: Maybe<Scalars['String']>;
  iso31662?: Maybe<Scalars['String']>;
  sv?: Maybe<Scalars['String']>;
};

/** A `GetProjectsRecord` edge in the connection. */
export type GetProjectEdge = {
  __typename?: 'GetProjectEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetProjectsRecord` at the end of the edge. */
  node?: Maybe<GetProjectsRecord>;
};

/** A `GetProjectSourcesRecord` edge in the connection. */
export type GetProjectSourceEdge = {
  __typename?: 'GetProjectSourceEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `GetProjectSourcesRecord` at the end of the edge. */
  node?: Maybe<GetProjectSourcesRecord>;
};

/** A connection to a list of `GetProjectSourcesRecord` values. */
export type GetProjectSourcesConnection = {
  __typename?: 'GetProjectSourcesConnection';
  /** A list of edges which contains the `GetProjectSourcesRecord` and cursor to aid in pagination. */
  edges: Array<GetProjectSourceEdge>;
  /** A list of `GetProjectSourcesRecord` objects. */
  nodes: Array<Maybe<GetProjectSourcesRecord>>;
  /** The count of *all* `GetProjectSourcesRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** The return type of our `getProjectSources` query. */
export type GetProjectSourcesRecord = {
  __typename?: 'GetProjectSourcesRecord';
  dataPoints?: Maybe<Scalars['BigInt']>;
  dataType?: Maybe<DataPointType>;
  description?: Maybe<Scalars['String']>;
  documentUrl?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  latestCurationAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  namePretty?: Maybe<Scalars['String']>;
  quality?: Maybe<Scalars['Int']>;
  records?: Maybe<Scalars['BigInt']>;
  sourceId?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

/** A connection to a list of `GetProjectsRecord` values. */
export type GetProjectsConnection = {
  __typename?: 'GetProjectsConnection';
  /** A list of edges which contains the `GetProjectsRecord` and cursor to aid in pagination. */
  edges: Array<GetProjectEdge>;
  /** A list of `GetProjectsRecord` objects. */
  nodes: Array<Maybe<GetProjectsRecord>>;
  /** The count of *all* `GetProjectsRecord` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** The return type of our `getProjects` query. */
export type GetProjectsRecord = {
  __typename?: 'GetProjectsRecord';
  co2?: Maybe<Scalars['Float']>;
  dataYear?: Maybe<Scalars['Int']>;
  firstYear?: Maybe<Scalars['Int']>;
  fuels?: Maybe<Array<Maybe<Scalars['String']>>>;
  geoPosition?: Maybe<GeometryInterface>;
  id?: Maybe<Scalars['Int']>;
  lastYear?: Maybe<Scalars['Int']>;
  projectIdentifier?: Maybe<Scalars['String']>;
  projectType?: Maybe<ProjectType>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against JSON fields. All fields are combined with a logical ‘and.’ */
export type JsonFilter = {
  /** Contains the specified JSON. */
  contains?: InputMaybe<Scalars['JSON']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['JSON']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['JSON']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export enum ModifierEnum {
  Gwp20 = 'GWP20',
  Gwp100 = 'GWP100',
  SparseScope1 = 'SPARSE_SCOPE1'
}

/** A filter to be used against ModifierEnum fields. All fields are combined with a logical ‘and.’ */
export type ModifierEnumFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<ModifierEnum>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<ModifierEnum>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Co2Cost`. */
  createCo2Cost?: Maybe<CreateCo2CostPayload>;
  /** Creates a single `Country`. */
  createCountry?: Maybe<CreateCountryPayload>;
  /** Creates a single `CountryDataPoint`. */
  createCountryDataPoint?: Maybe<CreateCountryDataPointPayload>;
  /** Creates a single `Project`. */
  createProject?: Maybe<CreateProjectPayload>;
  /** Creates a single `ProjectDataPoint`. */
  createProjectDataPoint?: Maybe<CreateProjectDataPointPayload>;
  /** Creates a single `Source`. */
  createSource?: Maybe<CreateSourcePayload>;
  /** Deletes a single `Co2Cost` using a unique key. */
  deleteCo2Cost?: Maybe<DeleteCo2CostPayload>;
  /** Deletes a single `Co2Cost` using its globally unique id. */
  deleteCo2CostByNodeId?: Maybe<DeleteCo2CostPayload>;
  /** Deletes a single `Country` using a unique key. */
  deleteCountry?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `Country` using its globally unique id. */
  deleteCountryByNodeId?: Maybe<DeleteCountryPayload>;
  /** Deletes a single `CountryDataPoint` using a unique key. */
  deleteCountryDataPoint?: Maybe<DeleteCountryDataPointPayload>;
  /** Deletes a single `CountryDataPoint` using its globally unique id. */
  deleteCountryDataPointByNodeId?: Maybe<DeleteCountryDataPointPayload>;
  /** Deletes a single `Project` using a unique key. */
  deleteProject?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `Project` using its globally unique id. */
  deleteProjectByNodeId?: Maybe<DeleteProjectPayload>;
  /** Deletes a single `ProjectDataPoint` using a unique key. */
  deleteProjectDataPoint?: Maybe<DeleteProjectDataPointPayload>;
  /** Deletes a single `ProjectDataPoint` using its globally unique id. */
  deleteProjectDataPointByNodeId?: Maybe<DeleteProjectDataPointPayload>;
  /** Deletes a single `Source` using a unique key. */
  deleteSource?: Maybe<DeleteSourcePayload>;
  /** Deletes a single `Source` using its globally unique id. */
  deleteSourceByNodeId?: Maybe<DeleteSourcePayload>;
  /** Updates a single `Co2Cost` using a unique key and a patch. */
  updateCo2Cost?: Maybe<UpdateCo2CostPayload>;
  /** Updates a single `Co2Cost` using its globally unique id and a patch. */
  updateCo2CostByNodeId?: Maybe<UpdateCo2CostPayload>;
  /** Updates a single `Country` using a unique key and a patch. */
  updateCountry?: Maybe<UpdateCountryPayload>;
  /** Updates a single `Country` using its globally unique id and a patch. */
  updateCountryByNodeId?: Maybe<UpdateCountryPayload>;
  /** Updates a single `CountryDataPoint` using a unique key and a patch. */
  updateCountryDataPoint?: Maybe<UpdateCountryDataPointPayload>;
  /** Updates a single `CountryDataPoint` using its globally unique id and a patch. */
  updateCountryDataPointByNodeId?: Maybe<UpdateCountryDataPointPayload>;
  /** Updates a single `Project` using a unique key and a patch. */
  updateProject?: Maybe<UpdateProjectPayload>;
  /** Updates a single `Project` using its globally unique id and a patch. */
  updateProjectByNodeId?: Maybe<UpdateProjectPayload>;
  /** Updates a single `ProjectDataPoint` using a unique key and a patch. */
  updateProjectDataPoint?: Maybe<UpdateProjectDataPointPayload>;
  /** Updates a single `ProjectDataPoint` using its globally unique id and a patch. */
  updateProjectDataPointByNodeId?: Maybe<UpdateProjectDataPointPayload>;
  /** Updates a single `Source` using a unique key and a patch. */
  updateSource?: Maybe<UpdateSourcePayload>;
  /** Updates a single `Source` using its globally unique id and a patch. */
  updateSourceByNodeId?: Maybe<UpdateSourcePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCo2CostArgs = {
  input: CreateCo2CostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCountryArgs = {
  input: CreateCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCountryDataPointArgs = {
  input: CreateCountryDataPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateProjectDataPointArgs = {
  input: CreateProjectDataPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSourceArgs = {
  input: CreateSourceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCo2CostArgs = {
  input: DeleteCo2CostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCo2CostByNodeIdArgs = {
  input: DeleteCo2CostByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryArgs = {
  input: DeleteCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryByNodeIdArgs = {
  input: DeleteCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryDataPointArgs = {
  input: DeleteCountryDataPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCountryDataPointByNodeIdArgs = {
  input: DeleteCountryDataPointByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectArgs = {
  input: DeleteProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectByNodeIdArgs = {
  input: DeleteProjectByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectDataPointArgs = {
  input: DeleteProjectDataPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteProjectDataPointByNodeIdArgs = {
  input: DeleteProjectDataPointByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSourceArgs = {
  input: DeleteSourceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSourceByNodeIdArgs = {
  input: DeleteSourceByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCo2CostArgs = {
  input: UpdateCo2CostInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCo2CostByNodeIdArgs = {
  input: UpdateCo2CostByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryArgs = {
  input: UpdateCountryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryByNodeIdArgs = {
  input: UpdateCountryByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryDataPointArgs = {
  input: UpdateCountryDataPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCountryDataPointByNodeIdArgs = {
  input: UpdateCountryDataPointByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectArgs = {
  input: UpdateProjectInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectByNodeIdArgs = {
  input: UpdateProjectByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectDataPointArgs = {
  input: UpdateProjectDataPointInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateProjectDataPointByNodeIdArgs = {
  input: UpdateProjectDataPointByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSourceArgs = {
  input: UpdateSourceInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSourceByNodeIdArgs = {
  input: UpdateSourceByNodeIdInput;
};

/** A connection to a list of `NeCountry` values. */
export type NeCountriesConnection = {
  __typename?: 'NeCountriesConnection';
  /** A list of edges which contains the `NeCountry` and cursor to aid in pagination. */
  edges: Array<NeCountriesEdge>;
  /** A list of `NeCountry` objects. */
  nodes: Array<Maybe<NeCountry>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `NeCountry` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `NeCountry` edge in the connection. */
export type NeCountriesEdge = {
  __typename?: 'NeCountriesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `NeCountry` at the end of the edge. */
  node?: Maybe<NeCountry>;
};

/** Methods to use when ordering `NeCountry`. */
export enum NeCountriesOrderBy {
  AbbrevAsc = 'ABBREV_ASC',
  AbbrevDesc = 'ABBREV_DESC',
  AbbrevLenAsc = 'ABBREV_LEN_ASC',
  AbbrevLenDesc = 'ABBREV_LEN_DESC',
  Adm0A3Asc = 'ADM0_A3_ASC',
  Adm0A3Desc = 'ADM0_A3_DESC',
  Adm0A3IsAsc = 'ADM0_A3_IS_ASC',
  Adm0A3IsDesc = 'ADM0_A3_IS_DESC',
  Adm0A3UnAsc = 'ADM0_A3_UN_ASC',
  Adm0A3UnDesc = 'ADM0_A3_UN_DESC',
  Adm0A3UsAsc = 'ADM0_A3_US_ASC',
  Adm0A3UsDesc = 'ADM0_A3_US_DESC',
  Adm0A3WbAsc = 'ADM0_A3_WB_ASC',
  Adm0A3WbDesc = 'ADM0_A3_WB_DESC',
  Adm0DifAsc = 'ADM0_DIF_ASC',
  Adm0DifDesc = 'ADM0_DIF_DESC',
  AdminAsc = 'ADMIN_ASC',
  AdminDesc = 'ADMIN_DESC',
  BrkA3Asc = 'BRK_A3_ASC',
  BrkA3Desc = 'BRK_A3_DESC',
  BrkDiffAsc = 'BRK_DIFF_ASC',
  BrkDiffDesc = 'BRK_DIFF_DESC',
  BrkGroupAsc = 'BRK_GROUP_ASC',
  BrkGroupDesc = 'BRK_GROUP_DESC',
  BrkNameAsc = 'BRK_NAME_ASC',
  BrkNameDesc = 'BRK_NAME_DESC',
  ContinentAsc = 'CONTINENT_ASC',
  ContinentDesc = 'CONTINENT_DESC',
  EconomyAsc = 'ECONOMY_ASC',
  EconomyDesc = 'ECONOMY_DESC',
  FeatureclaAsc = 'FEATURECLA_ASC',
  FeatureclaDesc = 'FEATURECLA_DESC',
  Fips_10Asc = 'FIPS_10_ASC',
  Fips_10Desc = 'FIPS_10_DESC',
  FormalEnAsc = 'FORMAL_EN_ASC',
  FormalEnDesc = 'FORMAL_EN_DESC',
  FormalFrAsc = 'FORMAL_FR_ASC',
  FormalFrDesc = 'FORMAL_FR_DESC',
  GdpMdEstAsc = 'GDP_MD_EST_ASC',
  GdpMdEstDesc = 'GDP_MD_EST_DESC',
  GdpYearAsc = 'GDP_YEAR_ASC',
  GdpYearDesc = 'GDP_YEAR_DESC',
  GeometryAsc = 'GEOMETRY_ASC',
  GeometryDesc = 'GEOMETRY_DESC',
  GeounitAsc = 'GEOUNIT_ASC',
  GeounitDesc = 'GEOUNIT_DESC',
  GeouDifAsc = 'GEOU_DIF_ASC',
  GeouDifDesc = 'GEOU_DIF_DESC',
  GuA3Asc = 'GU_A3_ASC',
  GuA3Desc = 'GU_A3_DESC',
  HomepartAsc = 'HOMEPART_ASC',
  HomepartDesc = 'HOMEPART_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  IncomeGrpAsc = 'INCOME_GRP_ASC',
  IncomeGrpDesc = 'INCOME_GRP_DESC',
  IsoA2Asc = 'ISO_A2_ASC',
  IsoA2Desc = 'ISO_A2_DESC',
  IsoA3Asc = 'ISO_A3_ASC',
  IsoA3Desc = 'ISO_A3_DESC',
  IsoA3EhAsc = 'ISO_A3_EH_ASC',
  IsoA3EhDesc = 'ISO_A3_EH_DESC',
  IsoN3Asc = 'ISO_N3_ASC',
  IsoN3Desc = 'ISO_N3_DESC',
  LabelrankAsc = 'LABELRANK_ASC',
  LabelrankDesc = 'LABELRANK_DESC',
  LastcensusAsc = 'LASTCENSUS_ASC',
  LastcensusDesc = 'LASTCENSUS_DESC',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  LongLenAsc = 'LONG_LEN_ASC',
  LongLenDesc = 'LONG_LEN_DESC',
  Mapcolor7Asc = 'MAPCOLOR7_ASC',
  Mapcolor7Desc = 'MAPCOLOR7_DESC',
  Mapcolor8Asc = 'MAPCOLOR8_ASC',
  Mapcolor8Desc = 'MAPCOLOR8_DESC',
  Mapcolor9Asc = 'MAPCOLOR9_ASC',
  Mapcolor9Desc = 'MAPCOLOR9_DESC',
  Mapcolor13Asc = 'MAPCOLOR13_ASC',
  Mapcolor13Desc = 'MAPCOLOR13_DESC',
  MaxLabelAsc = 'MAX_LABEL_ASC',
  MaxLabelDesc = 'MAX_LABEL_DESC',
  MinLabelAsc = 'MIN_LABEL_ASC',
  MinLabelDesc = 'MIN_LABEL_DESC',
  MinZoomAsc = 'MIN_ZOOM_ASC',
  MinZoomDesc = 'MIN_ZOOM_DESC',
  NameAltAsc = 'NAME_ALT_ASC',
  NameAltDesc = 'NAME_ALT_DESC',
  NameAsc = 'NAME_ASC',
  NameCiawfAsc = 'NAME_CIAWF_ASC',
  NameCiawfDesc = 'NAME_CIAWF_DESC',
  NameDesc = 'NAME_DESC',
  NameLenAsc = 'NAME_LEN_ASC',
  NameLenDesc = 'NAME_LEN_DESC',
  NameLongAsc = 'NAME_LONG_ASC',
  NameLongDesc = 'NAME_LONG_DESC',
  NameSortAsc = 'NAME_SORT_ASC',
  NameSortDesc = 'NAME_SORT_DESC',
  Natural = 'NATURAL',
  NoteAdm0Asc = 'NOTE_ADM0_ASC',
  NoteAdm0Desc = 'NOTE_ADM0_DESC',
  NoteBrkAsc = 'NOTE_BRK_ASC',
  NoteBrkDesc = 'NOTE_BRK_DESC',
  PopEstAsc = 'POP_EST_ASC',
  PopEstDesc = 'POP_EST_DESC',
  PopRankAsc = 'POP_RANK_ASC',
  PopRankDesc = 'POP_RANK_DESC',
  PopYearAsc = 'POP_YEAR_ASC',
  PopYearDesc = 'POP_YEAR_DESC',
  PostalAsc = 'POSTAL_ASC',
  PostalDesc = 'POSTAL_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RegionUnAsc = 'REGION_UN_ASC',
  RegionUnDesc = 'REGION_UN_DESC',
  RegionWbAsc = 'REGION_WB_ASC',
  RegionWbDesc = 'REGION_WB_DESC',
  ScalerankAsc = 'SCALERANK_ASC',
  ScalerankDesc = 'SCALERANK_DESC',
  SovereigntAsc = 'SOVEREIGNT_ASC',
  SovereigntDesc = 'SOVEREIGNT_DESC',
  SovA3Asc = 'SOV_A3_ASC',
  SovA3Desc = 'SOV_A3_DESC',
  SubregionAsc = 'SUBREGION_ASC',
  SubregionDesc = 'SUBREGION_DESC',
  SubunitAsc = 'SUBUNIT_ASC',
  SubunitDesc = 'SUBUNIT_DESC',
  SuA3Asc = 'SU_A3_ASC',
  SuA3Desc = 'SU_A3_DESC',
  SuDifAsc = 'SU_DIF_ASC',
  SuDifDesc = 'SU_DIF_DESC',
  TinyAsc = 'TINY_ASC',
  TinyDesc = 'TINY_DESC',
  TypeAsc = 'TYPE_ASC',
  TypeDesc = 'TYPE_DESC',
  UnA3Asc = 'UN_A3_ASC',
  UnA3Desc = 'UN_A3_DESC',
  WbA2Asc = 'WB_A2_ASC',
  WbA2Desc = 'WB_A2_DESC',
  WbA3Asc = 'WB_A3_ASC',
  WbA3Desc = 'WB_A3_DESC',
  WikipediaAsc = 'WIKIPEDIA_ASC',
  WikipediaDesc = 'WIKIPEDIA_DESC',
  WoeIdAsc = 'WOE_ID_ASC',
  WoeIdDesc = 'WOE_ID_DESC',
  WoeIdEhAsc = 'WOE_ID_EH_ASC',
  WoeIdEhDesc = 'WOE_ID_EH_DESC',
  WoeNoteAsc = 'WOE_NOTE_ASC',
  WoeNoteDesc = 'WOE_NOTE_DESC'
}

export type NeCountry = Node & {
  __typename?: 'NeCountry';
  abbrev?: Maybe<Scalars['String']>;
  abbrevLen?: Maybe<Scalars['Int']>;
  adm0A3?: Maybe<Scalars['String']>;
  adm0A3Is?: Maybe<Scalars['String']>;
  adm0A3Un?: Maybe<Scalars['Int']>;
  adm0A3Us?: Maybe<Scalars['String']>;
  adm0A3Wb?: Maybe<Scalars['Int']>;
  adm0Dif?: Maybe<Scalars['Int']>;
  admin?: Maybe<Scalars['String']>;
  brkA3?: Maybe<Scalars['String']>;
  brkDiff?: Maybe<Scalars['Int']>;
  brkGroup?: Maybe<Scalars['String']>;
  brkName?: Maybe<Scalars['String']>;
  continent?: Maybe<Scalars['String']>;
  economy?: Maybe<Scalars['String']>;
  featurecla?: Maybe<Scalars['String']>;
  fips10_?: Maybe<Scalars['String']>;
  formalEn?: Maybe<Scalars['String']>;
  formalFr?: Maybe<Scalars['String']>;
  gdpMdEst?: Maybe<Scalars['Int']>;
  gdpYear?: Maybe<Scalars['Int']>;
  geometry?: Maybe<GeometryInterface>;
  geouDif?: Maybe<Scalars['Int']>;
  geounit?: Maybe<Scalars['String']>;
  guA3?: Maybe<Scalars['String']>;
  homepart?: Maybe<Scalars['Int']>;
  id: Scalars['String'];
  incomeGrp?: Maybe<Scalars['String']>;
  isoA2?: Maybe<Scalars['String']>;
  isoA3?: Maybe<Scalars['String']>;
  isoA3Eh?: Maybe<Scalars['String']>;
  isoN3?: Maybe<Scalars['Int']>;
  labelrank?: Maybe<Scalars['Int']>;
  lastcensus?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
  longLen?: Maybe<Scalars['Int']>;
  mapcolor7?: Maybe<Scalars['Int']>;
  mapcolor8?: Maybe<Scalars['Int']>;
  mapcolor9?: Maybe<Scalars['Int']>;
  mapcolor13?: Maybe<Scalars['Int']>;
  maxLabel?: Maybe<Scalars['Int']>;
  minLabel?: Maybe<Scalars['Int']>;
  minZoom?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  nameAlt?: Maybe<Scalars['String']>;
  nameCiawf?: Maybe<Scalars['String']>;
  nameLen?: Maybe<Scalars['Int']>;
  nameLong?: Maybe<Scalars['String']>;
  nameSort?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  noteAdm0?: Maybe<Scalars['String']>;
  noteBrk?: Maybe<Scalars['String']>;
  popEst?: Maybe<Scalars['Int']>;
  popRank?: Maybe<Scalars['Int']>;
  popYear?: Maybe<Scalars['Int']>;
  postal?: Maybe<Scalars['String']>;
  regionUn?: Maybe<Scalars['String']>;
  regionWb?: Maybe<Scalars['String']>;
  scalerank?: Maybe<Scalars['Int']>;
  sovA3?: Maybe<Scalars['String']>;
  sovereignt?: Maybe<Scalars['String']>;
  suA3?: Maybe<Scalars['String']>;
  suDif?: Maybe<Scalars['Int']>;
  subregion?: Maybe<Scalars['String']>;
  subunit?: Maybe<Scalars['String']>;
  tiny?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  unA3?: Maybe<Scalars['Int']>;
  wbA2?: Maybe<Scalars['String']>;
  wbA3?: Maybe<Scalars['String']>;
  wikipedia?: Maybe<Scalars['Int']>;
  woeId?: Maybe<Scalars['Int']>;
  woeIdEh?: Maybe<Scalars['Int']>;
  woeNote?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `NeCountry` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type NeCountryCondition = {
  /** Checks for equality with the object’s `abbrev` field. */
  abbrev?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `abbrevLen` field. */
  abbrevLen?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `adm0A3` field. */
  adm0A3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `adm0A3Is` field. */
  adm0A3Is?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `adm0A3Un` field. */
  adm0A3Un?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `adm0A3Us` field. */
  adm0A3Us?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `adm0A3Wb` field. */
  adm0A3Wb?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `adm0Dif` field. */
  adm0Dif?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `admin` field. */
  admin?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `brkA3` field. */
  brkA3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `brkDiff` field. */
  brkDiff?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `brkGroup` field. */
  brkGroup?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `brkName` field. */
  brkName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `continent` field. */
  continent?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `economy` field. */
  economy?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `featurecla` field. */
  featurecla?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `fips10_` field. */
  fips10_?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `formalEn` field. */
  formalEn?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `formalFr` field. */
  formalFr?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `gdpMdEst` field. */
  gdpMdEst?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `gdpYear` field. */
  gdpYear?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `geometry` field. */
  geometry?: InputMaybe<Scalars['GeoJSON']>;
  /** Checks for equality with the object’s `geouDif` field. */
  geouDif?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `geounit` field. */
  geounit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `guA3` field. */
  guA3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `homepart` field. */
  homepart?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `incomeGrp` field. */
  incomeGrp?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isoA2` field. */
  isoA2?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isoA3` field. */
  isoA3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isoA3Eh` field. */
  isoA3Eh?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isoN3` field. */
  isoN3?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `labelrank` field. */
  labelrank?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `lastcensus` field. */
  lastcensus?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `level` field. */
  level?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `longLen` field. */
  longLen?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `mapcolor7` field. */
  mapcolor7?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `mapcolor8` field. */
  mapcolor8?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `mapcolor9` field. */
  mapcolor9?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `mapcolor13` field. */
  mapcolor13?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `maxLabel` field. */
  maxLabel?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `minLabel` field. */
  minLabel?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `minZoom` field. */
  minZoom?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `nameAlt` field. */
  nameAlt?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `nameCiawf` field. */
  nameCiawf?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `nameLen` field. */
  nameLen?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `nameLong` field. */
  nameLong?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `nameSort` field. */
  nameSort?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `noteAdm0` field. */
  noteAdm0?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `noteBrk` field. */
  noteBrk?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `popEst` field. */
  popEst?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `popRank` field. */
  popRank?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `popYear` field. */
  popYear?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `postal` field. */
  postal?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `regionUn` field. */
  regionUn?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `regionWb` field. */
  regionWb?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `scalerank` field. */
  scalerank?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sovA3` field. */
  sovA3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `sovereignt` field. */
  sovereignt?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `suA3` field. */
  suA3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `suDif` field. */
  suDif?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `subregion` field. */
  subregion?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `subunit` field. */
  subunit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `tiny` field. */
  tiny?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `type` field. */
  type?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `unA3` field. */
  unA3?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `wbA2` field. */
  wbA2?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `wbA3` field. */
  wbA3?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `wikipedia` field. */
  wikipedia?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `woeId` field. */
  woeId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `woeIdEh` field. */
  woeIdEh?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `woeNote` field. */
  woeNote?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `NeCountry` object types. All fields are combined with a logical ‘and.’ */
export type NeCountryFilter = {
  /** Filter by the object’s `abbrev` field. */
  abbrev?: InputMaybe<StringFilter>;
  /** Filter by the object’s `abbrevLen` field. */
  abbrevLen?: InputMaybe<IntFilter>;
  /** Filter by the object’s `adm0A3` field. */
  adm0A3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `adm0A3Is` field. */
  adm0A3Is?: InputMaybe<StringFilter>;
  /** Filter by the object’s `adm0A3Un` field. */
  adm0A3Un?: InputMaybe<IntFilter>;
  /** Filter by the object’s `adm0A3Us` field. */
  adm0A3Us?: InputMaybe<StringFilter>;
  /** Filter by the object’s `adm0A3Wb` field. */
  adm0A3Wb?: InputMaybe<IntFilter>;
  /** Filter by the object’s `adm0Dif` field. */
  adm0Dif?: InputMaybe<IntFilter>;
  /** Filter by the object’s `admin` field. */
  admin?: InputMaybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<NeCountryFilter>>;
  /** Filter by the object’s `brkA3` field. */
  brkA3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `brkDiff` field. */
  brkDiff?: InputMaybe<IntFilter>;
  /** Filter by the object’s `brkGroup` field. */
  brkGroup?: InputMaybe<StringFilter>;
  /** Filter by the object’s `brkName` field. */
  brkName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `continent` field. */
  continent?: InputMaybe<StringFilter>;
  /** Filter by the object’s `economy` field. */
  economy?: InputMaybe<StringFilter>;
  /** Filter by the object’s `featurecla` field. */
  featurecla?: InputMaybe<StringFilter>;
  /** Filter by the object’s `fips10_` field. */
  fips10_?: InputMaybe<StringFilter>;
  /** Filter by the object’s `formalEn` field. */
  formalEn?: InputMaybe<StringFilter>;
  /** Filter by the object’s `formalFr` field. */
  formalFr?: InputMaybe<StringFilter>;
  /** Filter by the object’s `gdpMdEst` field. */
  gdpMdEst?: InputMaybe<IntFilter>;
  /** Filter by the object’s `gdpYear` field. */
  gdpYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `geouDif` field. */
  geouDif?: InputMaybe<IntFilter>;
  /** Filter by the object’s `geounit` field. */
  geounit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `guA3` field. */
  guA3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `homepart` field. */
  homepart?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<StringFilter>;
  /** Filter by the object’s `incomeGrp` field. */
  incomeGrp?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isoA2` field. */
  isoA2?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isoA3` field. */
  isoA3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isoA3Eh` field. */
  isoA3Eh?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isoN3` field. */
  isoN3?: InputMaybe<IntFilter>;
  /** Filter by the object’s `labelrank` field. */
  labelrank?: InputMaybe<IntFilter>;
  /** Filter by the object’s `lastcensus` field. */
  lastcensus?: InputMaybe<IntFilter>;
  /** Filter by the object’s `level` field. */
  level?: InputMaybe<IntFilter>;
  /** Filter by the object’s `longLen` field. */
  longLen?: InputMaybe<IntFilter>;
  /** Filter by the object’s `mapcolor7` field. */
  mapcolor7?: InputMaybe<IntFilter>;
  /** Filter by the object’s `mapcolor8` field. */
  mapcolor8?: InputMaybe<IntFilter>;
  /** Filter by the object’s `mapcolor9` field. */
  mapcolor9?: InputMaybe<IntFilter>;
  /** Filter by the object’s `mapcolor13` field. */
  mapcolor13?: InputMaybe<IntFilter>;
  /** Filter by the object’s `maxLabel` field. */
  maxLabel?: InputMaybe<IntFilter>;
  /** Filter by the object’s `minLabel` field. */
  minLabel?: InputMaybe<IntFilter>;
  /** Filter by the object’s `minZoom` field. */
  minZoom?: InputMaybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `nameAlt` field. */
  nameAlt?: InputMaybe<StringFilter>;
  /** Filter by the object’s `nameCiawf` field. */
  nameCiawf?: InputMaybe<StringFilter>;
  /** Filter by the object’s `nameLen` field. */
  nameLen?: InputMaybe<IntFilter>;
  /** Filter by the object’s `nameLong` field. */
  nameLong?: InputMaybe<StringFilter>;
  /** Filter by the object’s `nameSort` field. */
  nameSort?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<NeCountryFilter>;
  /** Filter by the object’s `noteAdm0` field. */
  noteAdm0?: InputMaybe<StringFilter>;
  /** Filter by the object’s `noteBrk` field. */
  noteBrk?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<NeCountryFilter>>;
  /** Filter by the object’s `popEst` field. */
  popEst?: InputMaybe<IntFilter>;
  /** Filter by the object’s `popRank` field. */
  popRank?: InputMaybe<IntFilter>;
  /** Filter by the object’s `popYear` field. */
  popYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `postal` field. */
  postal?: InputMaybe<StringFilter>;
  /** Filter by the object’s `regionUn` field. */
  regionUn?: InputMaybe<StringFilter>;
  /** Filter by the object’s `regionWb` field. */
  regionWb?: InputMaybe<StringFilter>;
  /** Filter by the object’s `scalerank` field. */
  scalerank?: InputMaybe<IntFilter>;
  /** Filter by the object’s `sovA3` field. */
  sovA3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sovereignt` field. */
  sovereignt?: InputMaybe<StringFilter>;
  /** Filter by the object’s `suA3` field. */
  suA3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `suDif` field. */
  suDif?: InputMaybe<IntFilter>;
  /** Filter by the object’s `subregion` field. */
  subregion?: InputMaybe<StringFilter>;
  /** Filter by the object’s `subunit` field. */
  subunit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tiny` field. */
  tiny?: InputMaybe<IntFilter>;
  /** Filter by the object’s `type` field. */
  type?: InputMaybe<StringFilter>;
  /** Filter by the object’s `unA3` field. */
  unA3?: InputMaybe<IntFilter>;
  /** Filter by the object’s `wbA2` field. */
  wbA2?: InputMaybe<StringFilter>;
  /** Filter by the object’s `wbA3` field. */
  wbA3?: InputMaybe<StringFilter>;
  /** Filter by the object’s `wikipedia` field. */
  wikipedia?: InputMaybe<IntFilter>;
  /** Filter by the object’s `woeId` field. */
  woeId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `woeIdEh` field. */
  woeIdEh?: InputMaybe<IntFilter>;
  /** Filter by the object’s `woeNote` field. */
  woeNote?: InputMaybe<StringFilter>;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

export type Page = Node & {
  __typename?: 'Page';
  id: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  slug: Scalars['String'];
  title?: Maybe<Scalars['JSON']>;
};

/** A condition to be used against `Page` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `slug` field. */
  slug?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `title` field. */
  title?: InputMaybe<Scalars['JSON']>;
};

/** A filter to be used against `Page` object types. All fields are combined with a logical ‘and.’ */
export type PageFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PageFilter>>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PageFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PageFilter>>;
  /** Filter by the object’s `slug` field. */
  slug?: InputMaybe<StringFilter>;
  /** Filter by the object’s `title` field. */
  title?: InputMaybe<JsonFilter>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** A connection to a list of `Page` values. */
export type PagesConnection = {
  __typename?: 'PagesConnection';
  /** A list of edges which contains the `Page` and cursor to aid in pagination. */
  edges: Array<PagesEdge>;
  /** A list of `Page` objects. */
  nodes: Array<Maybe<Page>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Page` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Page` edge in the connection. */
export type PagesEdge = {
  __typename?: 'PagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Page` at the end of the edge. */
  node?: Maybe<Page>;
};

/** Methods to use when ordering `Page`. */
export enum PagesOrderBy {
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  SlugAsc = 'SLUG_ASC',
  SlugDesc = 'SLUG_DESC',
  TitleAsc = 'TITLE_ASC',
  TitleDesc = 'TITLE_DESC'
}

export type PrefixConversion = Node & {
  __typename?: 'PrefixConversion';
  factor: Scalars['Float'];
  fromPrefix: Scalars['String'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  toPrefix: Scalars['String'];
};

/**
 * A condition to be used against `PrefixConversion` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type PrefixConversionCondition = {
  /** Checks for equality with the object’s `factor` field. */
  factor?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `fromPrefix` field. */
  fromPrefix?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `toPrefix` field. */
  toPrefix?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `PrefixConversion` object types. All fields are combined with a logical ‘and.’ */
export type PrefixConversionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<PrefixConversionFilter>>;
  /** Filter by the object’s `factor` field. */
  factor?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `fromPrefix` field. */
  fromPrefix?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<PrefixConversionFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<PrefixConversionFilter>>;
  /** Filter by the object’s `toPrefix` field. */
  toPrefix?: InputMaybe<StringFilter>;
};

/** A connection to a list of `PrefixConversion` values. */
export type PrefixConversionsConnection = {
  __typename?: 'PrefixConversionsConnection';
  /** A list of edges which contains the `PrefixConversion` and cursor to aid in pagination. */
  edges: Array<PrefixConversionsEdge>;
  /** A list of `PrefixConversion` objects. */
  nodes: Array<Maybe<PrefixConversion>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PrefixConversion` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `PrefixConversion` edge in the connection. */
export type PrefixConversionsEdge = {
  __typename?: 'PrefixConversionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PrefixConversion` at the end of the edge. */
  node?: Maybe<PrefixConversion>;
};

/** Methods to use when ordering `PrefixConversion`. */
export enum PrefixConversionsOrderBy {
  FactorAsc = 'FACTOR_ASC',
  FactorDesc = 'FACTOR_DESC',
  FromPrefixAsc = 'FROM_PREFIX_ASC',
  FromPrefixDesc = 'FROM_PREFIX_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ToPrefixAsc = 'TO_PREFIX_ASC',
  ToPrefixDesc = 'TO_PREFIX_DESC'
}

export type Production = {
  __typename?: 'Production';
  bottomHole?: Maybe<Scalars['String']>;
  gasProduction?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Int']>;
  oilProduction?: Maybe<Scalars['Float']>;
  position?: Maybe<GeometryInterface>;
  uwi?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `Production` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ProductionCondition = {
  /** Checks for equality with the object’s `bottomHole` field. */
  bottomHole?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `gasProduction` field. */
  gasProduction?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `oilProduction` field. */
  oilProduction?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `position` field. */
  position?: InputMaybe<Scalars['GeoJSON']>;
  /** Checks for equality with the object’s `uwi` field. */
  uwi?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Production` object types. All fields are combined with a logical ‘and.’ */
export type ProductionFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProductionFilter>>;
  /** Filter by the object’s `bottomHole` field. */
  bottomHole?: InputMaybe<StringFilter>;
  /** Filter by the object’s `gasProduction` field. */
  gasProduction?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProductionFilter>;
  /** Filter by the object’s `oilProduction` field. */
  oilProduction?: InputMaybe<FloatFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProductionFilter>>;
  /** Filter by the object’s `uwi` field. */
  uwi?: InputMaybe<StringFilter>;
};

/** A connection to a list of `Production` values. */
export type ProductionsConnection = {
  __typename?: 'ProductionsConnection';
  /** A list of edges which contains the `Production` and cursor to aid in pagination. */
  edges: Array<ProductionsEdge>;
  /** A list of `Production` objects. */
  nodes: Array<Maybe<Production>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Production` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Production` edge in the connection. */
export type ProductionsEdge = {
  __typename?: 'ProductionsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Production` at the end of the edge. */
  node?: Maybe<Production>;
};

/** Methods to use when ordering `Production`. */
export enum ProductionsOrderBy {
  BottomHoleAsc = 'BOTTOM_HOLE_ASC',
  BottomHoleDesc = 'BOTTOM_HOLE_DESC',
  GasProductionAsc = 'GAS_PRODUCTION_ASC',
  GasProductionDesc = 'GAS_PRODUCTION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  OilProductionAsc = 'OIL_PRODUCTION_ASC',
  OilProductionDesc = 'OIL_PRODUCTION_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  UwiAsc = 'UWI_ASC',
  UwiDesc = 'UWI_DESC'
}

export type Project = Node & {
  __typename?: 'Project';
  /** Reads and enables pagination through a set of `CalculationConstant`. */
  calculationConstants: CalculationConstantsConnection;
  /** Reads and enables pagination through a set of `ConversionConstant`. */
  conversionConstants: ConversionConstantsConnection;
  /** Reads a single `Country` that is related to this `Project`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  dataPointCount?: Maybe<Scalars['BigInt']>;
  dataYear?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  firstYear?: Maybe<Scalars['Int']>;
  fuels?: Maybe<Array<Maybe<Scalars['String']>>>;
  geoPosition?: Maybe<GeometryInterface>;
  id: Scalars['Int'];
  iso3166?: Maybe<Scalars['String']>;
  iso31662: Scalars['String'];
  lastYear?: Maybe<Scalars['Int']>;
  linkUrl?: Maybe<Scalars['String']>;
  locationName?: Maybe<Scalars['String']>;
  methaneM3Ton?: Maybe<Scalars['Float']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  ocOperatorId?: Maybe<Scalars['String']>;
  operatorName?: Maybe<Scalars['String']>;
  productionCo2E: Scalars['Float'];
  productionMethod?: Maybe<Scalars['String']>;
  productionType?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `ProjectDataPoint`. */
  projectDataPoints: ProjectDataPointsConnection;
  projectIdentifier?: Maybe<Scalars['String']>;
  projectType: ProjectType;
  region?: Maybe<Scalars['String']>;
  sourceProjectId?: Maybe<Scalars['String']>;
  sourceProjectName?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  visible: Scalars['Boolean'];
};


export type ProjectCalculationConstantsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CalculationConstantCondition>;
  filter?: InputMaybe<CalculationConstantFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CalculationConstantsOrderBy>>;
};


export type ProjectConversionConstantsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ConversionConstantCondition>;
  filter?: InputMaybe<ConversionConstantFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ConversionConstantsOrderBy>>;
};


export type ProjectProjectDataPointsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProjectDataPointCondition>;
  filter?: InputMaybe<ProjectDataPointFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectDataPointsOrderBy>>;
};

/** A condition to be used against `Project` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ProjectCondition = {
  /** Checks for equality with the object’s `dataYear` field. */
  dataYear?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `geoPosition` field. */
  geoPosition?: InputMaybe<Scalars['GeoJSON']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `iso3166` field. */
  iso3166?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `iso31662` field. */
  iso31662?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `linkUrl` field. */
  linkUrl?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `locationName` field. */
  locationName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `methaneM3Ton` field. */
  methaneM3Ton?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `ocOperatorId` field. */
  ocOperatorId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `operatorName` field. */
  operatorName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `productionCo2E` field. */
  productionCo2E?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `productionMethod` field. */
  productionMethod?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `productionType` field. */
  productionType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectIdentifier` field. */
  projectIdentifier?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectType` field. */
  projectType?: InputMaybe<ProjectType>;
  /** Checks for equality with the object’s `region` field. */
  region?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `sourceProjectId` field. */
  sourceProjectId?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `sourceProjectName` field. */
  sourceProjectName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `tags` field. */
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Checks for equality with the object’s `visible` field. */
  visible?: InputMaybe<Scalars['Boolean']>;
};

export type ProjectDataPoint = Node & {
  __typename?: 'ProjectDataPoint';
  dataType: DataPointType;
  dataYear?: Maybe<Scalars['Int']>;
  fossilFuelType?: Maybe<Scalars['String']>;
  grade?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  /** Reads a single `Project` that is related to this `ProjectDataPoint`. */
  project?: Maybe<Project>;
  projectId: Scalars['Int'];
  quality?: Maybe<Scalars['Int']>;
  sourceId?: Maybe<Scalars['Int']>;
  subtype?: Maybe<Scalars['String']>;
  unit?: Maybe<Scalars['String']>;
  volume?: Maybe<Scalars['Float']>;
  year?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `ProjectDataPoint` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ProjectDataPointCondition = {
  /** Checks for equality with the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointType>;
  /** Checks for equality with the object’s `dataYear` field. */
  dataYear?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `grade` field. */
  grade?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `projectId` field. */
  projectId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `quality` field. */
  quality?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `subtype` field. */
  subtype?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `unit` field. */
  unit?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `volume` field. */
  volume?: InputMaybe<Scalars['Float']>;
  /** Checks for equality with the object’s `year` field. */
  year?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `ProjectDataPoint` object types. All fields are combined with a logical ‘and.’ */
export type ProjectDataPointFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectDataPointFilter>>;
  /** Filter by the object’s `dataType` field. */
  dataType?: InputMaybe<DataPointTypeFilter>;
  /** Filter by the object’s `dataYear` field. */
  dataYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `fossilFuelType` field. */
  fossilFuelType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `grade` field. */
  grade?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectDataPointFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectDataPointFilter>>;
  /** Filter by the object’s `project` relation. */
  project?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `projectId` field. */
  projectId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `quality` field. */
  quality?: InputMaybe<IntFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `subtype` field. */
  subtype?: InputMaybe<StringFilter>;
  /** Filter by the object’s `unit` field. */
  unit?: InputMaybe<StringFilter>;
  /** Filter by the object’s `volume` field. */
  volume?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `year` field. */
  year?: InputMaybe<IntFilter>;
};

/** An input for mutations affecting `ProjectDataPoint` */
export type ProjectDataPointInput = {
  dataType: DataPointType;
  dataYear?: InputMaybe<Scalars['Int']>;
  fossilFuelType?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  projectId: Scalars['Int'];
  quality?: InputMaybe<Scalars['Int']>;
  sourceId?: InputMaybe<Scalars['Int']>;
  subtype?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** Represents an update to a `ProjectDataPoint`. Fields that are set will be updated. */
export type ProjectDataPointPatch = {
  dataType?: InputMaybe<DataPointType>;
  dataYear?: InputMaybe<Scalars['Int']>;
  fossilFuelType?: InputMaybe<Scalars['String']>;
  grade?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  projectId?: InputMaybe<Scalars['Int']>;
  quality?: InputMaybe<Scalars['Int']>;
  sourceId?: InputMaybe<Scalars['Int']>;
  subtype?: InputMaybe<Scalars['String']>;
  unit?: InputMaybe<Scalars['String']>;
  volume?: InputMaybe<Scalars['Float']>;
  year?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `ProjectDataPoint` values. */
export type ProjectDataPointsConnection = {
  __typename?: 'ProjectDataPointsConnection';
  /** A list of edges which contains the `ProjectDataPoint` and cursor to aid in pagination. */
  edges: Array<ProjectDataPointsEdge>;
  /** A list of `ProjectDataPoint` objects. */
  nodes: Array<Maybe<ProjectDataPoint>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ProjectDataPoint` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ProjectDataPoint` edge in the connection. */
export type ProjectDataPointsEdge = {
  __typename?: 'ProjectDataPointsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ProjectDataPoint` at the end of the edge. */
  node?: Maybe<ProjectDataPoint>;
};

/** Methods to use when ordering `ProjectDataPoint`. */
export enum ProjectDataPointsOrderBy {
  DataTypeAsc = 'DATA_TYPE_ASC',
  DataTypeDesc = 'DATA_TYPE_DESC',
  DataYearAsc = 'DATA_YEAR_ASC',
  DataYearDesc = 'DATA_YEAR_DESC',
  FossilFuelTypeAsc = 'FOSSIL_FUEL_TYPE_ASC',
  FossilFuelTypeDesc = 'FOSSIL_FUEL_TYPE_DESC',
  GradeAsc = 'GRADE_ASC',
  GradeDesc = 'GRADE_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProjectIdAsc = 'PROJECT_ID_ASC',
  ProjectIdDesc = 'PROJECT_ID_DESC',
  QualityAsc = 'QUALITY_ASC',
  QualityDesc = 'QUALITY_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  SubtypeAsc = 'SUBTYPE_ASC',
  SubtypeDesc = 'SUBTYPE_DESC',
  UnitAsc = 'UNIT_ASC',
  UnitDesc = 'UNIT_DESC',
  VolumeAsc = 'VOLUME_ASC',
  VolumeDesc = 'VOLUME_DESC',
  YearAsc = 'YEAR_ASC',
  YearDesc = 'YEAR_DESC'
}

/** A filter to be used against `Project` object types. All fields are combined with a logical ‘and.’ */
export type ProjectFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `calculationConstants` relation. */
  calculationConstants?: InputMaybe<ProjectToManyCalculationConstantFilter>;
  /** Some related `calculationConstants` exist. */
  calculationConstantsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `conversionConstants` relation. */
  conversionConstants?: InputMaybe<ProjectToManyConversionConstantFilter>;
  /** Some related `conversionConstants` exist. */
  conversionConstantsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `countryByIso3166AndIso31662` relation. */
  countryByIso3166AndIso31662?: InputMaybe<CountryFilter>;
  /** A related `countryByIso3166AndIso31662` exists. */
  countryByIso3166AndIso31662Exists?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `dataPointCount` field. */
  dataPointCount?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `dataYear` field. */
  dataYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `firstYear` field. */
  firstYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `fuels` field. */
  fuels?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `iso3166` field. */
  iso3166?: InputMaybe<StringFilter>;
  /** Filter by the object’s `iso31662` field. */
  iso31662?: InputMaybe<StringFilter>;
  /** Filter by the object’s `lastYear` field. */
  lastYear?: InputMaybe<IntFilter>;
  /** Filter by the object’s `linkUrl` field. */
  linkUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `locationName` field. */
  locationName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `methaneM3Ton` field. */
  methaneM3Ton?: InputMaybe<FloatFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ProjectFilter>;
  /** Filter by the object’s `ocOperatorId` field. */
  ocOperatorId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `operatorName` field. */
  operatorName?: InputMaybe<StringFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ProjectFilter>>;
  /** Filter by the object’s `productionCo2E` field. */
  productionCo2E?: InputMaybe<FloatFilter>;
  /** Filter by the object’s `productionMethod` field. */
  productionMethod?: InputMaybe<StringFilter>;
  /** Filter by the object’s `productionType` field. */
  productionType?: InputMaybe<StringFilter>;
  /** Filter by the object’s `projectDataPoints` relation. */
  projectDataPoints?: InputMaybe<ProjectToManyProjectDataPointFilter>;
  /** Some related `projectDataPoints` exist. */
  projectDataPointsExist?: InputMaybe<Scalars['Boolean']>;
  /** Filter by the object’s `projectIdentifier` field. */
  projectIdentifier?: InputMaybe<StringFilter>;
  /** Filter by the object’s `projectType` field. */
  projectType?: InputMaybe<ProjectTypeFilter>;
  /** Filter by the object’s `region` field. */
  region?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sourceProjectId` field. */
  sourceProjectId?: InputMaybe<StringFilter>;
  /** Filter by the object’s `sourceProjectName` field. */
  sourceProjectName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `tags` field. */
  tags?: InputMaybe<StringListFilter>;
  /** Filter by the object’s `visible` field. */
  visible?: InputMaybe<BooleanFilter>;
};

/** An input for mutations affecting `Project` */
export type ProjectInput = {
  dataYear?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  geoPosition?: InputMaybe<Scalars['GeoJSON']>;
  id?: InputMaybe<Scalars['Int']>;
  iso3166?: InputMaybe<Scalars['String']>;
  iso31662?: InputMaybe<Scalars['String']>;
  linkUrl?: InputMaybe<Scalars['String']>;
  locationName?: InputMaybe<Scalars['String']>;
  methaneM3Ton?: InputMaybe<Scalars['Float']>;
  ocOperatorId?: InputMaybe<Scalars['String']>;
  operatorName?: InputMaybe<Scalars['String']>;
  productionCo2E?: InputMaybe<Scalars['Float']>;
  productionMethod?: InputMaybe<Scalars['String']>;
  productionType?: InputMaybe<Scalars['String']>;
  projectIdentifier?: InputMaybe<Scalars['String']>;
  projectType?: InputMaybe<ProjectType>;
  region?: InputMaybe<Scalars['String']>;
  sourceProjectId?: InputMaybe<Scalars['String']>;
  sourceProjectName?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

/** Represents an update to a `Project`. Fields that are set will be updated. */
export type ProjectPatch = {
  dataYear?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  geoPosition?: InputMaybe<Scalars['GeoJSON']>;
  id?: InputMaybe<Scalars['Int']>;
  iso3166?: InputMaybe<Scalars['String']>;
  iso31662?: InputMaybe<Scalars['String']>;
  linkUrl?: InputMaybe<Scalars['String']>;
  locationName?: InputMaybe<Scalars['String']>;
  methaneM3Ton?: InputMaybe<Scalars['Float']>;
  ocOperatorId?: InputMaybe<Scalars['String']>;
  operatorName?: InputMaybe<Scalars['String']>;
  productionCo2E?: InputMaybe<Scalars['Float']>;
  productionMethod?: InputMaybe<Scalars['String']>;
  productionType?: InputMaybe<Scalars['String']>;
  projectIdentifier?: InputMaybe<Scalars['String']>;
  projectType?: InputMaybe<ProjectType>;
  region?: InputMaybe<Scalars['String']>;
  sourceProjectId?: InputMaybe<Scalars['String']>;
  sourceProjectName?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  visible?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against many `CalculationConstant` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyCalculationConstantFilter = {
  /** Every related `CalculationConstant` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<CalculationConstantFilter>;
  /** No related `CalculationConstant` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<CalculationConstantFilter>;
  /** Some related `CalculationConstant` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<CalculationConstantFilter>;
};

/** A filter to be used against many `ConversionConstant` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyConversionConstantFilter = {
  /** Every related `ConversionConstant` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ConversionConstantFilter>;
  /** No related `ConversionConstant` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ConversionConstantFilter>;
  /** Some related `ConversionConstant` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ConversionConstantFilter>;
};

/** A filter to be used against many `ProjectDataPoint` object types. All fields are combined with a logical ‘and.’ */
export type ProjectToManyProjectDataPointFilter = {
  /** Every related `ProjectDataPoint` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  every?: InputMaybe<ProjectDataPointFilter>;
  /** No related `ProjectDataPoint` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  none?: InputMaybe<ProjectDataPointFilter>;
  /** Some related `ProjectDataPoint` matches the filter criteria. All fields are combined with a logical ‘and.’ */
  some?: InputMaybe<ProjectDataPointFilter>;
};

export enum ProjectType {
  Dense = 'DENSE',
  Sparse = 'SPARSE'
}

/** A filter to be used against ProjectType fields. All fields are combined with a logical ‘and.’ */
export type ProjectTypeFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<ProjectType>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<ProjectType>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A connection to a list of `Project` values. */
export type ProjectsConnection = {
  __typename?: 'ProjectsConnection';
  /** A list of edges which contains the `Project` and cursor to aid in pagination. */
  edges: Array<ProjectsEdge>;
  /** A list of `Project` objects. */
  nodes: Array<Maybe<Project>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Project` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Project` edge in the connection. */
export type ProjectsEdge = {
  __typename?: 'ProjectsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Project` at the end of the edge. */
  node?: Maybe<Project>;
};

/** Methods to use when ordering `Project`. */
export enum ProjectsOrderBy {
  DataYearAsc = 'DATA_YEAR_ASC',
  DataYearDesc = 'DATA_YEAR_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  GeoPositionAsc = 'GEO_POSITION_ASC',
  GeoPositionDesc = 'GEO_POSITION_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Iso3166_2Asc = 'ISO3166_2_ASC',
  Iso3166_2Desc = 'ISO3166_2_DESC',
  Iso3166Asc = 'ISO3166_ASC',
  Iso3166Desc = 'ISO3166_DESC',
  LinkUrlAsc = 'LINK_URL_ASC',
  LinkUrlDesc = 'LINK_URL_DESC',
  LocationNameAsc = 'LOCATION_NAME_ASC',
  LocationNameDesc = 'LOCATION_NAME_DESC',
  MethaneM3TonAsc = 'METHANE_M3_TON_ASC',
  MethaneM3TonDesc = 'METHANE_M3_TON_DESC',
  Natural = 'NATURAL',
  OcOperatorIdAsc = 'OC_OPERATOR_ID_ASC',
  OcOperatorIdDesc = 'OC_OPERATOR_ID_DESC',
  OperatorNameAsc = 'OPERATOR_NAME_ASC',
  OperatorNameDesc = 'OPERATOR_NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  ProductionCo2EAsc = 'PRODUCTION_CO2E_ASC',
  ProductionCo2EDesc = 'PRODUCTION_CO2E_DESC',
  ProductionMethodAsc = 'PRODUCTION_METHOD_ASC',
  ProductionMethodDesc = 'PRODUCTION_METHOD_DESC',
  ProductionTypeAsc = 'PRODUCTION_TYPE_ASC',
  ProductionTypeDesc = 'PRODUCTION_TYPE_DESC',
  ProjectIdentifierAsc = 'PROJECT_IDENTIFIER_ASC',
  ProjectIdentifierDesc = 'PROJECT_IDENTIFIER_DESC',
  ProjectTypeAsc = 'PROJECT_TYPE_ASC',
  ProjectTypeDesc = 'PROJECT_TYPE_DESC',
  RegionAsc = 'REGION_ASC',
  RegionDesc = 'REGION_DESC',
  SourceProjectIdAsc = 'SOURCE_PROJECT_ID_ASC',
  SourceProjectIdDesc = 'SOURCE_PROJECT_ID_DESC',
  SourceProjectNameAsc = 'SOURCE_PROJECT_NAME_ASC',
  SourceProjectNameDesc = 'SOURCE_PROJECT_NAME_DESC',
  TagsAsc = 'TAGS_ASC',
  TagsDesc = 'TAGS_DESC',
  VisibleAsc = 'VISIBLE_ASC',
  VisibleDesc = 'VISIBLE_DESC'
}

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  calculationConstant?: Maybe<CalculationConstant>;
  calculationConstantByConstantTypeAndAuthorityAndFossilFuelTypeAndModifierAndSubtypeAndCountryAndProjectId?: Maybe<CalculationConstant>;
  /** Reads a single `CalculationConstant` using its globally unique `ID`. */
  calculationConstantByNodeId?: Maybe<CalculationConstant>;
  /** Reads and enables pagination through a set of `CalculationConstant`. */
  calculationConstants?: Maybe<CalculationConstantsConnection>;
  co2Cost?: Maybe<Co2Cost>;
  /** Reads a single `Co2Cost` using its globally unique `ID`. */
  co2CostByNodeId?: Maybe<Co2Cost>;
  /** Reads and enables pagination through a set of `Co2Cost`. */
  co2Costs?: Maybe<Co2CostsConnection>;
  conversionConstant?: Maybe<ConversionConstant>;
  /** Reads a single `ConversionConstant` using its globally unique `ID`. */
  conversionConstantByNodeId?: Maybe<ConversionConstant>;
  /** Reads and enables pagination through a set of `ConversionConstant`. */
  conversionConstants?: Maybe<ConversionConstantsConnection>;
  countCountries?: Maybe<Scalars['BigInt']>;
  /** Reads and enables pagination through a set of `Country`. */
  countries?: Maybe<CountriesConnection>;
  country?: Maybe<Country>;
  /** Reads a single `Country` using its globally unique `ID`. */
  countryByNodeId?: Maybe<Country>;
  /** Reads and enables pagination through a set of `CountryCount`. */
  countryCounts?: Maybe<CountryCountsConnection>;
  countryDataPoint?: Maybe<CountryDataPoint>;
  /** Reads a single `CountryDataPoint` using its globally unique `ID`. */
  countryDataPointByNodeId?: Maybe<CountryDataPoint>;
  /** Reads and enables pagination through a set of `CountryDataPoint`. */
  countryDataPoints?: Maybe<CountryDataPointsConnection>;
  /** Reads and enables pagination through a set of `ExcelCountry`. */
  excelCountries?: Maybe<ExcelCountriesConnection>;
  /** Reads and enables pagination through a set of `ExcelProject`. */
  excelProjects?: Maybe<ExcelProjectsConnection>;
  /** Reads and enables pagination through a set of `Production`. */
  findProduction?: Maybe<ProductionsConnection>;
  /** Reads and enables pagination through a set of `Production`. */
  findProductionIn?: Maybe<ProductionsConnection>;
  getCountryCurrentProduction?: Maybe<GetCountryCurrentProductionConnection>;
  getCountrySources?: Maybe<GetCountrySourcesConnection>;
  getProducingIso3166?: Maybe<GetProducingIso3166Connection>;
  getProducingIso3166WithEmissions?: Maybe<GetProducingIso3166WithEmissionsConnection>;
  getProjectSources?: Maybe<GetProjectSourcesConnection>;
  getProjects?: Maybe<GetProjectsConnection>;
  /** Reads and enables pagination through a set of `NeCountry`. */
  neCountries?: Maybe<NeCountriesConnection>;
  neCountry?: Maybe<NeCountry>;
  /** Reads a single `NeCountry` using its globally unique `ID`. */
  neCountryByNodeId?: Maybe<NeCountry>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  page?: Maybe<Page>;
  /** Reads a single `Page` using its globally unique `ID`. */
  pageByNodeId?: Maybe<Page>;
  /** Reads and enables pagination through a set of `Page`. */
  pages?: Maybe<PagesConnection>;
  prefixConversion?: Maybe<PrefixConversion>;
  /** Reads a single `PrefixConversion` using its globally unique `ID`. */
  prefixConversionByNodeId?: Maybe<PrefixConversion>;
  /** Reads and enables pagination through a set of `PrefixConversion`. */
  prefixConversions?: Maybe<PrefixConversionsConnection>;
  /** Reads and enables pagination through a set of `Production`. */
  productions?: Maybe<ProductionsConnection>;
  project?: Maybe<Project>;
  /** Reads a single `Project` using its globally unique `ID`. */
  projectByNodeId?: Maybe<Project>;
  projectDataPoint?: Maybe<ProjectDataPoint>;
  /** Reads a single `ProjectDataPoint` using its globally unique `ID`. */
  projectDataPointByNodeId?: Maybe<ProjectDataPoint>;
  /** Reads and enables pagination through a set of `ProjectDataPoint`. */
  projectDataPoints?: Maybe<ProjectDataPointsConnection>;
  /** Reads and enables pagination through a set of `Project`. */
  projects?: Maybe<ProjectsConnection>;
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  source?: Maybe<Source>;
  /** Reads a single `Source` using its globally unique `ID`. */
  sourceByNodeId?: Maybe<Source>;
  /** Reads and enables pagination through a set of `SourceStatistic`. */
  sourceStatistics?: Maybe<SourceStatisticsConnection>;
  /** Reads and enables pagination through a set of `Source`. */
  sources?: Maybe<SourcesConnection>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCalculationConstantArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCalculationConstantByConstantTypeAndAuthorityAndFossilFuelTypeAndModifierAndSubtypeAndCountryAndProjectIdArgs = {
  authority: Scalars['String'];
  constantType: ConstantTypeEnum;
  country: Scalars['String'];
  fossilFuelType: Scalars['String'];
  modifier: ModifierEnum;
  projectId: Scalars['Int'];
  subtype: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCalculationConstantByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCalculationConstantsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CalculationConstantCondition>;
  filter?: InputMaybe<CalculationConstantFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CalculationConstantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCo2CostArgs = {
  costPerTon: Scalars['Int'];
  currency: Scalars['String'];
  source: Scalars['String'];
  year: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCo2CostByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCo2CostsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<Co2CostCondition>;
  filter?: InputMaybe<Co2CostFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<Co2CostsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryConversionConstantArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConversionConstantByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryConversionConstantsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ConversionConstantCondition>;
  filter?: InputMaybe<ConversionConstantFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ConversionConstantsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CountryCondition>;
  filter?: InputMaybe<CountryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CountriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryArgs = {
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryCountsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CountryCountCondition>;
  filter?: InputMaybe<CountryCountFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CountryCountsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryDataPointArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryDataPointByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCountryDataPointsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<CountryDataPointCondition>;
  filter?: InputMaybe<CountryDataPointFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CountryDataPointsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExcelCountriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ExcelCountryCondition>;
  filter?: InputMaybe<ExcelCountryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExcelCountriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExcelProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ExcelProjectCondition>;
  filter?: InputMaybe<ExcelProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ExcelProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFindProductionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  distance?: InputMaybe<Scalars['Float']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  nearLatitude?: InputMaybe<Scalars['Float']>;
  nearLongitude?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryFindProductionInArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  neLat?: InputMaybe<Scalars['Float']>;
  neLng?: InputMaybe<Scalars['Float']>;
  offset?: InputMaybe<Scalars['Int']>;
  swLat?: InputMaybe<Scalars['Float']>;
  swLng?: InputMaybe<Scalars['Float']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCountryCurrentProductionArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  iso3166_?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetCountrySourcesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  iso3166_?: InputMaybe<Scalars['String']>;
  iso31662_?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetProducingIso3166Args = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetProducingIso3166WithEmissionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetProjectSourcesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  forId?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGetProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  first?: InputMaybe<Scalars['Int']>;
  iso3166_?: InputMaybe<Scalars['String']>;
  iso31662_?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNeCountriesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<NeCountryCondition>;
  filter?: InputMaybe<NeCountryFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<NeCountriesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNeCountryArgs = {
  id: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNeCountryByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPageArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPageByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPagesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PageCondition>;
  filter?: InputMaybe<PageFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PagesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryPrefixConversionArgs = {
  factor: Scalars['Float'];
  fromPrefix: Scalars['String'];
  toPrefix: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPrefixConversionByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPrefixConversionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<PrefixConversionCondition>;
  filter?: InputMaybe<PrefixConversionFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<PrefixConversionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProductionsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProductionCondition>;
  filter?: InputMaybe<ProductionFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProductionsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectDataPointArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectDataPointByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectDataPointsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProjectDataPointCondition>;
  filter?: InputMaybe<ProjectDataPointFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectDataPointsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryProjectsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ProjectCondition>;
  filter?: InputMaybe<ProjectFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySourceArgs = {
  sourceId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySourceByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySourceStatisticsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SourceStatisticCondition>;
  filter?: InputMaybe<SourceStatisticFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SourceStatisticsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySourcesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<SourceCondition>;
  filter?: InputMaybe<SourceFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<SourcesOrderBy>>;
};

export type Source = Node & {
  __typename?: 'Source';
  dataPoints?: Maybe<Scalars['BigInt']>;
  description?: Maybe<Scalars['String']>;
  documentUrl?: Maybe<Scalars['String']>;
  isVisible: Scalars['Int'];
  isprocessed?: Maybe<Scalars['BitString']>;
  latestCurationAt?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  namePretty?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  records?: Maybe<Scalars['BigInt']>;
  sourceId: Scalars['Int'];
  url?: Maybe<Scalars['String']>;
};

/** A condition to be used against `Source` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type SourceCondition = {
  /** Checks for equality with the object’s `dataPoints` field. */
  dataPoints?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `documentUrl` field. */
  documentUrl?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isVisible` field. */
  isVisible?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `isprocessed` field. */
  isprocessed?: InputMaybe<Scalars['BitString']>;
  /** Checks for equality with the object’s `latestCurationAt` field. */
  latestCurationAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `namePretty` field. */
  namePretty?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `records` field. */
  records?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `Source` object types. All fields are combined with a logical ‘and.’ */
export type SourceFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SourceFilter>>;
  /** Filter by the object’s `dataPoints` field. */
  dataPoints?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `documentUrl` field. */
  documentUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isVisible` field. */
  isVisible?: InputMaybe<IntFilter>;
  /** Filter by the object’s `isprocessed` field. */
  isprocessed?: InputMaybe<BitStringFilter>;
  /** Filter by the object’s `latestCurationAt` field. */
  latestCurationAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Filter by the object’s `namePretty` field. */
  namePretty?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SourceFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SourceFilter>>;
  /** Filter by the object’s `records` field. */
  records?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `Source` */
export type SourceInput = {
  dataPoints?: InputMaybe<Scalars['BigInt']>;
  description?: InputMaybe<Scalars['String']>;
  documentUrl?: InputMaybe<Scalars['String']>;
  isVisible?: InputMaybe<Scalars['Int']>;
  isprocessed?: InputMaybe<Scalars['BitString']>;
  latestCurationAt?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
  namePretty?: InputMaybe<Scalars['String']>;
  records?: InputMaybe<Scalars['BigInt']>;
  sourceId?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `Source`. Fields that are set will be updated. */
export type SourcePatch = {
  dataPoints?: InputMaybe<Scalars['BigInt']>;
  description?: InputMaybe<Scalars['String']>;
  documentUrl?: InputMaybe<Scalars['String']>;
  isVisible?: InputMaybe<Scalars['Int']>;
  isprocessed?: InputMaybe<Scalars['BitString']>;
  latestCurationAt?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
  namePretty?: InputMaybe<Scalars['String']>;
  records?: InputMaybe<Scalars['BigInt']>;
  sourceId?: InputMaybe<Scalars['Int']>;
  url?: InputMaybe<Scalars['String']>;
};

export type SourceStatistic = {
  __typename?: 'SourceStatistic';
  dataRows?: Maybe<Scalars['BigInt']>;
  description?: Maybe<Scalars['String']>;
  documentUrl?: Maybe<Scalars['String']>;
  isprocessed?: Maybe<Scalars['BitString']>;
  namePretty?: Maybe<Scalars['String']>;
  projectCount?: Maybe<Scalars['BigInt']>;
  sourceId?: Maybe<Scalars['Int']>;
  url?: Maybe<Scalars['String']>;
};

/**
 * A condition to be used against `SourceStatistic` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SourceStatisticCondition = {
  /** Checks for equality with the object’s `dataRows` field. */
  dataRows?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `description` field. */
  description?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `documentUrl` field. */
  documentUrl?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `isprocessed` field. */
  isprocessed?: InputMaybe<Scalars['BitString']>;
  /** Checks for equality with the object’s `namePretty` field. */
  namePretty?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `projectCount` field. */
  projectCount?: InputMaybe<Scalars['BigInt']>;
  /** Checks for equality with the object’s `sourceId` field. */
  sourceId?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `url` field. */
  url?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `SourceStatistic` object types. All fields are combined with a logical ‘and.’ */
export type SourceStatisticFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<SourceStatisticFilter>>;
  /** Filter by the object’s `dataRows` field. */
  dataRows?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `description` field. */
  description?: InputMaybe<StringFilter>;
  /** Filter by the object’s `documentUrl` field. */
  documentUrl?: InputMaybe<StringFilter>;
  /** Filter by the object’s `isprocessed` field. */
  isprocessed?: InputMaybe<BitStringFilter>;
  /** Filter by the object’s `namePretty` field. */
  namePretty?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<SourceStatisticFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<SourceStatisticFilter>>;
  /** Filter by the object’s `projectCount` field. */
  projectCount?: InputMaybe<BigIntFilter>;
  /** Filter by the object’s `sourceId` field. */
  sourceId?: InputMaybe<IntFilter>;
  /** Filter by the object’s `url` field. */
  url?: InputMaybe<StringFilter>;
};

/** A connection to a list of `SourceStatistic` values. */
export type SourceStatisticsConnection = {
  __typename?: 'SourceStatisticsConnection';
  /** A list of edges which contains the `SourceStatistic` and cursor to aid in pagination. */
  edges: Array<SourceStatisticsEdge>;
  /** A list of `SourceStatistic` objects. */
  nodes: Array<Maybe<SourceStatistic>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SourceStatistic` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SourceStatistic` edge in the connection. */
export type SourceStatisticsEdge = {
  __typename?: 'SourceStatisticsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SourceStatistic` at the end of the edge. */
  node?: Maybe<SourceStatistic>;
};

/** Methods to use when ordering `SourceStatistic`. */
export enum SourceStatisticsOrderBy {
  DataRowsAsc = 'DATA_ROWS_ASC',
  DataRowsDesc = 'DATA_ROWS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DocumentUrlAsc = 'DOCUMENT_URL_ASC',
  DocumentUrlDesc = 'DOCUMENT_URL_DESC',
  IsprocessedAsc = 'ISPROCESSED_ASC',
  IsprocessedDesc = 'ISPROCESSED_DESC',
  NamePrettyAsc = 'NAME_PRETTY_ASC',
  NamePrettyDesc = 'NAME_PRETTY_DESC',
  Natural = 'NATURAL',
  ProjectCountAsc = 'PROJECT_COUNT_ASC',
  ProjectCountDesc = 'PROJECT_COUNT_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** A connection to a list of `Source` values. */
export type SourcesConnection = {
  __typename?: 'SourcesConnection';
  /** A list of edges which contains the `Source` and cursor to aid in pagination. */
  edges: Array<SourcesEdge>;
  /** A list of `Source` objects. */
  nodes: Array<Maybe<Source>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Source` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Source` edge in the connection. */
export type SourcesEdge = {
  __typename?: 'SourcesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Source` at the end of the edge. */
  node?: Maybe<Source>;
};

/** Methods to use when ordering `Source`. */
export enum SourcesOrderBy {
  DataPointsAsc = 'DATA_POINTS_ASC',
  DataPointsDesc = 'DATA_POINTS_DESC',
  DescriptionAsc = 'DESCRIPTION_ASC',
  DescriptionDesc = 'DESCRIPTION_DESC',
  DocumentUrlAsc = 'DOCUMENT_URL_ASC',
  DocumentUrlDesc = 'DOCUMENT_URL_DESC',
  IsprocessedAsc = 'ISPROCESSED_ASC',
  IsprocessedDesc = 'ISPROCESSED_DESC',
  IsVisibleAsc = 'IS_VISIBLE_ASC',
  IsVisibleDesc = 'IS_VISIBLE_DESC',
  LatestCurationAtAsc = 'LATEST_CURATION_AT_ASC',
  LatestCurationAtDesc = 'LATEST_CURATION_AT_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  NamePrettyAsc = 'NAME_PRETTY_ASC',
  NamePrettyDesc = 'NAME_PRETTY_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  RecordsAsc = 'RECORDS_ASC',
  RecordsDesc = 'RECORDS_DESC',
  SourceIdAsc = 'SOURCE_ID_ASC',
  SourceIdDesc = 'SOURCE_ID_DESC',
  UrlAsc = 'URL_ASC',
  UrlDesc = 'URL_DESC'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against String List fields. All fields are combined with a logical ‘and.’ */
export type StringListFilter = {
  /** Contains the specified list of values. */
  contains?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
};

/** All input for the `updateCo2CostByNodeId` mutation. */
export type UpdateCo2CostByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Co2Cost` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Co2Cost` being updated. */
  patch: Co2CostPatch;
};

/** All input for the `updateCo2Cost` mutation. */
export type UpdateCo2CostInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  costPerTon: Scalars['Int'];
  currency: Scalars['String'];
  /** An object where the defined keys will be set on the `Co2Cost` being updated. */
  patch: Co2CostPatch;
  source: Scalars['String'];
  year: Scalars['Int'];
};

/** The output of our update `Co2Cost` mutation. */
export type UpdateCo2CostPayload = {
  __typename?: 'UpdateCo2CostPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Co2Cost` that was updated by this mutation. */
  co2Cost?: Maybe<Co2Cost>;
  /** An edge for our `Co2Cost`. May be used by Relay 1. */
  co2CostEdge?: Maybe<Co2CostsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Co2Cost` mutation. */
export type UpdateCo2CostPayloadCo2CostEdgeArgs = {
  orderBy?: InputMaybe<Array<Co2CostsOrderBy>>;
};

/** All input for the `updateCountryByNodeId` mutation. */
export type UpdateCountryByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Country` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
};

/** All input for the `updateCountryDataPointByNodeId` mutation. */
export type UpdateCountryDataPointByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CountryDataPoint` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CountryDataPoint` being updated. */
  patch: CountryDataPointPatch;
};

/** All input for the `updateCountryDataPoint` mutation. */
export type UpdateCountryDataPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `CountryDataPoint` being updated. */
  patch: CountryDataPointPatch;
};

/** The output of our update `CountryDataPoint` mutation. */
export type UpdateCountryDataPointPayload = {
  __typename?: 'UpdateCountryDataPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `CountryDataPoint`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  /** The `CountryDataPoint` that was updated by this mutation. */
  countryDataPoint?: Maybe<CountryDataPoint>;
  /** An edge for our `CountryDataPoint`. May be used by Relay 1. */
  countryDataPointEdge?: Maybe<CountryDataPointsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `CountryDataPoint` mutation. */
export type UpdateCountryDataPointPayloadCountryDataPointEdgeArgs = {
  orderBy?: InputMaybe<Array<CountryDataPointsOrderBy>>;
};

/** All input for the `updateCountry` mutation. */
export type UpdateCountryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
  /** An object where the defined keys will be set on the `Country` being updated. */
  patch: CountryPatch;
};

/** The output of our update `Country` mutation. */
export type UpdateCountryPayload = {
  __typename?: 'UpdateCountryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Country` that was updated by this mutation. */
  country?: Maybe<Country>;
  /** An edge for our `Country`. May be used by Relay 1. */
  countryEdge?: Maybe<CountriesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Country` mutation. */
export type UpdateCountryPayloadCountryEdgeArgs = {
  orderBy?: InputMaybe<Array<CountriesOrderBy>>;
};

/** All input for the `updateProjectByNodeId` mutation. */
export type UpdateProjectByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Project` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** All input for the `updateProjectDataPointByNodeId` mutation. */
export type UpdateProjectDataPointByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ProjectDataPoint` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ProjectDataPoint` being updated. */
  patch: ProjectDataPointPatch;
};

/** All input for the `updateProjectDataPoint` mutation. */
export type UpdateProjectDataPointInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `ProjectDataPoint` being updated. */
  patch: ProjectDataPointPatch;
};

/** The output of our update `ProjectDataPoint` mutation. */
export type UpdateProjectDataPointPayload = {
  __typename?: 'UpdateProjectDataPointPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Project` that is related to this `ProjectDataPoint`. */
  project?: Maybe<Project>;
  /** The `ProjectDataPoint` that was updated by this mutation. */
  projectDataPoint?: Maybe<ProjectDataPoint>;
  /** An edge for our `ProjectDataPoint`. May be used by Relay 1. */
  projectDataPointEdge?: Maybe<ProjectDataPointsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ProjectDataPoint` mutation. */
export type UpdateProjectDataPointPayloadProjectDataPointEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectDataPointsOrderBy>>;
};

/** All input for the `updateProject` mutation. */
export type UpdateProjectInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `Project` being updated. */
  patch: ProjectPatch;
};

/** The output of our update `Project` mutation. */
export type UpdateProjectPayload = {
  __typename?: 'UpdateProjectPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Country` that is related to this `Project`. */
  countryByIso3166AndIso31662?: Maybe<Country>;
  /** The `Project` that was updated by this mutation. */
  project?: Maybe<Project>;
  /** An edge for our `Project`. May be used by Relay 1. */
  projectEdge?: Maybe<ProjectsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Project` mutation. */
export type UpdateProjectPayloadProjectEdgeArgs = {
  orderBy?: InputMaybe<Array<ProjectsOrderBy>>;
};

/** All input for the `updateSourceByNodeId` mutation. */
export type UpdateSourceByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Source` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Source` being updated. */
  patch: SourcePatch;
};

/** All input for the `updateSource` mutation. */
export type UpdateSourceInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Source` being updated. */
  patch: SourcePatch;
  sourceId: Scalars['Int'];
};

/** The output of our update `Source` mutation. */
export type UpdateSourcePayload = {
  __typename?: 'UpdateSourcePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** The `Source` that was updated by this mutation. */
  source?: Maybe<Source>;
  /** An edge for our `Source`. May be used by Relay 1. */
  sourceEdge?: Maybe<SourcesEdge>;
};


/** The output of our update `Source` mutation. */
export type UpdateSourcePayloadSourceEdgeArgs = {
  orderBy?: InputMaybe<Array<SourcesOrderBy>>;
};

export type Co2CostsQueryVariables = Exact<{ [key: string]: never; }>;


export type Co2CostsQuery = { __typename?: 'Query', co2Costs?: { __typename?: 'Co2CostsConnection', nodes: Array<{ __typename?: 'Co2Cost', costPerTon: number, currency: string, source: string, year: number } | null> } | null };

export type CalculationConstantsQueryVariables = Exact<{ [key: string]: never; }>;


export type CalculationConstantsQuery = { __typename?: 'Query', calculationConstants?: { __typename?: 'CalculationConstantsConnection', nodes: Array<{ __typename?: 'CalculationConstant', country?: string | null, constantType: ConstantTypeEnum, authority: string, description?: string | null, factor: number, fossilFuelType?: string | null, high?: number | null, id: any, low?: number | null, modifier?: ModifierEnum | null, nodeId: string, projectId?: number | null, quality?: number | null, reference?: string | null, subtype?: string | null, unit: string } | null> } | null };

export type ConversionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ConversionsQuery = { __typename?: 'Query', conversionConstants?: { __typename?: 'ConversionConstantsConnection', nodes: Array<{ __typename?: 'ConversionConstant', id: number, authority: string, description?: string | null, fossilFuelType?: string | null, fromUnit: string, toUnit: string, high?: number | null, factor: number, low?: number | null, country?: string | null, modifier?: string | null, subtype?: string | null } | null> } | null };

export type CountryBorderQueryVariables = Exact<{
  isoA2: Scalars['String'];
  iso3166: Scalars['String'];
}>;


export type CountryBorderQuery = { __typename?: 'Query', neCountries?: { __typename?: 'NeCountriesConnection', nodes: Array<{ __typename?: 'NeCountry', isoA2?: string | null, geometry?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZM', geojson?: any | null, srid: number } | null } | null> } | null, projects?: { __typename?: 'ProjectsConnection', nodes: Array<{ __typename?: 'Project', projectIdentifier?: string | null, geoPosition?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZM', geojson?: any | null, srid: number } | null } | null> } | null };

export type CountryCurrentProductionQueryVariables = Exact<{
  iso3166: Scalars['String'];
}>;


export type CountryCurrentProductionQuery = { __typename?: 'Query', getCountryCurrentProduction?: { __typename?: 'GetCountryCurrentProductionConnection', nodes: Array<{ __typename?: 'GetCountryCurrentProductionRecord', id?: number | null, fossilFuelType?: string | null, sourceId?: number | null, unit?: string | null, volume?: number | null, year?: number | null, subtype?: string | null } | null> } | null };

export type CountryProductionQueryVariables = Exact<{
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
}>;


export type CountryProductionQuery = { __typename?: 'Query', countryDataPoints?: { __typename?: 'CountryDataPointsConnection', nodes: Array<{ __typename?: 'CountryDataPoint', id: number, fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null, subtype?: string | null, sourceId?: number | null, quality?: number | null, dataType: DataPointType } | null> } | null };

export type CountryProjectionQueryVariables = Exact<{
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
}>;


export type CountryProjectionQuery = { __typename?: 'Query', countryDataPoints?: { __typename?: 'CountryDataPointsConnection', nodes: Array<{ __typename?: 'CountryDataPoint', fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null, subtype?: string | null, sourceId?: number | null, quality?: number | null, dataType: DataPointType } | null> } | null };

export type CountryReservesQueryVariables = Exact<{
  iso3166: Scalars['String'];
  iso31662: Scalars['String'];
}>;


export type CountryReservesQuery = { __typename?: 'Query', countryDataPoints?: { __typename?: 'CountryDataPointsConnection', nodes: Array<{ __typename?: 'CountryDataPoint', fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null, subtype?: string | null, sourceId?: number | null, quality?: number | null, grade?: string | null, dataType: DataPointType } | null> } | null };

export type CountrySourcesQueryVariables = Exact<{
  iso3166?: InputMaybe<Scalars['String']>;
  iso31662?: InputMaybe<Scalars['String']>;
}>;


export type CountrySourcesQuery = { __typename?: 'Query', getCountrySources?: { __typename?: 'GetCountrySourcesConnection', nodes: Array<{ __typename?: 'GetCountrySourcesRecord', dataPoints?: any | null, dataType?: DataPointType | null, description?: string | null, latestCurationAt?: any | null, name?: string | null, namePretty?: string | null, sourceId?: number | null, year?: number | null, records?: any | null, url?: string | null, quality?: number | null, grades?: Array<string | null> | null } | null> } | null };

export type LargestProjectsQueryVariables = Exact<{
  iso3166: Scalars['String'];
}>;


export type LargestProjectsQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectsConnection', nodes: Array<{ __typename?: 'Project', id: number, iso3166?: string | null, projectIdentifier?: string | null, productionCo2E: number, projectType: ProjectType, fuels?: Array<string | null> | null, lastYear?: number | null, geoPosition?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZM', geojson?: any | null, srid: number } | null } | null> } | null };

export type PrefixConversionsQueryVariables = Exact<{ [key: string]: never; }>;


export type PrefixConversionsQuery = { __typename?: 'Query', prefixConversions?: { __typename?: 'PrefixConversionsConnection', nodes: Array<{ __typename?: 'PrefixConversion', factor: number, fromPrefix: string, toPrefix: string } | null> } | null };

export type ProducingCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type ProducingCountriesQuery = { __typename?: 'Query', getProducingIso3166?: { __typename?: 'GetProducingIso3166Connection', nodes: Array<{ __typename?: 'GetProducingIso3166Record', iso3166?: string | null, iso31662?: string | null, fr?: string | null, es?: string | null, en?: string | null, sv?: string | null, productionCo2E?: any | null, productionSnapshotData?: any | null, borders?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null } | { __typename?: 'GeometryLineString', geojson?: any | null } | { __typename?: 'GeometryLineStringM', geojson?: any | null } | { __typename?: 'GeometryLineStringZ', geojson?: any | null } | { __typename?: 'GeometryLineStringZM', geojson?: any | null } | { __typename?: 'GeometryMultiLineString', geojson?: any | null } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null } | { __typename?: 'GeometryMultiPoint', geojson?: any | null } | { __typename?: 'GeometryMultiPointM', geojson?: any | null } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null } | { __typename?: 'GeometryPoint', geojson?: any | null } | { __typename?: 'GeometryPointM', geojson?: any | null } | { __typename?: 'GeometryPointZ', geojson?: any | null } | { __typename?: 'GeometryPointZM', geojson?: any | null } | { __typename?: 'GeometryPolygon', geojson?: any | null } | { __typename?: 'GeometryPolygonM', geojson?: any | null } | { __typename?: 'GeometryPolygonZ', geojson?: any | null } | { __typename?: 'GeometryPolygonZM', geojson?: any | null } | null, centroid?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null } | { __typename?: 'GeometryLineString', geojson?: any | null } | { __typename?: 'GeometryLineStringM', geojson?: any | null } | { __typename?: 'GeometryLineStringZ', geojson?: any | null } | { __typename?: 'GeometryLineStringZM', geojson?: any | null } | { __typename?: 'GeometryMultiLineString', geojson?: any | null } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null } | { __typename?: 'GeometryMultiPoint', geojson?: any | null } | { __typename?: 'GeometryMultiPointM', geojson?: any | null } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null } | { __typename?: 'GeometryPoint', geojson?: any | null } | { __typename?: 'GeometryPointM', geojson?: any | null } | { __typename?: 'GeometryPointZ', geojson?: any | null } | { __typename?: 'GeometryPointZM', geojson?: any | null } | { __typename?: 'GeometryPolygon', geojson?: any | null } | { __typename?: 'GeometryPolygonM', geojson?: any | null } | { __typename?: 'GeometryPolygonZ', geojson?: any | null } | { __typename?: 'GeometryPolygonZM', geojson?: any | null } | null } | null> } | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = { __typename?: 'Query', project?: { __typename?: 'Project', id: number, dataYear?: number | null, lastYear?: number | null, description?: string | null, iso3166?: string | null, iso31662: string, linkUrl?: string | null, locationName?: string | null, methaneM3Ton?: number | null, ocOperatorId?: string | null, operatorName?: string | null, productionCo2E: number, productionMethod?: string | null, productionType?: string | null, projectIdentifier?: string | null, projectType: ProjectType, region?: string | null, sourceProjectId?: string | null, sourceProjectName?: string | null, geoPosition?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZM', geojson?: any | null, srid: number } | null, projectDataPoints: { __typename?: 'ProjectDataPointsConnection', nodes: Array<{ __typename?: 'ProjectDataPoint', dataType: DataPointType, fossilFuelType?: string | null, quality?: number | null, sourceId?: number | null, subtype?: string | null, unit?: string | null, volume?: number | null, year?: number | null, grade?: string | null, dataYear?: number | null } | null> } } | null };

export type ProjectGeoQueryVariables = Exact<{
  projectIdentifier: Scalars['String'];
  iso3166: Scalars['String'];
}>;


export type ProjectGeoQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectsConnection', nodes: Array<{ __typename?: 'Project', projectIdentifier?: string | null, geoPosition?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZM', geojson?: any | null, srid: number } | null } | null> } | null };

export type ProjectProductionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectProductionQuery = { __typename?: 'Query', projectDataPoints?: { __typename?: 'ProjectDataPointsConnection', nodes: Array<{ __typename?: 'ProjectDataPoint', fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null, subtype?: string | null, sourceId?: number | null, quality?: number | null, projectId: number } | null> } | null };

export type ProjectProjectionQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectProjectionQuery = { __typename?: 'Query', projectDataPoints?: { __typename?: 'ProjectDataPointsConnection', nodes: Array<{ __typename?: 'ProjectDataPoint', fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null, subtype?: string | null, sourceId?: number | null, quality?: number | null } | null> } | null };

export type ProjectReservesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectReservesQuery = { __typename?: 'Query', projectDataPoints?: { __typename?: 'ProjectDataPointsConnection', nodes: Array<{ __typename?: 'ProjectDataPoint', fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null, subtype?: string | null, sourceId?: number | null, quality?: number | null, grade?: string | null } | null> } | null };

export type ProjectSourcesQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectSourcesQuery = { __typename?: 'Query', getProjectSources?: { __typename?: 'GetProjectSourcesConnection', nodes: Array<{ __typename?: 'GetProjectSourcesRecord', dataPoints?: any | null, dataType?: DataPointType | null, description?: string | null, latestCurationAt?: any | null, name?: string | null, namePretty?: string | null, sourceId?: number | null, records?: any | null, url?: string | null, documentUrl?: string | null, quality?: number | null, grade?: string | null } | null> } | null };

export type ProjectsByCountryQueryVariables = Exact<{
  iso3166_: Scalars['String'];
  iso31662_?: InputMaybe<Scalars['String']>;
}>;


export type ProjectsByCountryQuery = { __typename?: 'Query', getProjects?: { __typename?: 'GetProjectsConnection', nodes: Array<{ __typename?: 'GetProjectsRecord', id?: number | null, projectIdentifier?: string | null, firstYear?: number | null, lastYear?: number | null, dataYear?: number | null, co2?: number | null, projectType?: ProjectType | null, fuels?: Array<string | null> | null, geoPosition?: { __typename?: 'GeometryGeometryCollection', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionM', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryGeometryCollectionZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineString', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiLineStringZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryMultiPolygonZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPoint', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPointZM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygon', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonM', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZ', geojson?: any | null, srid: number } | { __typename?: 'GeometryPolygonZM', geojson?: any | null, srid: number } | null } | null> } | null };

export type ProjectsCountQueryVariables = Exact<{ [key: string]: never; }>;


export type ProjectsCountQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectsConnection', totalCount: number } | null };

export type ProjectsTableDataQueryVariables = Exact<{
  iso3166: Scalars['String'];
  offset: Scalars['Int'];
  limit: Scalars['Int'];
}>;


export type ProjectsTableDataQuery = { __typename?: 'Query', projects?: { __typename?: 'ProjectsConnection', totalCount: number, nodes: Array<{ __typename?: 'Project', id: number, projectIdentifier?: string | null, productionCo2E: number, fuels?: Array<string | null> | null, dataYear?: number | null, firstYear?: number | null, lastYear?: number | null, projectDataPoints: { __typename?: 'ProjectDataPointsConnection', nodes: Array<{ __typename?: 'ProjectDataPoint', dataYear?: number | null, fossilFuelType?: string | null, volume?: number | null, year?: number | null, unit?: string | null } | null> } } | null>, pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean } } | null };

export type SourcesQueryVariables = Exact<{ [key: string]: never; }>;


export type SourcesQuery = { __typename?: 'Query', sources?: { __typename?: 'SourcesConnection', nodes: Array<{ __typename?: 'Source', description?: string | null, name?: string | null, namePretty?: string | null, sourceId: number, url?: string | null, documentUrl?: string | null, latestCurationAt?: any | null } | null> } | null };


export const Co2CostsDocument = gql`
    query CO2Costs {
  co2Costs(filter: {currency: {equalTo: "USD"}}) {
    nodes {
      costPerTon
      currency
      source
      year
    }
  }
}
    `;

/**
 * __useCo2CostsQuery__
 *
 * To run a query within a React component, call `useCo2CostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCo2CostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCo2CostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCo2CostsQuery(baseOptions?: Apollo.QueryHookOptions<Co2CostsQuery, Co2CostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Co2CostsQuery, Co2CostsQueryVariables>(Co2CostsDocument, options);
      }
export function useCo2CostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Co2CostsQuery, Co2CostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Co2CostsQuery, Co2CostsQueryVariables>(Co2CostsDocument, options);
        }
export type Co2CostsQueryHookResult = ReturnType<typeof useCo2CostsQuery>;
export type Co2CostsLazyQueryHookResult = ReturnType<typeof useCo2CostsLazyQuery>;
export type Co2CostsQueryResult = Apollo.QueryResult<Co2CostsQuery, Co2CostsQueryVariables>;
export const CalculationConstantsDocument = gql`
    query CalculationConstants {
  calculationConstants {
    nodes {
      country
      constantType
      authority
      description
      factor
      fossilFuelType
      high
      id
      low
      modifier
      nodeId
      projectId
      quality
      reference
      subtype
      unit
    }
  }
}
    `;

/**
 * __useCalculationConstantsQuery__
 *
 * To run a query within a React component, call `useCalculationConstantsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCalculationConstantsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCalculationConstantsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCalculationConstantsQuery(baseOptions?: Apollo.QueryHookOptions<CalculationConstantsQuery, CalculationConstantsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CalculationConstantsQuery, CalculationConstantsQueryVariables>(CalculationConstantsDocument, options);
      }
export function useCalculationConstantsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CalculationConstantsQuery, CalculationConstantsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CalculationConstantsQuery, CalculationConstantsQueryVariables>(CalculationConstantsDocument, options);
        }
export type CalculationConstantsQueryHookResult = ReturnType<typeof useCalculationConstantsQuery>;
export type CalculationConstantsLazyQueryHookResult = ReturnType<typeof useCalculationConstantsLazyQuery>;
export type CalculationConstantsQueryResult = Apollo.QueryResult<CalculationConstantsQuery, CalculationConstantsQueryVariables>;
export const ConversionsDocument = gql`
    query Conversions {
  conversionConstants {
    nodes {
      id
      authority
      description
      fossilFuelType
      fromUnit
      toUnit
      high
      factor
      low
      country
      modifier
      subtype
    }
  }
}
    `;

/**
 * __useConversionsQuery__
 *
 * To run a query within a React component, call `useConversionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConversionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useConversionsQuery(baseOptions?: Apollo.QueryHookOptions<ConversionsQuery, ConversionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConversionsQuery, ConversionsQueryVariables>(ConversionsDocument, options);
      }
export function useConversionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConversionsQuery, ConversionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConversionsQuery, ConversionsQueryVariables>(ConversionsDocument, options);
        }
export type ConversionsQueryHookResult = ReturnType<typeof useConversionsQuery>;
export type ConversionsLazyQueryHookResult = ReturnType<typeof useConversionsLazyQuery>;
export type ConversionsQueryResult = Apollo.QueryResult<ConversionsQuery, ConversionsQueryVariables>;
export const CountryBorderDocument = gql`
    query CountryBorder($isoA2: String!, $iso3166: String!) {
  neCountries(condition: {isoA2: $isoA2}) {
    nodes {
      geometry {
        geojson
        srid
      }
      isoA2
    }
  }
  projects(condition: {iso3166: $iso3166}) {
    nodes {
      geoPosition {
        geojson
        srid
      }
      projectIdentifier
    }
  }
}
    `;

/**
 * __useCountryBorderQuery__
 *
 * To run a query within a React component, call `useCountryBorderQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryBorderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryBorderQuery({
 *   variables: {
 *      isoA2: // value for 'isoA2'
 *      iso3166: // value for 'iso3166'
 *   },
 * });
 */
export function useCountryBorderQuery(baseOptions: Apollo.QueryHookOptions<CountryBorderQuery, CountryBorderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryBorderQuery, CountryBorderQueryVariables>(CountryBorderDocument, options);
      }
export function useCountryBorderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryBorderQuery, CountryBorderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryBorderQuery, CountryBorderQueryVariables>(CountryBorderDocument, options);
        }
export type CountryBorderQueryHookResult = ReturnType<typeof useCountryBorderQuery>;
export type CountryBorderLazyQueryHookResult = ReturnType<typeof useCountryBorderLazyQuery>;
export type CountryBorderQueryResult = Apollo.QueryResult<CountryBorderQuery, CountryBorderQueryVariables>;
export const CountryCurrentProductionDocument = gql`
    query CountryCurrentProduction($iso3166: String!) {
  getCountryCurrentProduction(iso3166_: $iso3166) {
    nodes {
      id
      fossilFuelType
      sourceId
      unit
      volume
      year
      subtype
    }
  }
}
    `;

/**
 * __useCountryCurrentProductionQuery__
 *
 * To run a query within a React component, call `useCountryCurrentProductionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryCurrentProductionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryCurrentProductionQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *   },
 * });
 */
export function useCountryCurrentProductionQuery(baseOptions: Apollo.QueryHookOptions<CountryCurrentProductionQuery, CountryCurrentProductionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryCurrentProductionQuery, CountryCurrentProductionQueryVariables>(CountryCurrentProductionDocument, options);
      }
export function useCountryCurrentProductionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryCurrentProductionQuery, CountryCurrentProductionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryCurrentProductionQuery, CountryCurrentProductionQueryVariables>(CountryCurrentProductionDocument, options);
        }
export type CountryCurrentProductionQueryHookResult = ReturnType<typeof useCountryCurrentProductionQuery>;
export type CountryCurrentProductionLazyQueryHookResult = ReturnType<typeof useCountryCurrentProductionLazyQuery>;
export type CountryCurrentProductionQueryResult = Apollo.QueryResult<CountryCurrentProductionQuery, CountryCurrentProductionQueryVariables>;
export const CountryProductionDocument = gql`
    query CountryProduction($iso3166: String!, $iso31662: String!) {
  countryDataPoints(
    orderBy: [YEAR_ASC, SOURCE_ID_ASC, FOSSIL_FUEL_TYPE_ASC]
    condition: {iso3166: $iso3166, iso31662: $iso31662, dataType: PRODUCTION}
  ) {
    nodes {
      id
      fossilFuelType
      volume
      year
      unit
      subtype
      sourceId
      quality
      dataType
    }
  }
}
    `;

/**
 * __useCountryProductionQuery__
 *
 * To run a query within a React component, call `useCountryProductionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryProductionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryProductionQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *      iso31662: // value for 'iso31662'
 *   },
 * });
 */
export function useCountryProductionQuery(baseOptions: Apollo.QueryHookOptions<CountryProductionQuery, CountryProductionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryProductionQuery, CountryProductionQueryVariables>(CountryProductionDocument, options);
      }
export function useCountryProductionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryProductionQuery, CountryProductionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryProductionQuery, CountryProductionQueryVariables>(CountryProductionDocument, options);
        }
export type CountryProductionQueryHookResult = ReturnType<typeof useCountryProductionQuery>;
export type CountryProductionLazyQueryHookResult = ReturnType<typeof useCountryProductionLazyQuery>;
export type CountryProductionQueryResult = Apollo.QueryResult<CountryProductionQuery, CountryProductionQueryVariables>;
export const CountryProjectionDocument = gql`
    query CountryProjection($iso3166: String!, $iso31662: String!) {
  countryDataPoints(
    orderBy: YEAR_ASC
    condition: {iso3166: $iso3166, iso31662: $iso31662, dataType: PROJECTION}
  ) {
    nodes {
      fossilFuelType
      volume
      year
      unit
      subtype
      sourceId
      quality
      dataType
    }
  }
}
    `;

/**
 * __useCountryProjectionQuery__
 *
 * To run a query within a React component, call `useCountryProjectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryProjectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryProjectionQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *      iso31662: // value for 'iso31662'
 *   },
 * });
 */
export function useCountryProjectionQuery(baseOptions: Apollo.QueryHookOptions<CountryProjectionQuery, CountryProjectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryProjectionQuery, CountryProjectionQueryVariables>(CountryProjectionDocument, options);
      }
export function useCountryProjectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryProjectionQuery, CountryProjectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryProjectionQuery, CountryProjectionQueryVariables>(CountryProjectionDocument, options);
        }
export type CountryProjectionQueryHookResult = ReturnType<typeof useCountryProjectionQuery>;
export type CountryProjectionLazyQueryHookResult = ReturnType<typeof useCountryProjectionLazyQuery>;
export type CountryProjectionQueryResult = Apollo.QueryResult<CountryProjectionQuery, CountryProjectionQueryVariables>;
export const CountryReservesDocument = gql`
    query CountryReserves($iso3166: String!, $iso31662: String!) {
  countryDataPoints(
    orderBy: YEAR_ASC
    condition: {iso3166: $iso3166, iso31662: $iso31662, dataType: RESERVE}
  ) {
    nodes {
      fossilFuelType
      volume
      year
      unit
      subtype
      sourceId
      quality
      grade
      dataType
    }
  }
}
    `;

/**
 * __useCountryReservesQuery__
 *
 * To run a query within a React component, call `useCountryReservesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountryReservesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountryReservesQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *      iso31662: // value for 'iso31662'
 *   },
 * });
 */
export function useCountryReservesQuery(baseOptions: Apollo.QueryHookOptions<CountryReservesQuery, CountryReservesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountryReservesQuery, CountryReservesQueryVariables>(CountryReservesDocument, options);
      }
export function useCountryReservesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountryReservesQuery, CountryReservesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountryReservesQuery, CountryReservesQueryVariables>(CountryReservesDocument, options);
        }
export type CountryReservesQueryHookResult = ReturnType<typeof useCountryReservesQuery>;
export type CountryReservesLazyQueryHookResult = ReturnType<typeof useCountryReservesLazyQuery>;
export type CountryReservesQueryResult = Apollo.QueryResult<CountryReservesQuery, CountryReservesQueryVariables>;
export const CountrySourcesDocument = gql`
    query CountrySources($iso3166: String = "", $iso31662: String = "") {
  getCountrySources(iso3166_: $iso3166, iso31662_: $iso31662) {
    nodes {
      dataPoints
      dataType
      description
      latestCurationAt
      name
      namePretty
      sourceId
      year
      records
      url
      quality
      grades
    }
  }
}
    `;

/**
 * __useCountrySourcesQuery__
 *
 * To run a query within a React component, call `useCountrySourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountrySourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountrySourcesQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *      iso31662: // value for 'iso31662'
 *   },
 * });
 */
export function useCountrySourcesQuery(baseOptions?: Apollo.QueryHookOptions<CountrySourcesQuery, CountrySourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountrySourcesQuery, CountrySourcesQueryVariables>(CountrySourcesDocument, options);
      }
export function useCountrySourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountrySourcesQuery, CountrySourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountrySourcesQuery, CountrySourcesQueryVariables>(CountrySourcesDocument, options);
        }
export type CountrySourcesQueryHookResult = ReturnType<typeof useCountrySourcesQuery>;
export type CountrySourcesLazyQueryHookResult = ReturnType<typeof useCountrySourcesLazyQuery>;
export type CountrySourcesQueryResult = Apollo.QueryResult<CountrySourcesQuery, CountrySourcesQueryVariables>;
export const LargestProjectsDocument = gql`
    query LargestProjects($iso3166: String!) {
  projects(
    orderBy: PRODUCTION_CO2E_DESC
    condition: {iso3166: $iso3166}
    first: 30
  ) {
    nodes {
      id
      iso3166
      projectIdentifier
      productionCo2E
      projectType
      fuels
      lastYear
      geoPosition {
        geojson
        srid
      }
    }
  }
}
    `;

/**
 * __useLargestProjectsQuery__
 *
 * To run a query within a React component, call `useLargestProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLargestProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLargestProjectsQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *   },
 * });
 */
export function useLargestProjectsQuery(baseOptions: Apollo.QueryHookOptions<LargestProjectsQuery, LargestProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LargestProjectsQuery, LargestProjectsQueryVariables>(LargestProjectsDocument, options);
      }
export function useLargestProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LargestProjectsQuery, LargestProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LargestProjectsQuery, LargestProjectsQueryVariables>(LargestProjectsDocument, options);
        }
export type LargestProjectsQueryHookResult = ReturnType<typeof useLargestProjectsQuery>;
export type LargestProjectsLazyQueryHookResult = ReturnType<typeof useLargestProjectsLazyQuery>;
export type LargestProjectsQueryResult = Apollo.QueryResult<LargestProjectsQuery, LargestProjectsQueryVariables>;
export const PrefixConversionsDocument = gql`
    query PrefixConversions {
  prefixConversions {
    nodes {
      factor
      fromPrefix
      toPrefix
    }
  }
}
    `;

/**
 * __usePrefixConversionsQuery__
 *
 * To run a query within a React component, call `usePrefixConversionsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrefixConversionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrefixConversionsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrefixConversionsQuery(baseOptions?: Apollo.QueryHookOptions<PrefixConversionsQuery, PrefixConversionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrefixConversionsQuery, PrefixConversionsQueryVariables>(PrefixConversionsDocument, options);
      }
export function usePrefixConversionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrefixConversionsQuery, PrefixConversionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrefixConversionsQuery, PrefixConversionsQueryVariables>(PrefixConversionsDocument, options);
        }
export type PrefixConversionsQueryHookResult = ReturnType<typeof usePrefixConversionsQuery>;
export type PrefixConversionsLazyQueryHookResult = ReturnType<typeof usePrefixConversionsLazyQuery>;
export type PrefixConversionsQueryResult = Apollo.QueryResult<PrefixConversionsQuery, PrefixConversionsQueryVariables>;
export const ProducingCountriesDocument = gql`
    query ProducingCountries {
  getProducingIso3166 {
    nodes {
      borders {
        geojson
      }
      centroid {
        geojson
      }
      iso3166
      iso31662
      fr
      es
      en
      sv
      productionCo2E
      productionSnapshotData
    }
  }
}
    `;

/**
 * __useProducingCountriesQuery__
 *
 * To run a query within a React component, call `useProducingCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProducingCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProducingCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useProducingCountriesQuery(baseOptions?: Apollo.QueryHookOptions<ProducingCountriesQuery, ProducingCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProducingCountriesQuery, ProducingCountriesQueryVariables>(ProducingCountriesDocument, options);
      }
export function useProducingCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProducingCountriesQuery, ProducingCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProducingCountriesQuery, ProducingCountriesQueryVariables>(ProducingCountriesDocument, options);
        }
export type ProducingCountriesQueryHookResult = ReturnType<typeof useProducingCountriesQuery>;
export type ProducingCountriesLazyQueryHookResult = ReturnType<typeof useProducingCountriesLazyQuery>;
export type ProducingCountriesQueryResult = Apollo.QueryResult<ProducingCountriesQuery, ProducingCountriesQueryVariables>;
export const ProjectDocument = gql`
    query Project($id: Int!) {
  project(id: $id) {
    id
    dataYear
    lastYear
    description
    geoPosition {
      geojson
      srid
    }
    iso3166
    iso31662
    linkUrl
    locationName
    methaneM3Ton
    ocOperatorId
    operatorName
    productionCo2E
    productionMethod
    productionType
    projectIdentifier
    projectType
    region
    sourceProjectId
    sourceProjectName
    projectDataPoints {
      nodes {
        dataType
        fossilFuelType
        quality
        sourceId
        subtype
        unit
        volume
        year
        grade
        dataYear
      }
    }
  }
}
    `;

/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const ProjectGeoDocument = gql`
    query ProjectGeo($projectIdentifier: String!, $iso3166: String!) {
  projects(condition: {projectIdentifier: $projectIdentifier, iso3166: $iso3166}) {
    nodes {
      projectIdentifier
      geoPosition {
        geojson
        srid
      }
    }
  }
}
    `;

/**
 * __useProjectGeoQuery__
 *
 * To run a query within a React component, call `useProjectGeoQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectGeoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectGeoQuery({
 *   variables: {
 *      projectIdentifier: // value for 'projectIdentifier'
 *      iso3166: // value for 'iso3166'
 *   },
 * });
 */
export function useProjectGeoQuery(baseOptions: Apollo.QueryHookOptions<ProjectGeoQuery, ProjectGeoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectGeoQuery, ProjectGeoQueryVariables>(ProjectGeoDocument, options);
      }
export function useProjectGeoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectGeoQuery, ProjectGeoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectGeoQuery, ProjectGeoQueryVariables>(ProjectGeoDocument, options);
        }
export type ProjectGeoQueryHookResult = ReturnType<typeof useProjectGeoQuery>;
export type ProjectGeoLazyQueryHookResult = ReturnType<typeof useProjectGeoLazyQuery>;
export type ProjectGeoQueryResult = Apollo.QueryResult<ProjectGeoQuery, ProjectGeoQueryVariables>;
export const ProjectProductionDocument = gql`
    query ProjectProduction($id: Int!) {
  projectDataPoints(
    orderBy: YEAR_ASC
    condition: {projectId: $id, dataType: PRODUCTION}
  ) {
    nodes {
      fossilFuelType
      volume
      year
      unit
      subtype
      sourceId
      quality
      projectId
    }
  }
}
    `;

/**
 * __useProjectProductionQuery__
 *
 * To run a query within a React component, call `useProjectProductionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectProductionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectProductionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectProductionQuery(baseOptions: Apollo.QueryHookOptions<ProjectProductionQuery, ProjectProductionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectProductionQuery, ProjectProductionQueryVariables>(ProjectProductionDocument, options);
      }
export function useProjectProductionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectProductionQuery, ProjectProductionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectProductionQuery, ProjectProductionQueryVariables>(ProjectProductionDocument, options);
        }
export type ProjectProductionQueryHookResult = ReturnType<typeof useProjectProductionQuery>;
export type ProjectProductionLazyQueryHookResult = ReturnType<typeof useProjectProductionLazyQuery>;
export type ProjectProductionQueryResult = Apollo.QueryResult<ProjectProductionQuery, ProjectProductionQueryVariables>;
export const ProjectProjectionDocument = gql`
    query ProjectProjection($id: Int!) {
  projectDataPoints(
    orderBy: YEAR_ASC
    condition: {projectId: $id, dataType: PROJECTION}
  ) {
    nodes {
      fossilFuelType
      volume
      year
      unit
      subtype
      sourceId
      quality
    }
  }
}
    `;

/**
 * __useProjectProjectionQuery__
 *
 * To run a query within a React component, call `useProjectProjectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectProjectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectProjectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectProjectionQuery(baseOptions: Apollo.QueryHookOptions<ProjectProjectionQuery, ProjectProjectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectProjectionQuery, ProjectProjectionQueryVariables>(ProjectProjectionDocument, options);
      }
export function useProjectProjectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectProjectionQuery, ProjectProjectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectProjectionQuery, ProjectProjectionQueryVariables>(ProjectProjectionDocument, options);
        }
export type ProjectProjectionQueryHookResult = ReturnType<typeof useProjectProjectionQuery>;
export type ProjectProjectionLazyQueryHookResult = ReturnType<typeof useProjectProjectionLazyQuery>;
export type ProjectProjectionQueryResult = Apollo.QueryResult<ProjectProjectionQuery, ProjectProjectionQueryVariables>;
export const ProjectReservesDocument = gql`
    query ProjectReserves($id: Int!) {
  projectDataPoints(
    orderBy: YEAR_ASC
    condition: {projectId: $id, dataType: RESERVE}
  ) {
    nodes {
      fossilFuelType
      volume
      year
      unit
      subtype
      sourceId
      quality
      grade
    }
  }
}
    `;

/**
 * __useProjectReservesQuery__
 *
 * To run a query within a React component, call `useProjectReservesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectReservesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectReservesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectReservesQuery(baseOptions: Apollo.QueryHookOptions<ProjectReservesQuery, ProjectReservesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectReservesQuery, ProjectReservesQueryVariables>(ProjectReservesDocument, options);
      }
export function useProjectReservesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectReservesQuery, ProjectReservesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectReservesQuery, ProjectReservesQueryVariables>(ProjectReservesDocument, options);
        }
export type ProjectReservesQueryHookResult = ReturnType<typeof useProjectReservesQuery>;
export type ProjectReservesLazyQueryHookResult = ReturnType<typeof useProjectReservesLazyQuery>;
export type ProjectReservesQueryResult = Apollo.QueryResult<ProjectReservesQuery, ProjectReservesQueryVariables>;
export const ProjectSourcesDocument = gql`
    query ProjectSources($id: Int!) {
  getProjectSources(forId: $id) {
    nodes {
      dataPoints
      dataType
      description
      latestCurationAt
      name
      namePretty
      sourceId
      records
      url
      documentUrl
      quality
      grade
    }
  }
}
    `;

/**
 * __useProjectSourcesQuery__
 *
 * To run a query within a React component, call `useProjectSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectSourcesQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProjectSourcesQuery(baseOptions: Apollo.QueryHookOptions<ProjectSourcesQuery, ProjectSourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectSourcesQuery, ProjectSourcesQueryVariables>(ProjectSourcesDocument, options);
      }
export function useProjectSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectSourcesQuery, ProjectSourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectSourcesQuery, ProjectSourcesQueryVariables>(ProjectSourcesDocument, options);
        }
export type ProjectSourcesQueryHookResult = ReturnType<typeof useProjectSourcesQuery>;
export type ProjectSourcesLazyQueryHookResult = ReturnType<typeof useProjectSourcesLazyQuery>;
export type ProjectSourcesQueryResult = Apollo.QueryResult<ProjectSourcesQuery, ProjectSourcesQueryVariables>;
export const ProjectsByCountryDocument = gql`
    query ProjectsByCountry($iso3166_: String!, $iso31662_: String = "") {
  getProjects(iso3166_: $iso3166_, iso31662_: $iso31662_) {
    nodes {
      id
      projectIdentifier
      firstYear
      lastYear
      dataYear
      co2
      projectType
      geoPosition {
        geojson
        srid
      }
      fuels
    }
  }
}
    `;

/**
 * __useProjectsByCountryQuery__
 *
 * To run a query within a React component, call `useProjectsByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsByCountryQuery({
 *   variables: {
 *      iso3166_: // value for 'iso3166_'
 *      iso31662_: // value for 'iso31662_'
 *   },
 * });
 */
export function useProjectsByCountryQuery(baseOptions: Apollo.QueryHookOptions<ProjectsByCountryQuery, ProjectsByCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsByCountryQuery, ProjectsByCountryQueryVariables>(ProjectsByCountryDocument, options);
      }
export function useProjectsByCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsByCountryQuery, ProjectsByCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsByCountryQuery, ProjectsByCountryQueryVariables>(ProjectsByCountryDocument, options);
        }
export type ProjectsByCountryQueryHookResult = ReturnType<typeof useProjectsByCountryQuery>;
export type ProjectsByCountryLazyQueryHookResult = ReturnType<typeof useProjectsByCountryLazyQuery>;
export type ProjectsByCountryQueryResult = Apollo.QueryResult<ProjectsByCountryQuery, ProjectsByCountryQueryVariables>;
export const ProjectsCountDocument = gql`
    query ProjectsCount {
  projects {
    totalCount
  }
}
    `;

/**
 * __useProjectsCountQuery__
 *
 * To run a query within a React component, call `useProjectsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useProjectsCountQuery(baseOptions?: Apollo.QueryHookOptions<ProjectsCountQuery, ProjectsCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsCountQuery, ProjectsCountQueryVariables>(ProjectsCountDocument, options);
      }
export function useProjectsCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsCountQuery, ProjectsCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsCountQuery, ProjectsCountQueryVariables>(ProjectsCountDocument, options);
        }
export type ProjectsCountQueryHookResult = ReturnType<typeof useProjectsCountQuery>;
export type ProjectsCountLazyQueryHookResult = ReturnType<typeof useProjectsCountLazyQuery>;
export type ProjectsCountQueryResult = Apollo.QueryResult<ProjectsCountQuery, ProjectsCountQueryVariables>;
export const ProjectsTableDataDocument = gql`
    query ProjectsTableData($iso3166: String!, $offset: Int!, $limit: Int!) {
  projects(
    orderBy: PRODUCTION_CO2E_DESC
    condition: {iso3166: $iso3166}
    filter: {not: {productionCo2E: {equalTo: 0}}}
    offset: $offset
    first: $limit
  ) {
    nodes {
      id
      projectIdentifier
      productionCo2E
      fuels
      dataYear
      firstYear
      lastYear
      projectDataPoints {
        nodes {
          dataYear
          fossilFuelType
          volume
          year
          unit
        }
      }
    }
    totalCount
    pageInfo {
      hasPreviousPage
      hasNextPage
    }
  }
}
    `;

/**
 * __useProjectsTableDataQuery__
 *
 * To run a query within a React component, call `useProjectsTableDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectsTableDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectsTableDataQuery({
 *   variables: {
 *      iso3166: // value for 'iso3166'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useProjectsTableDataQuery(baseOptions: Apollo.QueryHookOptions<ProjectsTableDataQuery, ProjectsTableDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectsTableDataQuery, ProjectsTableDataQueryVariables>(ProjectsTableDataDocument, options);
      }
export function useProjectsTableDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectsTableDataQuery, ProjectsTableDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectsTableDataQuery, ProjectsTableDataQueryVariables>(ProjectsTableDataDocument, options);
        }
export type ProjectsTableDataQueryHookResult = ReturnType<typeof useProjectsTableDataQuery>;
export type ProjectsTableDataLazyQueryHookResult = ReturnType<typeof useProjectsTableDataLazyQuery>;
export type ProjectsTableDataQueryResult = Apollo.QueryResult<ProjectsTableDataQuery, ProjectsTableDataQueryVariables>;
export const SourcesDocument = gql`
    query Sources {
  sources {
    nodes {
      description
      name
      namePretty
      sourceId
      url
      documentUrl
      latestCurationAt
    }
  }
}
    `;

/**
 * __useSourcesQuery__
 *
 * To run a query within a React component, call `useSourcesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSourcesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSourcesQuery({
 *   variables: {
 *   },
 * });
 */
export function useSourcesQuery(baseOptions?: Apollo.QueryHookOptions<SourcesQuery, SourcesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SourcesQuery, SourcesQueryVariables>(SourcesDocument, options);
      }
export function useSourcesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SourcesQuery, SourcesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SourcesQuery, SourcesQueryVariables>(SourcesDocument, options);
        }
export type SourcesQueryHookResult = ReturnType<typeof useSourcesQuery>;
export type SourcesLazyQueryHookResult = ReturnType<typeof useSourcesLazyQuery>;
export type SourcesQueryResult = Apollo.QueryResult<SourcesQuery, SourcesQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "GeometryGeometry": [
      "GeometryGeometryCollection",
      "GeometryLineString",
      "GeometryMultiLineString",
      "GeometryMultiPoint",
      "GeometryMultiPolygon",
      "GeometryPoint",
      "GeometryPolygon"
    ],
    "GeometryGeometryM": [
      "GeometryGeometryCollectionM",
      "GeometryLineStringM",
      "GeometryMultiLineStringM",
      "GeometryMultiPointM",
      "GeometryMultiPolygonM",
      "GeometryPointM",
      "GeometryPolygonM"
    ],
    "GeometryGeometryZ": [
      "GeometryGeometryCollectionZ",
      "GeometryLineStringZ",
      "GeometryMultiLineStringZ",
      "GeometryMultiPointZ",
      "GeometryMultiPolygonZ",
      "GeometryPointZ",
      "GeometryPolygonZ"
    ],
    "GeometryGeometryZM": [
      "GeometryGeometryCollectionZM",
      "GeometryLineStringZM",
      "GeometryMultiLineStringZM",
      "GeometryMultiPointZM",
      "GeometryMultiPolygonZM",
      "GeometryPointZM",
      "GeometryPolygonZM"
    ],
    "GeometryInterface": [
      "GeometryGeometryCollection",
      "GeometryGeometryCollectionM",
      "GeometryGeometryCollectionZ",
      "GeometryGeometryCollectionZM",
      "GeometryLineString",
      "GeometryLineStringM",
      "GeometryLineStringZ",
      "GeometryLineStringZM",
      "GeometryMultiLineString",
      "GeometryMultiLineStringM",
      "GeometryMultiLineStringZ",
      "GeometryMultiLineStringZM",
      "GeometryMultiPoint",
      "GeometryMultiPointM",
      "GeometryMultiPointZ",
      "GeometryMultiPointZM",
      "GeometryMultiPolygon",
      "GeometryMultiPolygonM",
      "GeometryMultiPolygonZ",
      "GeometryMultiPolygonZM",
      "GeometryPoint",
      "GeometryPointM",
      "GeometryPointZ",
      "GeometryPointZM",
      "GeometryPolygon",
      "GeometryPolygonM",
      "GeometryPolygonZ",
      "GeometryPolygonZM"
    ],
    "Node": [
      "CalculationConstant",
      "Co2Cost",
      "ConversionConstant",
      "Country",
      "CountryDataPoint",
      "NeCountry",
      "Page",
      "PrefixConversion",
      "Project",
      "ProjectDataPoint",
      "Query",
      "Source"
    ]
  }
};
      export default result;
    
/*
export const Co2CostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CO2Costs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"co2Costs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"currency"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"StringValue","value":"USD","block":false}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"costPerTon"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]}}]} as unknown as DocumentNode<Co2CostsQuery, Co2CostsQueryVariables>;
export const CalculationConstantsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CalculationConstants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"calculationConstants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"constantType"}},{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"factor"}},{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"modifier"}},{"kind":"Field","name":{"kind":"Name","value":"nodeId"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"reference"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}}]} as unknown as DocumentNode<CalculationConstantsQuery, CalculationConstantsQueryVariables>;
export const ConversionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Conversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"conversionConstants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"authority"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"fromUnit"}},{"kind":"Field","name":{"kind":"Name","value":"toUnit"}},{"kind":"Field","name":{"kind":"Name","value":"high"}},{"kind":"Field","name":{"kind":"Name","value":"factor"}},{"kind":"Field","name":{"kind":"Name","value":"low"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"modifier"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}}]}}]}}]}}]} as unknown as DocumentNode<ConversionsQuery, ConversionsQueryVariables>;
export const CountryBorderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryBorder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isoA2"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"neCountries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"isoA2"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isoA2"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geometry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}},{"kind":"Field","name":{"kind":"Name","value":"srid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isoA2"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geoPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}},{"kind":"Field","name":{"kind":"Name","value":"srid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"projectIdentifier"}}]}}]}}]}}]} as unknown as DocumentNode<CountryBorderQuery, CountryBorderQueryVariables>;
export const CountryCurrentProductionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryCurrentProduction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCountryCurrentProduction"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"iso3166_"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}}]}}]}}]}}]} as unknown as DocumentNode<CountryCurrentProductionQuery, CountryCurrentProductionQueryVariables>;
export const CountryProductionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryProduction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryDataPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"YEAR_ASC"},{"kind":"EnumValue","value":"SOURCE_ID_ASC"},{"kind":"EnumValue","value":"FOSSIL_FUEL_TYPE_ASC"}]}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"iso31662"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dataType"},"value":{"kind":"EnumValue","value":"PRODUCTION"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"dataType"}}]}}]}}]}}]} as unknown as DocumentNode<CountryProductionQuery, CountryProductionQueryVariables>;
export const CountryProjectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryProjection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryDataPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"iso31662"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dataType"},"value":{"kind":"EnumValue","value":"PROJECTION"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"dataType"}}]}}]}}]}}]} as unknown as DocumentNode<CountryProjectionQuery, CountryProjectionQueryVariables>;
export const CountryReservesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountryReserves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryDataPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"iso31662"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dataType"},"value":{"kind":"EnumValue","value":"RESERVE"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"dataType"}}]}}]}}]}}]} as unknown as DocumentNode<CountryReservesQuery, CountryReservesQueryVariables>;
export const CountrySourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountrySources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCountrySources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"iso3166_"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}},{"kind":"Argument","name":{"kind":"Name","value":"iso31662_"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso31662"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataPoints"}},{"kind":"Field","name":{"kind":"Name","value":"dataType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"latestCurationAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"namePretty"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"records"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"grades"}}]}}]}}]}}]} as unknown as DocumentNode<CountrySourcesQuery, CountrySourcesQueryVariables>;
export const LargestProjectsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LargestProjects"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"PRODUCTION_CO2E_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"30"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"iso3166"}},{"kind":"Field","name":{"kind":"Name","value":"projectIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"productionCo2E"}},{"kind":"Field","name":{"kind":"Name","value":"projectType"}},{"kind":"Field","name":{"kind":"Name","value":"fuels"}},{"kind":"Field","name":{"kind":"Name","value":"lastYear"}},{"kind":"Field","name":{"kind":"Name","value":"geoPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}},{"kind":"Field","name":{"kind":"Name","value":"srid"}}]}}]}}]}}]}}]} as unknown as DocumentNode<LargestProjectsQuery, LargestProjectsQueryVariables>;
export const PrefixConversionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PrefixConversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"prefixConversions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"factor"}},{"kind":"Field","name":{"kind":"Name","value":"fromPrefix"}},{"kind":"Field","name":{"kind":"Name","value":"toPrefix"}}]}}]}}]}}]} as unknown as DocumentNode<PrefixConversionsQuery, PrefixConversionsQueryVariables>;
export const ProducingCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProducingCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProducingIso3166"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"borders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}}]}},{"kind":"Field","name":{"kind":"Name","value":"centroid"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}}]}},{"kind":"Field","name":{"kind":"Name","value":"iso3166"}},{"kind":"Field","name":{"kind":"Name","value":"iso31662"}},{"kind":"Field","name":{"kind":"Name","value":"fr"}},{"kind":"Field","name":{"kind":"Name","value":"es"}},{"kind":"Field","name":{"kind":"Name","value":"en"}},{"kind":"Field","name":{"kind":"Name","value":"sv"}},{"kind":"Field","name":{"kind":"Name","value":"productionCo2E"}},{"kind":"Field","name":{"kind":"Name","value":"productionSnapshotData"}}]}}]}}]}}]} as unknown as DocumentNode<ProducingCountriesQuery, ProducingCountriesQueryVariables>;
export const ProjectDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Project"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dataYear"}},{"kind":"Field","name":{"kind":"Name","value":"lastYear"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"geoPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}},{"kind":"Field","name":{"kind":"Name","value":"srid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"iso3166"}},{"kind":"Field","name":{"kind":"Name","value":"iso31662"}},{"kind":"Field","name":{"kind":"Name","value":"linkUrl"}},{"kind":"Field","name":{"kind":"Name","value":"locationName"}},{"kind":"Field","name":{"kind":"Name","value":"methaneM3Ton"}},{"kind":"Field","name":{"kind":"Name","value":"ocOperatorId"}},{"kind":"Field","name":{"kind":"Name","value":"operatorName"}},{"kind":"Field","name":{"kind":"Name","value":"productionCo2E"}},{"kind":"Field","name":{"kind":"Name","value":"productionMethod"}},{"kind":"Field","name":{"kind":"Name","value":"productionType"}},{"kind":"Field","name":{"kind":"Name","value":"projectIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"projectType"}},{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"sourceProjectId"}},{"kind":"Field","name":{"kind":"Name","value":"sourceProjectName"}},{"kind":"Field","name":{"kind":"Name","value":"projectDataPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataType"}},{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}},{"kind":"Field","name":{"kind":"Name","value":"dataYear"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectQuery, ProjectQueryVariables>;
export const ProjectGeoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectGeo"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"projectIdentifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectIdentifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"projectIdentifier"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"geoPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}},{"kind":"Field","name":{"kind":"Name","value":"srid"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ProjectGeoQuery, ProjectGeoQueryVariables>;
export const ProjectProductionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectProduction"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectDataPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dataType"},"value":{"kind":"EnumValue","value":"PRODUCTION"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"projectId"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectProductionQuery, ProjectProductionQueryVariables>;
export const ProjectProjectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectProjection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectDataPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dataType"},"value":{"kind":"EnumValue","value":"PROJECTION"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectProjectionQuery, ProjectProjectionQueryVariables>;
export const ProjectReservesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectReserves"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projectDataPoints"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"YEAR_ASC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"projectId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"dataType"},"value":{"kind":"EnumValue","value":"RESERVE"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}},{"kind":"Field","name":{"kind":"Name","value":"subtype"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectReservesQuery, ProjectReservesQueryVariables>;
export const ProjectSourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectSources"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjectSources"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"forId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataPoints"}},{"kind":"Field","name":{"kind":"Name","value":"dataType"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"latestCurationAt"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"namePretty"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"records"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"documentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"quality"}},{"kind":"Field","name":{"kind":"Name","value":"grade"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectSourcesQuery, ProjectSourcesQueryVariables>;
export const ProjectsByCountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectsByCountry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166_"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso31662_"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getProjects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"iso3166_"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166_"}}},{"kind":"Argument","name":{"kind":"Name","value":"iso31662_"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso31662_"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"firstYear"}},{"kind":"Field","name":{"kind":"Name","value":"lastYear"}},{"kind":"Field","name":{"kind":"Name","value":"dataYear"}},{"kind":"Field","name":{"kind":"Name","value":"co2"}},{"kind":"Field","name":{"kind":"Name","value":"projectType"}},{"kind":"Field","name":{"kind":"Name","value":"geoPosition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"geojson"}},{"kind":"Field","name":{"kind":"Name","value":"srid"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fuels"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsByCountryQuery, ProjectsByCountryQueryVariables>;
export const ProjectsCountDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectsCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<ProjectsCountQuery, ProjectsCountQueryVariables>;
export const ProjectsTableDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProjectsTableData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"projects"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"PRODUCTION_CO2E_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"condition"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"iso3166"},"value":{"kind":"Variable","name":{"kind":"Name","value":"iso3166"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"not"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"productionCo2E"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"equalTo"},"value":{"kind":"IntValue","value":"0"}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"projectIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"productionCo2E"}},{"kind":"Field","name":{"kind":"Name","value":"fuels"}},{"kind":"Field","name":{"kind":"Name","value":"dataYear"}},{"kind":"Field","name":{"kind":"Name","value":"firstYear"}},{"kind":"Field","name":{"kind":"Name","value":"lastYear"}},{"kind":"Field","name":{"kind":"Name","value":"projectDataPoints"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataYear"}},{"kind":"Field","name":{"kind":"Name","value":"fossilFuelType"}},{"kind":"Field","name":{"kind":"Name","value":"volume"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"unit"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<ProjectsTableDataQuery, ProjectsTableDataQueryVariables>;
export const SourcesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Sources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"namePretty"}},{"kind":"Field","name":{"kind":"Name","value":"sourceId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"documentUrl"}},{"kind":"Field","name":{"kind":"Name","value":"latestCurationAt"}}]}}]}}]}}]} as unknown as DocumentNode<SourcesQuery, SourcesQueryVariables>;
*/