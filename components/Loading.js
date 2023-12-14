import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "../theme";

export default function Loading() {
  return (
    <View className='justify-center  items-center'>
      <ActivityIndicator size='large' color={colors.lightOrange} />
    </View>
  );
}
