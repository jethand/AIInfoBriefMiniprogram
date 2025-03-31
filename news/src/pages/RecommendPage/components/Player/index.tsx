import { View, Image, Text } from '@tarojs/components';
import { useState } from 'react';
import './index.less';
import PlayLogoIcon from '../../../../assets/imgs/play-logo.png';
import CloseIcon from '../../../../assets/imgs/close.png';
import PauseIcon from '../../../../assets/imgs/pause.png';


const Player = () => {
  const [progress, setProgress] = useState(10);
  return (
    <View className='player'>
      <View className='player-content'>
        <Image className='player-icon' src={PlayLogoIcon}></Image>
        <Text className='progress-time start'>02:30</Text>
        <View className='progress'>
          <View className='progress-rate' style={{width: `${progress}%`}}></View>
        </View>
        <Text className='progress-time end'>08:31</Text>
        <Image className='pause' src={PauseIcon}></Image>
        <Image className='close' src={CloseIcon}></Image>
      </View>
    </View>
  );
};

export default Player;

