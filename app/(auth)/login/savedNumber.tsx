import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/supabase";
import GoogleSignup from "@/components/googleAppleSignup";
import GoogleSignin from "@/components/googleSignin";

const { width } = Dimensions.get("window");
type MessageType = "SUCCESS" | "FAILED" | "WARNING";

interface LoginCredentials {
  email: string;
  password: string;
}

const SavedNumber = () => {
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<MessageType>("FAILED");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Handle login
  const handleLogin = async (credentials: LoginCredentials) => {
    handleMessage("");

    if (!credentials.email || !credentials.password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        if (error.message && error.message.includes("Email not confirmed")) {
          handleMessage(
            "Please verify your email before logging in.",
            "FAILED"
          );
          Alert.alert(
            "Verification Required",
            "Please check your email and click the verification link/code to activate your account."
          );
          return;
        }

        handleMessage(error.message, "FAILED");
        Alert.alert("FAILED", error.message);
        return;
      }

      if (data.session) {
        handleMessage("Login successful", "SUCCESS");

        const role = data.user.user_metadata?.role;

        if (!role) {
          Alert.alert(
            "Success",
            "Login successful. Please complete your profile."
          );
          router.replace("/complete-profile");
        } else {
          Alert.alert("SUCCESS", "Login successful", [
            {
              text: "OK",
              onPress: () =>
                router.push({
                  pathname: "/home/homePage",
                  params: { user: JSON.stringify(data.user) },
                }),
            },
          ]);
        }
      }
    } catch (error: any) {
      console.error("Login error:", error.message);
      handleMessage(
        "An error occurred. Check your network and try again.",
        "FAILED"
      );
      Alert.alert(
        "FAILED",
        "An error occurred. Check your network and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessage = (
    message: string,
    type: MessageType = "FAILED"
  ): void => {
    setMessage(message);
    setMessageType(type);
  };

  // const handleContinue = async () => {
  // 	if (!email) {
  // 		Alert.alert("Error", "Please enter your email address.");
  // 		return;
  // 	}

  // 	try {
  // 		// 🔍 Check if user exists in the backend
  // 		const res = await loginUser({ email, password: "dummyPassword" });

  // 		if (res.exists) {
  // 			// Save user email locally if "Save" is checked
  // 			if (isChecked) await AsyncStorage.setItem("userEmail", email);

  // 			Alert.alert("Welcome back!", "Redirecting to your profile...");
  // 			router.push("/(root)/profile/profile");
  // 		} else {
  // 			Alert.alert(
  // 				"No account found",
  // 				"This email is not registered. Please sign up first."
  // 			);
  // 			router.push("/(auth)/signup/registration");
  // 		}
  // 	} catch (error) {
  // 		Alert.alert(
  // 			"Connection error",
  // 			"Unable to verify email. Please try again later."
  // 		);
  // 	}
  // }

  // Finger print and Face Identification

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const alertComponent = (
    title: string,
    mess: string | undefined,
    btnTxt: string,
    btnFunc: () => void
  ) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  // Function to check if user has logged in with Google before
  const hasLoggedInWithGoogle = async (): Promise<boolean> => {
    try {
      const loggedIn = await AsyncStorage.getItem("googleLoggedIn");
      return loggedIn === "true";
    } catch (error) {
      console.error("Error checking Google login status:", error);
      return false;
    }
  };

  // Example: call this after successful Google login
  const setGoogleLogin = async () => {
    try {
      await AsyncStorage.setItem("googleLoggedIn", "true");
    } catch (error) {
      console.error("Error saving Google login status:", error);
    }
  };

  const handleBiometric = async () => {
    const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricSupported) {
      return alertComponent(
        "Please enter your password",
        "Biometric not supported",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    let supportedBiometrics;
    if (isBiometricSupported) {
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    if (!isBiometricSupported) {
      return alertComponent(
        "Biometric not supported",
        "Please enter your password",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    // let supportedBiometrics;
    if (isBiometricSupported) {
      supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    }

    const savedBiometricRecords = await LocalAuthentication.isEnrolledAsync();

    if (!savedBiometricRecords) {
      return alertComponent(
        "Biometric record not found",
        "Please login with your password",
        "OK",
        () => fallBackToDefaultAuth()
      );
    }

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to continue",
      cancelLabel: "Cancel",
      disableDeviceFallback: true,
    });

    if (biometricAuth.success) {
      const loggedBefore = await hasLoggedInWithGoogle();
      if (loggedBefore) {
        router.push("/src/location/currentLocation");
      } else {
        Alert.alert(
          "Login Failed",
          "No previous login found. Please log in with Google."
        );
        router.push("/(auth)/signup/registration");
      }
    } else {
      Alert.alert("Authentication Failed", "Please try again.");
    }
  };

  useEffect(() => {
    (async () => {
      const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(isBiometricSupported);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator
      >
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome back</Text>
          <Text style={styles.subHeaderText}>Log in to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your email</Text>

          <TextInput
            style={styles.input}
            placeholder="e.g Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={[styles.button, !isChecked && styles.buttonDisabled]}
          onPress={() => handleLogin({ email, password })}
          disabled={!isChecked || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Log in</Text>
          )}
        </TouchableOpacity>

        <GoogleSignin />

        <TouchableOpacity
          onPress={handleBiometric}
          style={{ alignSelf: "center", marginBottom: 40 }}
        >
          {/* <Entypo name="fingerprint" size={50} color="#E58945" /> */}
          <Image
            source={require("../../../assets/icons/fingerprint.png")}
            height={48}
            width={48}
          />
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => router.push("../signup/registration")}
          >
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

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
  },
  subHeaderText: {
    fontSize: 18,
    color: "#666",
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#6B7280",
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    justifyContent: "center",
  },
  checkbox: {
    backgroundColor: "blue",
    borderRadius: 4,
    borderColor: "gray",
  },
  checkboxLabel: {
    fontSize: 18,
    fontWeight: "400",
    paddingLeft: 5,
  },
  button: {
    backgroundColor: "#E58945",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "5%",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
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
});

export default SavedNumber;