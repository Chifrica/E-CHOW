import { SplashScreen, Stack } from "expo-router";
// import "./global.css";

import {useFonts} from "expo-font";
import { useEffect } from "react";
// import GlobalProvider from "@/lib/global-provider";

export default function RootLayout() {

  // useEffect( () => {
  //   if (fontLoaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [fontLoaded]);

  // if (!fontLoaded) {
  //   return null;
  // }

  return (
    // <GlobalProvider>
     <Stack screenOptions={{ headerShown: false }}/>
    // </GlobalProvider>
    // <Stack />
  )
}
