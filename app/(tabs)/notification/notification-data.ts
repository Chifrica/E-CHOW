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
		message: "🎉 Hurray! You have successfully created an account with E-CHOW",
		time: formatTime(),
		image: require("@/assets/images/user-img.jpg"),
	},
];