import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../theme";

export default function LoadingList(title) {
  return (
    <View className='justify-center  items-center space-y-7 h-80'>
      <Text className='text-2xl font-semibold'>{title}</Text>
      <ActivityIndicator size='large' color={colors.lightOrange} />
    </View>
  );
}
