/* eslint-disable import/first */
import React, { useState } from 'react';
import { View, Text, Image } from '@tarojs/components';
import CopyIcon from '../../../../assets/imgs/copy.png';
import ShareIcon from '../../../../assets/imgs/share.png';
import './index.less';

const NewsHeader: React.FC = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const handleShareText = () => {
    // 实现分享文字功能
    console.log('分享文字功能已触发');
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
    console.log(isSubscribed ? '取消订阅成功' : '订阅成功');
  };

  return (
    <View className='news-list'>
      <View className='news-list-header'>
        <Text className='news-list-title'>行业动态</Text>
        <View className='share-buttons'>
          <View className='share-button' onClick={handleShareText}>
            <Image src={CopyIcon} className='share-button-icon'></Image>
            <Text className='share-button-text' >复制文字</Text>
          </View>
          <View 
            className='share-button' 
            onClick={handleSubscribe}
          >
            <Image src={ShareIcon} className='share-button-icon'></Image>
            <Text className='share-button-text'>分享海报</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NewsHeader;
