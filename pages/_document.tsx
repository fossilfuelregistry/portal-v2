import React from 'react'
import {Html, Head, Main, NextScript} from "next/document";
import Script from 'next/script'

const MyDocument = () => (
	<Html>
	<Head>
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
		<link rel="preconnect" href="https://fonts.googleapis.com"/>
		<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
		<link
			href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
			rel="stylesheet"
		/>
		<link href="/fonts/style.css" rel="stylesheet"/>
		<Script
			src="https://www.googletagmanager.com/gtag/js?id=G-GPBMEJZGPH"
			strategy="afterInteractive"
		/>
		<Script id="google-analytics" strategy="afterInteractive">
			{`
				window.dataLayer = window.dataLayer || []
				function gtag() { window.dataLayer.push(arguments) }
				gtag('consent', 'default', {
             		'ad_storage': 'denied',
             		'analytics_storage': 'denied'
            	})
				gtag('js', new Date())
				gtag('config', 'G-GPBMEJZGPH')
			`}
		</Script>
	</Head>
	<body>
	<Main/>
	<NextScript/>
	</body>
	</Html>
)

export default MyDocument
