import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const ProjectPrivacy = () => {

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
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Privacy Policy</Text>
            </View>

            <View style={{ padding: 20 }}>
                <Text >
                    Our privacy policy is as follows...Our privacy policy is as follows...Our privacy policy is as follows...
                    Our privacy policy is as follows...Our privacy policy is as follows...Our privacy policy is as follows...
                    Our privacy policy is as follows...Our privacy policy is as follows...Our privacy policy is as follows...
                    Our privacy policy is as follows...Our privacy policy is as follows...Our privacy policy is as follows...
                    Our privacy policy is as follows...Our privacy policy is as follows...Our privacy policy is as follows...
                </Text>
            </View>

        </SafeAreaView>
    )
}

export default ProjectPrivacy

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "white", 
        marginTop: 30,
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