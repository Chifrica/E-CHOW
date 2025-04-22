import React from "react";
import { Tabs } from "expo-router";
import { Image, StyleSheet } from "react-native";

const AppLayout = () => {
	return (
		<Tabs
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused }) => {
					let iconSource;

					if (route.name === "home") {
						iconSource = focused
							? require("@/assets/icons/notification.svg") // Active icon
							: require("@/assets/icons/notification.svg"); // Inactive icon
					} else if (route.name === "explore") {
						iconSource = focused
							? require("@/assets/icons/explore.svg")
							: require("@/assets/icons/explore.svg");
					} else if (route.name === "orders") {
						iconSource = focused
							? require("@/assets/icons/orders.svg")
							: require("@/assets/icons/orders.svg");
					} else if (route.name === "schedule") {
						iconSource = focused
							? require("@/assets/icons/schedule.svg")
							: require("@/assets/icons/schedule.svg");
					} else if (route.name === "notification") {
						iconSource = focused
							? require("@/assets/icons/notification.svg")
							: require("@/assets/icons/notification.svg");
					}

					return (
						<Image
							source={iconSource}
							style={styles.icon}
						/>
					);
				},
				tabBarActiveTintColor: "#E58945",
				tabBarInactiveTintColor: "gray",
				headerShown: false,
			})}>
			<Tabs.Screen
				name="home"
				options={{ title: "Home" }}
			/>
			<Tabs.Screen
				name="explore"
				options={{ title: "Explore" }}
			/>
			<Tabs.Screen
				name="orders"
				options={{ title: "My Orders" }}
			/>
			<Tabs.Screen
				name="schedule"
				options={{ title: "Schedule" }}
			/>
			<Tabs.Screen
				name="notification"
				options={{ title: "Notification" }}
			/>
		</Tabs>
	);
};

const styles = StyleSheet.create({
	icon: {
		width: 24, // Adjust the size of the icon
		height: 24,
		resizeMode: "contain",
	},
});

export default AppLayout;
