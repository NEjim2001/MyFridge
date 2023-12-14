import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import React, { useCallback, useState } from "react";
import BackButton from "../components/BackButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { fetchIngredientsByName } from "../api/spoonacularAPI";
import { colors } from "../theme";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  MinusIcon,
} from "react-native-heroicons/outline";
import { debounce } from "lodash";
import Loading from "../components/Loading";
import { addDoc } from "firebase/firestore";
import { ingredientsRef } from "../config/firebase";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

export default function AddFruitScreen() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [searchData, setSearchData] = useState([]);

  const [ingredientItem, setIngredientItem] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState("");

  const handleSearch = (value) => {
    if (value.length > 3) {
      fetchIngredientsByName(value).then((data) => {
        setSearchData(data);
      });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const handleAddButton = async () => {
    try {
      if (quantity <= 0) {
        Alert.alert("Missing Quantity", "Add an amount");
      }
      if (!ingredientItem) {
        Alert.alert("Missing Item", "Add an item");
      }
      if (!category) {
        Alert.alert("Missing Category", "Add a category");
      }
      if (category && ingredientItem && quantity > 0) {
        setLoading(true);
        let doc = await addDoc(ingredientsRef, {
          name: ingredientItem.name,
          aisle: ingredientItem.aisle,
          image: ingredientItem.image,
          itemID: ingredientItem.id,
          category: category,
          quantity: quantity,
          userID: user,
        });
        setLoading(false);

        if (doc && doc.id) {
          navigation.goBack();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScreenWrapper color={"rgba(255,255,255,0)"}>
      <TouchableOpacity
        className='h-full'
        onPress={() => navigation.goBack()}
      ></TouchableOpacity>

      <View className='absolute space-y-2 bg-white rounded-3xl p-6 bottom-0'>
        <View className='mt-4'>
          <BackButton
            navi={navigation}
            background={colors.lightOrange}
            fill='white'
          />

          <Text className='text-black font-semibold text-3xl'>
            Build Your Ingredient
          </Text>

          <Text
            style={{ color: colors.lightOrange }}
            className='font-hind-madurai font-semibold text-3xl'
          >
            Aresenal!
          </Text>
        </View>

        <View>
          <Text className='font-semibold text-2xl'>Select a Category</Text>

          {/* CATEGORY BAR */}
          <View className='flex-row mt-2'>
            <View className='items-center flex-row w-full  justify-evenly'>
              <TouchableOpacity onPress={() => setCategory("fruit")}>
                <View className='items-center'>
                  <Image
                    style={{
                      borderColor: category == "fruit" ? "green" : "white",
                    }}
                    className='w-14 h-14 mb-1 border-2 rounded-full'
                    source={require(`../assets/images/FIcon.png`)}
                  />
                  <Text className='text-xs font-medium'>Fruit</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCategory("dairy")}>
                <View className='items-center'>
                  <Image
                    style={{
                      borderColor: category == "dairy" ? "green" : "white",
                    }}
                    className='w-14 h-14 mb-1 border-2 rounded-full'
                    source={require(`../assets/images/DIcon.png`)}
                  />
                  <Text className='text-xs font-medium'>Dairy</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCategory("protein")}>
                <View className='items-center'>
                  <Image
                    style={{
                      borderColor: category == "protein" ? "green" : "white",
                    }}
                    className='w-14 h-14 mb-1 border-2 rounded-full'
                    source={require(`../assets/images/PIcon.png`)}
                  />
                  <Text className='text-xs font-medium'>Protein</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCategory("vegetable")}>
                <View className='items-center'>
                  <Image
                    style={{
                      borderColor: category == "vegetable" ? "green" : "white",
                    }}
                    className='w-14 h-14 mb-1 border-2 rounded-full'
                    source={require(`../assets/images/VIcon.png`)}
                  />
                  <Text className='text-xs font-medium'>Vegetable</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setCategory("grain")}>
                <View className='items-center'>
                  <Image
                    style={{
                      borderColor: category == "grain" ? "green" : "white",
                    }}
                    className='w-14 h-14 mb-1 border-2 rounded-full'
                    source={require(`../assets/images/GIcon.png`)}
                  />
                  <Text className='text-xs font-medium'>Grain</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* SEARCH BAR */}
        <Text className='font-semibold text-2xl '>Search</Text>

        <View className='bg-gray-200 opacity-70 items-center rounded-full  p-2 flex-row'>
          <TextInput
            onChangeText={handleTextDebounce}
            className='mx-auto'
            placeholder='Search any item'
          />
          <View className='p-1 rounded-full bg-white'>
            <MagnifyingGlassIcon size={20} color={"gray"} />
          </View>
        </View>

        {/* RESULT BODY */}
        <View className='bg-gray-200 h-52 w-full rounded-2xl'>
          {searchData ? (
            <FlatList
              data={searchData.results}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setIngredientItem(item);
                    }}
                    style={{
                      borderColor:
                        item.id === ingredientItem.id ? "green" : "lightgray",
                    }}
                    className='bg-white mb-2 border-2 rounded-3xl p-2 w-full flex-row items-center justify-between '
                  >
                    <Image
                      style={{ resizeMode: "center" }}
                      className='w-12 h-12 bg-white rounded-2xl'
                      source={{
                        uri: `https://spoonacular.com/cdn/ingredients_100x100/${item.image}`,
                      }}
                    />

                    <View className='items-center w-72'>
                      <Text className='text-md font-bold uppercase text-black text-center'>
                        {item.name}
                      </Text>
                      <Text className='bg-red text-xs'> {item.aisle}</Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <View></View>
          )}
        </View>

        {/* SUBMIT BODY */}
        <View className='space-y-4'>
          <Text className='font-semibold text-xl'>Quantity</Text>
          <View className='flex-row items-center space-x-6 justify-center'>
            <TouchableOpacity
              style={{ backgroundColor: colors.lightOrange }}
              onPress={() => {
                setQuantity(quantity - 1);
              }}
              className='p-4 justify-center rounded-full'
            >
              <MinusIcon size={30} color='white' />
            </TouchableOpacity>

            <Text className='text-black text-4xl font-medium'>{quantity}</Text>
            <TouchableOpacity
              style={{ backgroundColor: colors.lightOrange }}
              onPress={() => {
                setQuantity(quantity + 1);
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
              onPress={handleAddButton}
              style={{ backgroundColor: colors.lightOrange }}
              className='p-4 rounded-full items-center'
            >
              <Text className='text-white font-semibold text-lg'>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScreenWrapper>
  );
}
