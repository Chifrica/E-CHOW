import {
	View,
	Text,
	StyleSheet,
	Image,
	Alert,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { Redirect, router } from "expo-router";
import { useGlobalContext } from "../lib/global-provider";
import * as WebBrowser from "expo-web-browser";
import Constants from "expo-constants";
import { supabase } from "../lib/supabase";

// Add this to handle WebAuthSession redirect
WebBrowser.maybeCompleteAuthSession();

const GoogleAppleSignup = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/home/homePage" />;

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "myapp://google-auth",
        },
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data.url) {
        const result = await WebBrowser.openAuthSessionAsync(
          data.url,
          "myapp://google-auth"
        );

        if (result.type === "success") {
          // Supabase listens to the URL and will handle the session
          // Assuming deep linking is set up correctly
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      Alert.alert("Error", "Something went wrong during Google login");
    }
  };

  const handleAppleDemo = () => {
    Alert.alert("Info", "Apple login is under development.");
  };

  return (
    <View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.horizontalLine} />
        <Text style={styles.horizontalLineText}>Or sign up with</Text>
        <View style={styles.horizontalLine} />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {/* Google Sign In */}
        <TouchableOpacity
          onPress={handleGoogleLogin}
          style={styles.buttonContainer}
        >
          <Image
            source={require("../assets/icons/google.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Apple Demo */}
        <TouchableOpacity
          onPress={handleAppleDemo}
          style={styles.buttonContainer}
        >
          <Image
            source={require("../assets/icons/apple.png")}
            style={{ width: 24, height: 30, margin: 8 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GoogleAppleSignup;

const styles = StyleSheet.create({
	horizontalLine: {
		flex: 1,
		height: 1,
		backgroundColor: "#6D6C69",
	},
	horizontalLineText: {
		width: 100,
		textAlign: "center",
		color: "#6D6C69",
		lineHeight: 24,
		letterSpacing: -0.41,
		fontSize: 16,
		fontWeight: "400",
		fontFamily: "Switzerland",
	},
	buttonContainer: {
		marginRight: 20,
		backgroundColor: "#D6D6D6",
		borderRadius: 50,
		borderWidth: 1,
		borderColor: "#D6D6D6",
		justifyContent: "center",
		alignItems: "center",
		width: 50,
		height: 50,
	},
	icon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
});
