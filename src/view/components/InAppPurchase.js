import {
    getProducts,
    initConnection,
    requestSubscription,
    getSubscriptions,
  } from 'react-native-iap';
  
  export const InAppPurchasePayments = async productId => {
    await makeConnection(productId);
    let paymentMethodCall = await handlePayment(productId);
    return paymentMethodCall;
  };
  
  const makeConnection = async myProductId => {
    await initConnection();
    await getProducts({skus: [myProductId]});
    await getSubscriptions({skus: [myProductId]});
  };
  
  const handlePayment = async myProductId => {
    const subscriptions = await getSubscriptions({skus: [myProductId]});
    let desiredOfferToken;
  
    if (
      subscriptions &&
      subscriptions.length > 0 &&
      subscriptions[0]?.subscriptionOfferDetails &&
      subscriptions[0].subscriptionOfferDetails.length > 0
    ) {
      desiredOfferToken =
        subscriptions[0].subscriptionOfferDetails[0]?.offerToken || 'offerToken';
    } else {
      desiredOfferToken = 'offerToken';
    }
    let payment = await requestSubscription({
      sku: myProductId,
      ...(desiredOfferToken && {
        subscriptionOffers: [
          {
            sku: myProductId,
            offerToken: desiredOfferToken,
          },
        ],
      }),
    })
      .then(async requestSubscriptionIAP => {
        if (
          requestSubscriptionIAP &&
          (requestSubscriptionIAP[0]?.transactionReceipt ||
            requestSubscriptionIAP?.transactionReceipt)
        ) {
          return {
            detail: requestSubscriptionIAP,
            success: true,
          };
        } else {
          return {
            detail: requestSubscriptionIAP,
            success: false,
          };
        }
      })
      .catch(error => {
        return error;
      });
  
    return payment;
  };