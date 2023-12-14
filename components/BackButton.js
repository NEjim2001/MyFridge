import { TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

export default function BackButton({ navi, background, fill }) {
  return (
    <TouchableOpacity
      style={{ backgroundColor: background }}
      onPress={() => navi.goBack()}
      className='rounded-full p-2 mb-2 w-12 bg-white'
    >
      <ChevronLeftIcon size={30} color={fill} />
    </TouchableOpacity>
  );
}
