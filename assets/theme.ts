import {extendTheme} from '@chakra-ui/react'

export const colors = {
	common: {
		white: '#FFFFFF',
		black: '#000000',
	},
	primary: {
		brandingBlue: '#1172BA',
		blue10: 'rgba(17, 114, 186, 0.1)',
		richBlue: '#0C2953',
		darkBlue: '#0A2244',
		richBlack: '#040404',
		grey70: '#858585',
		grey25: '#BFBFBF',
		grey10: '#EBEBEB',
		grey30: '#ccc',
		grey5: '#F6F6F6',
		grey2: '#FAFAFA',
		red: '#C4362D',
		green: '#4AA233',
	},
	category: {
		'Global report': '#E05267',
		'Country report': '#FFB35E',
		'Fossil fuels': '#BA62B6',
		Renewables: '#62D968',
		Other: '#4C6EE6',
		About: '#4AA233',
	},
}

export default extendTheme({
	fonts: {
		heading: `'sommet-rounded', 'Roboto', sans-serif`,
		body: `'Roboto', sans-serif`,
	},

	colors,

	styles: {
		global: {
			p: {
				_notLast: {
					marginBottom: '20px',
				},
			},
			h2: {
				marginBottom: '20px',
				lineHeight: '52px'
			},
			h3: {
				fontFamily: 'sommet-rounded, sans-serif',
				fontSize: '32px',
				marginTop: '24px',
				marginBottom: '12px',
				lineHeight: '46px'
			},
			h5: {
				fontSize: ['20px'],
				lineHeight: ['24px'],
				fontWeight: '700',
			},
			a: {
				color: 'primary.brandingBlue',
			},
		},
	},

	textStyles: {
		menu: {
			fontSize: ['16px'],
			fontWeight: '700',
			color: 'common.black',
		},
		inverse: {
			color: '#ffffff',
		},
	},

	fontSizes: {
		'3xl': '40px',
		'4xl': '60px',
		'5xl': '44px',
	},

	components: {
		Button: {
			baseStyle: {
				fontWeight: '700',
			},
			variants: {
				inverse: {
					background: 'transparent',
					color: 'common.white',
					borderColor: 'common.white',
					border: '2px solid',
				}
			},
			defaultProps: {
				size: 'lg', // default is md
			},
		},
	},
})
