import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

const notifications = [
	{
		id: 1,
		userName: "Wiels",
		message: "🎉 Hurray! Your Order has arrived",
		time: "9:35 am",
		image: require("@/assets/images/user-img.jpg"),
	},
	{
		id: 2,
		userName: "Alice",
		message: "🎉 Your subscription is now active!",
		time: "10:15 am",
		image: require("@/assets/images/user-img.jpg"),
	},
];

const NotificationScreen = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Notifications</Text>

			<View style={styles.notifications}>
				{notifications.map((notification) => (
					<View
						key={notification.id}
						style={styles.notificationContainer}>
						<View style={styles.notificationHeader}>
							<View style={styles.userCard}>
								<Image
									style={styles.userImg}
									source={notification.image}
								/>
								<Text style={styles.userName}>{notification.userName}</Text>
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
		</View>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20,
		paddingHorizontal: 10,
	},

	heading: {
		fontSize: 25,
		fontWeight: "700",
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
