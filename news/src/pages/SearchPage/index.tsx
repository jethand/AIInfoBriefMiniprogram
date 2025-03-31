import React, { useState, useRef } from 'react';
import { FiSearch, FiTrendingUp, FiClock, FiX, FiChevronRight, FiTrash2 } from 'react-icons/fi';
import { HotTopic } from '../../types';
import './styles.less';
import { View, Text, Textarea } from '@tarojs/components';

// 模拟热搜数据
const hotSearchData: HotTopic[] = [
  { id: 1, text: '经济数据公布', count: '1.2万' },
  { id: 2, text: '高温预警持续', count: '9832' },
  { id: 3, text: '新能源汽车销量', count: '8745' },
  { id: 4, text: '教育改革新政', count: '7651' },
  { id: 5, text: '医保政策调整', count: '6543' },
  { id: 6, text: '科技创新成果', count: '5987' },
  { id: 7, text: '疫苗接种进展', count: '5321' },
  { id: 8, text: '体育赛事直播', count: '4765' },
  { id: 9, text: '股市行情分析', count: '4231' },
  { id: 10, text: '文旅融合发展', count: '3876' }
];

// 模拟的默认搜索历史
const defaultSearchHistory: string[] = [
  '经济复苏', '科技创新', '教育政策', '医疗改革', '环保行动', '数字经济', '城市规划'
];

const SearchPage: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchHistory, setSearchHistory] = useState<string[]>(defaultSearchHistory);
  const [showClearBtn, setShowClearBtn] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理搜索输入变化
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(e.target.value);
    setShowClearBtn(e.target.value.length > 0);
  };

  // 清除搜索框
  const handleClearSearch = (): void => {
    setSearchValue('');
    setShowClearBtn(false);
    inputRef.current?.focus();
  };

  // 处理搜索提交
  const handleSearch = (): void => {
    if (!searchValue.trim()) return;
    
    // 添加到搜索历史
    if (!searchHistory.includes(searchValue.trim())) {
      setSearchHistory([searchValue.trim(), ...searchHistory.slice(0, 9)]);
    } else {
      // 如果已存在，则将其移到最前面
      setSearchHistory([
        searchValue.trim(),
        ...searchHistory.filter(item => item !== searchValue.trim())
      ]);
    }
    
    setIsSearching(true);
    // 这里可以添加实际的搜索逻辑
    
    // 模拟搜索结果返回
    setTimeout(() => {
      setIsSearching(false);
      // 清空搜索框
      setSearchValue('');
      setShowClearBtn(false);
    }, 1000);
  };

  // 点击搜索历史项
  const handleHistoryItemClick = (item: string): void => {
    setSearchValue(item);
    setShowClearBtn(true);
    handleSearch();
  };

  // 删除单个搜索历史
  const handleDeleteHistoryItem = (e: React.MouseEvent, item: string): void => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter(i => i !== item));
  };

  // 清空所有搜索历史
  const handleClearAllHistory = (): void => {
    setSearchHistory([]);
  };

  // 点击热搜项
  const handleHotTopicClick = (topic: string): void => {
    setSearchValue(topic);
    setShowClearBtn(true);
    setTimeout(() => {
      handleSearch();
    }, 100);
  };

  // 处理回车键搜索
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <View className='search-page'>
      <View className='search-header'>
        <View className='search-input-container'>
          <FiSearch size={16} className='search-icon' />
          <Textarea 
            ref={inputRef}
            placeholder='搜索新闻、话题、来源' 
            className='search-input'
            value={searchValue}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
          {showClearBtn && (
            <View className='clear-button' onClick={handleClearSearch}>
              <FiX size={14} />
            </View>
          )}
        </View>
        <View 
          className={`search-button ${searchValue.trim() ? 'active' : ''}`}
          onClick={handleSearch}
          disabled={!searchValue.trim() || isSearching}
        >
          {isSearching ? '搜索中...' : '搜索'}
        </View>
      </View>
      
      <View className='search-content'>
        {/* 搜索历史 */}
        {searchHistory.length > 0 && (
          <View className='search-section'>
            <View className='section-header'>
              <View className='section-title-container'>
                <FiClock size={12} className='section-icon' />
                <Text className='section-title'>搜索历史</Text>
              </View>
              <View className='clear-all-button' onClick={handleClearAllHistory}>
                <FiTrash2 size={12} />
                <Text>清空</Text>
              </View>
            </View>
            <View className='history-tags'>
              {searchHistory.map((item, index) => (
                <View 
                  key={index} 
                  className='history-tag'
                  onClick={() => handleHistoryItemClick(item)}
                >
                  <Text>{item}</Text>
                  <View 
                    className='delete-tag'
                    onClick={(e) => handleDeleteHistoryItem(e, item)}
                  >
                    <FiX size={10} />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
        
        {/* 热搜榜 */}
        <View className='search-section'>
          <View className='section-header'>
            <View className='section-title-container'>
              <FiTrendingUp size={12} className='section-icon' />
              <Text className='section-title'>热搜榜</Text>
            </View>
            <View className='view-all-button'>
              <Text>查看全部</Text>
              <FiChevronRight size={12} />
            </View>
          </View>
          <View className='hot-topics'>
            {hotSearchData.map((topic, index) => (
              <View 
                key={index} 
                className='hot-topic-item'
                onClick={() => handleHotTopicClick(topic.text)}
              >
                <Text className={`topic-rank ${index < 3 ? 'top-rank' : ''}`}>{index + 1}</Text>
                <Text className='topic-text'>{topic.text}</Text>
                <Text className='topic-count'>{topic.count}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchPage;
