import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
	Dimensions,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { statesAndLgas } from "@/lib/databank/statesAndLgas";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Profile = () => {
	const [gender, setGender] = useState("");
	const [date, setDate] = useState(new Date());
	const [show, setShow] = useState(false);
	const [selectedState, setSelectedState] = useState("");
	const [selectedLga, setSelectedLga] = useState("");

	const router = useRouter();

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate(currentDate);
	};

	const isContinueDisabled = !gender || !date || !selectedState || !selectedLga;

	const handleContinue = () => {
		if (!isContinueDisabled) {
			Alert.alert("The site is under construction, please check back later");
		}
	};
	//   This handle is temporary
	const handleSkip = () => {
		router.push("/home/homePage");
	};
	const stateItems = Object.keys(statesAndLgas).map((state) => ({
		label: state,
		value: state,
	}));
	const lgaItems = selectedState
		? statesAndLgas[selectedState].map((lga: any) => ({
				label: lga,
				value: lga,
		  }))
		: [];

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View
					style={{
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "row",
						marginBottom: 50,
					}}>
					<Text>Profile Picture</Text>

					<Image
						source={require("@/assets/icons/profile.png")}
						style={{ width: 50, height: 50, borderRadius: 50, marginLeft: 20 }}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>State of Residence</Text>
					<View style={pickerSelectStyles.inputAndroid}>
						<RNPickerSelect
							onValueChange={(value) => {
								setSelectedState(value);
								setSelectedLga(""); // Reset LGA when state changes
							}}
							items={stateItems}
							// style={pickerSelectStyles.inputAndroid}
							placeholder={{ label: "Select State", value: null }}
							value={selectedState}
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Local Government Area</Text>
					<View style={pickerSelectStyles.inputAndroid}>
						<RNPickerSelect
							onValueChange={(value) => setSelectedLga(value)}
							items={lgaItems}
							// style={pickerSelectStyles}
							placeholder={{ label: "Select LGA", value: null }}
							value={selectedLga}
							disabled={!selectedState} // Disable LGA picker if no state is selected
						/>
					</View>
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Date of Birth</Text>
					<TouchableOpacity onPress={() => setShow(true)}>
						<TextInput
							style={styles.input}
							placeholder="DD/MM/YYYY"
							value={date.toLocaleDateString()}
							editable={false}
						/>
					</TouchableOpacity>
					{show && (
						<DateTimePicker
							testID="dateTimePicker"
							value={date}
							mode="date"
							display="default"
							onChange={onChange}
						/>
					)}
				</View>

				<View style={styles.inputContainer}>
					<Text style={styles.label}>Gender</Text>
					<View style={pickerSelectStyles.inputAndroid}>
						<RNPickerSelect
							onValueChange={(value) => setGender(value)}
							items={[
								{ label: "Male", value: "male" },
								{ label: "Female", value: "female" },
							]}
							// style={pickerSelectStyles}
							placeholder={{ label: "Select", value: null }}
							value={gender}
						/>
					</View>
				</View>

				<TouchableOpacity
					style={[styles.button, isContinueDisabled && styles.buttonDisabled]}
					onPress={handleContinue}
					disabled={isContinueDisabled}>
					<Text style={styles.buttonText}>Continue</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.buttonSkip}
					onPress={handleSkip}>
					<Text style={styles.buttonTextSkip}>Skip</Text>
				</TouchableOpacity>
			</ScrollView>
		</SafeAreaView>
	);
};

const pickerSelectStyles = StyleSheet.create({
	//   inputIOS: {
	//     fontSize: 16,
	//     paddingVertical: 12,
	//     paddingHorizontal: 10,
	//     borderWidth: 1,
	//     borderColor: '#D1D5DB',
	//     borderRadius: 50,
	//     color: 'black',
	//     paddingRight: 30,
	//   },
	inputAndroid: {
		fontSize: 16,
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 50,
		color: "black",
		paddingRight: 30,
	},
});

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: "#F9FAFB",
	},
	inputContainer: {
		marginBottom: 24,
	},
	label: {
		fontSize: 16,
		marginBottom: 8,
		color: "#6B7280",
		lineHeight: 20,
		letterSpacing: -0.41,
		fontFamily: "Switzerland",
	},
	input: {
		borderWidth: 1,
		borderColor: "#D1D5DB",
		borderRadius: 50,
		padding: 12,
		fontSize: 16,
	},
	button: {
		backgroundColor: "#E58945",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
	},
	buttonDisabled: {
		backgroundColor: "#ccc",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
	buttonSkip: {
		backgroundColor: "#FFFFFF",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginBottom: 20,
		elevation: 0.5,
	},
	buttonTextSkip: {
		color: "#667085",
		fontSize: 18,
		fontWeight: "bold",
		letterSpacing: -0.41,
		lineHeight: 24,
		fontFamily: "Switzerland",
	},
});
