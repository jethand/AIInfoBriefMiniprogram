import { View, Text, Image } from '@tarojs/components';
import SubscribeIcon from '../../../../assets/imgs/Subscribe.png'
import './style.less'

const Subscribe = () => {
  return (
    <View className='subscribe'>
      <Image src={SubscribeIcon} className='subscribe-icon' />
      <Text className='subscribe-text'>订阅</Text>
    </View>
  );
};

export default Subscribe;

