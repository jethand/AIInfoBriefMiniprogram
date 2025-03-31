import React, { useMemo } from 'react';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { View, Text} from '@tarojs/components';
import { FiArrowLeft, FiMessageSquare, FiClock, FiShare2 } from 'react-icons/fi';
import { newsData } from '../../data/newsData';
import { TopicTracking } from '../../types';
import './styles.less';

const NewsDetailPage: React.FC = () => {

  const id = useMemo(() => {
    const instance = getCurrentInstance();
    return instance?.router?.params?.id;
  }, []);
  
  // 查找对应ID的新闻
  const news = newsData.find(item => item.id === parseInt(id || '0')) || {
    title: '新闻不存在',
    source: '未知来源',
    time: '未知时间',
    content: '该新闻内容不存在或已被删除。'
  };

  // 话题追踪数据
  const topicTrackings: TopicTracking[] = [
    { time: '今天 08:30', title: '相关政策解读：深入了解最新经济数据背后的政策导向' },
    { time: '昨天 16:45', title: '专家分析：本月经济数据环比增长的主要驱动因素' },
    { time: '前天 09:15', title: '行业影响：新数据公布对各行业发展的潜在影响' }
  ];

  const handleGoBack = (): void => {
    Taro.navigateBack();
  };

  const handleAIChat = (): void => {
    Taro.navigateTo({
      url: `/pages/AIChatPage/index?id=${id}`,
    });
  };

  return (
    <View className='news-detail-page'>
      {/* 头部导航 */}
      <View className='detail-header'>
        <View className='back-View' onClick={handleGoBack}>
          <FiArrowLeft size={22} />
        </View>
        <View className='detail-actions'>
          <View className='action-View'>
            <FiShare2 size={20} />
          </View>
        </View>
      </View>

      {/* 新闻内容区域 */}
      <View className='news-content-section'>
        <View className='news-meta-info'>
          <Text className='detail-source'>{news.source}</Text>
          <Text className='detail-time'>{news.time}</Text>
        </View>
        <Text className='detail-title'>{news.title}</Text>
        
        <View className='detail-content'>
          <Text>
            {news.content || `近日，国家统计局发布了最新的经济数据，显示我国经济继续保持稳定复苏态势。数据显示，7月份，制造业采购经理指数（PMI）为49.3%，比上月下降0.3个百分点，制造业景气水平有所回落。
            
            专家分析认为，这一变化主要受到国内外多重因素的影响。一方面，全球经济增长放缓，外部需求减弱；另一方面，国内经济结构调整过程中，部分传统行业产能过剩问题仍然存在。
            
            国家发改委相关负责人表示，将继续实施积极的财政政策和稳健的货币政策，加大对实体经济的支持力度，促进经济高质量发展。同时，加快推进新型基础设施建设，培育壮大新兴产业，推动传统产业转型升级。
            
            市场分析人士指出，尽管短期内经济指标有所波动，但从长期来看，我国经济基本面依然稳健，发展韧性强、潜力大、活力足的特点没有改变。随着各项政策措施的落实，预计下半年经济将继续保持稳定增长。`}
          </Text>
          
          {news.image && (
            <View className='detail-image'>
              <img src={news.image} alt={news.title} />
              <Text className='image-caption'>图片来源：{news.source}</Text>
            </View>
          )}
          
          <Text>
            针对下一步工作，相关部门表示将重点做好以下几方面：一是着力扩大内需，促进消费持续恢复；二是稳定工业经济运行，推动制造业高质量发展；三是大力支持民营经济发展，优化民营企业发展环境；四是防范化解风险，守住不发生系统性风险的底线。
          </Text>
        </View>
      </View>

      {/* AI问问区域 */}
      <View className='ai-chat-section' onClick={handleAIChat}>
        <View className='section-icon'>
          <FiMessageSquare size={22} />
        </View>
        <View className='section-content'>
          <Text>AI问问</Text>
          <Text>想了解更多？向AI提问，获取即时解答</Text>
        </View>
        <View className='section-indicator'></View>
      </View>

      {/* 话题追踪区域 */}
      <View className='topic-tracking-section'>
        <Text className='section-title'>
          <FiClock size={18} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          话题追踪
        </Text>
        
        <View className='tracking-list'>
          {topicTrackings.map((topic, index) => (
            <View key={index} className='tracking-item'>
              <View className='tracking-time'>{topic.time}</View>
              <View className='tracking-title'>{topic.title}</View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NewsDetailPage;
