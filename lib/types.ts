export type FossilFuelType = 'oil' | 'gas' | 'coal'
export type FuelSubType = 'Subbituminous' | 'Anthracite' | 'Bituminous' | 'Lignite' | 'Coking Coal'

export interface ICMSImage {
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

export interface ICMSPage {
	id: string,
	attributes: Page
}

export interface Article {
	id: number,
	Headline: string,
	Category: string,
	slug: string,
	Content: Array<any>,
	Image: ICMSImage
}

export interface ICMSArticle {
	id: string,
	attributes: Article
}

export interface Datapoint {
	fossilFuelType: string,
	subtype: string
}

export type MenuItem = {
	id: string,
	URL: string,
	Text: string
	Page: { data: ICMSPage },
	Article: { data: ICMSArticle },
	Submenu: Array<any>,
	Column: number
}

export interface FooterProps {
	Items: MenuItem[],
	Copyright: string
}
