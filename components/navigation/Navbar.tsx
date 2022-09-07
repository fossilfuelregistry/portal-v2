import React from 'react'
import {
	Box,
	Button,
	Flex,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	SpaceProps,
	ColorProps,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';
import {ChevronDownIcon, CloseIcon, HamburgerIcon} from '@chakra-ui/icons';
import {MenuItem as MenuItemType} from "lib/types";
import Link from "next/link";
import useText from "lib/useText";

interface RenderLinkOrSubmenuProps {
	item: MenuItemType,
	// eslint-disable-next-line react/require-default-props
	marginInlineStart?: SpaceProps["marginInlineStart"],
	// eslint-disable-next-line react/require-default-props
	marginInlineEnd?: SpaceProps["marginInlineEnd"],
	// eslint-disable-next-line react/require-default-props
	mb?: SpaceProps["mb"],
	// eslint-disable-next-line react/require-default-props
	color?: ColorProps["color"],
}

const RenderLinkOrSubmenu = ({item, marginInlineStart, marginInlineEnd, mb, color}: RenderLinkOrSubmenuProps) => {
	let href = item.URL ?? '#'
	if (item.Page?.data)
		href = `/${item.Page.data.attributes?.slug}`
	if (item.Article?.data)
		href = `/article/ ${item.Article.data.attributes?.slug}`

	if (!(item.Submenu?.length > 0)) {
		return (
			<Box key={item.id} marginInlineStart={marginInlineStart} marginInlineEnd={marginInlineEnd} mb={mb}>
				<Link href={href} passHref>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<a><Text textStyle="menu" color={color}>{item.Text}</Text></a>
				</Link>
			</Box>
		)
	}

	return (
		<Menu key={item.id}>
			<MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
				{item.Text}
			</MenuButton>
			<MenuList>
				{item.Submenu.map(i => {
					let hr = item.URL ?? '#'
					if (i.Page?.data)
						hr = `/${i.Page.data.attributes?.slug}`
					if (i.Article?.data)
						hr = `/article/${i.Article.data.attributes?.slug}`
					return <Link key={i.id} href={hr}><MenuItem>{i.Text}</MenuItem></Link>
				})}
			</MenuList>
		</Menu>
	)
}

interface NavbarProps {
	menu: MenuItemType[],
	texts: any
}

export default function Navbar({menu, texts}: NavbarProps) {
	const {isOpen, onOpen, onClose} = useDisclosure();
	const {translate} = useText()

	return (
		<Flex justifyContent="space-around">
			<Box px={{base: '24px', md: '100px'}} w="100%">
				<Flex h={16} alignItems="center" justifyContent="space-between">
					<IconButton
						size="md"
						icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
						aria-label="Open Menu"
						display={{md: 'none'}}
						onClick={isOpen ? onClose : onOpen}
					/>
					<Flex alignItems="center" justifyContent="space-between" w="100%">
						<Box>{translate('grff')}</Box>
						<Flex
							as="nav" alignItems="center"
							display={{base: 'none', md: 'flex'}}>
							{menu.map(item => <RenderLinkOrSubmenu item={item} key={item.id} marginInlineEnd="48px"/>)}
						</Flex>
					</Flex>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{md: 'none'}}>
						<Stack as="nav" spacing={4}>
							{menu.map(item => <RenderLinkOrSubmenu item={item} key={item.id}/>)}
						</Stack>
					</Box>
				) : null}
			</Box>
		</Flex>
	);
}

export {RenderLinkOrSubmenu}
