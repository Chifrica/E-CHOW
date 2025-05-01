import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface TimePickerProps {
	visible: boolean;
	onClose: () => void;
	onSelectTime: (time: string) => void;
	initialTime: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
	visible,
	onClose,
	onSelectTime,
	initialTime,
}) => {
	// Parse initial time
	const parseTime = (
		timeStr: string
	): { hour: string; minute: string; period: string } => {
		const timeParts = timeStr.split(" ");
		let period = timeParts.length > 1 ? timeParts[1] : "Am";

		const timeComponents = timeParts[0].split(":");
		let hour = timeComponents[0].padStart(2, "0");
		let minute =
			timeComponents.length > 1 ? timeComponents[1].padStart(2, "0") : "00";

		return { hour, minute, period };
	};

	const initialTimeParsed = parseTime(initialTime);

	const [hour, setHour] = useState<string>(initialTimeParsed.hour);
	const [minute, setMinute] = useState<string>(initialTimeParsed.minute);
	const [period, setPeriod] = useState<string>(initialTimeParsed.period);

	const handleHourChange = (text: string) => {
		// Only allow numbers and limit to 2 digits
		const numericValue = text.replace(/[^0-9]/g, "");
		if (numericValue.length <= 2) {
			setHour(numericValue);
		}
	};

	const handleMinuteChange = (text: string) => {
		// Only allow numbers and limit to 2 digits
		const numericValue = text.replace(/[^0-9]/g, "");
		if (numericValue.length <= 2) {
			setMinute(numericValue);
		}
	};

	const togglePeriod = (newPeriod: string) => {
		setPeriod(newPeriod);
	};

	const handleDone = () => {
		// Format and validate the time
		let hourVal = parseInt(hour || "0", 10);
		if (hourVal > 12) hourVal = 12;
		if (hourVal < 1) hourVal = 1;

		let minuteVal = parseInt(minute || "0", 10);
		if (minuteVal > 59) minuteVal = 59;

		const formattedTime = `${hourVal}:${minuteVal
			.toString()
			.padStart(2, "0")} ${period}`;
		onSelectTime(formattedTime);
		onClose();
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
						<View style={styles.timePickerModalContent}>
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

							<View style={styles.timeInputContainer}>
								{/* Hour Input */}
								<View style={styles.timeInputField}>
									<TextInput
										style={styles.timeInput}
										value={hour}
										onChangeText={handleHourChange}
										keyboardType="number-pad"
										maxLength={2}
										placeholder="00"
										placeholderTextColor="#ccc"
									/>
								</View>

								<Text style={styles.timeSeparator}>:</Text>

								{/* Minute Input */}
								<View style={styles.timeInputField}>
									<TextInput
										style={styles.timeInput}
										value={minute}
										onChangeText={handleMinuteChange}
										keyboardType="number-pad"
										maxLength={2}
										placeholder="00"
										placeholderTextColor="#ccc"
									/>
								</View>

								{/* AM/PM Toggle */}
								<View style={styles.periodContainer}>
									<TouchableOpacity
										style={[
											styles.periodButton,
											period === "Am" && styles.selectedPeriodButton,
										]}
										onPress={() => togglePeriod("Am")}>
										<Text
											style={[
												styles.periodButtonText,
												period === "Am" && styles.selectedPeriodButtonText,
											]}>
											Am
										</Text>
									</TouchableOpacity>

									<TouchableOpacity
										style={[
											styles.periodButton,
											period === "Pm" && styles.selectedPeriodButton,
										]}
										onPress={() => togglePeriod("Pm")}>
										<Text
											style={[
												styles.periodButtonText,
												period === "Pm" && styles.selectedPeriodButtonText,
											]}>
											Pm
										</Text>
									</TouchableOpacity>
								</View>
							</View>

							{/* Done Button */}
							<TouchableOpacity
								style={styles.doneButton}
								onPress={handleDone}>
								<Text style={styles.doneButtonText}>Done</Text>
							</TouchableOpacity>
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
	timePickerModalContent: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 20,
		marginHorizontal: 20,
		maxWidth: 350,
		width: "90%",
		alignSelf: "center",
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
	timeInputContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 24,
	},
	timeInputField: {
		backgroundColor: "#F5F7FA",
		width: 70,
		height: 60,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	timeInput: {
		fontSize: 24,
		fontWeight: "500",
		textAlign: "center",
		width: "100%",
		height: "100%",
	},
	timeSeparator: {
		fontSize: 28,
		fontWeight: "500",
		marginHorizontal: 8,
	},
	periodContainer: {
		marginLeft: 16,
		flexDirection: "column",
		height: 60,
		justifyContent: "space-between",
	},
	periodButton: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 16,
	},
	selectedPeriodButton: {
		backgroundColor: "#FFEBDA",
	},
	periodButtonText: {
		fontSize: 14,
		fontWeight: "500",
		color: "#888",
	},
	selectedPeriodButtonText: {
		color: "#FF8C42",
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

export default TimePicker;
