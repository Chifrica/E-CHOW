import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";
import { notificationData } from "./notification-data";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";

const NotificationScreen: React.FC = () => {
	// const navigateToProfile = () => {
	// 	router.push("/(root)/src/profile/profileScreen");
	// };

	const { user } = useUser();
	const profileImage = user?.imageUrl;

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.heading}>Notifications</Text>

			<View style={styles.notifications}>
				{notificationData.map((notification) => (
					<View
						key={notification.id}
						style={styles.notificationContainer}>
						<View style={styles.notificationHeader}>
							<View style={styles.userCard}>
								<Image
									style={styles.userImg}
									source={{ uri: profileImage }}
								/>
								<Text
									style={styles.userName}
									// onPress={navigateToProfile}
								>
									{user?.fullName}
								</Text>
							</View>
							<Text style={styles.time}>{notification.time}</Text>
						</View>

						<View style={styles.notificationBody}>
							<Text style={styles.message}>{notification.message}</Text>
						</View>

						<View style={styles.horizontalRule} />
					</View>
				))}
			</View>
		</SafeAreaView>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
	},

	heading: {
		fontSize: 25,
		fontWeight: "700",
		paddingVertical: 20,
	},

	notifications: {
		flexDirection: "column",
		marginTop: 20,
	},

	notificationContainer: {
		marginBottom: 10,
	},

	notificationHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	userCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},

	userImg: {
		width: 50,
		height: 50,
		borderRadius: 25,
	},

	userName: {
		fontSize: 18,
		fontWeight: "600",
	},

	time: {
		color: "gray",
		fontWeight: "500",
	},

	notificationBody: {
		marginLeft: 60,
	},

	message: {
		fontSize: 18,
	},

	horizontalRule: {
		borderBottomWidth: 1,
		borderBottomColor: "lightgray",
		marginVertical: 10,
		width: "100%",
	},
});
