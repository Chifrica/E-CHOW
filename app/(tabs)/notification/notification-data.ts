const formatTime = () => {
	const now = new Date();
	const hours = now.getHours();
	const minutes = now.getMinutes().toString().padStart(2, "0");
	const ampm = hours >= 12 ? "pm" : "am";
	const formattedHour = hours % 12 || 12;
	return `${formattedHour}:${minutes} ${ampm}`;
};

export const notificationData = [
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
