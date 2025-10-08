"use client";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const FavoritesPage = () => {
    const { favorites } = useLocalSearchParams();
    const favList = favorites ? JSON.parse(favorites as string) : [];

    const handleBack = () => {
        router.back();
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>My Favorites</Text>
            </View>
            {favList.length > 0 ? (
                <FlatList
                    data={favList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Text style={styles.item}>{item}</Text>
                    )}
                />
            ) : (
                <Text style={styles.empty}>No favorites yet</Text>
            )}
        </SafeAreaView>

       
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20 
    },
    header: { 
		borderBottomWidth: 1, 
		borderColor: "#ddd", 
		flexDirection: "row", 
	},
    backButton: {
		marginRight: 16,
	},
    title: { 
        fontSize: 22, 
        fontWeight: "bold", 
        marginBottom: 15 
    },
    item: { 
        fontSize: 18, 
        marginVertical: 8 
    },
    empty: { 
        fontSize: 16, 
        color: "gray", 
        marginTop: 20 
    },
});

export default FavoritesPage;
