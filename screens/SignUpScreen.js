import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { React, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useSelector } from "react-redux";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme";
import BackButton from "../components/BackButton";
import Loading from "../components/Loading";

export default function SignUpScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userLoading } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log(err);
        navigation.navigate("SignUpScreen");
        Alert.alert("Invalid Credentials");
      }
    }
  };

  return (
    <ScreenWrapper color={colors.lightOrange}>
      <Image
        className='absolute'
        source={require("../assets/images/ScreenBackground.png")}
      />
      <View className='h-[240] left-5 top-16'>
        <BackButton
          navi={navigation}
          background='white'
          fill={colors.lightOrange}
        />
      </View>

      <View className='h-full bg-white rounded-3xl p-8 space-y-8 '>
        <View className='mt-2'>
          <Text className='left-2 mb-2 font-semibold'> Email Address </Text>
          <TextInput
            className=' bg-gray-200 p-4 rounded-xl'
            onChangeText={(value) => setEmail(value)}
            placeholder='Email'
          />
        </View>

        <View>
          <Text className='left-2  mb-2 font-semibold'> Password </Text>
          <TextInput
            className=' bg-gray-200 p-4 rounded-xl'
            onChangeText={(value) => setPassword(value)}
            placeholder='Password'
          />
        </View>

        {userLoading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={handleSubmit}
            style={{ backgroundColor: colors.lightOrange }}
            className='p-3 rounded-xl w-full items-center justify-center'
          >
            <Text className='text-black font-semibold text-lg'>Sign Up</Text>
          </TouchableOpacity>
        )}

        <View className='items-center justify-center'>
          <Text className='font-bold text-lg'> Or </Text>
        </View>
        <View className='items-center justify-center'>
          <Image
            className='w-full h-20'
            source={require("../assets/images/SignInMethodBar.png")}
          />
        </View>
        <View className='items-center flex-row justify-center mt-5'>
          <Text className='font-semibold'>Already have an account? </Text>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignInScreen");
            }}
          >
            <Text
              style={{ color: colors.lightOrange }}
              className=' font-semibold'
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
}
