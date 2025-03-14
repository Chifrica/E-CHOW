import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { Feather, Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('window').width

const AddLocation = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Feather name="chevron-left" size={24} color="black" style={styles.headerIcon} />
          <Text style={styles.headerText}>Location</Text>
        </View>

        <View style={styles.yourLocation}>
          <Ionicons name="location-outline" size={24} color="black"/>
          <View>
            <Text style={styles.yourLocationText}>General (Current location)</Text>
            <Text>Rosebud, Oke lla, Ado Ekiti</Text>
            </View>
        </View>

        <TouchableOpacity style={styles.addNewLocation}>
          <Ionicons name="add" size={24} color="#FC964C"/>
          <Text style={styles.addNewLocationText}>Add New Location</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save and Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
    
  )
}

export default AddLocation

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
  },
  headerIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    elevation: 1,
  },
  headerText: {
    fontSize: 25,
    fontWeight: '700',
    marginHorizontal: 'auto',
    fontFamily: 'Switzerland',
    letterSpacing: -0.41,
    // lineHeight: 100,
    },
  yourLocation: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    elevation: 1,
  },
  yourLocationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  addNewLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5ED',
    padding: 16,
    marginTop: 20,
    borderRadius: 8,
  },
  addNewLocationText: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FC964C',
  },
  button: {
    backgroundColor: '#E58945',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: width
  },
  buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
  },
})