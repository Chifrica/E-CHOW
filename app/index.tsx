import { SafeAreaView } from "react-native-safe-area-context";
import OnboardingScreen from "@/app/(root)/onBoarding";
import { useGlobalContext } from "@/lib/global-provider";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
	const { isLoggedIn, loading } = useGlobalContext();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (isLoggedIn) {
		return <Redirect href="/home/homePage" />;
	}

	return (
		<SafeAreaView>
			<OnboardingScreen />
		</SafeAreaView>
	);
}
