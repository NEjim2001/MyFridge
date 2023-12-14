import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../theme";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import MasonryList from "@react-native-seoul/masonry-list";
import { fetchRandomRecipes } from "../api/spoonacularAPI";
import { StatusBar } from "expo-status-bar";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import LoadingList from "../components/LoadingList";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const [recipes, setRecipes] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);
    setRecipes([]);
    await fetchRecipeList();
  };

  const fetchRecipeList = async () => {
    try {
      const data = await fetchRandomRecipes();
      setRecipes(data.recipes);
      setLoading(false);
      setIsRefreshing(false);
    } catch (error) {
      console.error("Error fetching recipe steps: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchRecipeList();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <ScreenWrapper color={"white"}>
      <StatusBar />
      <SafeAreaView className='mx-6'>
        <View className='space-y-2'>
          <View className='flex-row items-center justify-between'>
            <Image
              style={{ height: moderateScale(50), width: moderateScale(50) }}
              source={require("../assets/images/DefaultPFP.png")}
              resizeMode='cover'
            />

            <TouchableOpacity
              onPress={handleSignOut}
              className='px-6 py-3 rounded-full justify-center items-center'
              style={{
                backgroundColor: colors.lightOrange,
              }}
            >
              <Text
                style={{
                  fontSize: scale(15),
                }}
                className='text-white font-semibold'
              >
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{ fontSize: scale(35) }}
              className='text-black font-bold'
            >
              Welcome to Your
            </Text>
            <Text
              style={{ color: colors.lightOrange, fontSize: scale(40) }}
              className=' font-bold '
            >
              Fridge!
            </Text>
          </View>

          <Text
            style={{ fontSize: moderateScale(30) }}
            className='font-semibold'
          >
            Quick Recipes
          </Text>

          {/* RECIPE LIST */}

          <View style={{ height: verticalScale(400) }}>
            <MasonryList
              data={recipes}
              ListEmptyComponent={LoadingList("Fetching Recipes")}
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              showsVerticalScrollIndicator={false}
              style={{ alignSelf: "stretch" }}
              renderItem={({ item }) => {
                const rndInt = Math.floor(Math.random() * 2) + 1;
                return (
                  <TouchableOpacity
                    className='mb-5'
                    onPress={() =>
                      navigation.navigate("HomeRecipeInfoScreen", {
                        ...item,
                        location: "Home",
                      })
                    }
                  >
                    <View className='space-y-2 items-center'>
                      <Image
                        style={{ height: rndInt == 1 ? 150 : 250 }}
                        className='h-full w-40 rounded-3xl'
                        source={{ uri: item.image }}
                        resizeMode='cover'
                      />

                      <Text className='text-xs font-bold text-black text-center capitalize'>
                        {item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScreenWrapper>
  );
}
