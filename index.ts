import _ from 'lodash';
import { ensureDir, fetchData, getPreMonthTimeId, getTimeName, sleep, writeFile } from './utils';
import { AppInfo } from './type';
import dayjs from 'dayjs';

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


let RETRY_TIME = 5;


async function saveMonthJson(words: AppInfo[], category: string, timeId: number) {
  const dir = `./api/${getTimeName(timeId)}`;
  await ensureDir(dir);
  const path = `${dir}/${category}.json`;
  await writeFile(path, JSON.stringify(words, null, 2));
  console.log(`save ${category} data to ${path}`);
}

// 获取之前每个月的数据,直到数据为空
const getAllMonthData = async () => {
  let timeId = getPreMonthTimeId(dayjs());
  while (timeId >= 202101) {
    for (let cls of ClassIds) {
      // 只能获取前一个月数据
      const data = await fetchData(cls.id, timeId)
      if (data.length > 0) {
        await saveMonthJson(data, cls.name, timeId);
      } else {
        return
      }
      // 停1s
      await sleep(1000);
    }
    timeId = getPreMonthTimeId(dayjs(timeId.toString()));
  }
}

async function bootstrap() {
  while (RETRY_TIME > 0) {
    try {
      for (let cls of ClassIds) {
        const timeId = getPreMonthTimeId(dayjs());
        // 只能获取前一个月数据
        const data = await fetchData(cls.id, timeId)
        if (data.length > 0) {
          await saveMonthJson(data, cls.name, timeId);
        }
        // 停1s
        await sleep(1000);
      }
      // await getAllMonthData()
      RETRY_TIME = 0;
    } catch (err) {
      console.log(err);
      RETRY_TIME -= 1;
    }
  }
  process.exit(0);
}

bootstrap();