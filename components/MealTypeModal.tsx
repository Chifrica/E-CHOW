import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	Modal,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from "react-native";

export interface MealTypeModalProps {
	visible: boolean;
	onClose: () => void;
	onSelectMealType: (mealType: string) => void;
	initialMealType?: string;
}

const MealTypeModal: React.FC<MealTypeModalProps> = ({
	visible,
	onClose,
	onSelectMealType,
	initialMealType = "Breakfast",
}) => {
	const [selectedMealType, setSelectedMealType] =
		useState<string>(initialMealType);

	const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"];

	const handleMealTypeSelect = () => {
		onSelectMealType(selectedMealType);
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
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Select your Meal Type</Text>

							<View style={styles.mealTypeContainer}>
								{mealTypes.map((mealType) => (
									<TouchableOpacity
										key={mealType}
										style={[
											styles.mealTypeOption,
											selectedMealType === mealType &&
												styles.selectedMealTypeOption,
										]}
										onPress={() => setSelectedMealType(mealType)}>
										<View style={styles.radioButton}>
											{selectedMealType === mealType && (
												<View style={styles.radioButtonSelected} />
											)}
										</View>
										<Text
											style={[
												styles.mealTypeText,
												selectedMealType === mealType &&
													styles.selectedMealTypeText,
											]}>
											{mealType}
										</Text>
									</TouchableOpacity>
								))}
							</View>

							<TouchableOpacity
								style={styles.confirmButton}
								onPress={handleMealTypeSelect}>
								<Text style={styles.confirmButtonText}>Got It</Text>
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
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: "white",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingHorizontal: 20,
		paddingTop: 20,
		paddingBottom: 40,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		marginBottom: 20,
	},
	mealTypeContainer: {
		marginBottom: 20,
	},
	mealTypeOption: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: "#E0E0E0",
	},
	radioButton: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: "#888",
		marginRight: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	radioButtonSelected: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: "#FF8C42",
	},
	mealTypeText: {
		fontSize: 16,
		color: "#333",
	},
	selectedMealTypeOption: {
		backgroundColor: "#FFF2E9",
	},
	selectedMealTypeText: {
		color: "#FF8C42",
		fontWeight: "500",
	},
	confirmButton: {
		backgroundColor: "#FF8C42",
		borderRadius: 8,
		paddingVertical: 16,
		alignItems: "center",
	},
	confirmButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

export default MealTypeModal;
