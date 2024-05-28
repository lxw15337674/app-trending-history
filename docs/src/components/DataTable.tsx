
// import {
//     Table,
//     TableBody,
//     TableCaption,
//     TableCell,
//     TableFooter,
//     TableHeader,
//     TableRow,
// } from "@/components/ui/table"
// import { AppInfo } from "./type"

// interface Props {
//     data: AppInfo[]
// }
// export function AppDataTable({ data }: Props) {
//     return (
//         <Table>
//             <TableCaption>A list of your recent invoices.</TableCaption>
//             <TableHeader>
//                 <TableRow>
//                     <TableCell className="w-[100px]">排名</TableCell>
//                     <TableCell>名称</TableCell>
//                     <TableCell>分类</TableCell>
//                     <TableCell>独立设备(万台)</TableCell>
//                     <TableCell>环比增幅(%)</TableCell>
//                 </TableRow>
//             </TableHeader>
//             <TableBody>
//                 {data.map((item) => (
//                     <TableRow key={item.Id}>
//                         <TableCell>{item.Rank}</TableCell>
//                         <TableCell className="flex   items-center">
//                             <img
//                                 src={`${item.AppLogo}`}
//                                 alt={item.AppName}
//                                 width={32}
//                                 height={32}
//                                 className="mr-4 rounded-lg"
//                             />
//                             {item.AppName}
//                         </TableCell>
//                         <TableCell>{item.FclassName} - {item.KclassName}</TableCell>
//                         <TableCell>{item.UseNum}</TableCell>
//                         <TableCell>{item.Growth}</TableCell>
//                     </TableRow>
//                 ))}
//             </TableBody>
//             <TableFooter>
//                 <TableRow>
//                     <TableCell colSpan={3}>Total</TableCell>
//                     <TableCell className="text-right">$2,500.00</TableCell>
//                 </TableRow>
//             </TableFooter>
//         </Table>
//     )
// }




"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    data,
    columns
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
