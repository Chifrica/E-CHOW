import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'

const CurrentLocation = () => {
  return (
    <SafeAreaView>
        <ScrollView>
            <View>
                <Text>Location</Text>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default CurrentLocation