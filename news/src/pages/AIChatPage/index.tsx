/* eslint-disable import/first */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { FiArrowLeft, FiSend, FiHelpCircle, FiMessageCircle } from 'react-icons/fi';
import { newsData } from '../../data/newsData';
import { Message } from '../../types';
import { View, Textarea, Text, ScrollView } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import { SafeTopArea } from '../../components/SafeTopArea';

import './styles.less';

const AIChatPage: React.FC = () => {

  const id = useMemo(() => {
    const instance = getCurrentInstance();
    return instance?.router?.params?.id;
  }, []);

  const [inputValue, setInputValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeModel, setActiveModel] = useState<string>('DeepSeek');
  const messagesRef = useRef<HTMLDivElement>(null);
  

  // 查找对应ID的新闻
  const news = newsData.find(item => item.id === parseInt(id || '0')) || {
    title: '新闻不存在',
    source: '未知来源'
  };

  // 根据新闻内容生成相关提示词
  const generatePrompts = (): string[] => {
    const commonPrompts = [
      "解释一下这条新闻的背景",
      "这对普通人有什么影响",
      "相关政策解读"
    ];
    
    // 根据新闻ID或类型生成特定提示词
    const specificPrompts: Record<number, string[]> = {
      1: ["PMI指数下降的原因", "制造业现状分析", "未来经济走势预测"],
      2: ["利率下调对储户的影响", "银行为何下调存款利率", "如何应对利率变化"],
      3: ["高校毕业生就业形势", "就业政策有哪些", "如何提高就业竞争力"],
      4: ["未来天气趋势预测", "如何防范暴雨灾害", "极端天气形成原因"],
      5: ["什么是新型基础设施", "数字经济发展前景", "相关投资机会分析"],
      6: ["卫星技术应用领域", "航天工程的意义", "太空探索最新进展"],
      7: ["疫苗接种效果分析", "免疫屏障的形成", "疫情防控新趋势"],
      8: ["文物保护的重要性", "文旅融合的模式", "文化遗产保护措施"]
    };
    
    return specificPrompts[parseInt(id || '0')] || commonPrompts;
  };

  const promptSuggestions = generatePrompts();

  // 初始欢迎消息
  useEffect(() => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          type: 'ai',
          content: `您好！我是AI助手，很高兴为您解答关于"${news.title}"的问题。您可以问我相关的背景、影响或其他任何问题。`,
          time: new Date()
        }
      ]);
      setIsTyping(false);
    }, 800);
  }, [news.title]);


  const handleGoBack = (): void => {
    Taro.navigateBack();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setInputValue(e.target.value);
  };

  const simulateTyping = (content: string, callback: (content: string) => void): void => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback(content);
    }, 1500); // 模拟打字时间
  };

  const handleSendMessage = (content: string = inputValue): void => {
    if (!content.trim()) return;

    // 添加用户消息
    const userMessage: Message = {
      type: 'user',
      content: content,
      time: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // 显示AI正在输入状态
    setIsTyping(true);
    
    // 根据当前选择的模型生成不同的回复
    const modelPrefix = activeModel === 'DeepSeek' ? '' : 
                        `[${activeModel}] `;

    // 模拟AI回复
    setTimeout(() => {
      let aiResponse = '';
      
      // 根据问题内容生成相关回复
      if (content.includes('背景') || content.includes('原因')) {
        aiResponse = `关于"${news.title}"的背景，这一现象主要受到国内外多重因素的影响，包括全球经济形势、国内政策调整以及行业发展趋势等。近期国际市场波动加剧，同时国内经济结构调整也在持续推进，这些都是导致当前状况的重要原因。`;
      } else if (content.includes('影响') || content.includes('对普通人')) {
        aiResponse = `这一事件对普通人的影响主要体现在以下几个方面：首先，可能会影响到相关产品和服务的价格；其次，就业市场可能出现结构性变化；此外，个人投资和理财策略也需要相应调整。建议关注官方政策动向，合理规划个人财务。`;
      } else if (content.includes('政策') || content.includes('解读')) {
        aiResponse = `从政策层面看，相关部门已经出台了一系列措施应对这一情况。主要包括：加强宏观政策调控，保持经济运行在合理区间；深化供给侧结构性改革，提升产业链韧性；加大对重点领域和薄弱环节的支持力度。这些政策旨在稳定经济基本面，促进高质量发展。`;
      } else if (content.includes('预测') || content.includes('趋势') || content.includes('未来')) {
        aiResponse = `从长期来看，我国经济基本面依然稳健，发展韧性强、潜力大、活力足的特点没有改变。专家预测，随着各项政策措施的落实，相关指标将逐步回稳向好。当然，外部环境的不确定性仍然存在，需要持续关注全球经济形势的变化及其可能带来的影响。`;
      } else {
        const aiResponses = [
          `关于"${news.title}"，根据最新数据分析，这一现象主要受到国内外多重因素的影响，包括全球经济形势、国内政策调整以及行业发展趋势等。`,
          `这一数据变化反映了我国经济结构正在进行深度调整，传统产业与新兴产业的此消彼长是经济高质量发展过程中的正常现象。`,
          `从长期来看，我国经济基本面依然稳健，发展韧性强、潜力大、活力足的特点没有改变。相关部门已经出台了一系列政策措施，预计将在未来几个月内产生积极效果。`,
          `您提出的问题很有见地。实际上，这一现象背后有着复杂的经济和政策因素。简单来说，这是经济结构调整和产业升级过程中的阶段性表现。`
        ];
        aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      }

      // 模拟打字延迟
      simulateTyping(aiResponse, (finalResponse) => {
        const aiMessage: Message = {
          type: 'ai',
          content: modelPrefix + finalResponse,
          time: new Date(),
          model: activeModel
        };
        
        setMessages(prev => [...prev, aiMessage]);
      });
    }, 800);
  };

  const handlePromptClick = (prompt: string): void => {
    handleSendMessage(prompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 格式化时间
  const formatTime = (date: Date): string => {
    return new Intl.DateTimeFormat('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <View className='ai-chat-page'>
      <SafeTopArea />
      {/* 头部导航 */}
      <View className='chat-header'>
        <View className='back-View' onClick={handleGoBack}>
          <FiArrowLeft size={22} />
        </View>
        <View className='chat-title'>AI问问</View>
        <View style={{ width: '44px' }}></View> {/* 占位，保持标题居中 */}
      </View>

      {/* 聊天区域 */}
      <View className='chat-container'>
        <View className='chat-topic'>
          <View className='topic-indicator'>话题</View>
          <View className='topic-title'>{news.title}</View>
        </View>

        <ScrollView
          scrollY
          scrollWithAnimation
          className='messages-container'
          ref={messagesRef}
          scrollIntoView='messageEndNode'
        >
          {messages.map((message, index) => (
            <View 
              key={index} 
              className={`message ${message.type === 'user' ? 'user-message' : 'ai-message'}`}
            >
              {message.type === 'ai' && (
                <View className='avatar ai-avatar'>AI</View>
              )}
              <View className='message-content'>
                <View className='message-bubble'>{message.content}</View>
                <View className='message-time'>{formatTime(message.time)}</View>
              </View>
              {message.type === 'user' && (
                <View className='avatar user-avatar'>我</View>
              )}
            </View>
          ))}
          
          {/* AI正在输入状态 */}
          {isTyping && (
            <View className='message ai-message'>
              <View className='avatar ai-avatar'>AI</View>
              <View className='message-content'>
                <View className='message-bubble typing-indicator'>
                  <Text></Text>
                  <Text></Text>
                  <Text></Text>
                </View>
              </View>
            </View>
          )}
          
        </ScrollView>
      </View>

      {/* 提示词容器 */}
      <View className='prompt-container'>
        <View className='prompt-header'>
          <FiHelpCircle size={16} />
          <Text>你可以这样问</Text>
        </View>
        <View className='prompt-suggestions'>
          {promptSuggestions.map((prompt, index) => (
            <View 
              key={index} 
              className='prompt-item'
              onClick={() => handlePromptClick(prompt)}
            >
              {prompt}
            </View>
          ))}
        </View>
      </View>

      {/* 模型切换按钮 */}
      <ScrollView scrollX className='model-switcher'>
        <View 
          className={`model-button ${activeModel === 'DeepSeek' ? 'active' : ''}`}
          onClick={() => setActiveModel('DeepSeek')}
        >
          <Text className='model-dot'></Text>
          DeepSeek
        </View>
        <View 
          className={`model-button ${activeModel === 'Claude' ? 'active' : ''}`}
          onClick={() => setActiveModel('Claude')}
        >
          <Text className='model-dot'></Text>
          Claude
        </View>
        <View 
          className={`model-button ${activeModel === 'QWQ' ? 'active' : ''}`}
          onClick={() => setActiveModel('QWQ')}
        >
          <Text className='model-dot'></Text>
          QWQ
        </View>
        <View 
          className={`model-button ${activeModel === 'GPT-4' ? 'active' : ''}`}
          onClick={() => setActiveModel('GPT-4')}
        >
          <Text className='model-dot'></Text>
          GPT-4
        </View>
        <View 
          className={`model-button ${activeModel === 'Llama' ? 'active' : ''}`}
          onClick={() => setActiveModel('Llama')}
        >
          <Text className='model-dot'></Text>
          Llama
        </View>
      </ScrollView>

      {/* 输入区域 */}
      <View className='input-container'>
        <Textarea
          className='message-input'
          placeholder='输入您的问题...'
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <View 
          className={`send-View ${inputValue.trim() ? 'active' : ''}`} 
          onClick={() => handleSendMessage()}
          disabled={!inputValue.trim()}
        >
          <FiSend size={16} />
        </View>
      </View>
    </View>
  );
};

export default AIChatPage;
