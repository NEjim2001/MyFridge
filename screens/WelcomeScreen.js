import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ScreenWrapper color='#FFA800'>
      <View className='mx-6 space-y-14'>
        <View className='items-center mt-32 space-y-20'>
          <View className='flex-row'>
            <Text className='font-hind-madurai font-semibold text-3xl capitalize'>
              Let's Get To{" "}
            </Text>
            <Text className='text-white font-hind-madurai font-semibold text-3xl capitalize'>
              Cooking!
            </Text>
          </View>
          <Image
            className=''
            source={require("../assets/images/FridgeIcon.png")}
          />
        </View>

        <View>
          <TouchableOpacity
            className='p-4 bg-white rounded-3xl'
            onPress={() => {
              navigation.navigate("SignUpScreen");
            }}
          >
            <Text className='text-black text-center font-semibold text-base capitalize'>
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className='items-center flex-row justify-center mt-5'>
            <Text className='font-semibold'>Already have an account? </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              <Text className='text-white font-semibold'>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
