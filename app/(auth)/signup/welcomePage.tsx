import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomePage = () => {
    const icon1 = require("../../../assets/icons/icon1.png");
    const icon2 = require("../../../assets/icons/icon2.png");
    const icon3 = require("../../../assets/icons/icon3.png");
    const icon4 = require("../../../assets/icons/icon4.png");
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <View>
                    <Image
                        source={icon1}
                        style={styles.icon1}
                    />

                    <Image
                        source={icon2}
                        style={styles.icon2}
                    />
                </View>

                <View style={styles.headerContainer}>
                    <Text style={styles.headerTxt}>Welcome to E-Chow</Text>
                    <Text style={styles.headerSubTxt}>{`Start Ordering Your Favorite Meal \n right away!`}</Text>

                    <TouchableOpacity
                        style={styles.btn}
                    >
                        <Text style={styles.btnTxt}>Get Started</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <Image
                        source={icon3}
                        style={styles.icon3}
                    />

                    <Image
                        source={icon4}
                        style={styles.icon4}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default WelcomePage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#F9FAFB",
    },
    contentContainer: {
        flex: 3, 
    },
    icon1: {
        marginTop: 50,
        left: 54
    },
    icon2: {
        marginTop: 50,
        left: 268
    },
    icon3: {
        marginTop: 64,
        left: 54
    },
    icon4: {
        marginTop: 50,
        left: 268
    },
    headerContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 50
    },
    headerTxt: {
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    },
    headerSubTxt: {
        fontSize: 16,
        color: "#D6D6D6",
        textAlign: "center"
    },
    btn: {
        backgroundColor: "#E58945",
        alignItems: "center",
        borderRadius: 10,
        marginTop: 20
    },
    btnTxt: {
        color: "#fff",
        fontSize: 20,
        marginHorizontal: "18%",
        marginVertical: "3%",
    }
})