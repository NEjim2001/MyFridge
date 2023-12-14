import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ScreenWrapper from "../components/ScreenWrapper";
import {
  ClockIcon,
  FireIcon,
  LightBulbIcon,
  StarIcon,
} from "react-native-heroicons/outline";
import BackButton from "../components/BackButton";
import ViewDivider from "../components/ViewDivider";
import cheerio from "react-native-cheerio";
import { colors } from "../theme";
import { HeartIcon } from "react-native-heroicons/solid";
import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { favoritesRef } from "../config/firebase";
import { useSelector } from "react-redux";

export default function RecipeInfoScreen(props) {
  const {
    location,
    id,
    title,
    image,
    spoonacularSourceUrl,
    analyzedInstructions,
    summary,
    healthScore,
    spoonacularScore,
    readyInMinutes,
    extendedIngredients,
    dishTypes,
  } = props.route.params;

  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  // Summary Text Extraction
  const $ = cheerio.load(summary);
  const extractedSummaryText = $.text();
  const extractedSummarySentences = extractedSummaryText.split(".");
  const summaryText = extractedSummarySentences.slice(0, 2).join(".");

  const handleFavoriteButton = async () => {
    try {
      setLoading(true);

      if (favorite) {
        // Remove from favorites
        const querySnapshot = await getDocs(
          query(favoritesRef, where("recipeID", "==", id))
        );
        const docRef = querySnapshot.docs[0]?.ref;

        if (docRef) {
          await deleteDoc(docRef);
        }

        console.log("Removed from Favorite");
      } else {
        // Add to favorites
        await addDoc(favoritesRef, {
          recipeID: id,
          favorite: true,
          userID: user,
        });

        console.log("Added to Favorite");
      }

      setFavorite(!favorite); // Toggle favorite state
    } catch (error) {
      console.error("Error handling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      async function fetchFavorites() {
        const querySnapshot = await getDocs(
          query(favoritesRef, where("recipeID", "==", id))
        );

        const doc = querySnapshot.docs[0]?.data(); // Extract data from the document

        // Check if the document exists and if favorite is true
        if (doc && doc.favorite === true) {
          setFavorite(true);
        }
      }
      fetchFavorites();
    } catch (error) {
      console.error("Error handling favorite:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  LogBox.ignoreLogs(["Encountered two children with the same key"]);

  const stepInstructions = analyzedInstructions;
  return (
    <ScreenWrapper>
      <View className='mx-6 absolute top-10 flex-row justify-between w-11/12  z-10'>
        <BackButton
          navi={navigation}
          background='white'
          fill={colors.lightOrange}
        />
        <TouchableOpacity
          onPress={handleFavoriteButton}
          className=' p-2 mb-2 w-12 bg-white rounded-full items-center justify-center'
        >
          <HeartIcon
            color={favorite ? colors.lightOrange : "lightgray"}
            size={30}
          />
        </TouchableOpacity>
      </View>

      {/* SCREEN */}
      <ScrollView showsVerticalScrollIndicator={false} className='h-full '>
        {/* HEADER */}
        <Image
          className='rounded-3xl w-full h-80 mb-2'
          source={{ uri: image }}
        />
        <View className='mx-4'>
          <View className='space-y-2'>
            <Text
              style={{ color: colors.mainOrange }}
              className='uppercase font-bold text-lg'
            >
              {dishTypes[0]} | {dishTypes[2]}
            </Text>
            <Text
              style={{ color: "black" }}
              className='text-xl font-extrabold  uppercase '
            >
              {title}
            </Text>
            <ViewDivider />
          </View>

          {/* BODY */}
          <View className='space-y-2'>
            <View className='flex-row justify-evenly'>
              {/* First Column */}
              <View
                style={{ backgroundColor: colors.lightOrange }}
                className=' p-3 rounded-full space-y-2'
              >
                <View className='p-1 bg-white rounded-full'>
                  <ClockIcon size={40} color={"black"} />
                </View>
                <View className='text-md items-center'>
                  <Text className='font-bold text-md text-center'>
                    {readyInMinutes}
                  </Text>
                  <Text className='font-bold'>Min</Text>
                </View>
              </View>

              <View
                style={{ backgroundColor: colors.lightOrange }}
                className=' p-3 rounded-full space-y-2'
              >
                <View className='p-1 bg-white rounded-full'>
                  <FireIcon size={40} color={"black"} />
                </View>
                <View className='text-md items-center'>
                  <Text className='font-bold '>{healthScore}</Text>
                  <Text className='font-bold'>Cal</Text>
                </View>
              </View>

              {/* Second Column */}
              <View
                style={{ backgroundColor: colors.lightOrange }}
                className=' p-3 rounded-full space-y-2'
              >
                <View className='p-1 bg-white rounded-full'>
                  <LightBulbIcon size={40} color={"black"} />
                </View>
                <View className='text-md items-center'>
                  <Text />
                  <Text className='font-bold'>
                    {readyInMinutes < 15
                      ? "Easy"
                      : readyInMinutes < 30
                      ? "Medium"
                      : "Hard"}
                  </Text>
                </View>
              </View>

              <View
                style={{ backgroundColor: colors.lightOrange }}
                className=' p-3 rounded-full space-y-2'
              >
                <View className='p-1 bg-white rounded-full'>
                  <StarIcon size={40} color={"black"} />
                </View>
                <View className='text-md items-center'>
                  <Text className='font-bold text-md text-center'>
                    {(spoonacularScore / 10).toFixed(1)} / 10
                  </Text>
                  <Text className='font-bold'>Rating</Text>
                </View>
              </View>
            </View>

            <ViewDivider />

            <Text
              style={{ color: colors.mainOrange }}
              className=' text-md italic text-center'
            >
              {summaryText}.
            </Text>

            <ViewDivider />

            {/* INGREDIENT LIST */}
            <Text className='text-black text-2xl font-semibold'>
              Ingredients
            </Text>
            <FlatList
              data={extendedIngredients}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{ backgroundColor: "white" }}
                    className='mb-2 border-gray-200 border-2 rounded-3xl p-2 w-full flex-row items-center justify-between'
                  >
                    <Image
                      className='w-20 h-20'
                      source={{
                        uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                      }}
                      resizeMode='contain'
                    />
                    <View className='items-center w-32'>
                      <Text className='text-md font-semibold uppercase '>
                        {item.name}
                      </Text>
                    </View>

                    <View className='w-20 items-center space-y-2'>
                      <Text
                        style={{ color: colors.lightOrange }}
                        className='font-semibold '
                      >
                        {item.measures.us.amount}
                      </Text>

                      <Text className='capitalize '>
                        {item.measures.us.unitShort
                          ? item.measures.us.unitShort
                          : "pieces"}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
      {/* STEPS SCREEN BUTTON */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(location == "Home" ? "Home" : "Recipes", {
            options: { tabBarStyle: { display: "none" } },
            screen:
              location == "Home" ? "HomeRecipeStepScreen" : "RecipeStepScreen",
            params: {
              id,
              title,
              image,
              stepInstructions,
              spoonacularSourceUrl,
            },
          });
        }}
        style={{ backgroundColor: colors.lightOrange, height: 90 }}
        className='fixed  p-2 justify-center rounded-3xl items-center'
      >
        <Text className='text-white font-semibold text-2xl'>View Steps</Text>
      </TouchableOpacity>

      {/* SCREEN */}
    </ScreenWrapper>
  );
}
