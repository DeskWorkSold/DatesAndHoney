import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Alert, ActivityIndicator, Button } from "react-native";
import {
    getProducts,
    requestPurchase,
    purchaseUpdatedListener,
    purchaseErrorListener,
    finishTransaction,
    getSubscriptions,
} from "react-native-iap";
import { constants } from "../../consts/constants";
// import { InAppPurchase } from 'react-native-iap';

const Paywall = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const productIds = ['diamondsubscriptionmonthly1', 'goldsubscription1', 'silversubscription1'];


    const getSubscriptionsTwo = async () => {
        try {
            const result = await getSubscriptions({ skus: constants.productSkus });
            console.log(result);
            setProducts(result);
            setLoading(false);
        } catch (error) {
            Alert.alert('Error fetching products');
        }
    }
    useEffect(() => {
        getSubscriptionsTwo()
    }, [])

    // useEffect(() => {
    //     const purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase) => {
    //         const receipt = purchase.transactionReceipt;
    //         if (receipt) {
    //             try {
    //                 await finishTransaction({ purchase, isConsumable: false });
    //             } catch (error) {
    //                 console.error("An error occurred while completing transaction", error);
    //             }
    //             notifySuccessfulPurchase();
    //         }
    //     });

    //     const purchaseErrorSubscription = purchaseErrorListener((error) =>
    //         console.error('Purchase error', error.message));

    //     const fetchProducts = async () => {
    //         try {
    //             const result = await getSubscriptions({ skus: constants.productSkus });
    //             console.log(result);
    //             setProducts(result);
    //             setLoading(false);
    //         } catch (error) {
    //             Alert.alert('Error fetching products');
    //         }
    //     };

    //     fetchProducts();

    //     return () => {
    //         purchaseUpdateSubscription.remove();
    //         purchaseErrorSubscription.remove();
    //     };
    // }, []);

    const handlePurchase = async (productId) => {
        const test = products[0]?.subscriptionOfferDetails[0]?.basePlanId
        // console.log(test);
        // return
        setLoading(true); // Set loading to true when initiating purchase
        try {
            await requestPurchase({ skus: [test] });
        } catch (error) {
            console.log(error);
            // Alert.alert('Error occurred while making purchase');
        } finally {
            setLoading(false);
        }
    };

    // console.log(products[0]?.subscriptionOfferDetails);

    const notifySuccessfulPurchase = () => {
        Alert.alert("Success", "Purchase successful", [
            {
                text: 'Home',
                onPress: () => {
                    // Handle navigation to home screen here
                }
            }
        ]);
    };

    return (
        <View style={styles.container}>
            {!isLoading ? (
                <>
                    <View style={styles.header}>
                        <Image source={require('../../assets/describe.png')} style={styles.image} />
                        <View style={styles.heading}>
                            <Text style={styles.text}>Unlock all Recipes</Text>
                            <Text style={styles.subText}>Get unlimited access to 1000+ recipes</Text>
                        </View>
                    </View>
                    {products.map((product, index) => (
                        <View
                            key={index}
                            style={{
                                flexDirection: 'row',
                                backgroundColor: '#fff',
                                height: 100,
                                borderRadius: 10,
                                elevation: 6,
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 10,
                                marginTop: 30,
                                marginHorizontal: 10
                            }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 16,
                                flex: 2.5,
                                marginRight: 10
                            }}>{product?.title}</Text>
                            <View style={{
                                flex: 1
                            }}><Button title='Buy' color='coral' onPress={() => handlePurchase(product.productId)} /></View>
                        </View>
                    ))}
                </>
            ) : (
                <View style={styles.indicator}>
                    <ActivityIndicator size='large' />
                </View>
            )}
        </View>
    );
};

export default Paywall;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 200,
        width: '100%',
    },
    image: {
        resizeMode: 'cover',
        opacity: 0.5,
        height: 200,
        width: '100%',
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
    },
    heading: {
        position: 'absolute',
        bottom: 10,
        left: 10
    },
    text: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
    },
    subText: {
        fontSize: 18,
        color: '#333',
        overflow: 'hidden'
    },
    indicator: {
        justifyContent: 'center',
        flex: 1
    }
});
