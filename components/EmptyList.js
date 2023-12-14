import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../theme";

export default function EmptyList(title, body) {
  return (
    <View className='justify-center  items-center space-y-7 h-80'>
      <Text className='text-2xl font-semibold'>{title}</Text>
      <Text className='text-xs italic'>{body}</Text>
    </View>
  );
}
