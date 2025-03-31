
import { View, Image } from '@tarojs/components';
import CustomLogoIcon from '../../../../assets/imgs/custom-logo.png';

const Logo = () => {
  return (
    <View className='logo-container'>
      <Image
        className='logo'
        src={CustomLogoIcon}
      />
    </View>
  );
};

export default Logo;

