export type FossilFuelType = 'oil' | 'gas' | 'coal'
export type FuelSubType = 'Subbituminous' | 'Anthracite' | 'Bituminous' | 'Lignite' | 'Coking Coal'

export interface CMS_Image {
	data: {
		attributes: {
			url: string
		}
	}
}

export interface Page {
	slug: string | string[],
	Content: Array<any>,
	Title: string
}

export interface CMS_Page {
	id: string,
	attributes: Page
}

export interface Article {
	slug: string | string[],
	Content: Array<any>,
	Title: string
}

export interface CMS_Article {
	id: string,
	attributes: Article
}

export interface Datapoint {
	fossilFuelType: string,
	subtype: string
}