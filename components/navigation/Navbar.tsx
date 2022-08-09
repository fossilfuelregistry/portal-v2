import {ReactNode} from 'react';
import {
	Box,
	Flex,
	Text,
	HStack,
	Link,
	IconButton,
	Button,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	useDisclosure,
	useColorModeValue,
	Stack,
} from '@chakra-ui/react';
import {HamburgerIcon, CloseIcon, ChevronDownIcon} from '@chakra-ui/icons';

const RenderLinkOrSubmenu = ({item}) => {
	let href = item.URL ?? '#'
	if(item.Page?.data)
		href = '/' + item.Page.data.attributes?.slug
	if(item.Article?.data)
		href = '/article/ '+ item.Article.data.attributes?.slug
	if (!(item.Submenu?.length > 0)) {
		return <Link
			key={item.id}
			px={2}
			py={1}
			rounded={'md'}
			_hover={{
				textDecoration: 'none',
				bg: useColorModeValue('gray.200', 'gray.700'),
			}}
			href={href}>
			<Text textStyle="menu">{item.Text}</Text>
		</Link>
	} else
		return (
			<Menu key={item.id}>
				<MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
					{item.Text}
				</MenuButton>
				<MenuList>
					{item.Submenu.map(i => {
						let href = item.URL ?? '#'
						if(i.Page?.data)
							href = '/' + i.Page.data.attributes?.slug
						if(i.Article?.data)
							href = '/article/'+ i.Article.data.attributes?.slug
						return <Link key={i.id} href={href}><MenuItem>{i.Text}</MenuItem></Link>
					})}
				</MenuList>
			</Menu>
		)
}

export default function Navbar({menu, texts}) {
	const {isOpen, onOpen, onClose} = useDisclosure();

	return (
		<Flex justifyContent="space-around">
			<Box px={{base:'24px', md:'100px'}} w="100%">
				<Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
					<IconButton
						size={'md'}
						icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
						aria-label={'Open Menu'}
						display={{md: 'none'}}
						onClick={isOpen ? onClose : onOpen}
					/>
					<HStack spacing={8} alignItems={'center'} justifyContent={'space-between'} w="100%">
						<Box>{texts.grff}</Box>
						<HStack
							as={'nav'}
							spacing={4}
							display={{base: 'none', md: 'flex'}}>
							{menu.map(item => <RenderLinkOrSubmenu item={item} key={item.id}/>)}
						</HStack>
					</HStack>
				</Flex>

				{isOpen ? (
					<Box pb={4} display={{md: 'none'}}>
						<Stack as={'nav'} spacing={4}>
							{menu.map(item => <RenderLinkOrSubmenu item={item} key={item.id}/>)}
						</Stack>
					</Box>
				) : null}
			</Box>
		</Flex>
	);
}