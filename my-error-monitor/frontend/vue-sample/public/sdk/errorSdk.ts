namespace SdkSpace {
  interface baseMsg {
    sppKey: string;
    requestId: String; // 一个界面产生一个requestId
    traceId: String; // 一个阶段产生一个traceId，用于追踪和一个异常相关的所有日志记录
    hash: String; // 这条log的唯一标识码，相当于logId，但它是根据当前日志记录的具体内容而生成的
    time: Number; // 当前日志产生的时间（保存时刻）

    path: String; // 所在路径，URL
    action: String; // 进行了什么操作
    referer: String; // 上一个路径，来源URL
    prevAction: String; // 上一个操作
    data: Object; // 当前界面的state、data
    dataSources: Array<Object>; // 上游a:i给了什么数
    dataSend: Object; // 提交了什么数据

    errorType: String; // 错误类型
    errorLevel: String; // 异常级别
    errorStack: String; // 错误stack信息
    errorFilename: String; // 出错文件
    errorLineNo: Number; // 出错行
    errorColNo: Number; //出错列位置
    errorMessage: String; //错误描述（开发者定义）
    errorTimeStamp: Number; //时间戳

    pageW: Number; //页面宽度
    pageH: Number; //页面高度
    screenW: Number; //屏幕宽度
    screenH: Number; //屏幕高度
  }
  interface UserMsg {
    userId: String; //
    userStatus: Number; // 当时，用户状态信息（是否可用/禁用）
    userRoles: Array<any>; //当时，前用户的角色列表
    userGroups: Array<any>; //当时，用户当前所在组，组别权限可能影响结果
    userLicenses: Array<any>; //当时，许可证，可能过期
  }
  interface EnvMsg {
    network: String; //网络环境描述
    userAgent: String; //客户端描述
    device: String; //设备描述
    system: String; //操作系统描述
    appVersion: String; //应用版本
    apiVersion: String; //接口版本
  }
  interface DomMsg {
    targetElement: HTMLElement; // 用户操作的DOM元素
    targetDOMPath: Array<HTMLElement>; // 该DOM元素的节点路径
    targetCSS: Object; // 该元素的自定义样式表
    targetAttrs: Object; // 该元素当前的属性及值
    pageX: Number; //事件x轴坐标
    pageY: Number; //事件y轴坐标
    screenX: Number; //事件x轴坐标
    eventType: String; //事件类型
    eventKey: String; //触发事件的键
    screenY: Number; //事件y轴坐标
  }
}
