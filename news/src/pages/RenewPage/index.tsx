import React, { useState, useEffect, useMemo } from 'react';
import { FiArrowLeft, FiCheck, FiX, FiGift } from 'react-icons/fi';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View } from '@tarojs/components';
import './styles.less';

interface LocationState {
  isGift?: boolean;
}

const RenewPage: React.FC = () => {
  
  const isGiftMode = useMemo(() => {
      const instance = getCurrentInstance();
      return instance?.router?.params?.isGift;
    }, []);
  const [selectedPlan, setSelectedPlan] = useState<string>('month');


  const handleGoBack = (): void => {
    Taro.navigateTo({
      url: '/pages/home/index',
    });
  };

  const handleSelectPlan = (plan: string): void => {
    setSelectedPlan(plan);
  };

  const handlePurchase = (): void => {
    if (isGiftMode) {
      alert('礼品卡赠送成功！');
    } else {
      alert('购买成功！');
    }
    Taro.navigateTo({
      url: '/pages/home/index',
    });
  };

  return (
    <View className="renew-page">
      {/* 头部 */}
      <View className="renew-header">
        <button className="back-button" onClick={handleGoBack}>
          <FiArrowLeft size={20} />
        </button>
        <h1 className="renew-title">
          {isGiftMode ? (
            <>
              <FiGift className="gift-icon" /> 专业版礼品卡
            </>
          ) : (
            "专业版会员"
          )}
        </h1>
        <View style={{ width: '20px' }}></View> {/* 占位 */}
      </View>

      {/* 功能对比 */}
      <View className="feature-comparison">
        <h2 className="comparison-title">功能对比</h2>
        
        <View className="comparison-table">
          <View className="comparison-row header">
            <View className="feature-name"></View>
            <View className="plan-free">免费版</View>
            <View className="plan-pro">专业版</View>
          </View>
          
          <View className="comparison-row">
            <View className="feature-name">基础阅读</View>
            <View className="plan-free"><FiCheck className="check" /></View>
            <View className="plan-pro"><FiCheck className="check" /></View>
          </View>
          
          <View className="comparison-row">
            <View className="feature-name">话题实时更新</View>
            <View className="plan-free"><FiX className="cross" /></View>
            <View className="plan-pro"><FiCheck className="check" /></View>
          </View>
          
          <View className="comparison-row">
            <View className="feature-name">话题追踪</View>
            <View className="plan-free"><FiX className="cross" /></View>
            <View className="plan-pro"><FiCheck className="check" /></View>
          </View>
          
          <View className="comparison-row">
            <View className="feature-name">订阅数量</View>
            <View className="plan-free">10个</View>
            <View className="plan-pro">100个</View>
          </View>
          
          <View className="comparison-row">
            <View className="feature-name">广告展示</View>
            <View className="plan-free">有广告</View>
            <View className="plan-pro">无广告</View>
          </View>
          
          <View className="comparison-row">
            <View className="feature-name">AI问答次数</View>
            <View className="plan-free">每日3次</View>
            <View className="plan-pro">不限次数</View>
          </View>
        </View>
      </View>

      {/* 订阅方案 */}
      <View className="subscription-plans">
        <h2 className="plans-title">{isGiftMode ? "选择礼品卡方案" : "选择订阅方案"}</h2>
        
        <View className="plan-cards">
          <View 
            className={`plan-card ${selectedPlan === 'month' ? 'selected' : ''}`}
            onClick={() => handleSelectPlan('month')}
          >
            <View className="plan-name">连续包月</View>
            <View className="plan-price">¥9.9</View>
            <View className="plan-unit">/月</View>
            <View className="plan-desc">自动续费，随时可取消</View>
          </View>
          
          <View 
            className={`plan-card ${selectedPlan === 'year' ? 'selected' : ''}`}
            onClick={() => handleSelectPlan('year')}
          >
            <View className="best-value">最优惠</View>
            <View className="plan-name">连续包年</View>
            <View className="plan-price">¥88</View>
            <View className="plan-unit">/年</View>
            <View className="plan-desc">自动续费，相当于7.3元/月</View>
          </View>
          
          <View 
            className={`plan-card ${selectedPlan === 'once' ? 'selected' : ''}`}
            onClick={() => handleSelectPlan('once')}
          >
            <View className="plan-name">1年</View>
            <View className="plan-price">¥99</View>
            <View className="plan-unit">/年</View>
            <View className="plan-desc">一次性付费，到期不自动续</View>
          </View>
        </View>
      </View>

      {/* 购买按钮 */}
      <button className="purchase-button" onClick={handlePurchase}>
        {isGiftMode ? "立即赠送" : "立即购买"}
      </button>

      {/* 底部说明 */}
      <View className="purchase-notes">
        <p>
          {isGiftMode 
            ? "赠送即视为同意" 
            : "购买即视为同意"
          }
          <a href="#">《会员服务协议》</a>
        </p>
      </View>
    </View>
  );
};

export default RenewPage;
