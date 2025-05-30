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
		vendorName: "5G Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Good Burger",
		deliveryTime: "\u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
	{
		id: "3",
		vendorName: "Sweet Sixteen Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Beans and Plantain",
		deliveryTime: "\u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
	{
		id: "4",
		vendorName: "Gensis",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Meat Pie",
		deliveryTime: "\u20A67000 - 10min away",
		image: require("../../../assets/images/burger.png"),
	},
];

export const exploreImages = {
	explore1: require("../../../assets/images/burger.png"),
};
