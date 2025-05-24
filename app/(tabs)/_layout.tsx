import React from "react";
import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import images from "../../constants/images";
import icons from "../../constants/icons";

const TabIcon = ({ focused, icon }: any) => {
	if (focused) {
		return (
			<>
				<ImageBackground
					source={images.background}
					style={styles.container}>
					<Image
						source={icon}
						style={{
							width: 18,
							height: 18,
							top: "25%",
							right: "35%",
							position: "absolute",
						}}
					/>
				</ImageBackground>
			</>
		);
	}

	return (
		<View>
			<Image
				source={icon}
				style={{
					width: 20,
					height: 20,
				}}
				tintColor={"#E58945"}
			/>
		</View>
	);
};
const AppLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarLabelStyle: { color: "#E58945" },
			}}>
			<Tabs.Screen
				name="home/homePage"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.home}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="explore/exploreScreen"
				options={{
					title: "Explore",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.explore}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="orders/ordersScreen"
				options={{
					title: "My Orders",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.order}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="schedule/scheduleScreen"
				options={{
					title: "Schedule",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.schedule}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="notification/notificationScreen"
				options={{
					title: "Notification",
					headerShown: false,
					tabBarIcon: ({ focused }) => (
						<TabIcon
							focused={focused}
							icon={icons.notification}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default AppLayout;

const styles = StyleSheet.create({
	container: {
		position: "relative",
		display: "flex",
		width: "100%",
		height: "100%",
		minWidth: 60,
		minHeight: 60,
		borderRadius: 50,
		marginBottom: 20,
		overflow: "hidden",
	},
});
