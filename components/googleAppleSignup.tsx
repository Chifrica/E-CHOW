import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import { login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const GoogleAppleSignup = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();
  if(!loading && isLoggedIn) return <Redirect href="/" />

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch()
    } else {
      Alert.alert('Error', 'Login failed');
    }
  }
   
  return (
    <View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={styles.horizontalLine} />
            <View>
                <Text style={styles.horizontalLineText}>Or sign up with</Text>
            </View>
            <View style={styles.horizontalLine} />
        </View>
    
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
            <TouchableOpacity 
              onPress={handleLogin}
              style={{marginRight: 20, backgroundColor: '#D6D6D6', borderRadius: 100, borderWidth: 1, borderColor: '#D6D6D6', justifyContent: 'center', alignItems: 'center'}}>  
                <Image
                    source={require('../assets/icons/google.png')}
                    style={{width: 24, height: 24, margin: 5, padding: 8}}
                />
            </TouchableOpacity>
            <TouchableOpacity style={{backgroundColor: '#D6D6D6', borderRadius: 100, borderWidth: 1, borderColor: '#D6D6D6', justifyContent: 'center', alignItems: 'center'}}>  
                <Image
                    source={require('../assets/icons/apple.png')}
                    style={{width: 24, height: 30, margin: 8}}
                />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default GoogleAppleSignup

const styles = StyleSheet.create({
  horizontalLine: {
    flex: 1, 
    height: 1, 
    backgroundColor: '#6D6C69'
  },
  horizontalLineText: {
    width: 100, 
    textAlign: 'center', 
    color: '#6D6C69',
    lineHeight: 24, 
    letterSpacing: -0.41, 
    fontSize: 16,
    fontWeight: '400', 
    fontFamily: 'Switzerland',
  }
})