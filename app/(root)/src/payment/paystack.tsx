import { View, Text } from 'react-native'
import React from 'react'
import { PaystackProvider } from "react-native-paystack-webview"
import Payment from './payment'

const paymentGateWay = () => {
    
  return (
    <PaystackProvider 
        debug 
        publicKey="pk_test_a5cb76107c1668ed8a0cc3b16d4f35626dda69f1" 
        currency="NGN" 
        defaultChannels={
            [
                "card", 
                "bank_transfer", 
                "ussd",
            ]
        }
    >
        <Payment />
       
    </PaystackProvider>
  )
}

export default paymentGateWay


// sk_test_04b621087832723627990de3de2c4d98a757468a