import React from 'react';
import { View, Text } from '@tarojs/components';
import './styles.less';
import { AtActivityIndicator } from 'taro-ui';

interface LoadingStateProps {
  text?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  text = '加载中...' 
}) => {
  return (
    <View className='loading-state'>
      <AtActivityIndicator content={text}></AtActivityIndicator>
    </View>
  );
};

export default LoadingState;
