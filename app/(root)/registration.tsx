import GoogleAppleSignup from "@/components/googleAppleSignup";
import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native"

const Registration = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    return (
        <SafeAreaView style={styles.container}>
           <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <Text style={styles.headerText} >Registration</Text>
                    <Text style={styles.subHeaderText}>You are welcome, kindly set up your account</Text>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone number</Text> 
                    <TextInput 
                        style={styles.input}
                        placeholder='e.g 08139684024' 
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType='phone-pad'
                    />   
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text> 
                    <TextInput 
                        style={styles.input}
                        placeholder='e.g name@gmail.com' 
                        value={email}
                        onChangeText={setEmail}
                        keyboardType='email-address'
                    />   
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Full name</Text> 
                    <TextInput 
                        style={styles.input}
                        placeholder='e.g Promise Isreal' 
                        value={fullName}
                        onChangeText={setFullName}
                        keyboardType='default'
                    />   
                </View>

                <GoogleAppleSignup />

                <TouchableOpacity
                    style={styles.button}
                    // onPress={handleContinue}
                    // disabled={!isChecked}
                >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                
                <Text style={styles.signupText}>
                    Already have an account?  
                    <TouchableOpacity 
                        // onPress={handleSignUp}
                    > 
                        <Text style={{ color: '#E58945', fontWeight: 'bold', fontSize: 18, }}> Login Here </Text>
                    </TouchableOpacity>
                </Text>
           </ScrollView>
        </SafeAreaView>
    )
}

export default Registration;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F9FAFB"
    },
    scrollView: {
        flexGrow: 1,
    },
    header: {
        marginBottom: 50,
        marginTop: 15
    },
    headerText: {
        fontSize: 30,
        fontWeight: '700',
        letterSpacing: -0.41,
        lineHeight: 100,
        fontFamily: 'Switzerland',
    },
    subHeaderText: {
        fontSize: 18,
        color: '#666',
        fontWeight: '500',
        letterSpacing: -0.41,
        lineHeight: 20,
        fontFamily: 'Switzerland',
        
    },
    inputContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#6B7280',
        lineHeight: 20,
        letterSpacing: -0.41,
        fontFamily: 'Switzerland',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 50,
        padding: 12,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#E58945',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 50
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signupText: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 400,
        color: '#667085',
        textAlign: 'center',
    }
})