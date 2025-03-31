import { NewsItem } from '../types';
import { newsData } from '../data/newsData';
import http from './request';

// API 路径常量
const API = {
  NEWS: {
    TODAY: '/api/news/today',
    BY_TAG: '/api/news/byTag',
    DETAIL: '/api/news/detail',
  },
  TOPICS: {
    HOT: '/api/topics/hot',
    TRENDING: '/api/topics/trending',
  }
};

// 模拟API请求延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 获取今日要闻列表
 * 目前使用mock数据，后续可替换为真实API
 */
export const fetchTodayNews = async (): Promise<NewsItem[]> => {
  try {
    // 实际项目中使用以下代码：
    // return await http.get<NewsItem[]>(API.NEWS.TODAY);
    
    // 模拟网络请求延迟
    await delay(1000);
    
    // 模拟随机错误，便于测试错误处理
    if (Math.random() < 0.1) { // 10%的概率失败
      throw {
        code: '50001',
        message: '获取新闻列表失败'
      };
    }
    
    return newsData;
  } catch (error: any) {
    console.error('获取今日要闻失败:', error);
    throw error;
  }
};

/**
 * 根据标签获取新闻
 */
export const fetchNewsByTag = async (tag: string): Promise<NewsItem[]> => {
  try {
    // 实际项目中使用以下代码：
    // return await http.get<NewsItem[]>(API.NEWS.BY_TAG, { params: { tag } });
    
    await delay(800);
    
    if (tag === '全部') {
      return newsData;
    }
    
    return newsData.filter(item => item.tags.includes(tag));
  } catch (error: any) {
    console.error(`获取${tag}标签新闻失败:`, error);
    throw error;
  }
};

/**
 * 获取新闻详情
 */
export const fetchNewsDetail = async (id: number): Promise<NewsItem> => {
  try {
    // 实际项目中使用以下代码：
    // return await http.get<NewsItem>(`${API.NEWS.DETAIL}/${id}`);
    
    await delay(500);
    
    const news = newsData.find(item => item.id === id);
    if (!news) {
      throw {
        code: '40004',
        message: '新闻不存在'
      };
    }
    
    return news;
  } catch (error: any) {
    console.error(`获取新闻ID:${id}详情失败:`, error);
    throw error;
  }
};
