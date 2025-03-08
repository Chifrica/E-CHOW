import { View, Text, SafeAreaView, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const SavedNumber = () => {
  return (
    <SafeAreaView>
        <ScrollView>
            <View>
                <Text>Welcome back</Text>
                <Text>Log in to your account</Text>
            </View>

            <View>
                <Text>Enter your phone number</Text> 
                <TextInput placeholder='e.g 08139684024' />   
            </View>

            <View>
                {/* Checkbox */}
                <Text>Save Phone Number</Text>
            </View>

            <TouchableOpacity
                onPress={() => {}
                }>
                <Text>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
  )
}

export default SavedNumber;