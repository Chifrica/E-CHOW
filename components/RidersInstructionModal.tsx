import React, { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Modal,
	TextInput,
	SafeAreaView,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface RidersInstructionModalProps {
	visible: boolean;
	onClose: () => void;
	onSave: (instruction: string) => void;
	initialInstruction?: string;
}

const RidersInstructionModal: React.FC<RidersInstructionModalProps> = ({
	visible,
	onClose,
	onSave,
	initialInstruction = "",
}) => {
	const [instruction, setInstruction] = useState(initialInstruction);

	const handleSave = () => {
		onSave(instruction);
		onClose();
	};

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={visible}
			onRequestClose={onClose}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.modalContainer}>
				<SafeAreaView style={styles.modalContent}>
					<View style={styles.header}>
						<Text style={styles.headerTitle}>Instructions for Riders</Text>
						<TouchableOpacity
							onPress={onClose}
							style={styles.closeButton}>
							<AntDesign
								name="close"
								size={24}
								color="#000"
							/>
						</TouchableOpacity>
					</View>

					<TextInput
						style={styles.instructionInput}
						placeholder="e.g My house is behind the bank building. You can call me when you get there"
						placeholderTextColor="#999"
						multiline
						value={instruction}
						onChangeText={setInstruction}
						autoFocus
					/>

					<TouchableOpacity
						style={styles.saveButton}
						onPress={handleSave}>
						<Text style={styles.saveButtonText}>Got It</Text>
					</TouchableOpacity>

					<View style={styles.homeIndicator} />
				</SafeAreaView>
			</KeyboardAvoidingView>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		backgroundColor: "#fff",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingTop: 20,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: "600",
	},
	closeButton: {
		padding: 4,
	},
	instructionInput: {
		borderWidth: 1,
		borderColor: "#E0E0E0",
		borderRadius: 8,
		padding: 16,
		fontSize: 16,
		minHeight: 100,
		textAlignVertical: "top",
		marginBottom: 20,
	},
	saveButton: {
		backgroundColor: "#FF8C42",
		paddingVertical: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 16,
	},
	saveButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
	homeIndicator: {
		width: 40,
		height: 5,
		backgroundColor: "#E0E0E0",
		borderRadius: 2.5,
		alignSelf: "center",
		marginTop: 8,
	},
});

export default RidersInstructionModal;
