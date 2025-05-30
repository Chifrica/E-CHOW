interface ExploreItem {
	id: string;
	vendorName: string;
	location: string;
	timeAgo: string;
	rating: number;
	foodName: string;
	deliveryTime: string;
	image: ".png";
	price: number;
}

const exploreData = [
	{
		id: "1",
		vendorName: "NAO Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Spicy Jollof Rice",
		deliveryTime: " - 10min away",
		image: require("../../../assets/images/burger.png"),
		price: 10000,
	},
	{
		id: "2",
		vendorName: "5G Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Good Burger",
		deliveryTime: " - 10min away",
		image: require("../../../assets/images/burger.png"),
		price: 4000,
	},
	{
		id: "3",
		vendorName: "Sweet Sixteen Restaurant",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Beans and Plantain",
		deliveryTime: " - 10min away",
		image: require("../../../assets/images/burger.png"),
		price: 9000,
	},
	{
		id: "4",
		vendorName: "Gensis",
		location: "Adebayo road, Ado Ekiti",
		timeAgo: "5min ago",
		rating: 4.5,
		foodName: "Meat Pie",
		deliveryTime: " - 10min away",
		image: require("../../../assets/images/burger.png"),
		price: 15000,
	},
];
// ₦

export default exploreData;

export const exploreImages = {
	explore1: require("../../../assets/images/burger.png"),
};
