import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';

const { width } = Dimensions.get('window');

const SavedNumber = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const router = useRouter();

  // Finger print and Face Identification

  const fallBackToDefaultAuth = () => {
    console.log("fall back to password authentication");
  };

  const alertComponent = (title: string, mess: string | undefined, btnTxt: string, btnFunc: () => void) => {
    return Alert.alert(title, mess, [
      {
        text: btnTxt,
        onPress: btnFunc,
      },
    ]);
  };

  const handleBiometric = async () => {
    const isBiometricSupported = await LocalAuthentication.hasHardwareAsync();

    if (!isBiometricSupported) {
      return alertComponent(
        "Please enter your password",
        "Biometric not supported",
        "OK",
        () => fallBackToDefaultAuth(),
      );
    }

    let supportedBiometrics;
    if (isBiometricSupported) {
      supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();
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
      router.push('/(root)/src/location/currentLocation');
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
      <ScrollView contentContainerStyle={styles.scrollView} showsHorizontalScrollIndicator>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome back</Text>
          <Text style={styles.subHeaderText}>Log in to your account</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter your phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g 08139684024"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            style={[styles.checkbox, { backgroundColor: isChecked ? 'blue' : 'white' }]}
          />
          <Text style={styles.checkboxLabel}>Save Phone Number</Text>
        </View>

        {/* <Image
          source={require('@/assets/icons/facial recogn.png')}
          style={{ alignSelf: 'center', marginTop: '50%', marginBottom: 40 }}
        /> */}

        <TouchableOpacity 
          onPress={handleBiometric}
          style={{ alignSelf: 'center', marginTop: '50%', marginBottom: 40 }}
        >
          <Entypo name="fingerprint" size={50} color="#E58945" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, !isChecked && styles.buttonDisabled]}
          onPress={() => console.log('Continue pressed')}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?
          <TouchableOpacity onPress={() => router.push('../registration')}>
            <Text style={{ color: '#E58945', fontWeight: 'bold', fontSize: 18 }}> Sign Up</Text>
          </TouchableOpacity>
        </Text>
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
    fontWeight: 'bold',
  },
  subHeaderText: {
    fontSize: 18,
    color: '#666',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#6B7280',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 50,
    padding: 12,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'center',
  },
  checkbox: {
    backgroundColor: 'blue',
    borderRadius: 4,
    borderColor: 'gray',
  },
  checkboxLabel: {
    fontSize: 18,
    fontWeight: '400',
    paddingLeft: 5,
  },
  button: {
    backgroundColor: '#E58945',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#667085',
    textAlign: 'center',
  },
});

export default SavedNumber;