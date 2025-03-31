import { View, Text, SafeAreaView, ScrollView, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'

const width = Dimensions.get('window').width;

const ExploreScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
            <Text style={{fontWeight: 'bold', fontSize: 24}}>Explore</Text>
            <View style={styles.miniHeader}>
                <Feather name="search" size={24} color="#61605F" style={styles.headerIcon2}/>
                <Feather name="shopping-cart" size={24} color="#61605F" style={styles.headerIcon2}/>
            </View>
        </View>

        <View style={{ }}>
          <View style={styles.imageContainer}>
            <Image 
              source={require('@/assets/images/explore1.png')}  
              style={styles.image}
            />
          </View>
          <View style={styles.imageOverlay}>
            {/*Top layer */}
            <View style={{}}>
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                  <View style={{backgroundColor: '#EA5959', borderRadius: 100, padding: 8, elevation: 1, marginRight: 10}}>
                    <Text style={{color: '#fff'}}>vendor</Text>
                  </View>
                  <View>
                    <Text style={{color: '#fff'}}>NAO Restaurant</Text>
                    <Text style={{color: '#fff'}}>Adebayo road, Ado Ekiti</Text>
                  </View>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, borderRadius: 50}}>  
                  <Feather name="star" size={20} color="#E58945" />
                  <Text style={{color: '#475467', marginLeft: 5}}>5min ago</Text>
                </View>
              </View>
            </View>

            {/* Bottom layer */}
            <View style={{ bottom: 0, top: 0, marginTop: 'auto' }}>
              <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                  <Feather name="share" size={24} color="#fff" style={{position: 'absolute', }}/>
                  <Feather name="heart" size={24} color="#fff" style={{position: 'absolute',marginLeft: 20}}/>
                  <Feather name="shopping-cart" size={24} color="#fff" style={{position: 'absolute',marginLeft: 40}}/>
                </View>
                <View>
                  <Text style={{color: '#fff', }}>Click for details</Text>
                </View>
              </View>
              <View style={{marginTop: '10%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <View>
                  <Text style={{color: '#fff', }}>Spicy Jollof Rice</Text>
                  <Text style={{color: '#fff', }}>10min away</Text>
                </View>
                <View style={{backgroundColor: '#E58945', padding: 10, borderRadius: 50, marginTop: 10}}>
                  <Text style={{color: '#fff', }}>Order Now</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    top: 10,
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
    width: width - 32, // Full width minus padding (16px on each side)
    aspectRatio: 16 / 9, // Maintain aspect ratio of the image
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 10,
  },
})