import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const sendProposal = ({ navigation, props }) => {
    const myid = props.currentMessage.sentBy;
    const chatuserid = props.currentMessage.sentTo;
    const filter = props.currentMessage.category;
    const ProposalAddress = props.currentMessage.ProposalAddress;
    const ProposalDate = props.currentMessage.ProposalDate;
    const ProposalTime = props.currentMessage.ProposalTime;
    const ProposalStatus = props.currentMessage.ProposalStatus;
    return (
        <View style={{
            backgroundColor: COLORS.white,
            // elevation:3,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 15,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            // height: 170,
            // width: 250,
            // width: 300,
            // height: 150,
            padding: 20,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: COLORS.black,
                        paddingRight: 50
                    }}>Dating Porposal</Text>
                </View>
                <View>
                    <Text style={{
                        fontSize: 12,
                    }}>6 days remaining</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        paddingRight: 5
                    }}>
                        <Image source={require('../../assets/events.png')} resizeMode="contain" style={{
                            width: 15,
                            height: 15,
                        }} />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 12,
                        }}>{ProposalDate}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        paddingRight: 5
                    }}>
                        <Image source={require('../../assets/clock.png')} resizeMode="contain" style={{
                            width: 15,
                            height: 15,
                        }} />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 12,
                        }}>{ProposalTime}</Text>
                    </View>
                </View>

            </View>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: 10
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{
                        paddingRight: 5
                    }}>
                        <Image source={require('../../assets/map.png')} resizeMode="contain" style={{
                            width: 15,
                            height: 15,
                        }} />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 12,
                        }}>{ProposalAddress}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                activeOpacity={0.8}
                style={{
                    backgroundColor: COLORS.black,
                    marginTop: 20,
                    borderRadius: 10,
                    padding: 10,
                    alignItems: 'center',
                }}>
                <Text style={{
                    color: COLORS.white
                }}>Withdraw purposal</Text>
            </TouchableOpacity>
        </View>
    )
}

export default sendProposal

const styles = StyleSheet.create({})