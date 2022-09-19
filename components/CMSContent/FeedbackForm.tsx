import React, {ChangeEvent, MouseEvent, useState} from 'react'
import {Box, Button, Checkbox, Flex, FormControl, FormLabel, Input, Select, Textarea} from '@chakra-ui/react';
import CMSBlock from "components/CMSContent/CMSBlock";
import useText from "lib/useText";
import {useRouter} from "next/router";

interface Block {
	Recipient: string
	Subject: string
	Fields: Array<{ Name: string, Type: string }>
	SubmittedMessage: string
	id: string
}

interface Props {
	block: Block
}

const FeedbackForm = ({block}: Props) => {
	const [state, set_state] = useState('filling')
	const [values, set_values] = useState({})
	const {Fields} = block
	const {translate} = useText()
	const router = useRouter()

	const handleChange = (event:
							  ChangeEvent<HTMLInputElement> |
							  ChangeEvent<HTMLSelectElement> |
							  ChangeEvent<HTMLTextAreaElement>,
						  fieldName: string, option?: string) => {
		if(option) {
			// @ts-ignore
			const options = {...values[fieldName]}
			// @ts-ignore
			options[option] = event.target.checked
			set_values(v => Object.assign(v, {[fieldName]: options}))
		} else {
			set_values(v => Object.assign(v, {[fieldName]: event.target.value}))
		}
	}

	const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		set_state('submitting')
		const text = JSON.stringify({...values, url: router.asPath})
		const api = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/mail`, {
			method: 'POST',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				text,
				formId: block.id
			})
		})
		if (api.ok)
			set_state('submitted')
		else
			set_state(`Error: ${api.status} ${api.statusText} ${(await api.text())}`)
	}

		return (
			<CMSBlock>

				{(state === 'filling' || state === 'submitting') &&
					<div>
						{Fields.map((field: any) => {
							let control
							switch (field.Type) {
								case 'Email':
									control = (
										<Input type="email" placeholder={field.Name}
											   onChange={e => handleChange(e, field.Name)}
										/>
									)
									break;
								case 'Single line':
									control = (
										<Input placeholder={field.Name}
											   onChange={e => handleChange(e, field.Name)}
										/>)
									break;
								case 'Multiple lines':
									control = (
										<Textarea placeholder={field.Name} resize='vertical'
												  onChange={e => handleChange(e, field.Name)}
										/>)
									break;
								case 'Number':
									control = (
										<Input type="number" placeholder={field.Name}
											   onChange={e => handleChange(e, field.Name)}
										/>)
									break;
								case 'Dropdown':
									control = (
										<Select
											placeholder={field.Name}
											onChange={e => handleChange(e, field.Name)}
										>
											{field.Alternatives?.split('\n')?.map((opt: any) => <option key={opt}>{opt}</option>)}
										</Select>)
									break;
								case 'Checkboxes':
									control = (
										<Flex direction="column">
											{field.Alternatives?.split('\n')?.map((opt: any) =>
												<Checkbox key={opt} onChange={e => handleChange(e, field.Name, opt)}>{opt}</Checkbox>)}
										</Flex>)
									break;
								default:
							}
							return (
								<FormControl key={field.id} data-id={`FF${field.id}`} mb={6}>
									<FormLabel>{field.Name}</FormLabel>
									{control}
								</FormControl>)
						})
						}
						<Button
							mt={4}
							colorScheme='teal'
							isLoading={state === 'submitting'}
							type='submit'
							onClick={handleSubmit}
						>
							{translate('submit')}
						</Button>
					</div>
				}

				{state === 'submitted' &&
					<Box my={10}>
						{block.SubmittedMessage}
					</Box>
				}

				{state.startsWith('Error') &&
					<Box my={10}>
						{state}
					</Box>
				}
			</CMSBlock>
		)
	}

	export default FeedbackForm
