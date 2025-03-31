import React from 'react';
import dayjs from 'dayjs';
import { View, Text, Image} from '@tarojs/components';
import './index.less';
import TitleImg from '../../../../assets/imgs/home_title.png';
import PlayIcon from '../../../../assets/imgs/viode-play.png';

const Header: React.FC = () => {
  const now = dayjs();
  // 填充0
  const month = (now.month() + 1).toString().padStart(2, '0');
  const dayOfWeek = now.day();
  const dayOfWeekStr = ['日', '一', '二', '三', '四', '五', '六'][dayOfWeek];
  const day = now.date()
  
  return (
    <View className='header'>
      <View className='left'>
        <Image className='title' src={TitleImg} mode='aspectFit' />
        <View className='split'></View>
        <View className='date-container'>
          <Text className='date-item'>{month}/{day} </Text>
          <Text className='date-item'>星期{dayOfWeekStr}</Text>
        </View>
      </View>
      <View className='right'>
        <Image className='play-button' src={PlayIcon}></Image>
      </View>
    </View>
  );
};

export default Header;
