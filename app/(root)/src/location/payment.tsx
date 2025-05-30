import { View, Text } from 'react-native'
import React from 'react'
import { PaystackProvider, usePaystack } from "react-native-paystack-webview"

const payment = () => {
    const {popup} = usePaystack();

    const paynow = () => {
        popup({
            email: "

  return (
    <PaystackProvider 
        debug 
        publicKey="sk_test_04b621087832723627990de3de2c4d98a757468a" 
        currency="NGN" 
        defaultChannels={
            [
                "card", 
                "bank_transfer", 
                "ussd"
            ]
        }
    >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>payment</Text>
        </View>
    </PaystackProvider>
  )
}

export default payment


// sk_test_04b621087832723627990de3de2c4d98a757468a