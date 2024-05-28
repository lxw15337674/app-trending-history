import dayjs from "dayjs";
import { AppData, AppInfo } from "./type";
import fs from 'fs/promises';
import { Decimal } from 'decimal.js';
import axios from "axios";

export function createList(words: AppInfo[]): string {
    const lastUpdateTime = dayjs().format('YYYY-MM-DD h:mm A');
    const listItems = words.map((item, index) => {
        const title = item.title;
        const url = item.url;
        const category = item.category ? `\`${item.category.trim()}\`` : '';
        const hot = item.hot;
        return `${index + 1}. [${title}](${url}) ${category} - ${hot}`;
    });

    return `
<!-- BEGIN -->

**最后更新时间**：${lastUpdateTime}
${listItems.join('\n')}

<!-- END -->
`;
}

export function createArchive(words: AppInfo[], date: string): string {
    return `# ${date}\n
共 ${words.length} 条\n
${createList(words)}
`;
}



export const ensureDir = async (dir: string) => {
    try {
        await fs.stat(dir);
    } catch (err) {
        if (err.code === 'ENOENT') {
            await fs.mkdir(dir, { recursive: true });
        } else {
            throw err;
        }
    }
};


export const writeFile = async (path: string, data: string) => {
    try {
        await fs.writeFile(path, data, { encoding: 'utf8' })
    } catch (err) {
        throw err;
    }
}

// 如果没有文件，就创建一个空文件
export const readFile = async (path: string) => {
    try {
        const data = await fs.readFile(path, 'utf8');
        return data;
    } catch (err) {
        if (err.code === 'ENOENT') {
            await writeFile(path, '');
            return '';
        }
    }
};

// 上一个月数据
export const getPreMonthTimeId = (time: dayjs.Dayjs) => {
    const lastMonth = time.subtract(1, 'month');
    return parseInt(lastMonth.format('YYYYMM'));
}

// 根据TimeId获取YYYY-MM格式的时间
export const getTimeName = (timeId: number) => {
    const timeStr = timeId.toString();
    return `${timeStr.slice(0, 4)}-${timeStr.slice(4, 6)}`;
}

export const fetchData = async (classId: number, timeId: number) => {
    const params = {
        classId: classId,
        classLevel: classId === 0 ? 0 : 1,
        timeId: timeId,
        orderBy: 2,
        pageIndex: 1,
        pageSize: 100
    };
    return await axios.get<AppData>('https://index.iresearch.com.cn/app/GetDataList1', {
        params: params
    })
        .then(res => {
            if (res.data.Status === 'success') {
                return res.data.List;
            } else {
                throw new Error('Request failed');
            }
        })
        .catch(error => {
            // 处理错误
            console.error('Axios error:', error);
        });
}


export const sleep = async (ms: number) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
}
