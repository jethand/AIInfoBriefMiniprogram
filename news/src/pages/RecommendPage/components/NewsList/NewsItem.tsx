import React from 'react';
import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { NewsItem as NewsItemType } from '../../../../types/index';

import './NewsItem.less';

interface NewsItemProps {
  news: NewsItemType;
  index: number;
  last: boolean;
}

const NewsItem: React.FC<NewsItemProps> = ({ news, index, last }) => {
  
  const getIndex = (rankN: number) => {
    const IconsMap = {
      0: require('../../../../assets/imgs/news_top1.png'),
      1: require('../../../../assets/imgs/news_top2.png'),
      2: require('../../../../assets/imgs/news_top3.png'),
    };
    return IconsMap[rankN]
  };
  const handleClick = (): void => {
    Taro.navigateTo({
      url: `/pages/NewsDetailPage/index?id=${news.id}`,
    });
  };

  return (
    <View className='news-item' onClick={handleClick} style={{marginBottom: last ? '0rpx' : '40rpx'}}>
      {
        index > 2 ? <Text className='news-rank-number'>{index}</Text> : 
        <View className='news-rank-wapper'>
          <Image src={getIndex(index)} className='news-rank-icon' />
          <Text className='news-rank-text'>{index + 1}</Text>
        </View>
      }
      <Text className='news-summary'>{news.summary}</Text>
    </View>
  );
};

export default NewsItem;
