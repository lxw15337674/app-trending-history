"use client"

import { ColumnDef } from "@tanstack/react-table"
import { AppInfo } from "./type"

export const columns: ColumnDef<AppInfo>[] = [
    {
        header: "排名",
        accessorKey: "Rank",
    },
    {
        header: "应用名称",
        accessorKey: "AppName",
        cell: (props) => {
            return (
                <div className="flex items-center">
                    <img
                        src={props.row.original.AppLogo}
                        alt={props.row.original.AppName}                                    
                        className="w-8 h-8 mr-2"
                    />
                    {props.row.original.AppName}
                </div>
            )
        }
    },
  
    {
        header: "分类名称",
        accessorKey: "FclassName",
        cell: (props) => {
            return (
                <div>{props.row.original.FclassName} - {props.row.original.KclassName}</div>
            )
        }
    },
    {
        header: "独立设备(万台)",
        accessorKey: "UseNum",
    },
    {
        header: "增长率",
        accessorKey: "Growth",
        cell: (props) => {
            // 负的增长率显示绿色，正的增长率显示红色
            return (
                <div className={props.row.original.Growth < 0 ? "text-green-500" : "text-red-500"}>
                    {props.row.original.Growth}%
                </div>
            )
        }
    },

]