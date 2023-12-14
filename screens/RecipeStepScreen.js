import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Linking,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GlobeAmericasIcon,
  HeartIcon,
} from "react-native-heroicons/outline";
import BackButton from "../components/BackButton";
import { colors } from "../theme";
import { addDoc, deleteDoc, getDocs, query, where } from "@firebase/firestore";
import { favoritesRef } from "../config/firebase";
import { useSelector } from "react-redux";

export default function RecipeStepScreen(props) {
  const { id, title, image, stepInstructions, spoonacularSourceUrl } =
    props.route.params;
  const navigation = useNavigation();

  const [favorite, setFavorite] = useState(null);

  const [stepNumber, setStepNumber] = useState(0);
  const [numberOfSteps, setNumberOfSteps] = useState(0);
  const { user } = useSelector((state) => state.user);

  const [steps, setSteps] = useState("");

  const [loading, setLoading] = useState(false);

  const handleStepButtons = (direction) => {
    if (direction === "previous") {
      if (stepNumber > 0) {
        setStepNumber(stepNumber - 1);
      }
    } else {
      if (stepNumber + 1 < numberOfSteps) {
        setStepNumber(stepNumber + 1);
      }
    }
  };

  useEffect(() => {
    try {
      if (stepInstructions.length > 0 && stepInstructions[0].steps.length > 0) {
        setNumberOfSteps(stepInstructions[0].steps.length);
        setSteps(stepInstructions[0].steps);
      } else {
        Alert.alert("No Steps", "Click the URL for more info");
      }
    } catch (error) {
      console.error("Error fetching steps:", error);
    }
  }, [stepInstructions]);

  const handlePress = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

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
  }, [favorite]);

  return (
    <SafeAreaView className='h-full'>
      {/* HEADER */}
      <View className='m-4 flex-row justify-between '>
        <BackButton
          navi={navigation}
          background={colors.lightOrange}
          fill='white'
        />

        <View className='justify-between flex-row space-x-4'>
          <TouchableOpacity
            onPress={() => handlePress(spoonacularSourceUrl)}
            style={{ backgroundColor: colors.lightOrange }}
            className='  rounded-full p-2 mb-2 bg-white items-center'
          >
            <GlobeAmericasIcon size={30} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleFavoriteButton}
            style={{
              backgroundColor:
                favorite === true ? "hotpink" : colors.lightOrange,
            }}
            className=' rounded-full p-2 mb-2 bg-white items-center'
          >
            <HeartIcon color={favorite ? "white" : "white"} size={30} />
          </TouchableOpacity>
        </View>
      </View>

      <View className='m-4'></View>

      <View className='mx-10'>
        <View className='my-8'>
          <Text
            style={{ color: colors.mainOrange }}
            className=' font-bold text-3xl'
          >
            Step {stepNumber + 1}
          </Text>
        </View>

        <View className='mx-4 mb-2'>
          <Text
            style={{ color: colors.lightOrange }}
            className='font-semibold text-lg'
          >
            {steps[stepNumber]
              ? steps[stepNumber].step
              : "No Instructions Included"}
          </Text>
        </View>

        <View className='items-center'>
          <Text style={{ color: colors.lightOrange }} className=' font-light'>
            {numberOfSteps > 0 ? stepNumber + 1 : 0} / {numberOfSteps}
          </Text>
        </View>
      </View>

      <View className='absolute bottom-0'>
        {/* STEP BUTTONS */}
        <View className='justify-evenly space-x-52  flex-row  mb-4 w-screen '>
          <TouchableOpacity
            onPress={() => handleStepButtons("previous")}
            className='bg-white p-6 rounded-full items-center justify-center'
          >
            <ArrowLeftIcon size={25} color={colors.mainOrange} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleStepButtons("next")}
            className='bg-white p-6 rounded-full items-center justify-center'
          >
            <ArrowRightIcon size={25} color={colors.mainOrange} />
          </TouchableOpacity>
        </View>

        {/* FOOTER */}
        <View className='bg-white rounded-2xl py-5 px-4 flex-row'>
          <Image className='rounded-3xl w-32 h-24' source={{ uri: image }} />
          <Text
            style={{ color: colors.mainOrange }}
            className='w-64 font-bold uppercase text-xl text-center'
          >
            {title}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
