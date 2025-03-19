import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'
// import images from '@/constants/images'

const images = {
    bellonis: require('../../../../assets/images/Bellonis.png'),
    nao: require('../../../../assets/images/Nao.png'),
    igboKitchen: require('../../../../assets/images/Igbo-kitchen.png'),
    tasty: require('../../../../assets/images/Tasty.png'),
};

const icons = {
    rice: require('../../../../assets/icons/BowlFood.png'),
    beverages: require('../../../../assets/icons/BeerBottle.png'),
    seaFood: require('../../../../assets/icons/Shrimp.png'),
    soup: require('../../../../assets/icons/CookingPot.png'),
    bakery: require('../../../../assets/icons/Cookie.png'),
};

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
                { image: images.bellonis, label: 'Bellonis' },
                { image: images.nao, label: 'Nao' },
                { image: images.igboKitchen, label: 'Igbo Kitchen' },
                { image: images.tasty, label: 'Tasty' },
                { image: images.nao, label: 'Nao' },

            ]}
            renderItem={({ item }) => (
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.imageLabel}>{item.label}</Text>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator

        />
        <View>
        <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>Category</Text>
            <Text style={styles.categorySeeAll}>See All</Text>
        </View>

        <View style={styles.categoryContainer}>
            <View style={styles.categoryItem}>
                <FontAwesome6 name="bowl-rice" size={30} color="#E58945" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>Rice</Text>
            </View>
            <View style={styles.categoryItem}>
                <FontAwesome6 name="wine-bottle" size={30} color="#E58945" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>Rice</Text>
            </View>
            <View style={styles.categoryItem}>
                <FontAwesome6 name="bowl-rice" size={30} color="#E58945" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>Rice</Text>
            </View>
            <View style={styles.categoryItem}>
                <FontAwesome6 name="bowl-rice" size={30} color="#E58945" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>Rice</Text>
            </View>
            <View style={styles.categoryItem}>
                <FontAwesome6 name="bowl-rice" size={30} color="#E58945" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>Rice</Text>
            </View>
            <View style={styles.categoryItem}>
                <FontAwesome6 name="cookie-bite" size={24} color="#E58945" style={styles.categoryIcon} />
                <Text style={styles.categoryLabel}>Rice</Text>
            </View>
        </View>
        </View>
        <Text style={styles.headerText}>Home</Text>
        
      
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
        marginBottom: 20,
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
    imageContainer: {
        alignItems: 'center',
        marginRight: 10,
        padding: 5,
    },
    image: {
        width: 70,
        height: 70,
        resizeMode: 'cover',
        borderRadius: 50,
        borderColor: '#E58945',
        borderWidth: 2,
    },
    imageLabel: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    headerText: {
        fontSize: 25,
        fontWeight: '700',
        marginHorizontal: 'auto',
        fontFamily: 'Switzerland',
        letterSpacing: -0.41,
        // lineHeight: 100,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    categorySeeAll: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#E58945',
    },
    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    categoryItem: {
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 20,
    },
    categoryIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    categoryLabel: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
})