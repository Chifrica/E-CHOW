import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const WelcomePage = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image
                    source={require("../../assets/icons/icon1.png")}
                    style={styles.icon1}
                />

                <Image
                    source={require("../../assets/icons/icon2.png")}
                    style={styles.icon2}
                />

                {/* <Text style={styles.icon1}>Goat</Text>

                <Text style={styles.icon2}>Cow</Text> */}
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
                    source={require("../../assets/icons/icon3.png")}
                    style={styles.icon3}
                />

                <Image
                    source={require("../../assets/icons/icon4.png")}
                    style={styles.icon4}
                />

                {/* <Text style={styles.icon3}>Goat</Text>

                <Text style={styles.icon4}>Cow</Text> */}
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
    icon1: {
        marginTop: 110,
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