/* eslint-disable import/first */
import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import NewsItem from './NewsItem';
import LoadingState from '../../../../components/LoadingState/index';
import ErrorState from '../../../../components/ErrorState';
import { FiRefreshCw } from 'react-icons/fi';
import { fetchTodayNews } from '../../../../services/newsService'
import { View, Text } from '@tarojs/components';
import NewsHeader from '../NewsHeader'
import './index.less';

const NewsList: React.FC = () => {
  
  // 使用ahooks的useRequest获取新闻列表
  const { 
    data: newsList, 
    loading, 
    error, 
    run: refreshNews 
  } = useRequest(fetchTodayNews, {
    onError: (err) => {
      console.error('获取新闻失败:', err);
    }
  });

  if (loading) {
    return <LoadingState text='正在获取最新新闻...' />;
  }
  
  if (error) {
    return <ErrorState message='获取新闻失败，请重试' onRetry={refreshNews} />;
  }
  
  if (!newsList || newsList.length === 0) {
    return (
      <View className='empty-state'>
        <p>暂无新闻</p>
        <button className='refresh-button' onClick={refreshNews}>
          <FiRefreshCw size={16} />
          <span>刷新</span>
        </button>
      </View>
    );
  }
  

  return (
      <View className='news-list'>
        <NewsHeader />
        <View className='news-list-content'>
          <View className='news-list-wapper'>
            {
              newsList.map((item, index) => (
                <NewsItem key={item.id} news={item} index={index} last={index===newsList.length - 1} />
              ))
            }
          </View>
        </View>
        <View className='star-talk'>
          <Text className='star-talk-title'>星语：</Text>
          <Text className='star-talk-summary'>独立思考是大多数人不具备的能力。没有经过</Text>
        </View>
      </View>
  );
};

export default NewsList;
