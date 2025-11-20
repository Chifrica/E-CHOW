import { Slot, SplashScreen, Stack } from "expo-router";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import { LocationProvider } from "./(root)/src/context/locationContext";
import GlobalProvider from "../lib/global-provider";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

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
		<ClerkProvider
			tokenCache={tokenCache}
			publishableKey={CLERK_PUBLISHABLE_KEY}>
			<GlobalProvider>
				<LocationProvider>
					{/* <Stack screenOptions={{ headerShown: false }} /> */}
					<Slot />
				</LocationProvider>
			</GlobalProvider>
		</ClerkProvider>		

		// <Stack />
	);
}
