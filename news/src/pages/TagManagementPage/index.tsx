import React, { useState } from 'react';

import { FiArrowLeft, FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { SafeTopArea } from '../../components/SafeTopArea';
import './styles.less';

const tagGroups = [
  {
    groupName: "体育",
    tags: [
      {
          "selected": false,
          "tagName": "经济"
      },
      {
          "selected": false,
          "tagName": "科技"
      },
      {
          "selected": false,
          "tagName": "教育"
      },
      {
          "selected": false,
          "tagName": "医疗"
      },
      {
          "selected": false,
          "tagName": "国际"
      },
      {
          "selected": false,
          "tagName": "国内"
      },
      {
          "selected": false,
          "tagName": "环保"
      },
      {
          "selected": false,
          "tagName": "金融"
      }
    ]
  },
  {
    groupName: "财经",
    tags: [
      {
          "selected": false,
          "tagName": "文化"
      },
      {
          "selected": false,
          "tagName": "体育"
      },
      {
          "selected": false,
          "tagName": "产业"
      },
      {
          "selected": false,
          "tagName": "民生"
      },
      {
          "selected": false,
          "tagName": "健康"
      },
      {
          "selected": false,
          "tagName": "汽车"
      },
      {
          "selected": false,
          "tagName": "政策"
      },
      {
          "selected": false,
          "tagName": "娱乐"
      },
      {
          "selected": false,
          "tagName": "旅游"
      },
      {
          "selected": false,
          "tagName": "美食"
      },
      {
          "selected": false,
          "tagName": "时尚"
      },
      {
          "selected": false,
          "tagName": "历史"
      }
    ]
  },
];
const TagManagementPage: React.FC = () => {
  const [data, setData] = useState(tagGroups);
  const toggleTagSelection = (groupIndex: number, tagIndex: number) => {
    const newData = data.map((group, gIndex) => {
      if (gIndex === groupIndex) {
        return {
          ...group,
          tags: group.tags.map((tag, tIndex) => {
            if (tIndex === tagIndex) {
              return { ...tag, selected: !tag.selected };
            }
            return tag;
          }),
        };
      }
      return group;
    });

    setData(newData);
  };
  const handleGoBack = (): void => {
    Taro.navigateBack();
  };


  return (
    <View className='tag-management-page'>
      <SafeTopArea />
      <View className='tag-header'>
        <View className='back-button' onClick={handleGoBack}>
          <FiArrowLeft size={20} />
        </View>
        <View className='tag-title'>管理推荐标签</View>
        <View></View>
      </View>

      {
        data.map((group, groupIndex) => {
          return (
            <View className='tag-section' key={group.groupName}>
              <Text className='section-title'>{group.groupName}</Text>
              <View className='tags-grid my-tags'>
                {group.tags.map((tag, index) => (
                  <View 
                    key={index} 
                    className={`tag-grid-item ${tag.selected ? 'selected' : ''}`}
                    onClick={() => toggleTagSelection(groupIndex,index)}
                  >
                    {tag.tagName}
                  </View>
                ))}
              </View>
            </View>
          )
        })
      }
    </View>
  );
};

export default TagManagementPage;
