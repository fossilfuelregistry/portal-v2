import React, {useCallback, useState} from 'react'
import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from "@chakra-ui/react";
import useText from "lib/useText";

const CookieConsent = () => {
	const {translate} = useText()
	const [open, set_open] = useState(true)
	const onClose = useCallback( () => {
		set_open(false)
	}, [])

	return (
			<Modal isOpen={open} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Modal Title</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{translate('cookie_consent')}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
	)}

export default CookieConsent
