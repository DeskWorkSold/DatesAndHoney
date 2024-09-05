import { Alert, Dimensions, Image, Modal, PermissionsAndroid, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'
import { useState } from 'react';
import { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import SVGRocket from '../../assets/ROCKET.svg';
import SVGProfile from '../../assets/PROFILEoptimization.svg';
import SVGDownload from '../../assets/BOOK.svg';
import SVGFlake from '../../assets/FLAKE.svg';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { AdditionalPackages, BuyAdditionalPackages, Buypackages, selectAdditionalPackages, selectPaymentCards, selectUser } from '../../../redux/reducers/Reducers';
import SVGdiamond from '../../assets/diamond.svg';
import SVGCircle from '../../assets/circletwo.svg';
import SVGLikes from '../../assets/liketwo.svg';
import RNFetchBlob from 'rn-fetch-blob';
import SVGHeart from '../../assets/match.svg';
const { width, height } = Dimensions.get('window');
import {
  getProducts,
  requestPurchase,
  purchaseUpdatedListener,
  purchaseErrorListener,
  consumePurchase,
  finishTransaction,
  getSubscriptions,
  requestSubscription,
} from "react-native-iap";
import { constants } from '../../consts/constants';

const Silver = [
  {
    id: 1,
    name: 'religion sub filters',
    image: <SVGCircle width={20} height={20} />
  },
  {
    id: 1,
    name: '15 likes Per Day',
    image: <SVGLikes width={20} height={20} />
  },
  {
    id: 1,
    name: '10 Max Matches',
    image: <SVGHeart width={20} height={20} />
  },
]

const Gold = [
  {
    id: 1,
    name: 'unlock all filters',
    image: <SVGCircle width={20} height={20} />
  },
  {
    id: 1,
    name: '40 likes Per Day',
    image: <SVGLikes width={20} height={20} />
  },
  {
    id: 1,
    name: '10 Max Matches',
    image: <SVGHeart width={20} height={20} />
  },
]

const Diamond = [
  {
    id: 1,
    name: 'Everything on gold & gold+ membership',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Unlock Suggested Matches',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Match with Diamond & Diamond +',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Unlimited Likes',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Get suggested matches by concierges team & AI matches (Both)',
    image: <SVGdiamond width={20} height={20} />
  },
  {
    id: 1,
    name: 'Max 10 matches',
    image: <SVGdiamond width={20} height={20} />
  },
]




const PremiumMembershipScreen = ({ navigation }) => {
  const [subscription, setSubscription] = useState([]);
  const [flakesubscription, setFlakesubscription] = useState([]);
  const [additionalsubscription, setAdditionalsubscription] = useState([]);
  const [products, setProducts] = useState([]);
  const [memberships, setMemberships] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [membershipUid, setMembershipUid] = useState();
  const [additionalPackage, setAdditionalPackage] = useState(null);
  const [additionalPackageUid, setAdditionalPackageUid] = useState(null);
  const PaymentCards = useSelector(selectPaymentCards)
  const [showSuccessPoppup, setShowSuccessPoppup] = useState({
    Status: false,
    Title: null,
    Detail: null
  });
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  const purchasedadditionalP = useSelector(selectAdditionalPackages)
  var selectedproduct
  var test
  // console.log(purchasedadditionalP);
  // console.log(user?.FlakeInsurance);
  const fetchMemberships = async () => {
    setUploading(true)
    try {
      // console.log('hello');
      await firestore()
        .collection('Package')
        .get()
        .then(querySnapshot => {
          // console.log('Total user: ', querySnapshot.size);
          const membership = [];
          const additional = [];
          const additionalId = [];
          const membershipsuid = [];
          querySnapshot.forEach((documentSnapshot) => {
            // console.log('memberships ID: ', documentSnapshot.id, documentSnapshot.data());
            if (documentSnapshot.data().id != 789) {
              // console.log(documentSnapshot.data().id);
              membership.push(documentSnapshot.data());
              membershipsuid.push(documentSnapshot.id);
            }
            else {
              // console.log(documentSnapshot.data());
              // additional.push(documentSnapshot.data());
              // additionalId.push(documentSnapshot.id);
              const filteredArray = documentSnapshot.data()?.AdditionalPackages.filter(item => item.enable === true);

              setAdditionalPackage(filteredArray)
              setAdditionalPackageUid(documentSnapshot.id)
            }
          });
          if (membership?.length > 0) {
            const findData = membership.findIndex((item) => item.id === user.PackageId);
            const Updated = {
              ...membership[findData],
              MemebershipBuy: true
            }
            membership[findData] = Updated
            // console.log(membership);
            setMemberships(membership)
            setMembershipUid(membershipsuid)
          }

          setUploading(false)
        })
      // console.log('membershipData: ', memberships);
    } catch (e) {
      console.log(e);
      setUploading(false)
    }
    // setUploading(false)
  };



  const viewMoreMembership = (item, index) => {
    const tet = memberships[0]
    // console.log(tet);
    // return
    // console.log('het', item , index);
    navigation.navigate('PremiumMembershipDetailScreen', { data: tet, data2: item })
  }

  const OnAdditionalPackage = (item, Price, props) => {
    //     console.log(Price);
    // return
    const updated = {
      ...item,
      Prices: {
        // discountedRate: item?.Price,
        limits: props ? props : item?.limits,
        rate: Price,
      },
      Price: Price,
      otherCategory: item.Title,
      uid: 789,
      limits: item?.id == 5 ? props : item?.limits,
      // limits: item?.id == 5 && Price == '$149' && '1 year',
    }
    // console.log(updated);
    // return
    // var Data = new Object();
    // Data.Details = item.Details;
    // Data.Price = item.Price;
    // Data.id = item.id;
    // Data.name = item.name;
    // Data.numberOfCards = item.numberOfCards;
    // Data.numberOfChats = item.numberOfChats;
    // Data.otherCategory = item.otherCategory;
    // Data.rate = item.rate;
    // Data.status = item.status;
    // Data.Prices = selectMemberships;
    // dispatch(BuyAdditionalPackages(updated))
    if (PaymentCards?.length > 0) {
      navigation.navigate('CheckoutScreenAdditionalPackage', {
        data: updated
      })
    }
    else {
      navigation.navigate('PaymentOptionScreen')
    }


    //     try {
    //       const paymentResult = await InAppPurchasePayments(SKU_IDs);
    //       if (paymentResult.success) {
    // //Success call your required functions here.
    //         setLoader(false);
    //       } else {
    //         Alert.alert(t('PaymentFailed'));
    //         setLoader(false);
    //       }
    //     } catch (error) {
    //       setLoader(false);
    //       Alert.alert(error);
    //       console.log('Payment error:', error);
    //     }
  }

  const CancleFlakeInsurance = async () => {
    // console.log('yes');
    try {
      const userRef = await firestore().collection('Users').doc(user.uid);
      // Remove FlakeInsurance details if the rate is greater than the available balance
      await userRef.update({
        'userDetails.FlakeInsurance': null,
      });
      setShowSuccessPoppup({
        ...showSuccessPoppup,
        Status: true,
        Title: 'Flakes Insurance!',
        Detail: `Successfully: ${user?.FlakeInsurance?.limits} insurance remove from your profile!!`,
      })
    } catch (e) {
      console.log('Error', e);
    }
  }

  const OnSuccessConfirm = () => {
    setShowSuccessPoppup({
      ...showSuccessPoppup,
      Status: false,
      Title: null,
      Detail: null,
    })
    navigation.goBack()
  }


  useEffect(() => {
    fetchMemberships();
  }, []);


  const getSubscriptionsTwo = async () => {
    setUploading(true)
    try {
      const result = await getSubscriptions({ skus: constants.subscriptionSkus });
      const memberships = result.filter((item) => item?.productId == 'diamondsubscriptionmonthly1' || item?.productId == 'goldsubscription1' || item?.productId == 'silversubscription1')
      const flakes = result.filter((item) => item?.productId == 'flakesubscription1')
      const additional = result.filter((item) => item?.productId != 'flakesubscription1' && item?.productId != 'diamondsubscriptionmonthly1' && item?.productId != 'goldsubscription1' && item?.productId != 'silversubscription1')
      // console.log('--',additional);
      setSubscription(memberships)
      setAdditionalsubscription(additional)
      setFlakesubscription(flakes)
      // setProducts(result);
      // setLoading(false);
      setUploading(false)
    } catch (error) {
      setUploading(false)
      Alert.alert(`${error?.message}`);
    }
  }
  const getProductsTwo = async () => {
    setUploading(true)
    try {
      const result = await getProducts({ skus: constants.productSkus });
      setProducts(result)
      // console.log('--',result);
      // setProducts(result);
      // setLoading(false);
      setUploading(false)
    } catch (error) {
      setUploading(false)
      console.log(error?.message);
      Alert.alert(`${error?.message}`);
    }
  }
  useEffect(() => {
    getSubscriptionsTwo()
    getProductsTwo()
  }, [])

  const notifySuccessfulAdditionalProducts = async () => {
    const matchedSubscriptionOffer = additionalsubscription.find(offer =>
      offer.subscriptionOfferDetails?.some(detail =>
        detail.basePlanId === selectedproduct?.basePlanId
      )
    );
    const updatedMembershipsDetail = {
      // ...AdditionalPackag?.Prices,
      limits: matchedSubscriptionOffer?.productId == 'starterpackage1' ? '1 day' : matchedSubscriptionOffer?.productId == 'boostprofile1' ? '1 week' : '1 time',
      time: new Date().toISOString(),
      id: matchedSubscriptionOffer?.productId == 'starterpackage1' ? '1' : matchedSubscriptionOffer?.productId == 'boostprofile1' ? '2' : '4',
      Title: matchedSubscriptionOffer.name,
      subscriptionid: matchedSubscriptionOffer?.productId,
      basePlanId: selectedproduct?.basePlanId
    }

    if (matchedSubscriptionOffer?.productId == 'starterpackage1') {
      DownloadPdf(updatedMembershipsDetail)
    }
    // console.log(updatedMembershipsDetail, 'new');
    const useRef = await firestore().collection('Users')
      .doc(user?.uid)
    useRef.update({
      // 'userDetails.AccountType': MembershipName,
      'userDetails.AdditionalPackageId': '789',
      'userDetails.AdditionalPackageDetails': updatedMembershipsDetail,
    })
    // }
    dispatch(AdditionalPackages(updatedMembershipsDetail))
    dispatch(BuyAdditionalPackages(''))
    ToastAndroid.show(`Additional Package for ${updatedMembershipsDetail?.Title} hase been Purchased successfully`, ToastAndroid.SHORT)
    selectedproduct = null
    // console.log(matchedSubscriptionOffer, '==');
  }

  const notifySuccessfulProducts = async () => {
    // if (selectedproduct) {
    try {
      const updatedMembershipsDetail = {
        // ...AdditionalPackag?.Prices,
        limits: selectedproduct?.productId == 'starterpackage1' ? '1 day' : selectedproduct?.productId == 'boostprofile1' ? '1 day' : '1 time',
        time: new Date().toISOString(),
        id: selectedproduct?.productId == 'starterpackage1' ? '1' : selectedproduct?.productId == 'boostprofile1' ? '2' : '4',
        Title: selectedproduct.name,
        subscriptionid: selectedproduct?.productId,
        // basePlanId: selectedproduct?.basePlanId
      }
      // console.log(updatedMembershipsDetail, 'new2');
      // return
      if (selectedproduct?.productId == 'subpackage2') {
        DownloadPdf(updatedMembershipsDetail)
      }
      // return
      const useRef = await firestore().collection('Users')
        .doc(user?.uid)
      useRef.update({
        // 'userDetails.AccountType': MembershipName,
        'userDetails.AdditionalPackageId': '789',
        'userDetails.AdditionalPackageDetails': updatedMembershipsDetail,
      })
      // }
      dispatch(AdditionalPackages(updatedMembershipsDetail))
      dispatch(BuyAdditionalPackages(''))
      ToastAndroid.show(`Additional Package for ${updatedMembershipsDetail?.Title} hase been Purchased successfully`, ToastAndroid.SHORT)
      selectedproduct = null
    }
    catch (e) {
      console.log(e);
      // setUploading(false)
    }
    // }
  };
  const notifySuccessfulSubscription = async () => {
    // if (test) {
    try {
      const prices = test?.pricingPhases?.pricingPhaseList[0];
      const priceInMicros = parseFloat(prices?.priceAmountMicros); // Parse the string to a float
      const priceInCurrency = priceInMicros / 1000000;
      const priceInUSD = await convertPriceToUSD(priceInCurrency, prices?.priceCurrencyCode);

      const updatedMembershipsDetail = {
        // ...AdditionalPackag?.Prices,
        limits: prices?.billingPeriod == 'P1M' ? "1 month" : "1 year",
        time: new Date().toISOString(),
        id: '5',
        Title: flakesubscription[0]?.name,
        Price: priceInUSD,
        subscriptionid: flakesubscription[0]?.productId,
        basePlanId: test?.basePlanId
      }

      // console.log(updatedMembershipsDetail, 'new3');
      // return
      const useRef = await firestore().collection('Users')
        .doc(user?.uid)
      // {
      //   updatedMembershipsDetail?.id == 5 ?
      useRef.update({
        // 'userDetails.AccountType': MembershipName,
        'userDetails.AdditionalPackageId': '789',
        'userDetails.FlakeInsurance': updatedMembershipsDetail,
      })
      dispatch(AdditionalPackages(updatedMembershipsDetail))
      dispatch(BuyAdditionalPackages(''))
      ToastAndroid.show(`Additional Package for ${updatedMembershipsDetail?.Title} hase been Purchased successfully`, ToastAndroid.SHORT)
      test = null
    }
    catch (e) {
      console.log(e);
      // setUploading(false)
    }
    // }
  };
  const fetchExchangeRates = async () => {
    // Fetch exchange rates from the API
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      // console.log(data?.rates);
      return data.rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      return {}; // Return empty object or handle error as needed
    }
  }
  const convertPriceToUSD = async (priceAmount, currencyCode) => {
    // Fetch exchange rates
    const exchangeRates = await fetchExchangeRates()
      .then(rates => {
        // console.log(rates);
        const exchangeRate = rates[currencyCode]; // Get exchange rate for the given currency code
        const priceInUSD = priceAmount / exchangeRate;
        // console.log(priceInUSD.toFixed(2), priceAmount, exchangeRate);
        return priceInUSD.toFixed(2);
        // Now you can use the exchange rates data here
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
    return exchangeRates
    // console.log(exchangeRates);
    // Convert price to USD
  }



  const DownloadPdf = async (props) => {
    // console.log(props);
    if (props?.id == 4 || props?.id == 1) {
      // console.log(props);
      if (Platform.OS === 'ios') {
        downloadImage(props);
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission Required',
              message:
                'App needs access to your storage to download Photos',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            downloadImage(props);
          } else {
            // If permission denied then show alert
            alert('Storage Permission Not Granted');
          }
        } catch (err) {
          // To handle permission related exception
          console.warn(err);
        }
      }
    }
  }
  const downloadImage = async (item, index) => {

    if (item) {
      let date = new Date();
      let image_URL = 'https://firebasestorage.googleapis.com/v0/b/datesandhoney-50496.appspot.com/o/Content%2Fblank%20(1).pdf?alt=media&token=b12786cb-25f3-4125-8fd8-e71b4aa2a06f';
      // let ext = getExtention(image_URL);
      // ext = '.' + ext[0];
      const { config, fs } = RNFetchBlob;
      let fileDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path:
            fileDir +
            '/download_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            '.pdf',
          description: 'file download',
        },
      };
      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          console.log('The file save to :', res.path());
          alert('Pdf file downloaded successully')
        })
    }
  }
  // console.log(products);

  // const handlebuyProducts = async (props) => {
  //   const sku = props?.productId;
  //   selectedproduct = props;
  //   // notifySuccessfulPurchase()
  //   // // console.log(sku);
  //   // return
  //   try {
  //     const result = await requestPurchase({ skus: [sku] });

  //     // If purchase is successful, consume the product
  //     if (result?.purchaseState === 'PurchasedSuccessfully') {
  //       await consumePurchase({ token: result.purchaseToken });
  //       notifySuccessfulPurchase(); // Call your success function here
  //     }
  //   } catch (err) {
  //     ToastAndroid.show(`Error : ${err.message}`, ToastAndroid.SHORT)
  //     // console.warn(err.code, err.message);
  //   }
  // }

  // const handlebuySubscription = async (item) => {
  //   try {
  //     test = item
  //     // MemeberShipBysuccessfully(item)
  //     // return

  //     const offerToken = item.offerToken; // Get the offer token from the item
  //     const offerDetails = {
  //       offerToken: offerToken
  //     };
  //     const sku = flakesubscription[0]?.productId

  //     // console.log(item, flakesubscription);
  //     // notifySuccessfulSubscription()
  //     // return

  //     // Request purchase for the subscription plan with offer details
  //     const purchase = await requestSubscription({
  //       sku, // the product id
  //       ...(offerToken && {
  //         subscriptionOffers: [{ sku: sku, offerToken }],
  //       }),
  //     });

  //     // Finish the transaction after purchase
  //     await finishTransaction(purchase, true); // false for non-consumable

  //     // Notify user about successful purchase
  //     notifySuccessfulSubscription();
  //   } catch (error) {
  //     // Handle purchase error
  //     console.error("An error occurred while making purchase:", error);
  //     // Notify user about the error
  //     // notifyPurchaseError(error);
  //   }
  // }

  const handlebuyProducts = async (item) => {
    // selectedproduct = item;
    // notifySuccessfulProducts(); // Call function for successful product purchase
    // return
    try {
      const result = await requestPurchase({ skus: [item.productId] });
      // if (result?.purchaseState === 'PurchasedSuccessfully') {
      await finishTransaction({ result, isConsumable: true });
      notifySuccessfulProducts(); // Call function for successful product purchase
      // }
    } catch (err) {
      console.log(err?.message);
      // ToastAndroid.show(`${err.message}`, ToastAndroid.SHORT);
    }
  };

  const handlebuySubscription = async (main, item) => {
    try {
      const offerToken = item.offerToken; // Get the offer token from the item
      const offerDetails = {
        offerToken: offerToken
      };
      const sku = main?.productId

      const purchase = await requestSubscription({
        sku, // the product id
        ...(offerToken && {
          subscriptionOffers: [{ sku: sku, offerToken }],
        }),
      });

      // Finish the transaction after purchase
      // await finishTransaction(purchase, true); // false for non-consumable

      // Notify user about successful purchase
      if (sku == 'flakesubscription1') {
        test = item
        notifySuccessfulSubscription();
        return
      }
      if (sku == 'starterpackage1' || sku == 'boostprofile1') {
        selectedproduct = item
        notifySuccessfulAdditionalProducts();
        return
      }
      else {
        selectedproduct = item
        notifySuccessfulProducts()
        return
      }
    } catch (error) {
      console.log(error?.message);
      // ToastAndroid.show(`Playstore : ${error.message}`, ToastAndroid.SHORT);
    }
  };


  useEffect(() => {

    const purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase) => {
        const receipt = purchase.transactionReceipt;

        if (receipt) {
          try {
            // console.log(purchase?.productId, 'kjcasacshloooo');
            // return
            if (['flakesubscription1'].includes(purchase.productId)) {
              // If consumable (can be purchased again)
              await finishTransaction({ purchase, isConsumable: true });
              notifySuccessfulSubscription();
            }
            if (['starterpackage1', 'boostprofile1'].includes(purchase.productId)) {
              // If consumable (can be purchased again)
              await finishTransaction({ purchase, isConsumable: true });
              notifySuccessfulAdditionalProducts();
            }
            else {
              // If not consumable
              await finishTransaction({ purchase, isConsumable: true });
              notifySuccessfulProducts();
            }
          } catch (error) {
            console.error("An error occurred while completing transaction", error);
          }
        }
      });

    const purchaseErrorSubscription = purchaseErrorListener((error) =>
      console.error('Purchase error', error.message));

    getProductsTwo();
    getSubscriptionsTwo();

    return () => {
      purchaseUpdateSubscription.remove();
      purchaseErrorSubscription.remove();
    }


  }, []);


  // console.log(products);
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: COLORS.white
    }}>
      <StatusBar backgroundColor={COLORS.black} />

      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: COLORS.white,
          height: 60
        }}>
          <View style={{ width: '20%' }}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image source={require('../../assets/menu.png')} resizeMode='contain'
                style={{
                  height: 45,
                  color: COLORS.black
                }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '60%', alignItems: 'center', }}>
            <Text style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLORS.black
            }}>Premium Memberships!</Text>
          </View>

          <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
          </View>
        </View>
        {!uploading ?
          <ScrollView>
            {subscription?.length > 0 &&
              <>
                <View style={{
                  marginTop: 20,
                  paddingHorizontal: 20
                }}>
                  <Text style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    fontSize: 16
                  }}>Memberships</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                  {subscription?.map((item, index) => {
                    // console.log(item?.productId , user?.);
                    return (
                      <View
                        key={index}
                        style={{ marginVertical: 10 }}>
                        <View style={{
                          marginHorizontal: 10,
                          marginLeft: 10,
                          borderRadius: 20,
                          backgroundColor: COLORS.white,
                          elevation: 5,
                          width: width / 1.2,
                        }}>
                          <View style={{
                            backgroundColor: COLORS.white,
                            width: '100%',
                            borderRadius: 20,
                            elevation: 5,
                          }}>
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 20,
                              paddingVertical: 20,
                              alignItems: 'center'
                            }}>
                              <Text style={{
                                color: COLORS.black,
                                fontWeight: 'bold',
                                fontSize: 14,
                                width: '70%',
                                // backgroundColor:COLORS.black
                              }}>{item.name}</Text>
                              {/* {!item.discountPrice == '' ? (
                            <Text style={{
                              color: COLORS.black, fontSize: 12,
                              width: '30%',
                              alignItems: 'flex-end'
                            }}>{item.discountPrice} OFF {item.discountPercentage}%</Text>
                          ) : (
                            <Text style={{ color: COLORS.black, fontSize: 12, }}>${item.rate}/Month</Text>
                          )} */}
                            </View>
                            <View style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              paddingHorizontal: 20,
                            }}>
                              <View style={{
                                width: '70%',
                                // backgroundColor:COLORS.main
                              }}>
                                <Text style={{
                                  color: COLORS.black,
                                  fontSize: 12
                                }}>{item.description}</Text>
                              </View>
                              <Image source={require('../../assets/Premium.png')} resizeMode='contain'
                                style={{
                                  width: 50,
                                  height: 50
                                }} />
                            </View>
                            <View style={{
                              paddingHorizontal: 20,
                              paddingBottom: 20,
                              justifyContent: 'flex-start',
                              alignItems: 'flex-start'
                            }}>
                              <TouchableOpacity
                                onPress={() => viewMoreMembership(item, index)}
                                activeOpacity={0.8}
                                style={{
                                  paddingHorizontal: 20,
                                  paddingVertical: 10,
                                  backgroundColor: item?.productId == user?.MembershipDetails?.subscriptionid ? COLORS.green : COLORS.main,
                                  borderRadius: 10,
                                  alignItems: 'center'
                                }}>
                                <Text style={{ color: item?.productId == user?.MembershipDetails?.subscriptionid ? COLORS.white : COLORS.black, fontSize: 12 }}>{item?.productId == user?.MembershipDetails?.subscriptionid ? 'Current membership' : 'View more'}</Text>
                              </TouchableOpacity>
                            </View>
                          </View>

                          {/* <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 20,
                        borderBottomColor: COLORS.light,
                        borderBottomWidth: 1,
                        width: '100%',
                      }}>
                        <Text style={{
                          color: COLORS.black,
                          fontSize: 14,
                          fontWeight: 'bold',
                          textAlign: 'center'
                        }}>
                          What's in {item.otherCategory}
                        </Text>
                      </View>

                      <CardMoreDetails data={item?.Service1?.slice(0, 3)} /> */}
                          {/* {item.id == 123 &&
                      }
                      {item.id == 456 &&
                        <CardMoreDetails data={Gold} />
                      }
                      {item.id == 654 &&
                        <CardMoreDetails data={Diamond} />
                      } */}

                          {/* <View style={{
                        padding: 20,
                      }}>
                        {item?.MemebershipBuy ?
                          <TouchableOpacity
                            // onPress={() => ByMemeberShips(item, membershipUid)}
                            activeOpacity={0.8} style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: COLORS.green,
                              borderRadius: 10,
                              alignItems: 'center',
                            }}>
                            <Text style={{ color: COLORS.white, fontSize: 14 }}>Current Membership</Text>
                          </TouchableOpacity>
                          :
                          <TouchableOpacity
                            onPress={() => ByMemeberShips(item, membershipUid)}
                            activeOpacity={0.8} style={{
                              paddingHorizontal: 20,
                              paddingVertical: 10,
                              backgroundColor: COLORS.main,
                              borderRadius: 10,
                              alignItems: 'center'
                            }}>
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>View More</Text>
                          </TouchableOpacity>
                        }
                      </View> */}

                        </View>
                      </View>

                    )
                  })}
                </ScrollView>
              </>
            }

            {products?.length > 0 && additionalsubscription?.length > 0 && flakesubscription?.length > 0 &&
              <View>
                <View style={{
                  padding: 20,
                  // marginBottom:20,
                }}>
                  <Text style={{
                    color: COLORS.black,
                    fontWeight: 'bold',
                    fontSize: 16
                  }}>Additional Packages</Text>
                </View>
                <View style={{
                  marginBottom: 150,
                  // paddingHorizontal: 20
                }}>
                  {additionalsubscription.map((a, i) => (
                    (a.productId === 'starterpackage1') && (
                      <View
                        key={i}
                        style={{
                          paddingHorizontal: 20,
                          backgroundColor: COLORS.white,
                          paddingVertical: 20,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: COLORS.light
                        }}>
                        {a.productId == 'starterpackage1' &&
                          <View>
                            <Text style={{
                              color: COLORS.black,
                              fontSize: 14,
                              fontWeight: 'bold'
                            }}>{a?.name}</Text>
                          </View>
                        }
                        <View style={{
                          // paddingVertical: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <View style={{
                            flex: 3,
                            paddingHorizontal: 10,
                            // backgroundColor:COLORS.main
                          }}>
                            {a.productId != 'starterpackage1' &&
                              <View>
                                <Text style={{
                                  color: COLORS.black,
                                  fontSize: 14,
                                }}>{a?.name}</Text>
                              </View>
                            }
                            {/* {j.Details?.map((d, i) => ( */}
                            <Text style={{
                              fontSize: 10,
                              paddingTop: 10,
                              color: COLORS.gray
                            }}>{a?.description}</Text>
                          </View>
                          <View>
                            {a?.subscriptionOfferDetails?.map((b, i) => {

                              const monthlyPrices = b?.pricingPhases?.pricingPhaseList;
                              const weeklyPrice = monthlyPrices.find(price => price.billingPeriod === "P1W");
                              // const yearlyPrice = monthlyPrices.find(price => price.billingPeriod === "P1Y");
                              // console.log(monthlyPrices , '===');
                              return (
                                <>
                                  {/* {purchasedadditionalP?.basePlanId == k?.basePlanId ? */}
                                  <TouchableOpacity
                                    index={i}
                                    onPress={() => handlebuySubscription(a, b)}
                                    style={{
                                      flex: 3,
                                      // backgroundColor:COLORS.main,
                                      alignItems: 'flex-end',
                                      justifyContent: 'flex-end',
                                      opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                                    }}>
                                    <Text style={{
                                      color: COLORS.black,
                                      padding: 10,
                                      borderWidth: weeklyPrice ? 1 : 0,
                                      borderColor: COLORS.main,
                                      borderRadius: 10,
                                      backgroundColor: COLORS.main,
                                      fontWeight: 'bold',
                                      fontSize: 12,
                                    }}>
                                      Buy for {weeklyPrice ? `${weeklyPrice?.formattedPrice}` : null}
                                    </Text>
                                  </TouchableOpacity>
                                  {/* :
                                  <TouchableOpacity
                                    onPress={() => handleBuyProductsOrSubscription(k)}
                                    style={{
                                      flex: 3,
                                      // backgroundColor:COLORS.main,
                                      alignItems: 'flex-end',
                                      justifyContent: 'flex-end',
                                      opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                                    }}>
                                    <Text style={{
                                      color: COLORS.black,
                                      padding: 10,
                                      borderWidth: weeklyPrice ? 1 : 0,
                                      borderColor: COLORS.main,
                                      borderRadius: 10,
                                      backgroundColor: weeklyPrice ? COLORS.transparent : COLORS.main,
                                      fontWeight: 'bold',
                                      fontSize: 12,
                                    }}>
                                      Buy for {weeklyPrice ? `${weeklyPrice?.formattedPrice}` : null}
                                    </Text>
                                  </TouchableOpacity>
                                } */}
                                </>

                              )
                            })}
                          </View>

                        </View>
                      </View>)
                  ))}
                  {additionalsubscription.map((c, i) => (
                    (c.productId !== 'starterpackage1') && (
                      <View
                        key={i}
                        style={{
                          paddingHorizontal: 20,
                          backgroundColor: COLORS.white,
                          paddingVertical: 20,
                          borderTopWidth: 1,
                          borderBottomWidth: 1,
                          borderColor: COLORS.light
                        }}>
                        <View style={{
                          // paddingVertical: 10,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          {i == 0 &&
                            <View style={{
                              flex: 1,
                              // backgroundColor:COLORS.main,
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <View style={{
                                padding: 10,
                                backgroundColor: COLORS.light,
                                borderRadius: 50,
                              }}>
                                <Image source={require('../../assets/roket.png')} resizeMode='contain' style={{
                                  width: 30,
                                  height: 30,
                                }} />
                              </View>
                            </View>

                          }
                          <View style={{
                            flex: 3,
                            paddingHorizontal: 10,
                            // backgroundColor:COLORS.main
                          }}>
                            {c.productId != 'starterpackage1' &&
                              <View>
                                <Text style={{
                                  color: COLORS.black,
                                  fontSize: 14,
                                }}>{c?.name}</Text>
                              </View>
                            }
                            {/* {j.Details?.map((d, i) => ( */}
                            <Text style={{
                              fontSize: 10,
                              paddingTop: 10,
                              color: COLORS.gray
                            }}>{c?.description}</Text>
                            {/* ))} */}
                            {/* <Text style={{
                          fontSize: 12,
                          paddingTop: 5
                        }}>- Profile optimization</Text>
                        <Text style={{
                          fontSize: 12,
                          paddingTop: 5,
                        }}>- 1 boost</Text> */}
                          </View>
                          <View>
                            {c?.subscriptionOfferDetails?.map((d, i) => {

                              const monthlyPrices = d?.pricingPhases?.pricingPhaseList;
                              const weeklyPrice = monthlyPrices.find(price => price.billingPeriod === "P1W");
                              // const yearlyPrice = monthlyPrices.find(price => price.billingPeriod === "P1Y");
                              // console.log(monthlyPrices , '===');
                              return (
                                <>
                                  {/* {purchasedadditionalP?.basePlanId == k?.basePlanId ? */}
                                  <TouchableOpacity
                                    index={i}
                                    onPress={() => handlebuySubscription(c, d)}
                                    style={{
                                      flex: 3,
                                      // backgroundColor:COLORS.main,
                                      alignItems: 'flex-end',
                                      justifyContent: 'flex-end',
                                      opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                                    }}>
                                    <Text style={{
                                      color: COLORS.black,
                                      padding: 10,
                                      borderWidth: weeklyPrice ? 1 : 0,
                                      borderColor: COLORS.main,
                                      borderRadius: 10,
                                      backgroundColor: COLORS.main,
                                      fontWeight: 'bold',
                                      fontSize: 12,
                                    }}>
                                      Buy for {weeklyPrice ? `${weeklyPrice?.formattedPrice}` : null}
                                    </Text>
                                  </TouchableOpacity>
                                  {/* :
                                  <TouchableOpacity
                                    onPress={() => handleBuyProductsOrSubscription(k)}
                                    style={{
                                      flex: 3,
                                      // backgroundColor:COLORS.main,
                                      alignItems: 'flex-end',
                                      justifyContent: 'flex-end',
                                      opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                                    }}>
                                    <Text style={{
                                      color: COLORS.black,
                                      padding: 10,
                                      borderWidth: weeklyPrice ? 1 : 0,
                                      borderColor: COLORS.main,
                                      borderRadius: 10,
                                      backgroundColor: weeklyPrice ? COLORS.transparent : COLORS.main,
                                      fontWeight: 'bold',
                                      fontSize: 12,
                                    }}>
                                      Buy for {weeklyPrice ? `${weeklyPrice?.formattedPrice}` : null}
                                    </Text>
                                  </TouchableOpacity>
                                } */}
                                </>

                              )
                            })}
                          </View>

                        </View>
                      </View>)
                  ))}

                  {products.map((e, i) => (
                    <View
                      key={i}
                      style={{
                        paddingHorizontal: 20,
                        backgroundColor: COLORS.white,
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLORS.light
                      }}>
                      <View style={{
                        // paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {i == 0 &&
                          <View style={{
                            flex: 1,
                            // backgroundColor:COLORS.main,
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            <View style={{
                              padding: 10,
                              backgroundColor: COLORS.light,
                              borderRadius: 50,
                            }}>
                              <Image source={require('../../assets/ebook.png')} resizeMode='contain' style={{
                                width: 30,
                                height: 30,
                              }} />
                            </View>
                          </View>

                        }
                        <View style={{
                          flex: 3,
                          paddingHorizontal: 10,
                          // backgroundColor:COLORS.main
                        }}>
                          {e.productId != 'starterpackage' &&
                            <View>
                              <Text style={{
                                color: COLORS.black,
                                fontSize: 14,
                              }}>{e?.name}</Text>
                            </View>
                          }
                          {/* {j.Details?.map((d, i) => ( */}
                          <Text style={{
                            fontSize: 10,
                            paddingTop: 10,
                            color: COLORS.gray
                          }}>{e.description}</Text>
                          {/* ))} */}
                          {/* <Text style={{
                          fontSize: 12,
                          paddingTop: 5
                        }}>- Profile optimization</Text>
                        <Text style={{
                          fontSize: 12,
                          paddingTop: 5,
                        }}>- 1 boost</Text> */}
                        </View>
                        <TouchableOpacity
                          onPress={() => handlebuyProducts(e)}
                          style={{
                            flex: 3,
                            // backgroundColor:COLORS.main,
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                          }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderWidth: i == 4 ? 1 : 0,
                            borderColor: COLORS.main,
                            borderRadius: 10,
                            backgroundColor: i == 4 ? COLORS.transparent : COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>Buy  for {e?.price} {i == 4 ? '/yearly' : i == 3 ? '/monthly' : null}</Text>
                        </TouchableOpacity>
                        {/* <View>
                        <TouchableOpacity
                          onPress={() => user?.FlakeInsurance?.limits == '1 month' && i == 3 ?
                            Alert.alert(
                              'Flake Insurance',
                              `Are you sure you want to cancel your ${user?.FlakeInsurance?.limits} falke insurance?`,
                              [
                                {
                                  text: 'No, Keep Insurance',
                                  style: 'cancel',
                                },
                                {
                                  text: 'Yes, Cancel',
                                  onPress: () => CancleFlakeInsurance(),
                                },
                              ],
                              { cancelable: false }
                            )
                            : OnAdditionalPackage(j, j?.Price, '1 month')}
                          style={{
                            flex: 3,
                            // backgroundColor:COLORS.main,
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                          }}>
                          <Text style={{
                            color: COLORS.black,
                            padding: 10,
                            borderWidth: j.id == 5 ? 1 : 0,
                            borderColor: COLORS.main,
                            borderRadius: 10,
                            backgroundColor: j.id == 5 ? COLORS.transparent : COLORS.main,
                            fontWeight: 'bold',
                            fontSize: 12,
                          }}>Buy  for ${j?.Price}{j.id == 5 ? '/month' : null}</Text>
                        </TouchableOpacity>
                        {j.id == 5 &&
                          <TouchableOpacity
                            onPress={() => user?.FlakeInsurance?.limits == '1 year' && i == 3 ?
                              Alert.alert(
                                'Flake Insurance',
                                `Are you sure you want to cancel your ${user?.FlakeInsurance?.limits} falke insurance?`,
                                [
                                  {
                                    text: 'No, Keep Insurance',
                                    style: 'cancel',
                                  },
                                  {
                                    text: 'Yes, Cancel',
                                    onPress: () => CancleFlakeInsurance(),
                                  },
                                ],
                                { cancelable: false }
                              )
                              : OnAdditionalPackage(j, j?.PriceTwo, '1 year')}
                            style={{
                              flex: 3,
                              // backgroundColor:COLORS.main,
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                              opacity: user?.FlakeInsurance?.limits == '1 year' && i == 3 ? 0.3 : 1
                            }}>

                            <Text style={{
                              color: COLORS.black,
                              padding: 10,
                              borderRadius: 10,
                              backgroundColor: COLORS.main,
                              fontWeight: 'bold',
                              fontSize: 12,
                            }}>Buy  for ${j?.PriceTwo}{j.id == 5 ? '/year' : null}</Text>
                          </TouchableOpacity>
                        }
                      </View> */}

                      </View>
                    </View>
                  ))}

                  {flakesubscription.map((f, i) => (
                    <View
                      key={i}
                      style={{
                        paddingHorizontal: 20,
                        backgroundColor: COLORS.white,
                        paddingVertical: 20,
                        borderTopWidth: 1,
                        borderBottomWidth: 1,
                        borderColor: COLORS.light
                      }}>
                      {f.productId == 'starterpackage' &&
                        <View>
                          <Text style={{
                            color: COLORS.black,
                            fontSize: 14,
                            // fontWeight:'bold'
                          }}>{f?.name}</Text>
                        </View>
                      }
                      <View style={{
                        // paddingVertical: 10,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <View style={{
                          flex: 1,
                          // backgroundColor:COLORS.main,
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <View style={{
                            padding: 10,
                            backgroundColor: COLORS.light,
                            borderRadius: 50,
                          }}>
                            <Image source={require('../../assets/flake2.png')} resizeMode='contain' style={{
                              width: 30,
                              height: 30,
                            }} />
                          </View>
                        </View>
                        <View style={{
                          flex: 3,
                          paddingHorizontal: 10,
                          // backgroundColor:COLORS.main
                        }}>
                          {f.productId != 'starterpackage' &&
                            <View>
                              <Text style={{
                                color: COLORS.black,
                                fontSize: 14,
                              }}>{f?.name}</Text>
                            </View>
                          }
                          {/* {j.Details?.map((d, i) => ( */}
                          <Text style={{
                            fontSize: 10,
                            paddingTop: 10,
                            color: COLORS.gray
                          }}>{f.description}</Text>
                          {/* ))} */}
                          {/* <Text style={{
                          fontSize: 12,
                          paddingTop: 5
                        }}>- Profile optimization</Text>
                        <Text style={{
                          fontSize: 12,
                          paddingTop: 5,
                        }}>- 1 boost</Text> */}
                        </View>
                        <View>
                          {f?.subscriptionOfferDetails?.map((g, i) => {

                            const monthlyPrices = g?.pricingPhases?.pricingPhaseList;
                            const monthlyPrice = monthlyPrices.find(price => price.billingPeriod === "P1M");
                            const yearlyPrice = monthlyPrices.find(price => price.billingPeriod === "P1Y");

                            return (
                              <>
                                {purchasedadditionalP?.basePlanId == g?.basePlanId ?
                                  <TouchableOpacity
                                    index={i}
                                    onPress={() => handlebuySubscription(f, g)}
                                    style={{
                                      flex: 3,
                                      // backgroundColor:COLORS.main,
                                      alignItems: 'flex-end',
                                      justifyContent: 'flex-end',
                                      // opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                                    }}>
                                    <Text style={{
                                      color: COLORS.black,
                                      padding: 10,
                                      borderWidth: yearlyPrice ? 1 : 0,
                                      borderColor: COLORS.green,
                                      borderRadius: 10,
                                      backgroundColor: COLORS.green,
                                      fontWeight: 'bold',
                                      fontSize: 12,
                                    }}>
                                      Buy for {monthlyPrice ? `${monthlyPrice?.formattedPrice} (Monthly)` : null}{yearlyPrice ? `${yearlyPrice?.formattedPrice} (Yearly)` : null}
                                    </Text>
                                  </TouchableOpacity>
                                  :
                                  <TouchableOpacity
                                    index={i}
                                    onPress={() => handlebuySubscription(f, g)}
                                    style={{
                                      flex: 3,
                                      // backgroundColor:COLORS.main,
                                      alignItems: 'flex-end',
                                      justifyContent: 'flex-end',
                                      opacity: user?.FlakeInsurance?.limits == '1 month' && i == 3 ? 0.3 : 1
                                    }}>
                                    <Text style={{
                                      color: COLORS.black,
                                      padding: 10,
                                      borderWidth: yearlyPrice ? 1 : 0,
                                      borderColor: COLORS.main,
                                      borderRadius: 10,
                                      backgroundColor: yearlyPrice ? COLORS.transparent : COLORS.main,
                                      fontWeight: 'bold',
                                      fontSize: 12,
                                    }}>
                                      Buy for {monthlyPrice ? `${monthlyPrice?.formattedPrice} (Monthly)` : null}{yearlyPrice ? `${yearlyPrice?.formattedPrice} (Yearly)` : null}
                                    </Text>
                                  </TouchableOpacity>
                                }
                              </>

                            )
                          })}
                        </View>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            }
            {/* <View style={{
            marginBottom: 150,
            // paddingHorizontal: 20
          }}>

            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGRocket width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Boost your profile</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10
                  }}>boost your profile and
                    get seen 30x more</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>Buy  for $8.99</Text>
                </View>

              </View>
            </View>


            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGProfile width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Profile Optimization</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10
                  }}>Profile optimizer will suggest your profile.</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>Buy  for $28.99</Text>
                </View>
              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGDownload width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Download E-Book</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10
                  }}>3 pages e-book on how to date better.</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end'
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>Buy  for $10</Text>
                </View>

              </View>
            </View>

            <View style={{
              paddingHorizontal: 20,
              backgroundColor: COLORS.white,
              paddingVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: COLORS.light,
            }}>
              <View style={{
                flexDirection: 'row',
              }}>
                <View style={{
                  width: '25%',
                  // backgroundColor:COLORS.main,
                  // alignItems:'center',
                  justifyContent: 'center'
                }}>
                  <SVGFlake width={70} height={70} />
                </View>
                <View style={{
                  width: '40%',
                  // backgroundColor:COLORS.main
                }}>
                  <View>
                    <Text style={{
                      color: COLORS.black
                    }}>Flake Insurance</Text>
                  </View>
                  <Text style={{
                    fontSize: 12,
                    paddingTop: 10,
                  }}>Human will verify that flakes are real / no acidity flakes. If you get flaked on Or often flake you also get 10% off flake removal fee</Text>
                </View>
                <View style={{
                  width: '35%',
                  // backgroundColor:COLORS.main,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    borderWidth: 1,
                    borderColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                    marginVertical: 10,
                  }}>$24/ month</Text>
                  <Text style={{
                    color: COLORS.black,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: COLORS.main,
                    fontWeight: 'bold',
                    fontSize: 12,
                  }}>$149/ year</Text>
                </View>
              </View>
            </View>
          </View> */}
          </ScrollView>
          :
          <View style={{
            // flex:1,
            height:height,
            // alignItems:'center',
            // justifyContent:'center',
            alignSelf:'center',
          }}>
            <Image source={require('../../assets/gif/d&H5.gif')} resizeMode='contain' style={{
              width: 200,
              height: 100,
              marginTop:'60%'
            }} />
          </View>
        }
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={showSuccessPoppup?.Status}
        onRequestClose={() => {
          setShowSuccessPoppup({ ...showSuccessPoppup, Status: false });
        }}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: COLORS.gray,
          opacity: .95
          // alignItems: 'center',
        }}>
          <View style={{
            margin: 20,
            backgroundColor: COLORS.white,
            borderRadius: 20,
            padding: 25,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>
            <Image source={require('../../assets/flakeremove.png')} resizeMode='contain' style={{
              width: 50,
              height: 50
            }} />
            <Text style={{
              marginBottom: 10,
              color: COLORS.black,
              fontWeight: 'bold'
              // textAlign: 'center',
            }}>{showSuccessPoppup.Title}</Text>
            <Text style={{
              marginBottom: 10,
              textAlign: 'center',
            }}>
              {showSuccessPoppup.Detail}
            </Text>
            <TouchableOpacity
              onPress={() => OnSuccessConfirm()}
              style={{
                // borderColor: COLORS.black,
                width: '100%',
                borderRadius: 10,
                marginHorizontal: 5,
                paddingVertical: 10,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.main
              }}>
              <Text style={{
                color: COLORS.black,
              }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* <Loader modal={uploading} uploading={uploading} /> */}
    </SafeAreaView>
  )
}

export default PremiumMembershipScreen


const CardMoreDetails = ({ data }) => {
  // console.log('===> ',data);
  // return
  return (
    <View>
      {data?.map((j, i) => (
        <View key={i}>
          <View style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            paddingVertical: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <View style={{
              flexDirection: 'row',
              width: "80%"
            }}>
              {j?.image &&
                <View style={{ alignItems: 'center', justifyContent: 'center', paddingRight: 10 }}>
                  <Image source={{ uri: j?.image }} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                </View>
              }
              <View style={{ paddingRight: 30 }}>
                <Text style={{
                  fontSize: 12,
                  color: COLORS.gray
                }}>{j?.name}</Text>
              </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image source={require('../../assets/tik.png')} resizeMode='contain' />
            </View>
          </View>
        </View>
      ))}
    </View>


    //   <View style={{
    //     flexDirection: 'row',
    //     paddingHorizontal: 20,
    //     paddingVertical: 20,
    //     justifyContent: 'space-between',
    //   }}>
    //     <View style={{
    //       flexDirection: 'row',
    //     }}>
    //       <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
    //         <Image source={require('../../assets/totlikes.png')} resizeMode='contain' />
    //       </View>
    //       <View style={{ paddingRight: 10 }}>
    //         <Text>15 likes Per Day</Text>
    //       </View>
    //     </View>
    //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //       <Image source={require('../../assets/tik.png')} resizeMode='contain' />
    //     </View>
    //   </View>

    //   <View style={{
    //     flexDirection: 'row',
    //     paddingHorizontal: 20,
    //     paddingVertical: 20,
    //     justifyContent: 'space-between',
    //   }}>
    //     <View style={{
    //       flexDirection: 'row',
    //     }}>
    //       <View style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
    //         <Image source={require('../../assets/matches.png')} resizeMode='contain' />
    //       </View>
    //       <View style={{ paddingRight: 30 }}>
    //         <Text>10 Max Matches</Text>
    //       </View>
    //     </View>
    //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    //       <Image source={require('../../assets/tik.png')} resizeMode='contain' />
    //     </View>
    //   </View>
    // </View>
  )
}

const styles = StyleSheet.create({})