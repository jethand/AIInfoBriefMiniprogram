/* eslint-disable import/first */
import React, { useState, useEffect } from 'react';
import { View, ScrollView } from '@tarojs/components';
import Taro from '@tarojs/taro';
import './style.less';

const TagsComp: React.FC = () => {
  const [activeTag, setActiveTag] = useState<string>("全部");
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  // 所有可用的标签（我的标签）
  const myTags: string[] = ["全部", "经济", "科技", "教育", "国际", "国内", "文化"];

// 根据标签对内容进行分组
  useEffect(() => {
    // 设置可见标签（有内容的标签）
    const visible = myTags.filter(tag => tag !== "全部");
    setVisibleTags(visible);
  }, []);

  // 处理标签点击，滚动到对应分组
  const handleTagClick = (tag: string): void => {
    setActiveTag(tag);
  };

  // 前往标签管理页面
  const handleMoreTags = (): void => {
    Taro.navigateTo({
      url: `/pages/TagManagementPage/index`,
    });
  };
  return (
    <ScrollView
      scrollWithAnimation
      scrollX
      className='tags-container'
    >
      {visibleTags.map((tag, index) => (
        <View 
          key={index} 
          className={`tag-item ${activeTag === tag ? 'active' : ''}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </View>
      ))}
      <View className='tag-item more' onClick={handleMoreTags}>
        更多
      </View>
    </ScrollView>
  )
}
export default TagsComp;