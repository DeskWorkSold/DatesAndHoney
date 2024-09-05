import { TouchableOpacity, SafeAreaView, Image, StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import COLORS from '../../consts/Colors'

const PrivacyPolicy = ({ navigation }) => {
    return (
        <SafeAreaView>
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
                        }}>Privacy Policy</Text>
                    </View>

                    <View style={{ width: '20%', alignItems: 'flex-end', paddingHorizontal: 20 }}>
                    </View>
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                Dates and Honey Privacy Policy
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                Thank you for using Dates and Honey, the ultimate app for dating, event management, ticket purchases, memberships, and additional packages, along with chatting features. At Dates and Honey, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect your information. By using our app, you agree to the practices described in this policy.                        </Text>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                1. Information We Collect
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                1.1. Personal Information:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We may collect personal information, including but not limited to your name, email address, phone number, date of birth, gender, and profile picture when you create an account or update your profile.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                1.2. Location Information:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                With your consent, we may collect location data to provide you with location-based services such as event recommendations and potential matches.                        </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                1.3. User-Generated Content:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We collect and store the content you post, including messages, photos, and videos, to facilitate communication within the app.                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                1.4. Payment Information:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                When you make purchases through the app, we may collect payment information, such as credit card numbers or other payment methods.                             </Text>
                        </View>

                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                1.5. Usage Information:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We collect data on how you use our app, including log data, device information, and your interactions with other users.
                            </Text>
                        </View>

                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                2. How We Use Your Information
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                2.1. Providing Services:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We use your personal information to provide you with our dating, event management, ticket purchase, membership, and additional package services. This includes matching you with potential dates, suggesting events, processing payments, and enabling communication.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                2.2. Improving Services:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We analyze your usage data to improve our app's functionality, enhance user experience, and develop new features.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                2.3. Communication:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We may send you notifications, updates, and promotional messages related to our services, which you can opt-out of at any time.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                2.4. Security:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We use your information to protect the security of our app and users, detect and prevent fraud, and ensure compliance with our Terms of Service. </Text>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                3. Information Sharing
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                3.1. With Other Users:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                Certain information, such as your name, profile picture, and user-generated content, may be visible to other users of the app. Please exercise caution when sharing personal information.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                3.2. Service Providers:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We may share your information with trusted third-party service providers to help us deliver and improve our services, including payment processors and analytics services.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                3.3. Legal Compliance:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We may disclose your information to comply with legal obligations or enforce our policies.
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                4. Your Choices
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                4.1. Access and Correction:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                You can access and edit your personal information in your account settings.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                4.2. Communication Preferences:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                You can opt-out of promotional messages in your settings.
                            </Text>
                        </View>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 12,
                                fontWeight: 'bold'
                            }}>
                                4.3. Data Deletion:
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                You can request the deletion of your account and associated data by contacting us.
                            </Text>
                        </View>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                5. Security
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We take security seriously and employ reasonable measures to protect your information from unauthorized access, disclosure, or alteration. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                6. Children's Privacy
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                Our app is not intended for children under the age of 18. We do not knowingly collect or maintain information from individuals under 18 years of age.
                            </Text>
                        </View>
                    </View>

                    <View style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                7. Changes to this Privacy Policy
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                We may update this Privacy Policy from time to time to reflect changes in our practices. We will notify you of any significant changes through the app or by other means.
                            </Text>
                        </View>
                    </View>


                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 20,
                    }}>
                        <View style={{
                            paddingVertical: 10
                        }}>
                            <Text style={{
                                color: COLORS.black,
                                fontSize: 16,
                                fontWeight: 'bold'
                            }}>
                                8. Contact Us
                            </Text>
                        </View>
                        <View>
                            <Text style={{
                                fontSize: 12,
                                color: COLORS.gray
                            }}>
                                If you have questions or concerns about this Privacy Policy or your personal information, please contact us at <Text style={{color:COLORS.blue}}>datesandhoney0123@gmail.com</Text>.
                                By using Dates and Honey, you acknowledge that you have read and understood this Privacy Policy and agree to the collection and use of your information as described herein.
                            </Text>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default PrivacyPolicy

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: '100%'
    }
})
