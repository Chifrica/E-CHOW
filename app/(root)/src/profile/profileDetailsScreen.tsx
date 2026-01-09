"use client";

import { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
	ScrollView,
	Alert,
	Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import { useGlobalContext } from "../../../../lib/global-provider"; // Verify path
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileDetailsScreen = () => {
  const { user } = useGlobalContext();

  // Get user data from GlobalContext
  const clerkFullName = user?.name || "";
  const clerkEmail = user?.email || "";
  const profileImage = user?.avatar;
  const clerkPhone = user?.phone || "";
  const clerkGender = "";
  const clerkDob = "";

  const originalData = {
    name: clerkFullName,
    email: clerkEmail,
    phone: clerkPhone,
    gender: clerkGender,
    dob: clerkDob,
  };

  const [name, setName] = useState(originalData.name);
  const [email, setEmail] = useState(originalData.email);
  const [phone, setPhone] = useState(originalData.phone);
  const [gender, setGender] = useState(originalData.gender);
  const [dob, setDob] = useState(originalData.dob);
  const [hasChanges, setHasChanges] = useState(false);

  // Watch for changes
  useEffect(() => {
    const changed =
      name !== originalData.name ||
      email !== originalData.email ||
      phone !== originalData.phone ||
      gender !== originalData.gender ||
      dob !== originalData.dob;

    setHasChanges(changed);
  }, [name, email, phone, gender, dob]);

  const updateUserProfile = async () => {
    try {
      const payload = {
        name,
        email,
        phone,
        gender,
        dob,
      };

      const response = await fetch(
        "https://echow-backend.onrender.com/api/v1/users/profile",
        {
          method: "PUT", // or PATCH — confirm backend method
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return Alert.alert(
          "Update Failed",
          data.message || "Something went wrong"
        );
      }

      Alert.alert("Success!", "Your profile has been updated successfully");

      // Optionally: router.back();
    } catch (error) {
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Profile Details</Text>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: profileImage ?? undefined }}
            style={styles.avatarImage}
          />
          <TouchableOpacity style={styles.cameraIcon}>
            <Ionicons name="camera" size={18} color="#EF7D44" />
          </TouchableOpacity>
        </View>

        {/* Inputs */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => {
            setName(text);
            // showAlert("full name");
          }}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            // showAlert("email");
          }}
        />

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              // showAlert("phone number");
            }}
          />
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="gray"
            style={{ marginLeft: 8 }}
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={gender}
            onValueChange={(value) => {
              setGender(value);
              // showAlert("gender");
            }}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <Text style={styles.label}>Date Of Birth</Text>
        <TextInput
          style={styles.input}
          value={dob}
          onChangeText={(text) => {
            setDob(text);
            // showAlert("date of birth");
          }}
        />

        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: hasChanges ? "#EF7D44" : "#f2f2f2" },
          ]}
          disabled={!hasChanges}
          onPress={updateUserProfile}
        >
          <Text
            style={{ color: hasChanges ? "#fff" : "#ccc", fontWeight: "bold" }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F8F8F8",
	},
	scrollView: {
		flex: 1,
		paddingHorizontal: 15,
	},
	header: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 20,
		paddingVertical: 10,
	},
	headerText: {
		fontSize: 24,
		fontWeight: "600",
	},
	avatarContainer: {
		alignItems: "center",
		marginBottom: 30,
		position: "relative",
	},
	avatarImage: {
		width: 90,
		height: 90,
		borderRadius: 45,
		backgroundColor: "#f1f1f1",
	},
	cameraIcon: {
		position: "absolute",
		bottom: 0,
		right: 120,
		backgroundColor: "#fff",
		padding: 5,
		borderRadius: 20,
		elevation: 2,
	},
	label: {
		fontWeight: "500",
		marginBottom: 5,
		marginTop: 15,
	},
	input: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	phoneRow: {
		flexDirection: "row",
		alignItems: "center",
	},
	pickerWrapper: {
		borderWidth: 1,
		borderColor: "#ddd",
		borderRadius: 10,
		overflow: "hidden",
	},
	saveButton: {
		borderRadius: 10,
		paddingVertical: 15,
		alignItems: "center",
		marginTop: 30,
	},
});

export default ProfileDetailsScreen;