import React from 'react';
import { 
  FiChevronRight, 
  FiUsers, FiMessageCircle,
} from 'react-icons/fi';
import { View, Text, Image } from '@tarojs/components';
import WechatIcon from '../../assets/imgs/wechat.png'
import ButtltIcon from '../../assets/imgs/bullet.png'
import VipIcon from '../../assets/imgs/vip-icon.png'
import ArrowRightIcon from '../../assets/imgs/arrow-right.png'
import './styles.less';
import Taro from '@tarojs/taro';

const ProfilePage: React.FC = () => {
  
  const handleVipClick = () => {
    Taro.navigateTo({
      url: `/pages/RenewPage/index`,
    })
  };
  return (
    <View className='profile-page'>
      {/* 个人信息区域 */}
      <View className='profile-top-section'>
        <Image className='avatar' src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80' />
        <View className='user-info'>
          <Text className='user-info-username'>张三是个铁憨憨</Text>
          <View className='user-info-vip'>
            <Image src={VipIcon} className='user-info-vip-icon' />
            <Text className='user-info-vip-text'>专业版</Text>
          </View>
        </View>
      </View>

      {/* 专业版续费卡片 */}
      <View className='profile-content'>
        <View className='profile-vip-card'>
          <View className='profile-vip-card-left'>
            <View className='profile-vip-card-title'>专业版</View>
            <View className='profile-vip-card-subtitle'>开通享更多权益</View>
          </View>
          <View className='profile-vip-card-button' onClick={handleVipClick}>
            <Text className='profile-vip-card-button-text'>开通</Text>
          </View>
        </View>
        
        {/* 余额和礼品卡 */}
        <View className='profile-section'>
          <View className='action-list'>
            <View className='action-item'>
              <View className='action-item-left'>
                <Text className='action-text'>我的余额</Text>
              </View>
              <View className='balance-info'>
                <Text className='balance-amount'>¥99.00</Text>
                <Image src={ArrowRightIcon} className='action-arrow' />
              </View>
            </View> 
            <View className='action-item'>
              <View className='action-item-left'>
                <Text className='action-text'>积分排行</Text>
              </View>
              <View className='balance-info'>
                <Text className='balance-amount'>第一名</Text>
                <Image src={ArrowRightIcon} className='action-arrow' />
              </View>
            </View>
          </View>
        </View>
        
        {/* 功能按钮组 */}
        <View className='action-buttons'>
          <View className='function-button' style={{marginRight: '24rpx'}}>
            <FiUsers size={16} />
            <Image src={ButtltIcon} className='function-button-icon' />
            <Text>邀请返现</Text>
          </View>
          <View className='function-button'>
            <Image src={WechatIcon} className='function-button-icon' />
            <Text>加入资讯群</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProfilePage;
