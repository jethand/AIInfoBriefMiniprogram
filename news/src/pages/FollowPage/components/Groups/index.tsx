/* eslint-disable import/first */
import React, { useState, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { useRequest } from 'ahooks';
import { FiMoreVertical } from 'react-icons/fi';
import { NewsItem } from '../../../../types';
import { View, Text } from '@tarojs/components';
import './style.less';


// 模拟获取关注数据的服务函数
const fetchFollowData = async (): Promise<NewsItem[]> => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 模拟随机错误，便于测试错误处理
  if (Math.random() < 0.1) { // 10%的概率失败
    throw {
      code: '50001',
      message: '获取关注列表失败'
    };
  }
  
  // 返回模拟的关注数据
  return [
  {
    id: 1,
    title: "国内经济增长趋势分析",
    summary: "第二季度GDP增长6.3%，经济复苏势头良好",
    source: "经济日报",
    time: "2小时前",
    tags: ["经济", "国内"]
  },
  {
    id: 2,
    title: "新能源汽车销量持续增长，多家车企业绩向好",
    summary: "上半年新能源汽车销量同比增长40%，市场渗透率提升",
    source: "汽车周刊",
    time: "4小时前",
    tags: ["科技", "汽车"]
  },
  {
    id: 3,
    title: "教育部发布新政策，促进高校毕业生就业",
    summary: "多项措施并举，缓解就业压力，提供更多机会",
    source: "教育在线",
    time: "昨天",
    tags: ["教育", "政策"]
  },
  {
    id: 4,
    title: "人工智能在医疗领域的最新应用与突破",
    summary: "AI辅助诊断准确率提升，远程医疗服务覆盖面扩大",
    source: "科技前沿",
    time: "昨天",
    tags: ["科技", "医疗"]
  },
  {
    id: 5,
    title: "全球气候变化会议召开，多国承诺减排目标",
    summary: "各国代表共商应对气候变化策略，制定新的行动计划",
    source: "环球视野",
    time: "前天",
    tags: ["国际", "环保"]
  },
  {
    id: 6,
    title: "央行降准释放流动性，金融市场反应积极",
    summary: "货币政策调整，支持实体经济发展，股市债市双双上涨",
    source: "金融时报",
    time: "3天前",
    tags: ["经济", "金融"]
  },
  {
    id: 7,
    title: "文化遗产保护取得新进展，数字技术助力传承",
    summary: "多项非物质文化遗产数字化保存，传统文化焕发新活力",
    source: "文化周报",
    time: "3天前",
    tags: ["文化", "科技"]
  },
  {
    id: 8,
    title: "体育产业发展报告发布，市场规模持续扩大",
    summary: "健身、赛事、体育用品等多领域增长，产业链日趋完善",
    source: "体育资讯",
    time: "4天前",
    tags: ["体育", "产业"]
  },
  {
    id: 9,
    title: "食品安全监管升级，多项新标准实施",
    summary: "农残、添加剂等标准提高，保障消费者健康安全",
    source: "食品安全网",
    time: "4天前",
    tags: ["民生", "健康"]
  },
  {
    id: 10,
    title: "乡村振兴战略实施进展，农民收入稳步提升",
    summary: "产业兴旺、生态宜居、乡风文明等方面取得成效",
    source: "农业日报",
    time: "5天前",
    tags: ["国内", "民生"]
  }
  ];
};

// 所有可用的标签（我的标签）
const myTags: string[] = ["全部", "经济", "科技", "教育", "国际", "国内", "文化"];

const GroupComp: React.FC = () => {
  const [groupedContent, setGroupedContent] = useState<Record<string, NewsItem[]>>({});
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  
  // 用于存储每个分组的引用
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // 用于跟踪滚动位置
  const contentRef = useRef<HTMLDivElement | null>(null);
  // 用于防止滚动监听器触发标签点击
  const isScrolling = useRef<boolean>(false);
  
  // 使用ahooks的useRequest获取关注列表
  const {
    data: followData, 
    loading, 
    error, 
    run: refreshFollow 
  } = useRequest(fetchFollowData, {
    onError: (err) => {
      console.error('获取关注列表失败:', err);
    }
  });

  // 监听滚动，更新当前活动标签
  const handleScroll = (): void => {
    if (isScrolling.current || !contentRef.current) return;

    // 找出当前在视口中的分组
    let currentSection = "全部";
    
    // 遍历可见标签（除了"全部"）
    visibleTags.forEach(tag => {
      if (tag === "全部") return;
      
      const element = sectionRefs.current[tag];
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      // 如果分组顶部在视口上方不远处，认为是当前分组
      if (rect.top <= 150) {
        currentSection = tag;
      }
    });
  };

  // 根据标签对内容进行分组
  useEffect(() => {
    if (!followData) return;
    
    // 创建一个映射来存储每个标签的内容
    const grouped: Record<string, NewsItem[]> = {};
    
    // 先处理"全部"标签
    grouped["全部"] = followData;
    
    // 处理每个标签
    myTags.forEach(tag => {
      if (tag === "全部") return;
      
      // 找出包含该标签的内容
      grouped[tag] = followData.filter(item => item.tags.includes(tag));
    });
    
    // 设置分组内容
    setGroupedContent(grouped);
    
    // 设置可见标签（有内容的标签）
    const visible = myTags.filter(tag => tag === "全部" || (grouped[tag] && grouped[tag].length > 0));
    setVisibleTags(visible);
    
  }, [followData]);

  // 添加滚动监听
  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => {
        contentElement.removeEventListener('scroll', handleScroll);
      };
    }
  }, [visibleTags]);


  return (
    <View className='follow-content' ref={contentRef}>
      {visibleTags.map((tag, tagIndex) => (
        tag !== "全部" && groupedContent[tag]?.length > 0 && (
          <View 
            key={tagIndex} 
            className='follow-section'
            ref={el => sectionRefs.current[tag] = el}
          >
            <View className='section-header'>
              <View className='section-header-side'>
                <Text className='section-title'>{tag}</Text>
              </View>
              <View className='section-header-side' onClick={
                () => Taro.navigateTo({
                  url: '/pages/home/index',
                  })
                }
              >
                <Text>查看更多</Text>
                <FiMoreVertical size={40} />
              </View>
            </View>
            
            {groupedContent[tag].map((item, groupIndex) => (
              <View key={item.id} className='follow-item'>
                <Text className='follow-summary'>{item.summary}</Text>
                <View className='follow-meta'>
                  <View className='follow-time'>{item.time}</View>
                  <View className='follow-source'>{item.source}</View>
                </View>
                {groupIndex === groupedContent[tag].length - 1 ? null :  <View className='follow-split' />}
              </View>
            ))}
          </View>
        )
      ))}
    </View>
  )
};

export default GroupComp;
