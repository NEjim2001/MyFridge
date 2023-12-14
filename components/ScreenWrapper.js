import { View, StatusBar, Platform, SafeAreaView } from "react-native";
import React from "react";
import { colors } from "../theme";

export default function ScreenWrapper({ children, color }) {
  let statusBarHeight = StatusBar.currentHeight
    ? StatusBar.currentHeight
    : Platform.OS == "ios"
    ? 30
    : 0;
  return (
    <View className="flex-1" style={{ backgroundColor: color }}>
      {children}
    </View>
  );
}
