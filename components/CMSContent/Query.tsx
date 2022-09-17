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

const stringSorter = (a: any, b: any, c: any) => a[c].localeCompare(b[c])
const numberSorter = (a: any, b: any, c: any) => Math.sign(a[c] - b[c])

interface Block {
	Columns: any
	query: string
	iso3166: string
	iso3166_2: string
}

interface Props {
	block: Block
}

export default function Query({block}: Props) {
	const cols = Object.keys(block.Columns) ?? []
	const [sorting, setSorting] = React.useState<SortingState>([]);

	const q = `query ${block.query} { ${block.query} { nodes { ${cols.join(' ')} } } }`
	const query = gql`${q}`

	const {data} = useQuery(query)
	let actualData: Array<any> = []
	if (data) {
		const result = Object.keys(data)[0]
		actualData = data[result].nodes
	}

	const columnHelper = createColumnHelper()

	const columns = cols.map(c => {
		let title = block.Columns[c]
		let type = 'string'
		if (title.includes(':')) {
			const s = title.split(':')
			// eslint-disable-next-line prefer-destructuring
			title = s[0];
			// eslint-disable-next-line prefer-destructuring
			type = s[1]
		}
		// @ts-ignore
		return columnHelper.accessor(c, {
			id: c,
			cell: info => info.getValue(),
			header: c,
		})
	})

	const table = useReactTable({
		columns,
		data: actualData,
		getCoreRowModel: getCoreRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		state: {sorting}
	})

	// console.log(columns)

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
