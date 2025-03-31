import { View } from '@tarojs/components';
import DailyHeader from './components/DailyHeader';
import NewsList from './components/NewsList';
import { SafeTopArea } from '../../components/SafeTopArea';
import Logo from './components/Logo';
import Subscribe from './components/Subscribe';
import Player from './components/Player';
import './styles.less';

const RecommendPage = () => {
  return (
    <View className='recommend-page'>
      <SafeTopArea />
      <Logo />
      <DailyHeader />
      <NewsList />
      <Subscribe />
      <Player />
    </View>
  );
};

export default RecommendPage;

