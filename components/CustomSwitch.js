import React, { useState } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { colors } from "../theme";

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor,
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const lightGrayHex = "#F1F1F1";

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 44,
          width: 360,
          backgroundColor: lightGrayHex,
          borderRadius: getRoundCorner ? 25 : 0,
          borderWidth: 1,
          borderColor: lightGrayHex,
          shadowColor: "gray",
          shadowOffset: 10,
          shadowOpacity: 0.2,
          flexDirection: "row",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            flex: 1,

            backgroundColor:
              getSelectionMode == 1 ? selectionColor : lightGrayHex,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color:
                getSelectionMode == 1 ? colors.lightOrange : colors.lightOrange,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            flex: 1,
            shadowOffset: 10,
            shadowOpacity: 0.1,
            backgroundColor:
              getSelectionMode == 2 ? selectionColor : lightGrayHex,
            borderRadius: getRoundCorner ? 25 : 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color:
                getSelectionMode == 2 ? colors.lightOrange : colors.lightOrange,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;
