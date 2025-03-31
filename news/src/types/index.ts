// 通用类型定义

// 新闻数据类型
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  time: string;
  tags: string[];
  content?: string;
  image?: string;
}

// 消息类型
export interface Message {
  type: 'user' | 'ai';
  content: string;
  time: Date;
  model?: string;
}

// 热搜话题类型
export interface HotTopic {
  id: number;
  text: string;
  count: string;
}

// 话题追踪类型
export interface TopicTracking {
  time: string;
  title: string;
}

// 路由参数类型
export interface RouteParams {
  id?: string;
  tagName?: string;
}
