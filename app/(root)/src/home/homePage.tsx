import { View, Text, StyleSheet, ScrollView, FlatList, Image, Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'
// import images from '@/constants/images'
const width = Dimensions.get('screen').width;

const images = {
    bellonis: require('../../../../assets/images/Bellonis.png'),
    nao: require('../../../../assets/images/Nao.png'),
    igboKitchen: require('../../../../assets/images/Igbo-kitchen.png'),
    tasty: require('../../../../assets/images/Tasty.png'),
};

const videos = {
    video1: require('../../../../assets/images/video1.png')
}

const recommended = {
    recommended1: require('../../../../assets/images/recommended1.png')
}
// const icons = {
//     rice: require('../../../../assets/icons/BowlFood.png'),
//     beverages: require('../../../../assets/icons/BeerBottle.png'),
//     seaFood: require('../../../../assets/icons/Shrimp.png'),
//     soup: require('../../../../assets/icons/CookingPot.png'),
//     bakery: require('../../../../assets/icons/Cookie.png'),
// };

const HomePage = () => {
    
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
            <View style={styles.miniHeader}>
                <AntDesign name="menu-fold" size={24} color="#FFFFFF" style={styles.headerIcon}/>
                <View>
                    <Text style={{color: '#475467', fontSize: 16}}>Deliver to: 
                        <Text style={{fontWeight: 700}}> Office</Text>
                    </Text>
                    <Text style={{justifyContent: 'center', fontWeight: 'bold', color: '#101828', fontSize: 18}}>33, Rosebud, Oke... 
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
        <View style={{padding: 10}}>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Category</Text>
                <Text style={styles.categorySeeAll}>See All</Text>
            </View>

            <View style={styles.categoryContainer}>
                <View style={styles.categoryItem}>
                    <FontAwesome6 name="bowl-rice" size={20} color="#E58945" style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>Rice</Text>
                </View>
                <View style={styles.categoryItem}>
                    <FontAwesome6 name="wine-bottle" size={20} color="#E58945" style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>Beverages</Text>
                </View>
                <View style={styles.categoryItem}>
                    <FontAwesome6 name="bowl-rice" size={20} color="#E58945" style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>Swallow</Text>
                </View>
                <View style={styles.categoryItem}>
                    <FontAwesome6 name="bowl-rice" size={20} color="#E58945" style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>Seafood</Text>
                </View>
                <View style={styles.categoryItem}>
                    <FontAwesome6 name="bowl-rice" size={20} color="#E58945" style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>Soup</Text>
                </View>
                <View style={styles.categoryItem}>
                    <FontAwesome6 name="cookie-bite" size={20} color="#E58945" style={styles.categoryIcon} />
                    <Text style={styles.categoryLabel}>Bakery</Text>
                </View>
            </View>
        </View>

        <FlatList
            data={[
                { videos: videos.video1, title: 'This Week', label: 'See Top Related Restaurants' },
                { videos: videos.video1, label: 'video1' },
                { videos: videos.video1, label: 'video1' },
            ]}
            renderItem={({ item }) => (
                <View style={styles.videoContainer}>
                    <Image source={item.videos} style={styles.videos} />
                    <View style={styles.videoOverlay}>
                        <Text style={styles.videoTitle}>{item.title}</Text>
                        <Text style={styles.videoLabel}>{item.label}</Text>
                    </View>
                </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        />

        <View>
            <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>Recommended for you</Text>
                <Text style={styles.categorySeeAll}>See All</Text>
            </View>
        </View>

        <FlatList
                data={[
                    { recommended: recommended.recommended1, title: 'Caramello Spaghetti', label: 'Caramello Spaghetti' },
                    { recommended: recommended.recommended1, label: 'recommended1' },
                    { recommended: recommended.recommended1, label: 'recommended1' },
                ]}
                renderItem={({ item }) => (
                    <View style={styles.videoContainer}>
                        <Image source={item.recommended} style={styles.videos} />
                        <View style={styles.videoOverlay}>
                            <Text style={styles.videoTitle}>{item.title}</Text>
                            <Text style={styles.videoLabel}>{item.label}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10}}>
                            <View>
                                <Text>Caramello Spaghetti</Text>
                                <View>
                                    <Text>4.8</Text>
                                    <Text>10min away</Text>
                                </View>
                            </View>
                            <View>
                                <Text>1500</Text>
                            </View>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
        />

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
        borderWidth: 3,
    },
    imageLabel: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
    videoContainer: {
        marginRight: 10,
        // position: 'relative', // Ensure the overlay is positioned relative to the video
      },
      videos: {
        width: 333,
        height: 167,
        resizeMode: 'cover',
        borderRadius: 10,
      },
      videoOverlay: {
        position: 'absolute',
        marginLeft: 10,
        alignItems: 'flex-start',
      },
      videoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 5,
        borderRadius: 100,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        padding: 5,
        marginTop: 80
      },
      videoLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 10,
        // marginLeft: 10,
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
        flexDirection: 'row',
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 50,
        elevation: 5,
        backgroundColor: '#F9F9F9',
        padding: 5
    },
    categoryIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        backgroundColor: '#fff',
        padding: 10,
        elevation: 1,
        borderRadius: 50
    },
    categoryLabel: {
        marginTop: 5,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        paddingLeft: 5,
        paddingRight: 5
    },
})