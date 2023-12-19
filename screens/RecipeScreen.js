import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { colors } from "../theme/index.js";
import {
  fetchBulkRecipeInfoByID,
  fetchRecipesByIngredients,
} from "../api/spoonacularAPI";
import { getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { favoritesRef, ingredientsRef } from "../config/firebase.js";
import CustomSwitch from "../components/CustomSwitch.js";
import MasonryList from "@react-native-seoul/masonry-list";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import EmptyList from "../components/EmptyList.js";
import LoadingList from "../components/LoadingList.js";

export default function RecipeScreen() {
  const navigation = useNavigation();

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const [switchToggle, setSwitchToggle] = useState(1);
  const [ingredientsList, setIngredientList] = useState("");

  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchIngredients();
  };

  const onSelectSwitch = (index) => {
    setSwitchToggle(index);
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetchRecipesByIngredients(ingredientsList);
      const recipeIDs = response.map((item) => item.id).join(",");
      const results = await fetchBulkRecipeInfoByID(recipeIDs);
      setRecipes(results);
    } catch (error) {
      console.error("Error fetching recipe bulk: ", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
    console.log("Fetching Main Recipes...");
  }, [ingredientsList]);

  const fetchFavorites = async () => {
    try {
      const querySnapshot = await getDocs(
        query(
          favoritesRef,
          where("favorite", "==", true),
          where("userID", "==", user)
        )
      );

      const recipeIDs = querySnapshot.docs.map((doc) => doc.data().recipeID);
      setFavoriteRecipes(await fetchBulkRecipeInfoByID(recipeIDs.join(",")));
    } catch (error) {
      console.error("Error handling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchIngredients = async () => {
    try {
      let data = [];
      const q = query(ingredientsRef, where("userID", "==", user));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      const results = data.map((item) => item.name).join(",");
      setIngredientList(results); // Ingredient List
      setIsRefreshing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      fetchFavorites();
    } catch (error) {
      console.error("Error Handling Favorites:", error);
    } finally {
      setLoading(false);
    }
  }, [switchToggle]);

  useEffect(() => {
    fetchIngredients();
  }, []);

  return (
    <ScreenWrapper color={"white"}>
      <SafeAreaView className='mx-6 mt-20'>
        <View className='space-y-2'>
          <View>
            <Text style={{ fontSize: scale(40) }} className=' font-bold '>
              Whats Cooking
            </Text>

            <Text
              style={{ color: colors.lightOrange, fontSize: scale(40) }}
              className='font-bold '
            >
              Today?
            </Text>
          </View>

          {/* SWITCH BAR */}
          <View style={{ alignItems: "center" }}>
            <CustomSwitch
              selectionMode={1}
              roundCorner={true}
              option1={"Recipes"}
              option2={"Favorites"}
              onSelectSwitch={onSelectSwitch}
              selectionColor={"white"}
            />
          </View>

          <Text
            style={{ fontSize: moderateScale(30) }}
            className='font-semibold mb-2'
          >
            {switchToggle === 1 ? "Recipes" : "Favorites"}
          </Text>

          {/* RECIPE LIST */}
          <View style={{ height: verticalScale(380) }}>
            <MasonryList
              data={switchToggle === 1 ? recipes : favoriteRecipes}
              ListEmptyComponent={
                isRefreshing
                  ? LoadingList("Fetching Recipes")
                  : EmptyList(
                      "Not enough ingredients!",
                      "Make sure to add your ingredients! (Refresh to Update)"
                    )
              }
              onRefresh={onRefresh}
              refreshing={isRefreshing}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    className='mb-5'
                    onPress={() =>
                      navigation.navigate("RecipeInfoScreen", {
                        ...item,
                        location: "Recipe",
                      })
                    }
                  >
                    <View className='space-y-2 items-center'>
                      <Image
                        style={{
                          height: 250,
                          width: moderateScale(160),
                        }}
                        className='rounded-3xl '
                        source={{ uri: item.image }}
                      ></Image>

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
