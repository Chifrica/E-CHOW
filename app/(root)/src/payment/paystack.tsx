import React from 'react'
import { PaystackProvider } from "react-native-paystack-webview"
import Payment from './payment'

const PaymentGateWay = () => {
    
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
                "bank",
                "mobile_money"
            ]
        }
    >
        <Payment />
       
    </PaystackProvider>
  )
}

export default PaymentGateWay


// sk_test_04b621087832723627990de3de2c4d98a757468a