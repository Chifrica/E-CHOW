// import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native'
// import React from 'react'
// import { restaurantAllData } from '../app/(tabs)/home/data'
// import { Ionicons } from '@expo/vector-icons'

// const AllRestaurants = () => {

//     const handleMealPress = (mealIndex = 0) => {
// 		setSelectedMeal(sampleMeals[mealIndex]);
// 		setCustomizeModalVisible(true);
// 	};
    
//   return (
//     <View>
//       <Text>AllRestaurants</Text>

//         {restaurantAllData.slice(0, 4).map((item, index) => (
//             <TouchableOpacity
//                 key={index}
//                 style={styles.restaurantItem}
//                 onPress={() => handleMealPress(0)}>
//                 <Image
//                     source={item.restaurantAll}
//                     style={styles.restaurantImage}
//                 />
//                 <View style={styles.restaurantDetails}>
//                     <Text style={styles.restaurantName}>
//                         {index === 0
//                             ? "Pepperoni"
//                             : index === 1
//                             ? "Amala Spot"
//                             : index === 2
//                             ? "Belloni's Place"
//                             : "Tasty & Spicy"}
//                     </Text>
//                     <View style={styles.restaurantMeta}>
//                         <Ionicons
//                             name="star"
//                             size={12}
//                             color="#E58945"
//                         />
//                         <Text style={styles.restaurantRating}>4.8 (100+)</Text>
//                     </View>
//                     <Text style={styles.restaurantLocation}>
//                         Civic center, Fejuyi Park
//                         </Text>
//                     <Text style={styles.restaurantDistance}>10 min away</Text>
//                 </View>
//             </TouchableOpacity>
//         ))}
//     </View>
//   )
// }

// export default AllRestaurants

// const styles = StyleSheet.create({
//     restaurantItem: {
// 		flexDirection: "row",
// 		marginBottom: 15,
// 		backgroundColor: "#FFFFFF",
// 		borderRadius: 10,
// 		padding: 10,
// 		shadowColor: "#000",
// 		shadowOffset: { width: 0, height: 2 },
// 		shadowOpacity: 0.1,
// 		shadowRadius: 4,
// 		elevation: 2,
// 	},
// 	restaurantImage: {
// 		width: 80,
// 		height: 80,
// 		borderRadius: 10,
// 		marginRight: 15,
// 	},
// 	restaurantDetails: {
// 		flex: 1,
// 		justifyContent: "center",
// 	},
// 	restaurantName: {
// 		fontSize: 16,
// 		fontWeight: "bold",
// 		marginBottom: 5,
// 	},
// 	restaurantMeta: {
// 		flexDirection: "row",
// 		alignItems: "center",
// 		marginBottom: 5,
// 	},
// 	restaurantRating: {
// 		fontSize: 12,
// 		color: "#666",
// 		marginLeft: 5,
// 	},
// 	restaurantLocation: {
// 		fontSize: 12,
// 		color: "#666",
// 		marginBottom: 2,
// 	},
// 	restaurantDistance: {
// 		fontSize: 12,
// 		color: "#666",
// 	},
// 	restaurantHeartContainer: {
// 		justifyContent: "center",
// 		alignItems: "center",
// 		width: 30,
// 		height: 30,
// 	}
// });