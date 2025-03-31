import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useLayoutEffect, useState } from "react";

const SafeTopArea: React.FC = (props: any) => {
  const [safeAreaTop, setSafeAreaTop] = useState(0);

  useLayoutEffect(() => {
    // 获取系统信息
    const systemInfo = Taro.getSystemInfoSync();
    const { safeArea } = systemInfo;

    // 设置安全区域顶部高度
    if (safeArea) {
      setSafeAreaTop(safeArea.top);
    }
  }, []);
  return (
    <View style={{ height: `${safeAreaTop}px`, ...props?.style || {}}} />
  );
};

export { SafeTopArea };