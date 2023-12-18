import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { categoryBG, colors } from "../theme/index.js";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getDocs, query, where } from "firebase/firestore";
import { ingredientsRef } from "../config/firebase.js";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import { PlusIcon } from "react-native-heroicons/solid";
import EmptyList from "../components/EmptyList.js";
import LoadingList from "../components/LoadingList.js";

export default function MyFridgeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);

  const [renderData, setRenderData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const [currentCategory, setcurrentCategory] = useState("");
  const [prevCategory, setPrevCategory] = useState("");
  const [showFiltered, setShowFiltered] = useState(false);

  const fetchIngredients = async () => {
    try {
      if (!user) {
        console.error("User ID is undefined. Cannot fetch ingredients.");
        return;
      }
      setLoading(true);
      let data = [];
      const q = query(ingredientsRef, where("userID", "==", user));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setRenderData(data);
    } catch (err) {
      console.error("Error fetching ingredients:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      // Fetch data when the component becomes focused
      fetchIngredients();
      console.log("Fetching");
    }
  }, [isFocused]);

  const toggleShowFiltered = () => {
    setShowFiltered(!showFiltered);
  };
  const selectCategory = (category) => {
    if (category === currentCategory) {
      // Double-click on the same category
      if (showFiltered) {
        // Toggle filter if it's already filtered
        setcurrentCategory("");
      } else {
        // Keep the category selected
        setPrevCategory(currentCategory);
        setcurrentCategory(category);
      }
      toggleShowFiltered(); // Toggle filter state
    } else {
      // Click on a different category
      setPrevCategory(currentCategory);
      setcurrentCategory(category);
      setShowFiltered(true);
    }
  };

  const itemsToRender = renderData.filter(
    (item) =>
      (!currentCategory || item.category === currentCategory) &&
      item.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <ScreenWrapper color={"white"}>
      <SafeAreaView className='mx-6 space-y-2 mt-20'>
        <View>
          <Text style={{ fontSize: scale(40) }} className='font-bold'>
            Open, Explore,
          </Text>
          <Text
            style={{ color: colors.lightOrange, fontSize: scale(40) }}
            className='font-bold'
          >
            Enjoy!
          </Text>
        </View>

        {/* CATEGORY BAR */}
        <View style={{ height: verticalScale(60) }} className='flex-row'>
          <View className='items-center flex-row w-full  justify-evenly'>
            <TouchableOpacity onPress={() => selectCategory("fruit")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: currentCategory == "fruit" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/FIcon.png`)}
                />
                <Text className='text-xs font-medium'>Fruit</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory("dairy")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: currentCategory == "dairy" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/DIcon.png`)}
                />
                <Text className='text-xs font-medium'>Dairy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory("protein")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor:
                      currentCategory == "protein" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/PIcon.png`)}
                />
                <Text className='text-xs font-medium'>Protein</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory("vegetable")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor:
                      currentCategory == "vegetable" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/VIcon.png`)}
                />
                <Text className='text-xs font-medium'>Vegetable</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => selectCategory("grain")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: currentCategory == "grain" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/GIcon.png`)}
                />
                <Text className='text-xs font-medium'>Grain</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={{
            backgroundColor: colors.lightOrange,
          }}
          onPress={() => {
            navigation.navigate("AddFruitScreen");
          }}
          className='rounded-2xl  p-3 flex-row justify-center items-center'
        >
          <PlusIcon size={25} color={"white"} />
        </TouchableOpacity>

        {/* SEARCH BAR */}
        <View className='bg-gray-200 opacity-70 items-center rounded-full  p-2 flex-row'>
          <TextInput
            onChangeText={(value) => setSearchInput(value)}
            className='mx-auto'
            placeholder='Search any item'
          />
          <View className='p-1 rounded-full bg-white'>
            <MagnifyingGlassIcon size={20} color={"gray"} />
          </View>
        </View>

        {/* BODY */}
        <View
          style={{ height: verticalScale(290) }}
          className='bg-gray-200 p-2 rounded-3xl'
        >
          {renderData ? (
            <FlatList
              data={itemsToRender}
              ListEmptyComponent={
                loading
                  ? LoadingList("Fetching Ingredients")
                  : EmptyList(
                      "No Ingredients",
                      "Make sure to add your ingredients! (Refresh to Update)"
                    )
              }
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("EditFruitScreen", { ...item });
                    }}
                    style={{ backgroundColor: categoryBG[item.category] }}
                    className=' mb-2 border-gray-200 border-2 rounded-3xl p-2 w-full flex-row items-center justify-between '
                  >
                    <Image
                      style={{ resizeMode: "center" }}
                      className='w-12 h-12 bg-white rounded-2xl'
                      source={{
                        uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                      }}
                    />

                    <View className='items-center '>
                      <Text className='text-md font-bold uppercase'>
                        {item.name}
                      </Text>
                      <Text className='bg-red text-xs'> {item.aisle}</Text>
                    </View>

                    <View className={"  items-center rounded-full z-10 mx-3"}>
                      <Text className='font-medium text-lg'>
                        {item.quantity}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View></View>
          )}
        </View>
      </SafeAreaView>

      {/* SCREEN */}
    </ScreenWrapper>
  );
}
