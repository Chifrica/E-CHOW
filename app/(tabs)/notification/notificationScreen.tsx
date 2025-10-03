import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { notificationData } from "./notification-data";
import { router } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationScreen: React.FC = () => {
	// const navigateToProfile = () => {
	// 	router.push("/(root)/src/profile/profileScreen");
	// };

	const { user } = useUser();
	const profileImage = user?.imageUrl;

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={styles.scrollView}
			>
				<Text style={styles.header}>Notifications</Text>

				<View style={styles.notifications}>
					{notificationData.map((notification) => (
						<View
							key={notification.id}
							style={styles.notificationContainer}
						>
								<View style={{ flexDirection: "row", alignItems: "center", marginRight: 10 }}>
									<Image
										style={styles.userImg}
										source={{ uri: profileImage }}
									/>
									<View style={styles.notificationBody}>
										<View style={styles.userCard}>
											<Text
												style={styles.userName}
												// onPress={navigateToProfile}
											>
												{user?.fullName}
											</Text>
											<Text style={styles.time}>{notification.time}</Text>
										</View>

										{/* <View style={styles.notificationBody}> */}
											<Text style={styles.message}>{notification.message}</Text>
										{/* </View> */}
									</View>
								</View>
								

							<View style={styles.horizontalRule} />
						</View>
					))}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 15,
	},

	header: {
		fontSize: 25,
		fontWeight: "bold",
		paddingVertical: 10,
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
		// alignItems: "center",
		gap: "5",
		justifyContent: "space-between",
		marginRight: 10
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
		marginLeft: 20,
		marginRight: 40
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
