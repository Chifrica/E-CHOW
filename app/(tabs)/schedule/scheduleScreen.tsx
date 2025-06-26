"use client";

import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	SafeAreaView,
	StatusBar,
	ScrollView,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const SchedulePage = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(new Date()); // March 15, 2025
	const [needsApproval, setNeedsApproval] = useState(true);
	const [scheduledMeals, setScheduledMeals] = useState({});
	const router = useRouter();

	const monthNames = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	// Get calendar data for current month
	const getCalendarData = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();

		// First day of the month
		const firstDay = new Date(year, month, 1);
		// Last day of the month
		const lastDay = new Date(year, month + 1, 0);

		// Get day of week for first day (0 = Sunday, 1 = Monday, etc.)
		// Convert to Monday = 0, Sunday = 6
		let firstDayOfWeek = firstDay.getDay();
		firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

		const daysInMonth = lastDay.getDate();
		const weeks = [];
		let currentWeek = [];

		// Add empty cells for days before the first day of month
		for (let i = 0; i < firstDayOfWeek; i++) {
			currentWeek.push(null);
		}

		// Add all days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			currentWeek.push(day);

			// If week is complete (7 days) or it's the last day, push to weeks
			if (currentWeek.length === 7 || day === daysInMonth) {
				// Fill remaining days with null if needed
				while (currentWeek.length < 7) {
					currentWeek.push(null);
				}
				weeks.push([...currentWeek]);
				currentWeek = [];
			}
		}

		return weeks;
	};

	const handlePreviousMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
		);
	};

	const handleNextMonth = () => {
		setCurrentDate(
			new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
		);
	};

	const handleDateSelect = (day: number) => {
		if (day) {
			const newDate = new Date(
				currentDate.getFullYear(),
				currentDate.getMonth(),
				day
			);
			setSelectedDate(newDate);
		}
	};

	// const formatDateKey = (date: Date) => {
	// 	const year = date.getFullYear();
	// 	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	// 	const day = date.getDate().toString().padStart(2, "0");
	// 	return `${year}-${month}-${day}`;
	// };
	const formatDateKey = (date: Date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

	const isDateSelected = (day: number) => {
		if (!day) return false;
		const dateToCheck = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day
		);
		return (
			dateToCheck.getDate() === selectedDate.getDate() &&
			dateToCheck.getMonth() === selectedDate.getMonth() &&
			dateToCheck.getFullYear() === selectedDate.getFullYear()
		);
	};

	const dateHasMeals = (day: number) => {
		if (!day) return false;
		const dateToCheck = new Date(
			currentDate.getFullYear(),
			currentDate.getMonth(),
			day
		);
		const dateKey = formatDateKey(dateToCheck);
		return scheduledMeals[dateKey]?.length > 0;
	};

	const handleScheduleMeal = () => {
		router.push("/(root)/create");
	};

	const selectedDateKey = formatDateKey(selectedDate);
    const selectedMeals = scheduledMeals[selectedDateKey] || [];
    const hasScheduledMeals = selectedMeals.length > 0;

	const getMealTypeColor = (type: string) => {
		switch (type) {
			case "Breakfast":
				return "#4CAF50";
			case "Lunch":
				return "#2196F3";
			case "Dinner":
				return "#FF9800";
			default:
				return "#9E9E9E";
		}
	};

	const deleteOrder = (mealId: number) => {
        Alert.alert(
            "Delete Order",
            "Are you sure you want to delete this scheduled meal?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        setScheduledMeals((prev) => {
                            const updatedMeals = { ...prev };
                            updatedMeals[selectedDateKey] = updatedMeals[selectedDateKey].filter(
                                (meal) => meal.id !== mealId
                            );
                            // Remove the date key if no meals left for that date
                            if (updatedMeals[selectedDateKey].length === 0) {
                                delete updatedMeals[selectedDateKey];
                            }
                            return updatedMeals;
                        });
                    },
                },
            ],
            { cancelable: true }
        );
    };

	const handleAddMeal = () => {
        const newMeal = {
            id: Date.now(),
            time: "10:00 am",
            type: "Breakfast",
            name: "New Meal",
            restaurant: "New Restaurant",
            packs: "1 Pack",
            price: "5,000",
            image: "/placeholder.svg?height=60&width=60",
        };
        setScheduledMeals((prev) => {
            const key = selectedDateKey;
            const meals = prev[key] ? [...prev[key], newMeal] : [newMeal];
            return { ...prev, [key]: meals };
        });
    };
	
	const calendarWeeks = getCalendarData();
	const currentMonthName = monthNames[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar barStyle="dark-content" />

			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Schedule Meal</Text>
				<TouchableOpacity onPress={() => {}}>
					<Text style={styles.clearAll}>Clear all</Text>
				</TouchableOpacity>
			</View>

			{/* Calendar Navigation */}
			<View style={styles.calendarNav}>
				<TouchableOpacity onPress={handlePreviousMonth}>
					<Ionicons
						name="chevron-back"
						size={24}
						color="black"
					/>
				</TouchableOpacity>
				<Text style={styles.monthText}>
					{currentMonthName}, {currentYear}
				</Text>
				<TouchableOpacity onPress={handleNextMonth}>
					<Ionicons
						name="chevron-forward"
						size={24}
						color="black"
					/>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.scheduleButton}
					onPress={handleScheduleMeal}>
					<Text style={styles.scheduleButtonText}>Schedule meal</Text>
				</TouchableOpacity>
			</View>

			{/* Calendar */}
			<View style={styles.calendarContainer}>
				{/* Days Header */}
				<View style={styles.daysHeader}>
					{daysOfWeek.map((day, index) => (
						<Text
							key={index}
							style={styles.dayLabel}>
							{day}
						</Text>
					))}
				</View>

				{/* Calendar Grid */}
				{calendarWeeks.map((week, weekIndex) => (
					<View
						key={weekIndex}
						style={styles.weekRow}>
						{week.map((day, dayIndex) => {
							const isSelected = day && isDateSelected(day);
							const hasMeals = day && dateHasMeals(day);
							const isToday =
								day &&
								new Date().getDate() === day &&
								new Date().getMonth() === currentDate.getMonth() &&
								new Date().getFullYear() === currentDate.getFullYear();

							return (
								<TouchableOpacity
									key={dayIndex}
									style={[
										styles.dateButton,
										isSelected && styles.selectedDateButton,
										hasMeals && !isSelected && styles.dateWithMeals,
										isToday && !isSelected && styles.todayButton,
									]}
									onPress={() => handleDateSelect(day)}
									disabled={!day}>
									{day && (
										<Text
											style={[
												styles.dateText,
												isSelected && styles.selectedDateText,
												isToday && !isSelected && styles.todayText,
											]}>
											{day}
										</Text>
									)}
									{hasMeals && !isSelected && (
										<View style={styles.mealIndicator} />
									)}
								</TouchableOpacity>
							);
						})}
					</View>
				))}
			</View>

			<ScrollView
				style={styles.content}
				showsVerticalScrollIndicator={false}>
				{hasScheduledMeals ? (
					<>
						{/* Approval Notice */}
						{needsApproval && (
							<View style={styles.approvalNotice}>
								<View style={styles.approvalTextContainer}>
									<Text style={styles.approvalText}>
										Your scheduled meal has not been approved yet.
									</Text>
									<Text style={styles.approvalSubText}>
										Pay now to approve your schedule
									</Text>
								</View>
								<TouchableOpacity style={styles.payNowButton}>
									<Text style={styles.payNowText}>Pay Now</Text>
								</TouchableOpacity>
							</View>
						)}

						{/* Scheduled Meals */}
						{selectedMeals.map((meal: any) => (
							<View
								key={meal.id}
								style={styles.mealCard}>
								<Text style={styles.mealTime}>{meal.time}</Text>
								<View style={styles.mealContent}>
									<View style={styles.mealImageContainer}>
										<View style={styles.mealImage} />
										<View
											style={[
												styles.mealTypeBadge,
												{ backgroundColor: getMealTypeColor(meal.type) },
											]}>
											<Text style={styles.mealTypeBadgeText}>{meal.type}</Text>
										</View>
									</View>

									<View style={styles.mealDetails}>
										<Text style={styles.mealName}>{meal.name}</Text>
										<Text style={styles.mealRestaurant}>
											{meal.restaurant} • {meal.packs}
										</Text>
										<Text style={styles.mealPrice}>{meal.price}</Text>
									</View>

									<View style={styles.mealActions}>
										<TouchableOpacity style={styles.reviewButton}>
											<Text style={styles.reviewButtonText}>Review</Text>
										</TouchableOpacity>
										<TouchableOpacity style={styles.deleteButton} onPress={() => deleteOrder(meal.id)}>
											<Ionicons
												name="trash-outline"
												size={20}
												color="#FF5252"
											/>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						))}

						{/* Bottom Note */}
						<Text style={styles.bottomNote}>
							Note that, your schedule meal will be delivered automatically at
							the schedule time by our auto delivery system
						</Text>
					</>
				) : (
					/* Empty State */
					<View style={styles.emptyState}>
						<TouchableOpacity
							style={styles.addMealButton}
							onPress={handleAddMeal}>
							<View style={styles.addMealIcon}>
								<Ionicons
									name="add"
									size={24}
									color="white"
								/>
							</View>
							<Text style={styles.addMealText}>Add meal to schedule</Text>
						</TouchableOpacity>

						<Text style={styles.emptyNote}>
							Note that, your schedule meal will be delivered automatically at
							the schedule time by our auto delivery system
						</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

// Add these new styles to the existing styles object:
const newStyles = {
	weekRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	todayButton: {
		borderWidth: 2,
		borderColor: "#FF8C42",
	},
	todayText: {
		color: "#FF8C42",
		fontWeight: "600",
	},
	mealIndicator: {
		position: "absolute",
		bottom: 2,
		alignSelf: "center",
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#4CAF50",
	},
	approvalTextContainer: {
		flex: 1,
	},
};

// Merge with existing styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000",
	},
	clearAll: {
		fontSize: 16,
		color: "#666",
	},
	calendarNav: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	monthText: {
		fontSize: 16,
		fontWeight: "500",
		marginHorizontal: 16,
		flex: 1,
	},
	scheduleButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#FF8C42",
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	scheduleButtonText: {
		color: "#FF8C42",
		fontSize: 14,
		fontWeight: "500",
	},
	calendarContainer: {
		backgroundColor: "white",
		marginHorizontal: 16,
		borderRadius: 12,
		padding: 16,
		marginBottom: 20,
	},
	daysHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	dayLabel: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		width: 40,
	},
	weekRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	dateButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
	selectedDateButton: {
		backgroundColor: "#FF8C42",
	},
	dateWithMeals: {
		backgroundColor: "#E3F2FD",
	},
	todayButton: {
		borderWidth: 2,
		borderColor: "#FF8C42",
	},
	dateText: {
		fontSize: 16,
		color: "#000",
	},
	selectedDateText: {
		color: "white",
		fontWeight: "bold",
	},
	todayText: {
		color: "#FF8C42",
		fontWeight: "600",
	},
	mealIndicator: {
		position: "absolute",
		bottom: 2,
		alignSelf: "center",
		width: 4,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#4CAF50",
	},
	content: {
		flex: 1,
		paddingHorizontal: 16,
	},
	approvalNotice: {
		backgroundColor: "#FFEBEE",
		borderRadius: 8,
		padding: 16,
		marginBottom: 20,
		flexDirection: "row",
		alignItems: "center",
	},
	approvalTextContainer: {
		flex: 1,
	},
	approvalText: {
		fontSize: 14,
		color: "#D32F2F",
		fontWeight: "500",
	},
	approvalSubText: {
		fontSize: 12,
		color: "#D32F2F",
		marginTop: 2,
	},
	payNowButton: {
		backgroundColor: "#4CAF50",
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	payNowText: {
		color: "white",
		fontSize: 12,
		fontWeight: "600",
	},
	mealCard: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	mealTime: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
		marginBottom: 12,
	},
	mealContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	mealImageContainer: {
		position: "relative",
		marginRight: 12,
	},
	mealImage: {
		width: 60,
		height: 60,
		borderRadius: 8,
		backgroundColor: "#FF8C42",
	},
	mealTypeBadge: {
		position: "absolute",
		bottom: -6,
		left: -6,
		borderRadius: 10,
		paddingHorizontal: 8,
		paddingVertical: 2,
	},
	mealTypeBadgeText: {
		color: "white",
		fontSize: 10,
		fontWeight: "600",
	},
	mealDetails: {
		flex: 1,
	},
	mealName: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
		marginBottom: 4,
	},
	mealRestaurant: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	mealPrice: {
		fontSize: 16,
		fontWeight: "600",
		color: "#000",
	},
	mealActions: {
		alignItems: "flex-end",
	},
	reviewButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#FF8C42",
		borderRadius: 16,
		paddingHorizontal: 12,
		paddingVertical: 6,
		marginBottom: 8,
	},
	reviewButtonText: {
		color: "#FF8C42",
		fontSize: 12,
		fontWeight: "500",
	},
	deleteButton: {
		padding: 4,
	},
	emptyState: {
		alignItems: "center",
		paddingTop: 60,
	},
	addMealButton: {
		alignItems: "center",
		marginBottom: 40,
	},
	addMealIcon: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#FF8C42",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
	},
	addMealText: {
		fontSize: 16,
		color: "#000",
		fontWeight: "500",
	},
	emptyNote: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		lineHeight: 20,
		paddingHorizontal: 20,
	},
	bottomNote: {
		fontSize: 14,
		color: "#666",
		textAlign: "center",
		lineHeight: 20,
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
});

export default SchedulePage;
