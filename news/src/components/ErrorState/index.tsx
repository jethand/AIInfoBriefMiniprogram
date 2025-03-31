import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import { View, Text } from '@tarojs/components';
import './styles.less';
import { AtIcon } from 'taro-ui';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ 
  message = '加载失败，请重试', 
  onRetry 
}) => {
  return (
    <View className='error-state'>
      <AtIcon value='alert-circle' size='48' className='error-icon'></AtIcon>
      <Text className='error-message'>{message}</Text>
      <View className='retry-button' onClick={onRetry}>
        <FiRefreshCw size={16} />
        <AtIcon value='reload' size='16' />
        <Text style={{marginLeft: '6px'}}>重新加载</Text>
      </View>
    </View>
  );
};

export default ErrorState;
