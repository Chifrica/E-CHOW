import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Link, Redirect, router, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const SignInOutCard = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.replace('/(root)/login/savedNumber');
  }

  const handleGetStarted = () => {
    // router.replace('/auth/SignUp');
  };

  // const handleSignIn = () => {
  //   router.push('/auth/SignIn');
  // };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.getStarted} 
        onPress={handleGetStarted}
      >
        <Text style={styles.getStartedTxt}>Order Now</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.signin} 
        onPress={handleLogin}
      >
        <Text style={styles.signinTxt}>Login in</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#30AB6A', 
        // marginTop: 10, 
        // paddingTop: 20,
        height: height, 
        width: width,
    },
    getStarted: {
        backgroundColor: '#E58945', 
        marginTop: 20, 
        marginLeft: 10, 
        marginRight: 10,
        borderRadius: 8
    },
    getStartedTxt: {
        fontWeight: 500, 
        fontFamily: 'sans', 
        textAlign: 'center',
        fontSize: 25, 
        padding: 10,
        color: '#FFFFFF'
    },
    signin: {
        // backgroundColor: '#101010', 
        margin: 10,
        marginTop: 20,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: "#FFFFFF",
        elevation: 0.5
    },
    signinTxt: {
        fontWeight: 500, 
        fontFamily: 'sans', 
        textAlign: 'center', 
        color: '#667085', 
        fontSize: 25,
        padding: 10,
    }
})