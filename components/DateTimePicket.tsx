import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import TimePicker from "./TimePicker";

export interface DateTimeSelection {
	date: Date;
	formattedDate: string;
	time: string;
}

export interface DateTimePickerModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (dateTime: DateTimeSelection) => void;
	initialDate?: Date;
}

const DateTimePickerModal: React.FC<DateTimePickerModalProps> = ({
	visible,
	onClose,
	onSave,
	initialDate,
}) => {
	// Initialize with the current date if no initial date provided
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(initialDate || today);
	const [currentMonth, setCurrentMonth] = useState<Date>(
		new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
	);
	const [selectedTime, setSelectedTime] = useState<string>("8:30 Am");
	const [calendarDays, setCalendarDays] = useState<Array<Array<number | null>>>(
		[]
	);
	const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);

	// Days of week labels
	const daysOfWeek: string[] = [
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat",
		"Sun",
	];

	// Generate calendar when the month changes
	useEffect(() => {
		generateCalendarDays();
	}, [currentMonth]);

	// Generate calendar data for the current month
	const generateCalendarDays = (): void => {
		const year = currentMonth.getFullYear();
		const month = currentMonth.getMonth();

		// Get the first day of the month
		const firstDayOfMonth = new Date(year, month, 1);

		// Get the day of the week for the first day (0 = Sunday, 1 = Monday, etc.)
		// We convert to Monday-based index (0 = Monday, 6 = Sunday)
		let firstDayIndex = firstDayOfMonth.getDay() - 1;
		if (firstDayIndex < 0) firstDayIndex = 6; // Sunday becomes 6

		// Get the number of days in the month
		const daysInMonth = new Date(year, month + 1, 0).getDate();

		// Create a grid for the calendar
		const calendarGrid: Array<Array<number | null>> = [];
		let week: Array<number | null> = Array(7).fill(null);
		let dayCounter = 1;

		// Add empty cells for days before the first day of the month
		for (let i = 0; i < firstDayIndex; i++) {
			week[i] = null;
		}

		// Fill in the days of the month
		for (let i = firstDayIndex; i < 7; i++) {
			if (dayCounter <= daysInMonth) {
				week[i] = dayCounter++;
			}
		}
		calendarGrid.push([...week]);

		// Fill in the rest of the weeks
		while (dayCounter <= daysInMonth) {
			week = Array(7).fill(null);
			for (let i = 0; i < 7; i++) {
				if (dayCounter <= daysInMonth) {
					week[i] = dayCounter++;
				} else {
					week[i] = null;
				}
			}
			calendarGrid.push([...week]);
		}

		setCalendarDays(calendarGrid);
	};

	// Handle previous month button
	const handlePreviousMonth = (): void => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
		);
	};

	// Handle next month button
	const handleNextMonth = (): void => {
		setCurrentMonth(
			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
		);
	};

	// Format the month and year for display
	const formatMonth = (date: Date): string => {
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
		return `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
	};

	// Handle date selection
	const handleDateSelect = (day: number | null): void => {
		if (day !== null) {
			const newSelectedDate = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				day
			);
			setSelectedDate(newSelectedDate);
		}
	};

	// Check if a day is the selected day
	const isSelectedDay = (day: number | null): boolean => {
		if (day === null) return false;

		return (
			selectedDate.getDate() === day &&
			selectedDate.getMonth() === currentMonth.getMonth() &&
			selectedDate.getFullYear() === currentMonth.getFullYear()
		);
	};

	// Handle done button
	const handleDone = (): void => {
		onSave({
			date: selectedDate,
			formattedDate: formatSelectedDate(),
			time: selectedTime,
		});
		onClose();
	};

	// Format the selected date for display
	const formatSelectedDate = (): string => {
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
		return `${
			monthNames[selectedDate.getMonth()]
		} ${selectedDate.getDate()}, ${selectedTime}`;
	};

	// Open time picker
	const handleOpenTimePicker = (): void => {
		setTimePickerVisible(true);
	};

	// Handle time selection
	const handleSelectTime = (time: string): void => {
		setSelectedTime(time);
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.modalOverlay}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContent}>
							<View style={styles.modalHeader}>
								<Text style={styles.modalTitle}>Set Time & Date</Text>
								<TouchableOpacity onPress={onClose}>
									<Ionicons
										name="close"
										size={24}
										color="black"
									/>
								</TouchableOpacity>
							</View>

							{/* Time Selection - Now a button */}
							<TouchableOpacity
								style={styles.timeSection}
								onPress={handleOpenTimePicker}>
								<Text style={styles.timeLabel}>Time:</Text>
								<View style={styles.timeValueContainer}>
									<Text style={styles.timeValue}>{selectedTime}</Text>
									<Ionicons
										name="chevron-forward"
										size={20}
										color="#888"
									/>
								</View>
							</TouchableOpacity>

							{/* Month Navigation */}
							<View style={styles.monthNavigation}>
								<TouchableOpacity onPress={handlePreviousMonth}>
									<Ionicons
										name="chevron-back"
										size={24}
										color="black"
									/>
								</TouchableOpacity>
								<Text style={styles.monthText}>
									{formatMonth(currentMonth)}
								</Text>
								<TouchableOpacity onPress={handleNextMonth}>
									<Ionicons
										name="chevron-forward"
										size={24}
										color="black"
									/>
								</TouchableOpacity>
							</View>

							{/* Calendar Header */}
							<View style={styles.calendarHeader}>
								{daysOfWeek.map((day, index) => (
									<Text
										key={index}
										style={styles.dayOfWeek}>
										{day}
									</Text>
								))}
							</View>

							{/* Calendar Grid */}
							<View style={styles.calendarGrid}>
								{calendarDays.map((week, weekIndex) => (
									<View
										key={weekIndex}
										style={styles.calendarRow}>
										{week.map((day, dayIndex) => (
											<TouchableOpacity
												key={dayIndex}
												style={[
													styles.calendarDay,
													isSelectedDay(day) && styles.selectedDay,
													day === null && styles.emptyDay,
												]}
												onPress={() => handleDateSelect(day)}
												disabled={day === null}>
												{day !== null && (
													<Text
														style={[
															styles.calendarDayText,
															isSelectedDay(day) && styles.selectedDayText,
														]}>
														{day}
													</Text>
												)}
											</TouchableOpacity>
										))}
									</View>
								))}
							</View>

							{/* Done Button */}
							<TouchableOpacity
								style={styles.doneButton}
								onPress={handleDone}>
								<Text style={styles.doneButtonText}>Done</Text>
							</TouchableOpacity>

							{/* Time Picker Modal */}
							<TimePicker
								visible={timePickerVisible}
								onClose={() => setTimePickerVisible(false)}
								onSelectTime={handleSelectTime}
								initialTime={selectedTime}
							/>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContent: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		paddingBottom: 40,
		position: "absolute",
		bottom: 0,
		width: "100%",
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
	timeSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#F5F7FA",
		padding: 16,
		borderRadius: 8,
		marginBottom: 20,
	},
	timeLabel: {
		fontSize: 16,
		color: "#555",
	},
	timeValueContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	timeValue: {
		fontSize: 16,
		fontWeight: "500",
		marginRight: 4,
	},
	monthNavigation: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	monthText: {
		fontSize: 16,
		fontWeight: "500",
	},
	calendarHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	dayOfWeek: {
		flex: 1,
		textAlign: "center",
		color: "#888",
		fontSize: 14,
	},
	calendarGrid: {
		marginBottom: 20,
	},
	calendarRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 12,
	},
	calendarDay: {
		width: 36,
		height: 36,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 18,
	},
	selectedDay: {
		backgroundColor: "#FF8C42",
	},
	emptyDay: {
		backgroundColor: "transparent",
	},
	calendarDayText: {
		fontSize: 14,
	},
	selectedDayText: {
		color: "white",
		fontWeight: "500",
	},
	doneButton: {
		backgroundColor: "#FF8C42",
		borderRadius: 8,
		padding: 16,
		alignItems: "center",
	},
	doneButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default DateTimePickerModal;
