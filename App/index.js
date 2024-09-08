// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, ActivityIndicator, View, Image } from 'react-native';
import axios from 'axios';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const HomePage = () => {
    const [homePageData, setHomePageData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHomePageData();
    }, []);

    const fetchHomePageData = async () => {
        try {
            const response = await axios.post(API_URL, {
                messages: [
                    { role: "system", content: "You are a helpful assistant. Please provide answers for given requests." },
                    { role: "user", content: `Fetch homepage data for deliciousscent.de` }
                ],
                model: "gpt-4o"
            });
            const resultString = response.data.response;
            const homePageData = JSON.parse(resultString);
            setHomePageData(homePageData);
        } catch (error) {
            console.error('Error fetching homepage data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Image source={{ uri: homePageData.banner_image_url }} style={styles.bannerImage} />
            <Text style={styles.header}>{homePageData.header}</Text>
            <Text style={styles.description}>{homePageData.description}</Text>

            {homePageData.featured_products.map((product, index) => (
                <View key={index} style={styles.productContainer}>
                    <Image source={{ uri: product.image_url }} style={styles.productImage} />
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>${product.price}</Text>
                </View>
            ))}
        </ScrollView>
    );
};

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Delicious Scent</Text>
            <HomePage />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        paddingHorizontal: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    bannerImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    productContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;