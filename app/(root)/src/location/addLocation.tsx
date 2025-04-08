import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	SafeAreaView,
	TextInput,
	TouchableOpacity,
	Dimensions,
	Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLocation } from "../context/locationContext";

const width = Dimensions.get("window").width;

const INITIAL_REGION = {
	latitude: 9.082,
	longitude: 8.6753,
	latitudeDelta: 8.0,
	longitudeDelta: 8.0,
};

const AddLocation = () => {
	const mapRef = useRef<any>();
	const [location, setLocation] = useState("");
	const [locationName, setLocationName] = useState("");
	const [hasPermission, setHasPermission] = useState(false);
	const [markerPosition, setMarkerPosition] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [isZoomed, setIsZoomed] = useState(false); // State to track if the map has zoomed
	const router = useRouter();
	const { setCurrentLocation } = useLocation();

	useEffect(() => {
		const requestPermissions = async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status === "granted") {
				setHasPermission(true);
			} else {
				Alert.alert(
					"Permission Denied",
					"Location permissions are required to use this feature."
				);
			}
		};

		requestPermissions();
	}, []);

	const handleBack = () => {
		router.back();
	};

	const handleSaveAndZoom = async () => {
		if (!location || !locationName) {
			Alert.alert("Error", "Please enter both location and location name.");
			return;
		}

		if (!hasPermission) {
			Alert.alert("Error", "Location permissions are not granted.");
			return;
		}

		try {
			// Use Geocoding to get latitude and longitude from the entered location
			const geocodedLocations = await Location.geocodeAsync(location);
			if (geocodedLocations.length === 0) {
				Alert.alert(
					"Error",
					"Location not found. Please enter a valid location."
				);
				return;
			}

			const { latitude, longitude } = geocodedLocations[0];

			// Set marker position
			setMarkerPosition({ latitude, longitude });

			// Zoom into the entered location
			mapRef.current.animateToRegion(
				{
					latitude,
					longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				},
				1000
			);

			// Change button state to "Save"
			setIsZoomed(true);
		} catch (error) {
			Alert.alert("Error", "An error occurred while processing the location.");
			console.error(error);
		}
	};

	const handleSave = () => {
		if (!markerPosition || !locationName) {
			Alert.alert("Error", "Location details are missing.");
			return;
		}

		// Save the location to the shared context
		setCurrentLocation({
			name: locationName,
			description: location,
		});

		// Simulate saving the location (you can replace this with an API call or state update)
		const savedLocation = {
			name: locationName,
			description: location,
			coordinates: markerPosition,
		};

		// Pass the saved location back to the previous screen (or save it globally)
		Alert.alert("Success", `Location "${locationName}" saved.`);

		// Navigate back to the previous screen
		router.back();
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<Feather
						name="chevron-left"
						size={24}
						color="black"
						style={styles.headerIcon}
						onPress={handleBack}
					/>
					<Text style={styles.headerText}>Add New Location</Text>
				</View>

				<View style={{ flex: 1, height: width, marginTop: 20 }}>
					{/* Map View */}
					{/* <MapView
            style={StyleSheet.absoluteFill}
            provider={PROVIDER_GOOGLE}
            initialRegion={INITIAL_REGION}
            showsUserLocation={true}
            showsMyLocationButton
            ref={mapRef}
          > */}
					{/* Add Marker if markerPosition is set */}
					{/* {markerPosition && (
              <Marker
                coordinate={markerPosition}
                title={locationName}
                description={location}
                pinColor="red"
              />
            )}
          </MapView> */}
				</View>

				<View style={{ marginTop: 50 }}>
					<Text style={styles.location}>Location</Text>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Enter location</Text>
						<TextInput
							style={styles.input}
							placeholder="e.g 2, Rosebud. Oke ila Ado Ekiti."
							value={location}
							onChangeText={setLocation}
							keyboardType="default"
						/>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Location name</Text>
						<TextInput
							style={styles.input}
							placeholder="e.g My Office"
							value={locationName}
							onChangeText={setLocationName}
							keyboardType="default"
						/>
					</View>
				</View>

				{!isZoomed ? (
					<TouchableOpacity
						style={[
							styles.button,
							(!location || !locationName) && styles.buttonDisabled,
						]}
						onPress={handleSaveAndZoom}
						disabled={!location || !locationName}>
						<Text style={styles.buttonText}>Save and Zoom</Text>
					</TouchableOpacity>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={handleSave}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default AddLocation;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
	},
	scrollView: {
		flexGrow: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerIcon: {
		backgroundColor: "#F2F4F7",
		borderRadius: 8,
		padding: 8,
		elevation: 1,
	},
	headerText: {
		fontSize: 25,
		fontWeight: "700",
		marginHorizontal: "auto",
		fontFamily: "Switzerland",
		letterSpacing: -0.41,
	},
	location: {
		marginBottom: 24,
		textAlign: "center",
		fontSize: 22,
		color: "#252C32",
		lineHeight: 20,
		letterSpacing: -0.41,
		fontFamily: "Switzerland",
		fontWeight: "700",
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
	},
	buttonDisabled: {
		backgroundColor: "#ccc",
	},
	buttonText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
