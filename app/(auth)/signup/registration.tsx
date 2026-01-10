import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/supabase";
import GoogleSignup from "@/components/googleAppleSignup";

const Registration = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referral, setReferral] = useState("");
  const [otp, setOtp] = useState("");
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleContinue = async () => {
    // Password confirmation check
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match. Please try again.");
      return;
    }

    if (!email || !firstName || lastName || !password || !phoneNumber) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: firstName || lastName,
            phone_number: phoneNumber,
          },
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data.session) {
        Alert.alert("Success", "Account created and logged in!");
        router.push("/(root)/profile/profile");
      } else {
        // Just show the modal for OTP, no alert needed as per request
        setOtpModalVisible(true);
      }
    } catch (error: any) {
      console.error("Registration error:", error.message);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim()) {
      Alert.alert("Error", "Please enter the OTP sent to your email.");
      return;
    }

    setIsLoading(true); // Re-use loading state or add separate one if needed
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "signup",
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      setOtpModalVisible(false);
      Alert.alert("Success", "Email verified successfully!");
      router.replace("/complete-profile");
    } catch (error: any) {
      Alert.alert("Error", "Invalid OTP or error verifying.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push("/login/savedNumber");
  };

  const handleWelcomePage = () => {
    router.push("/(auth)/signup/welcomePage")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Registration</Text>
          <Text style={styles.subHeaderText}>
            You are welcome, kindly set up your account
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>First name</Text>
            <TextInput
              style={styles.firstLastNameInput}
              placeholder="e.g first name"
              value={firstName}
              onChangeText={setFirstName}
              keyboardType="default"
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1 }]}>
            <Text style={styles.label}>Last name</Text>
            <TextInput
              style={styles.firstLastNameInput}
              placeholder="e.g last name"
              value={lastName}
              onChangeText={setLastName}
              keyboardType="default"
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g name@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g 08139684024"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Referral code (Optional)</Text>
          <TextInput
            style={styles.input}
            value={referral}
            onChangeText={setReferral}
            keyboardType="email-address"
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>

        <GoogleSignup />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleSignIn}>
            <Text style={styles.signupLink}>Login Here</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ✅ OTP Modal */}
      <Modal visible={otpModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Verify Your Email</Text>
            <Text style={styles.modalSubtitle}>
              Enter the OTP sent to your email address
            </Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleVerifyOtp}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.modalButtonText}>Verify OTP</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setOtpModalVisible(false)}>
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleWelcomePage}>
        <Text>Welcome Page</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    marginBottom: 50,
    marginTop: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center"
  },
  subHeaderText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center"
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
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  firstLastNameInput: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#E58945",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#667085",
  },
  signupLink: {
    color: "#E58945",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  modalSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#E58945",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalCancelText: {
    color: "#E58945",
    fontWeight: "600",
    marginTop: 15,
  },
});