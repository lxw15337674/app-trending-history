// 应用数据接口
export interface AppData {
    // 请求状态，例如 "success"
    Status: string;
    // 消息，可以为空
    Msg: string | null;
    // 应用信息列表
    List: AppInfo[];
    // 未知类型的项目，可以为空
    Item: unknown | null;
}

// 应用信息接口
export interface AppInfo {
    // 应用 ID
    Id: number;
    // 应用排名
    Rank: number;
    // 时间排名
    TimeRank: number;
    // Dm 排名
    DmRank: number;
    // 使用人数
    UseNum: number;
    // 日使用人数，可以为空
    DayUseNum: number | null;
    // 时间 ID，例如 202404
    TimeId: number;
    // 时间名称，例如 "2024年04月"
    TimeName: string;
    // 应用 ID
    Appid: number;
    // 应用名称，例如 "网易云音乐"
    AppName: string;
    // 应用图标 URL
    AppLogo: string;
    // 每日活跃设备数，可以为空
    MachineODayNum: number | null;
    // 每日使用时长，可以为空
    MachineODayTime: number | null;
    // 总使用时长，可以为空
    MachineOTimeTime: number | null;
    // 一级分类 ID
    Fclassid: number;
    // 二级分类 ID
    Kclassid: number;
    // 一级分类名称，例如 "音乐音频"
    FclassName: string;
    // 二级分类名称，例如 "在线音乐"
    KclassName: string;
    // 时间类型
    TimeType: number;
    // 增长率
    Growth: number;
    // Dm 增长率，可以为空
    DmGrowth: number | null;
    // 公司名称，可以为空
    Company: string | null;
    // 使用时长，可以为空
    UseTime: number | null;
    // 时长增长率，可以为空
    TimeGrowth: number | null;
    // 每日活跃设备数，可以为空
    DayMachineNum: number | null;
    // 是否为服务
    IsService: boolean;
    // 应用类型
    AppType: number;
    // 域名，可以为空
    Domain: string | null;
    // 是否已更改
    IsChanged: number;
    // C 排名
    CRank: number;
    // 是否标记
    IsMark: boolean;
}