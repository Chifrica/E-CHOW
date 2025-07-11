import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const AboutUs = () => {

    const handleBack = () => {
            router.back();
        }
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>About Us</Text>
            </View>

            <View style={{ padding: 20 }}>
                <Text>
                    We are a team of passionate developers dedicated to creating innovative solutions. 
                    Our mission is to enhance user experiences through technology. 
                    We believe in the power of collaboration and strive to build products that make a difference in people's lives.

                    Our team is committed to continuous learning and improvement, ensuring that we stay at the forefront of industry trends and best practices.
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default AboutUs

const styles = StyleSheet.create({
    container: { 
		flex: 1, 
		backgroundColor: "white", 
		marginTop: 30
	},
	header: { 
		padding: 20, 
		borderBottomWidth: 1, 
		borderColor: "#ddd", 
		flexDirection: "row", 
	},
    backButton: {
		marginRight: 16,
	},
})