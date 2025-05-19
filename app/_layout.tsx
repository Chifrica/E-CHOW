import { Slot, SplashScreen, Stack } from "expo-router";
// import "./global.css";

import {useFonts} from "expo-font";
import { useEffect } from "react";
import { LocationProvider } from "./(root)/src/context/locationContext";
import GlobalProvider from "../lib/global-provider";
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
      <GlobalProvider>
        <LocationProvider>
        {/* <Stack screenOptions={{ headerShown: false }} /> */}
          <Slot />
        </LocationProvider>
      </GlobalProvider> 
  
    // <Stack /> */}
  )
}