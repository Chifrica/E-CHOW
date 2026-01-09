import { useGlobalContext } from "../lib/global-provider";
import { Redirect } from "expo-router";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
	const { isLoggedIn, loading, user } = useGlobalContext();

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (isLoggedIn) {
        if (!user?.role) {
          return <Redirect href="/complete-profile" />;
        }
		return <Redirect href="/home/homePage" />;
	}

	return <Redirect href="/onBoarding" />
}
