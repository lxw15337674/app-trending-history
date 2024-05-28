import type { Metadata } from 'next';
import Link from 'next/link';
import dayjs from 'dayjs';
import { Badge } from '@/components/ui/badge';
import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import data from './全部.json'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DatePicker } from '@/components/DayPicker';
import { numberWithUnit } from '@/lib/utils';
import { DataTable } from '@/components/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { AppInfo } from '@/components/type';
import { columns } from '@/components/columns';
interface HotsProps {
  params: { date: string };
  searchParams: {
    categoryId: number;
  }
}

const ClassIds = [
  { name: "全部", id: 0 },
  { name: "综合资讯", id: 1 },
  { name: "电子商务", id: 2 },
  { name: "社交网络", id: 3 },
  { name: "实用工具", id: 4 },
  { name: "金融理财", id: 5 },
  { name: "学习教育", id: 6 },
  { name: "美食外卖", id: 7 },
  { name: "生活服务", id: 8 },
  { name: "通讯聊天", id: 9 },
  { name: "游戏服务", id: 10 },
  { name: "下载分发", id: 11 },
  { name: "女性亲子", id: 12 },
  { name: "视频服务", id: 13 },
  { name: "健康医疗", id: 14 },
  { name: "汽车服务", id: 15 },
  { name: "电子阅读", id: 16 },
  { name: "办公管理", id: 17 },
  { name: "搜索服务", id: 18 },
  { name: "智能穿戴", id: 19 },
  { name: "音乐音频", id: 20 },
  { name: "拍摄美化", id: 21 },
  { name: "旅游出行", id: 22 },
  { name: "房产服务", id: 23 },
];

export async function generateMetadata(
  { params }: HotsProps,
): Promise<Metadata> {
  const date = params.date;
  return {
    title: `APP日活  ${date}`,
    description: `APP日活  ${date}`,
  };
}


async function getData(date: string, categoryId: number): Promise<AppInfo[]> {
  // const category = ClassIds.find((item) => item.id === categoryId)?.name || "全部";
  // debugger
  // const res = await fetch(
  //   // `https://cdn.jsdelivr.net/gh/lxw15337674/weibo-trending-hot-history@master/api/${date}/summary.json`,
  //   `https://raw.githubusercontent.com/lxw15337674/app-trending-history/master/api/${date}/${category}.json`,
  //   {
  //     next: { revalidate: 3600 }
  //   }
  // );

  // if (!res.ok) {
  //   return [];
  // }
  // return res.json()

  return data
}

export default async function Hots({ params: { date }, searchParams: { categoryId } }: HotsProps) {
  const data = await getData(date || dayjs().format('YYYY-MM'), categoryId);

  return (
    <main className="p-5 lg:p-0 lg:pt-5">
      <div className="mx-auto max-w-[980px]">
        <Menubar className="flex justify-between">
          <MenubarMenu>
            <Link
              href={`/hots/${dayjs(date).add(1, 'month').format('YYYY-MM')}`}
            >
              <MenubarTrigger
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                上一个月
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
          <MenubarMenu>
            {/* <DatePicker value={date} categoryId={categoryId} /> */}
          </MenubarMenu>
          <MenubarMenu >
            <Link
              href={`/hots/${dayjs(date).add(1, 'month').format('YYYY-MM')}`}
            >
              <MenubarTrigger
                className="cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={dayjs(date).isAfter(dayjs().subtract(1, 'day'))}
              >
                后一个月
              </MenubarTrigger>
            </Link>
          </MenubarMenu>
        </Menubar>
      </div>
      <div className="mx-auto flex max-w-[980px] flex-col gap-2 py-4">
        <DataTable data={data} columns={columns} />
      </div>
    </main>
  );
}
