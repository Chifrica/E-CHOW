import { View, Text } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const AddLocation = () => {
  return (
    <View>
        <Feather name="chevron-left" size={24} color="black"/>
        <Text>AddLocation</Text>
    </View>
  )
}

export default AddLocation