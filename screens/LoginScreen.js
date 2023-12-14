import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setUserLoading } from "../redux/slices/user";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme";
import BackButton from "../components/BackButton";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (e) {
        console.log("Error during sign in:", e.message);
        navigation.navigate("LoginScreen");
        Alert.alert("Invalid Username/Password");
      } finally {
        dispatch(setUserLoading(false));
      }
    }
  };

  return (
    <ScreenWrapper color={colors.lightOrange}>
      <Image
        className='absolute'
        source={require("../assets/images/ScreenBackground.png")}
      />
      <View className='h-[362] left-5 top-16'>
        <BackButton
          navi={navigation}
          background='white'
          fill={colors.lightOrange}
        />
      </View>

      <View className='h-full bg-white rounded-3xl p-8 space-y-8 '>
        <View className='mt-12'>
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
            <Text className='text-black font-semibold text-lg'>Login</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScreenWrapper>
  );
}
