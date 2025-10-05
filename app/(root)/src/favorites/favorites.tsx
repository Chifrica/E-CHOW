"use client";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const FavoritesPage = () => {
    const { favorites } = useLocalSearchParams();
    const favList = favorites ? JSON.parse(favorites as string) : [];

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Favorites</Text>
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
    container: { flex: 1, padding: 20 },
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
