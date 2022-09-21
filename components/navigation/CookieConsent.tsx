import React, {useCallback, useEffect, useState} from 'react'
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/react"
import useText from "lib/useText"
import {setCookie, hasCookie, getCookie} from 'cookies-next'

const CookieConsent = () => {
	const {translate} = useText()
	const [open, set_open] = useState(!hasCookie('localConsent'))

	const onClose = useCallback(() => {
		set_open(false)
	}, [])

	useEffect(() => {
		const localConsent = getCookie('localConsent')
		if(localConsent === 'true') {
			// @ts-ignore
			window.gtag('consent', 'update', {
				ad_storage: 'granted',
				analytics_storage: 'granted',
			})
		}
	}, [])

	const acceptCookie = () => {
		setCookie('localConsent', 'true', {maxAge: 60 * 60 * 24 * 365})
		// @ts-ignore
		window.gtag('consent', 'update', {
			ad_storage: 'granted',
			analytics_storage: 'granted',
		})
		onClose()
	}

	const rejectCookie = () => {
		setCookie('localConsent', 'false', {maxAge: 60 * 60 * 24 * 365})
		onClose()
	}

	return (
		<Modal isOpen={open} onClose={onClose}>
			<ModalOverlay/>
			<ModalContent>
				<ModalHeader>{translate('cookie_consent_header')}</ModalHeader>
				<ModalBody>
					{translate('cookie_consent')}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme='blue' mr={3} onClick={rejectCookie}>
						{translate('reject')}
					</Button>
					<Button colorScheme='blue' onClick={acceptCookie}>
						{translate('accept')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default CookieConsent
