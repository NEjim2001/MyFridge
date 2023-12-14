import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { colors } from "../theme";
import { PlusIcon, MinusIcon } from "react-native-heroicons/outline";
import Loading from "../components/Loading";
import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ingredientsRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

export default function EditFruitScreen(props) {
  const { itemID, quantity } = props.route.params;
  const navigation = useNavigation();

  const [newQuantity, setQuantity] = useState(quantity);
  const [newCategory, setCategory] = useState("");

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleSaveButton = async () => {
    try {
      setLoading(true);
      const q = query(ingredientsRef, where("itemID", "==", itemID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;

        if (newQuantity === 0) {
          // If quantity is 0, delete the document
          Alert.alert("Deleting Item", "Are you Sure?", [
            {
              text: "Cancel",
              onPress: () => {
                setLoading(false);
              },
              style: "destructive",
            },
            {
              text: "Delete",
              onPress: async () => {
                await deleteDoc(docRef);
                setLoading(false);
                navigation.goBack();
              },
              style: "destructive",
            },
          ]);
        } else if (newCategory) {
          // If category, ingredientItem, and quantity > 0, update the document
          await updateDoc(docRef, {
            category: newCategory,
            quantity: newQuantity,
          });

          setLoading(false);
          navigation.goBack();
        } else {
          Alert.alert("Invalid Input");
        }
      }
    } catch (error) {
      console.error("Error updating/deleting document:", error);
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper>
      <TouchableOpacity
        className='h-full'
        onPress={() => navigation.goBack()}
      ></TouchableOpacity>

      <View className='absolute justify-evenly bg-white rounded-3xl p-6 bottom-0'>
        <View className='mt-4'>
          <BackButton
            navi={navigation}
            background={colors.lightOrange}
            fill='white'
          />

          <Text
            style={{ fontSize: scale(30) }}
            className='text-black font-semibold'
          >
            Fine-Tune Your
          </Text>

          <Text
            style={{ color: colors.lightOrange, fontSize: scale(30) }}
            className='font-semibold'
          >
            Ingredient!
          </Text>
        </View>

        {/* CATEGORY BAR */}
        <View className='flex-row my-2'>
          <View className='items-center flex-row w-full  justify-evenly'>
            <TouchableOpacity onPress={() => setCategory("fruit")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: newCategory == "fruit" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/FIcon.png`)}
                />
                <Text className='text-xs font-medium'>Fruit</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCategory("dairy")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: newCategory == "dairy" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/DIcon.png`)}
                />
                <Text className='text-xs font-medium'>Dairy</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCategory("protein")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: newCategory == "protein" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/PIcon.png`)}
                />
                <Text className='text-xs font-medium'>Protein</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCategory("vegetable")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: newCategory == "vegetable" ? "green" : "white",
                    width: moderateScale(56),
                    height: moderateScale(56),
                  }}
                  className='border-2 rounded-full'
                  source={require(`../assets/images/VIcon.png`)}
                />
                <Text className='text-xs font-medium'>Vegetable</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setCategory("grain")}>
              <View className='items-center'>
                <Image
                  style={{
                    borderColor: newCategory == "grain" ? "green" : "white",
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

        {/* SUBMIT BODY */}
        <View className='space-y-4'>
          <Text className='font-bold text-xl'>Quantity</Text>
          <View className='flex-row items-center space-x-6 justify-evenly'>
            <TouchableOpacity
              onPress={() => {
                setQuantity(0);
              }}
              className='px-4 py-3 justify-center rounded-full bg-gray-200'
            >
              <Text className='font-semibold text-xl'> 0 </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: colors.lightOrange }}
              onPress={() => {
                setQuantity(newQuantity - 1);
              }}
              className='p-4 justify-center rounded-full'
            >
              <MinusIcon size={30} color='white' />
            </TouchableOpacity>

            <Text className='text-black text-4xl font-medium'>
              {newQuantity}
            </Text>
            <TouchableOpacity
              style={{ backgroundColor: colors.lightOrange }}
              onPress={() => {
                setQuantity(newQuantity + 1);
              }}
              className='p-4 justify-center rounded-full'
            >
              <PlusIcon size={30} color='white' />
            </TouchableOpacity>
          </View>
          {loading ? (
            <Loading />
          ) : (
            <TouchableOpacity
              onPress={handleSaveButton}
              style={{ backgroundColor: colors.lightOrange }}
              className='p-4 rounded-full items-center'
            >
              <Text className='text-white font-semibold text-lg'>Save</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
