/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/HomeScreen.{js,jsx,ts,tsx}",
    "./screens/MyFridgeScreen.{js,jsx,ts,tsx}",
    "./screens/RecipeScreen.{js,jsx,ts,tsx}",
    "./screens/RecipeStepScreen.{js,jsx,ts,tsx}",
    "./screens/RecipeInfoScreen.{js,jsx,ts,tsx}",
    "./screens/EditFruitScreen.{js,jsx,ts,tsx}",

    "./screens/AddFruitScreen.{js,jsx,ts,tsx}",

    "./screens/WelcomeScreen.{js,jsx,ts,tsx}",
    "./screens/LoginScreen.{js,jsx,ts,tsx}",
    "./screens/SignUpScreen.{js,jsx,ts,tsx}",

    "./components/BackButton.{js,jsx,ts,tsx}",
    "./components/ScreenWrapper.{js,jsx,ts,tsx}",
    "./components/EmptyList.{js,jsx,ts,tsx}",
    "./components/LoadingList.{js,jsx,ts,tsx}",

    "./components/ViewDivider.{js,jsx,ts,tsx}",
    "./components/Loading.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      backgroundOpacity: {
        10: "0.1",
        20: "0.2",
        95: "0.95",
      },
      colors: {
        "peach-pink": "#fee2bb",
        "fruit-category": "#FF5064",
      },
    },
  },
  plugins: [],
};
