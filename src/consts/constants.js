import { Platform } from "react-native"
const subscriptionSkus = Platform.select({
    android: [
        'diamondsubscriptionmonthly1', 'goldsubscription1', 'silversubscription1', 'diamondsubscriptionunlimited', 'flakesubscription1', 'starterpackage1', 'boostprofile1'
    ]
})
const productSkus = Platform.select({
    android: [
        'subpackage2'
    ]
})
export const constants = {
    productSkus,
    subscriptionSkus
};