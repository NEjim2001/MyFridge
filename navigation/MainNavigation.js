import React, { useEffect, useLayoutEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  useNavigationState,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  BookOpenIcon,
  HomeIcon,
  Squares2X2Icon,
} from "react-native-heroicons/solid";
import { colors } from "../theme";

import WelcomeScreen from "../screens/WelcomeScreen.js";
import LoginScreen from "../screens/LoginScreen.js";
import SignUpScreen from "../screens/SignUpScreen.js";
import HomeScreen from "../screens/HomeScreen.js";
import MyFridgeScreen from "../screens/MyFridgeScreen.js";
import AddFruitScreen from "../screens/AddFruitScreen.js";
import EditFruitScreen from "../screens/EditFruitScreen.js";
import RecipeScreen from "../screens/RecipeScreen.js";
import RecipeStepScreen from "../screens/RecipeStepScreen.js";
import RecipeInfoScreen from "../screens/RecipeInfoScreen.js";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { setUser } from "../redux/slices/user.js";
import { auth } from "../config/firebase.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({ navigation }) {
  const index = useNavigationState((state) => state?.index);
  const stateIndex = useNavigationState(
    (state) => state?.routes[index]?.state?.index
  );

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (u) => {
      dispatch(setUser(u.uid));
    });
  }, [dispatch]);

  useEffect(() => {
    if (stateIndex > 0 || user === null) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          position: "absolute",
          marginBottom: 20,
          marginRight: 5,
          marginLeft: 5,
          padding: 30,
          borderRadius: 50,
          backgroundColor: colors.lightOrange,
        },
      });
    }
  }, [stateIndex, user, navigation]);

  if (user) {
    return (
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen
          options={{ headerShown: false }}
          name='HomeScreen'
          component={HomeScreen}
        />
        <Stack.Screen
          name='HomeRecipeInfoScreen'
          component={RecipeInfoScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='HomeRecipeStepScreen'
          component={RecipeStepScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  } else {
    return (
      <Stack.Navigator initialRouteName='WelcomeScreen'>
        <Stack.Screen
          options={{ headerShown: false }}
          name='WelcomeScreen'
          component={WelcomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "transparentModal",
          }}
          name='LoginScreen'
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false, presentation: "transparentModal" }}
          name='SignUpScreen'
          component={SignUpScreen}
        />
      </Stack.Navigator>
    );
  }
}

function RecipeStack({ navigation }) {
  const index = useNavigationState((state) => state?.index);

  const stateIndex = useNavigationState(
    (state) => state?.routes[index]?.state?.index
  );

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Async operations or navigation actions here
    if (stateIndex > 0 || user === null) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          position: "absolute",
          marginBottom: 20,
          marginRight: 5,
          marginLeft: 5,
          padding: 30,
          borderRadius: 50,
          backgroundColor: colors.lightOrange,
        },
      });
    }
  }, [stateIndex]);
  return (
    <Stack.Navigator initialRouteName='RecipeScreen'>
      <Stack.Screen
        name='RecipeScreen'
        component={RecipeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RecipeInfoScreen'
        component={RecipeInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='RecipeStepScreen'
        component={RecipeStepScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function FridgeStack({ navigation }) {
  const index = useNavigationState((state) => state?.index);
  index;

  const stateIndex = useNavigationState(
    (state) => state?.routes[index]?.state?.index
  );

  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Async operations or navigation actions here
    if (stateIndex > 0 || user === null) {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          position: "absolute",
          marginBottom: 20,
          marginRight: 5,
          marginLeft: 5,
          padding: 30,
          borderRadius: 50,
          backgroundColor: colors.lightOrange,
        },
      });
    }
  }, [stateIndex]);

  return (
    <Stack.Navigator initialRouteName='MyFridgeScreen'>
      <Stack.Screen
        name='MyFridgeScreen'
        component={MyFridgeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='AddFruitScreen'
        component={AddFruitScreen}
        options={{ headerShown: false, presentation: "transparentModal" }}
      />
      <Stack.Screen
        name='EditFruitScreen'
        component={EditFruitScreen}
        options={{
          headerShown: false,
          presentation: "transparentModal",
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarContentContainerStyle: {
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarIconStyle: {
          color: "red",
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <HomeIcon color={focused ? "white" : "black"} size={45} />
          ),

          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Recipes'
        component={RecipeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <BookOpenIcon color={focused ? "white" : "black"} size={45} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Fridge'
        component={FridgeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Squares2X2Icon color={focused ? "white" : "black"} size={45} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export function MainNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
