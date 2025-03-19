import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather } from '@expo/vector-icons'

const HomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
            <View style={styles.miniHeader}>
                <AntDesign name="menu-fold" size={24} color="#FFFFFF" style={styles.headerIcon}/>
                <View>
                    <Text>Deliver to: 
                        <Text style={{fontWeight: 700}}> Office</Text>
                    </Text>
                    <Text style={{justifyContent: 'center'}}>33, Rosebud, Oke... 
                        <Feather name="chevron-down" size={24} color="#61605F" />
                    </Text>
                </View>
            </View>
            <View style={styles.miniHeader}>
                <Feather name="search" size={24} color="#61605F" style={styles.headerIcon2}/>
                <Feather name="shopping-cart" size={24} color="#61605F" style={styles.headerIcon2}/>
            </View>
        </View>

        {/* Stories */}
        <FlatList
            data={[
                require('../../assets/images/Bellonis.png'),
                require('../../assets/images/Nao.png'),
                require('../../assets/images/Tasty.png'),
                require('../../assets/images/Igbo-kitchen.png')

            ]}
            renderItem={({item}) => <Image source={item} />}
            keyExtractor={(item, index) => index.toString()}
            horizontal
        />
            {/* <Text style={styles.headerText}>Home</Text> */}
        
      
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    padding: 16,
  },
    scrollView: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        justifyContent: 'space-between',
    },
    miniHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        backgroundColor: '#E58945',
        borderRadius: 50,
        padding: 8,
        elevation: 1,
        marginRight: 10,
    },
    headerIcon2: {
        backgroundColor: '#F3F3F3',
        borderRadius: 50,
        padding: 8,
        elevation: 1,
        marginRight: 10,
    },
    headerText: {
        fontSize: 25,
        fontWeight: '700',
        marginHorizontal: 'auto',
        fontFamily: 'Switzerland',
        letterSpacing: -0.41,
        // lineHeight: 100,
    },
})