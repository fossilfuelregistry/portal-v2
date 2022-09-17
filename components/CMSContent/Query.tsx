import React from 'react'
import {gql, useQuery} from "@apollo/client"
import {Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from "@tanstack/react-table";

const DEBUG = false

const stringSorter = (a: any, b: any, c: any) => a[c].localeCompare(b[c])
const numberSorter = (a: any, b: any, c: any) => Math.sign(a[c] - b[c])

interface Block {
	Columns: any
	query: string
	graphQLFilter: string
}

interface Props {
	block: Block
}

export default function Query({block}: Props) {
	const cols = block.Columns.filter((c: any) => !c.hidden)
	const colNames = cols.map((c: any) => c.data)
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const condition = block.graphQLFilter?.length > 0 ? `(condition: ${block.graphQLFilter})` : ''

	const q = `query { ${block.query}${condition} { nodes { ${colNames.join(' ')} } } }`
	DEBUG && console.log('GRAPHQL', q)
	const query = gql`${q}`

	const {data} = useQuery(query)
	let actualData: Array<any> = []
	if (data) {
		const result = Object.keys(data)[0]
		actualData = data[result].nodes
	}

	const columnHelper = createColumnHelper()

	const columns = cols.map((c: any) => columnHelper.accessor(c.data, {
		id: c.id,
		cell: info => info.getValue(),
		header: c.name,
	}))

	const table = useReactTable({
		columns,
		data: actualData,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {sorting}
	})

	console.log(columns)

	if (!data) return null

	return (
		<div className="query">
			<Table>

				<Thead>
					{table.getHeaderGroups().map(headerGroup => (
						<Tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<Th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</Th>
							))}
						</Tr>
					))}
				</Thead>

				<Tbody>
					{table.getRowModel().rows.map((row) => (
						<Tr key={row.id}>
							{row.getVisibleCells().map((cell) => {
								// see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
								const {meta} = cell.column.columnDef;
								return (
									<Td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</Td>
								);
							})}
						</Tr>
					))}
				</Tbody>
			</Table>

		</div>
	)
}
