import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const AppLayout = () => {
	return (
		<Tabs
			screenOptions={{ tabBarActiveTintColor: "#E58945", headerShown: false }}>
			<Tabs.Screen
				name="homePage"
				options={{
					title: "Home",
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="home"
							size={size || 24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="exploreScreen"
				options={{
					title: "Explore",
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="search"
							size={size || 24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="orderScreen"
				options={{
					title: "My Orders",
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="shopping-cart"
							size={size || 24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="scheduleScreen"
				options={{
					title: "Schedule",
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="calendar-alt"
							size={size || 24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="notificationScreen"
				options={{
					title: "Notification",
					tabBarIcon: ({ focused, color, size }) => (
						<FontAwesome5
							name="bell"
							size={size || 24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default AppLayout;
