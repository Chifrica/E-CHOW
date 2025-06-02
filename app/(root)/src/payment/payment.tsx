import { View, Text, Button } from 'react-native'
import React from 'react'
import { usePaystack } from 'react-native-paystack-webview';

const Payment = () => {
    const {popup} = usePaystack();
    
        const paynow = () => {
            popup.newTransaction({
                email: "chikaonwunali@gmail.com",
                amount: 10000, 
                reference: `TXN_${Date.now()}`,
                onSuccess: async (res) => {
                    console.log("Success", res);
                },
                onCancel: () => console.log("Transaction cancelled"),
                onLoad: (res) => console.log("Webview Loaded", res),
                onError: (res) => console.log("Webview Error", res)
            });
        }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={paynow} title="Pay Now" />
    </View>
  )
}

export default Payment;