import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native"

const Registration = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');

    return (
        <SafeAreaView>
            <View>
                <Text>Registration</Text>
                <Text>You are welcome, kindly set up your account</Text>
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
        </SafeAreaView>
    )
}

export default Registration;

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 24,
      },
      label: {
        fontSize: 16,
        marginBottom: 8,
      },
      input: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 50,
        padding: 12,
        fontSize: 16,
      },
})