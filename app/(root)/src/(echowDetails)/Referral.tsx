import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const Referral = () => {

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
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>Refer a friend</Text>
            </View>

            <View style={styles.body}>
                <Image
                    source={require("../../../../assets/images/food.png")}
                    style={{ alignSelf: "center", borderRadius: 10, marginBottom: 20 }}
                />

                <Text style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}>
                    Help us grow with your friends and family! Invite & Earn
                </Text>

                <Text style={{ fontSize: 16, marginBottom: 20, marginTop: 10, color: "gray" }}>
                    Get rewarded for sharing! Refer your loved ones and earn discounts or free meals when they place their first order.
                </Text>

                <View style={styles.refer}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image
                            source={require("../../../../assets/icons/link.png")}
                            style={{ width: 20, height: 20, marginLeft: 10, marginRight: 10 }}
                        />
                        <Text style={{ fontSize: 20 }}>Link:........................</Text>
                    </View>
                    <View style={styles.referSub}>
                        <Text style={{ color: "white" }}>Copy</Text>
                        <Image
                            source={require("../../../../assets/icons/copy.png")}
                            style={{ width: 20, height: 20, marginLeft: 10 }}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#F97316",
                        padding: 15,
                        borderRadius: 5,
                        alignItems: "center",
                        margin: 20,
                        marginTop: 30
                    }}
                >
                    <Text style={{color: "white", fontSize: 15}}>Refer Now </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Referral

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
    body: {
        padding: 16
    },
    refer: {
        flexDirection: "row",
        backgroundColor: "#F3F3F3",
        padding: 10,
        borderRadius: 8,
        justifyContent: "space-between",
        marginTop: 20,
    },
    referSub: { 
        backgroundColor: "#000", 
        flexDirection: "row", 
        alignItems: "center", 
        marginLeft: 10,
        borderRadius: 5, 
        padding: 5 
    }
})
