interface ExploreItem {
	id: string;
	vendorName: string;
	location: string;
	timeAgo: string;
	rating: number;
	foodName: string;
	deliveryTime: string;
	image: ".png";
}

export const exploreData = [
	{
		id: "1",
		vendorName: "NAO Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Spicy Jollof Rice",
		deliveryTime: "\u20A67000 - \u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
	{
		id: "2",
		vendorName: "NAO Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Spicy Jollof Rice",
		deliveryTime: "\u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
	{
		id: "3",
		vendorName: "NAO Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Spicy Jollof Rice",
		deliveryTime: "\u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
	{
		id: "4",
		vendorName: "NAO Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Spicy Jollof Rice",
		deliveryTime: "\u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
];

export const exploreImages = {
	explore1: require("../../../assets/images/burger.png"),
};
