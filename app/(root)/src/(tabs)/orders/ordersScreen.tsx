import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const OrdersScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Text>My Orders</Text>

        <View>
          <TouchableOpacity>
            <Text>Ongoing</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Delivereds</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Canceled</Text>
          </TouchableOpacity>
        </View>

        <View>
          {/* <Image source=(require')) /> */}
          <Text>You have no orders yet...!</Text>
          <Text>Explore nearby restaurants and order your favorite meals effortlessly</Text>
        </View>

        <TouchableOpacity>
          <Text>Explore & Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OrdersScreen