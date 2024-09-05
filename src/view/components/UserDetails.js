import { Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react';
import HeaderTabOne from './HeaderTabOne';
import COLORS from '../../consts/Colors';
import { useEffect } from 'react';
import { getPreciseDistance } from 'geolib';
import { selectMediatorUser, selectUser } from '../../../redux/reducers/Reducers';
import { useSelector } from 'react-redux';
import Geocoder from 'react-native-geocoding';
import SVGImg1 from '../../assets/image.svg';
import SVGStatus from '../../assets/Status.svg';
import NonSmoker from '../../assets/NonSmoker.svg';
import Drinker from '../../assets/Drinker.svg';
import Kids from '../../assets/Kids.svg';
import Pets from '../../assets/Pets.svg';
import Orientation from '../../assets/Orientation.svg';
import Language from '../../assets/Language.svg';
import Height from '../../assets/Height.svg';
import Personality from '../../assets/Personality.svg';
import Education from '../../assets/Education.svg';
import Religion from '../../assets/Religion.svg';
import PoliticalViews from '../../assets/PoliticalViews.svg';
import YourBodyType from '../../assets/YourBodyType.svg';
import Music from '../../assets/Music.svg';
import FavoriteFood from '../../assets/FavoriteFood.svg';
import Exercise from '../../assets/Exercise.svg';
import Ethnicity from '../../assets/Ethnicity.svg';
import Cuddle from '../../assets/Cuddle.svg';
import Clingy from '../../assets/Clingy.svg';
import HairColour from '../../assets/HairColour.svg';
import EyeColour from '../../assets/EyeColour.svg';
import Builttype from '../../assets/Builttype.svg';
import Notes from '../../assets/notes.svg';
import Matchnotes from '../../assets/matchnotes.svg';
import Gallery from '../../assets/gallery.svg';
import Match from '../../assets/match.svg';
import Bio from '../../assets/bio.svg';
import Location from '../../assets/location.svg';
import Info from '../../assets/info.svg';
const { width, height } = Dimensions.get("window");

const UserDetails = ({ onpress, type, data, setData, modal, setModal }) => {
    const mediatoruser = useSelector(selectMediatorUser);
    const [address, setAddress] = useState(null);
    const [userData, setUserData] = useState(data);
    const Address = Geocoder.from(data?.Location.latitude, data?.Location.longitude)
        .then(json => {
            var addressComponent = json.results[0].address_components[0];
            // console.log('address', addressComponent);
            setAddress(addressComponent)
            // console.log(test);
            // const updated = {
            //     ...test,
            //     Address: addressComponent,
            // };
            // console.log(updated);
            // setModalData(updated);
            // return json.results[0].address_components[0];
        })
    // console.log(Address);
    // console.log(Address.results[0].address_components[0].long_name);
    // console.log(data.image1);
    // return;

    const requestDetail = () => {
        setModal(false)
        setData(null)
        // setDistance(null)
    }
    const fetchdata = () => {
        // console.log(
        //     user2?.Location?.latitude, user2?.Location?.longitude,
        // );
        if (userData) {
            // setUserData(updated)
            // console.log(Updatedata);
            // setModalData(updated);
        }
    };

    // const distance123 = getPreciseDistance(
    //     { latitude: user2?.Location?.latitude, longitude: user2?.Location?.longitude, },
    //     { latitude: data?.Location.latitude, longitude: data?.Location.longitude }
    // ) * 0.000621;


    useEffect(() => {
        fetchdata()
    }, [])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
                setModal(!modal);
            }}
        >
            <View style={{
                height: height,
                backgroundColor: COLORS.white,
            }}>

                <View style={{
                    height: height / 15,
                    backgroundColor: COLORS.white,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                }}>
                    <TouchableOpacity
                        onPress={() => requestDetail()}
                        style={{
                            flex: 1,
                            // alignItems:'center',
                        }}>
                        <Image source={require('../../assets/arrowleft.png')} resizeMode='contain'
                            style={{
                                width: 21,
                                height: 20,
                                tintColor: COLORS.black
                            }} />
                    </TouchableOpacity>
                    <View style={{
                        flex: 3,
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: COLORS.black
                        }}>{type ? type : null}</Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'center'
                    }}>
                        {/* <Text>{type? type : null}</Text> */}
                    </View>
                </View>

                <View style={{
                    marginHorizontal: 10,
                    alignItems: 'center',
                }}>
                    <View style={{
                        // marginTop: 0, 
                        // paddingHorizontal: 20, 
                        // backgroundColor: COLORS.white 
                        width: '100%',
                        marginBottom: 20,
                        backgroundColor: COLORS.white,
                        elevation: 5,
                        borderRadius: 25,
                        // paddingHorizontal: 10,
                        paddingBottom: 20,
                        marginTop: 10,
                        borderWidth: 5,
                        borderColor: COLORS.white,
                        marginBottom: 50
                    }}>
                        <ScrollView vertical showsVerticalScrollIndicator={false}>
                            <View style={{
                                borderRadius: 20,
                            }}>
                                <View style={{
                                    // paddingTop: 10,
                                    // marginTop:10
                                    borderRadius: 20,
                                }}>
                                    <Image source={{ uri: data?.image1 }} resizeMode='cover'
                                        style={{
                                            height: 400,
                                            width: '100%',
                                            borderRadius: 20,
                                            // paddingHorizontal: 10
                                        }}
                                    />
                                    {/* <TouchableOpacity
                                        onPress={() => setModal(!modal)}
                                        style={{
                                            position: 'absolute',
                                            margin: 20
                                        }}>
                                        <Image source={require('../../assets/arrowleft.png')} resizeMode='contain' style={{
                                            tintColor: COLORS.black,
                                            width: 25,
                                            height: 25,
                                        }} />
                                    </TouchableOpacity> */}
                                </View>
                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 5,
                                        paddingTop: 10
                                    }}>
                                        <Image source={require('../../assets/dot.png')} resizeMode='contain'
                                            style={{
                                                width: 5,
                                                height: 5,
                                                marginRight: 5
                                            }} />
                                        <Text style={{
                                            fontSize: 26, fontWeight: 'bold',
                                            color: COLORS.black,
                                            marginRight: 5,
                                        }}>{data?.Name &&
                                            data?.Name?.charAt(0).toUpperCase() + data?.Name.slice(1)
                                            }</Text>
                                        <Text style={{
                                            fontSize: 20,
                                            color: COLORS.black,
                                            marginRight: 5
                                        }}>25</Text>
                                        <Image source={require('../../assets/conform.png')} resizeMode='contain'
                                            style={{
                                                width: 25,
                                                height: 25,
                                            }} />
                                    </View>
                                </View>


                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 5,
                                        justifyContent: 'space-between'
                                    }}>
                                        <Text style={{
                                            color: COLORS.black,
                                            marginRight: 5
                                        }}>Model at Instagaram</Text>
                                        <Text style={{
                                            color: COLORS.black,
                                            marginRight: 5,
                                            backgroundColor: COLORS.main,
                                            padding: 3,
                                            fontWeightL: 800,
                                            paddingHorizontal: 8,
                                            borderRadius: 5,
                                            fontSize: 12,
                                        }}>{data?.Location ? (getPreciseDistance(
                                            { latitude: mediatoruser?.userDetails?.Location?.latitude, longitude: mediatoruser?.userDetails?.Location?.longitude, },
                                            { latitude: data?.Location.latitude, longitude: data?.Location.longitude }
                                        ) * 0.000621).toFixed(2) : 'no'} Miles Away</Text>
                                    </View>
                                </View>

                                <View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingHorizontal: 50,
                                        // justifyContent: 'space-between',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 10
                                    }}>
                                        <View style={{
                                            padding: 15,
                                            borderRadius: 30,
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            marginRight: 10,
                                        }}>
                                            <TouchableOpacity onPress={() => requestDetail()}>
                                                <Image source={require('../../assets/cancle.png')} resizeMode='contain'
                                                    style={{
                                                        width: 15,
                                                        height: 15
                                                    }} />
                                            </TouchableOpacity>
                                        </View>

                                        {type == 'Client Details' &&
                                            <View style={{
                                                padding: 15,
                                                borderRadius: 50,
                                                backgroundColor: COLORS.white,
                                                elevation: 5,
                                                // marginRight: 10,
                                            }}>
                                                <TouchableOpacity onPress={() => requestDetail()}>
                                                    <Match width={35} height={35} />
                                                </TouchableOpacity>
                                            </View>
                                        }

                                        <View style={{
                                            padding: 15,
                                            borderRadius: 30,
                                            backgroundColor: COLORS.white,
                                            elevation: 5,
                                            marginLeft: 10,

                                        }}>
                                            <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>

                                                <Image source={require('../../assets/message.png')} resizeMode='contain'
                                                    style={{
                                                        width: 20,
                                                        height: 20
                                                    }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <View style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                        <Bio width={30} height={30} />
                                        <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>Bio</Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        width: '100%',
                                    }}>
                                        <View style={{ width: '85%' }}>
                                            <Text style={{ paddingVertical: 10, }}>
                                                {data?.Bio ? data?.Bio : 'Bio not found'}
                                            </Text>
                                        </View>
                                        <TouchableOpacity style={{ width: '25%' }}>
                                            <Image source={require('../../assets/hello.png')} resizeMode='contain' style={{
                                                width: 38,
                                                height: 38
                                            }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingBottom: 10,
                                        }}>
                                            <Location width={30} height={30} />
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                {address ? address?.long_name : 'Address not found'}
                                            </Text>
                                        </View>
                                        {/* <View>
                      <Image source={require('../../assets/hello.png')} resizeMode='contain' />
                    </View> */}
                                    </View>
                                    <View>
                                        <Image source={{ uri: data?.image1 }} resizeMode='cover' style={{
                                            width: '100%',
                                            height: 250,
                                            borderRadius: 20,
                                        }} />
                                        {/* <TouchableOpacity style={{
                      paddingHorizontal: 20,
                      alignItems: 'flex-end',
                      marginTop: -65,
                      flex: 1
                    }}>
                      <Image source={require('../../assets/like2.png')} resizeMode='contain' />
                    </TouchableOpacity> */}
                                    </View>
                                </View>

                                <View>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <Info width={30} height={30} />
                                        <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                            {data?.Name}'s info
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        marginHorizontal: 20,
                                        alignItems: 'center',
                                    }}>
                                        <TouchableOpacity style={{
                                            // width: '40%',
                                            paddingRight: 10,
                                            marginRight: 5,
                                            marginBottom: 10,
                                            // height: 40,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: COLORS.light,
                                            borderRadius: 30,
                                            // marginRight: 5,
                                            paddingHorizontal: 10,
                                            paddingVertical: 5,
                                        }}>
                                            <View style={{ paddingRight: 5 }}>
                                                <SVGStatus width={30} height={30} />
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 12, color: COLORS.black }}>Single</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {data?.Education &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5, }}>
                                                    <Education width={30} height={30} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12, color: COLORS.black }}>{data?.Education}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        {data?.Hieght &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5 }}>
                                                    <Height width={30} height={30} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>Height, {data.Hieght}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        {data?.Gender &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5, }}>
                                                    <Orientation width={30} height={30} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{data?.Gender}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        <TouchableOpacity style={{
                                            paddingHorizontal: 10,
                                            marginRight: 5,
                                            paddingVertical: 5,
                                            // height: 40,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            backgroundColor: COLORS.light,
                                            borderRadius: 30,
                                            marginBottom: 10,
                                        }}>
                                            <View style={{ paddingRight: 5 }}>
                                                <Language width={30} height={30} />
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 12 }}>English</Text>
                                            </View>
                                        </TouchableOpacity>
                                        {data?.Drink &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5 }}>
                                                    <Drinker width={30} height={30} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{data?.Drink}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        {data?.Kids &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5 }}>
                                                    <Kids width={30} height={30} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{data?.Kids}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        {data?.Nature &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5, }}>
                                                    <Personality width={30} height={30} />

                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{data?.Nature}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                        {data?.Smoke &&
                                            <TouchableOpacity style={{
                                                paddingHorizontal: 10,
                                                marginRight: 5,
                                                paddingVertical: 5,
                                                // height: 40,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                backgroundColor: COLORS.light,
                                                borderRadius: 30,
                                                marginBottom: 10,
                                            }}>
                                                <View style={{ paddingRight: 5, }}>
                                                    <NonSmoker width={30} height={30} />
                                                </View>
                                                <View>
                                                    <Text style={{ fontSize: 12 }}>{data?.Smoke}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        }
                                    </View>
                                </View>

                                <View>
                                    <View style={{
                                        paddingHorizontal: 10,
                                        paddingVertical: 20,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between'
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Gallery width={30} height={30} />
                                            <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                Gallery
                                            </Text>
                                        </View>
                                    </View>

                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                        <View style={{
                                            flexDirection: 'row',
                                            paddingHorizontal: 10,
                                        }}>
                                            <Image source={{ uri: data?.image1 }} resizeMode='cover' style={{
                                                width: 250,
                                                height: 150,
                                                borderRadius: 20,
                                                marginRight: 10,
                                            }} />
                                            <Image source={{ uri: data?.image1 }} resizeMode='cover' style={{
                                                width: 250,
                                                height: 150,
                                                borderRadius: 20,
                                                marginRight: 10,
                                            }} />
                                        </View>
                                    </ScrollView>
                                </View>

                                {data?.Interest &&

                                    <View>
                                        <View style={{
                                            paddingHorizontal: 10,
                                            paddingVertical: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                                <Text style={{ paddingHorizontal: 10, fontSize: 18, fontWeight: 'bold' }}>
                                                    I’m Interested in..
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            marginHorizontal: 20,
                                            alignItems: 'center',
                                        }}>
                                            {data?.Interest.map((item, index) => (
                                                <TouchableOpacity key={index} style={{
                                                    paddingHorizontal: 10,
                                                    marginRight: 5,
                                                    paddingVertical: 10,
                                                    // height: 40,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    backgroundColor: COLORS.light,
                                                    borderRadius: 30,
                                                    marginBottom: 10,
                                                }}>
                                                    <View>
                                                        <Text style={{ fontSize: 12, color: COLORS.black, fontWeight: 'bold' }}>#{item}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    </View>
                                }

                                <View style={{
                                    paddingHorizontal: 10,
                                    paddingVertical: 20,
                                }}>
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            Verification
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginVertical: 10,
                                        // marginBottom: 80
                                    }}>
                                        <View style={{
                                            padding: 8,
                                            backgroundColor: COLORS.main,
                                            borderRadius: 30,
                                        }}>
                                            <Image source={require('../../assets/modal/tick.png')} resizeMode='contain' style={{
                                                width: 10,
                                                height: 10,
                                                tintColor: COLORS.black
                                            }} />
                                        </View>
                                        <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                            {data?.Name}’s photo-verified
                                        </Text>
                                    </View>

                                    {type == 'Request Details' ?
                                        <View style={{
                                            paddingTop: 20,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginBottom: 80,
                                            justifyContent: 'space-between',
                                            paddingHorizontal: 20,
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => requestDetail()}
                                                style={{
                                                    width: '48%',
                                                    // height:'45%',
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.gray,
                                                }}>
                                                <Text style={{ color: COLORS.gray }}>Decline</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => onpress()}
                                                style={{
                                                    width: '48%',
                                                    // height:'45%',
                                                    paddingVertical: 10,
                                                    alignItems: 'center',
                                                    borderRadius: 10,
                                                    borderWidth: 1,
                                                    borderColor: COLORS.main,
                                                    backgroundColor: COLORS.main
                                                }}>
                                                <Text style={{ color: COLORS.black }}>Accept</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View>
                                            <View style={{
                                                // paddingHorizontal: 10,
                                                paddingVertical: 20,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Matchnotes width={30} height={30} />
                                                    <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                        Match maker notes
                                                    </Text>
                                                </View>
                                            </View>
                                            <View>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                                    After 1st decline
                                                </Text>
                                                <Text>
                                                    Lorem ipsum dolor sit amet ConnectEDU. Diam id facilities elementum torpor Eros matrices pianissimo port. Cursus Guam a curator poster. A upstate used Luis argue pellentesque Nisei an argue. Ames curator nigh interim sit vitae. Phaedra sit cursus addendum Masada get.
                                                    Ames Ohio phallus cursus id quit argue. Clique Phaedra menus solicitude advising pianissimo rectus est upstate. Fermentum Mathis denim a.
                                                </Text>
                                            </View>
                                            <View style={{ paddingTop: 20 }}>
                                                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                                                    After 2st decline
                                                </Text>
                                                <Text>
                                                    Lorem ipsum dolor sit amet ConnectEDU. Diam id facilities elementum torpor Eros matrices pianissimo port. Cursus Guam a curator poster. A upstate used Luis argue pellentesque Nisei an argue. Ames curator nigh interim sit vitae. Phaedra sit cursus addendum Masada get.
                                                    Ames Ohio phallus cursus id quit argue. Clique Phaedra menus solicitude advising pianissimo rectus est upstate. Fermentum Mathis denim a.
                                                </Text>
                                            </View>
                                            <View style={{
                                                // paddingHorizontal: 10,
                                                paddingTop: 20,
                                                paddingBottom: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'space-between'
                                            }}>
                                                <View style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                }}>
                                                    <Notes width={30} height={30} />
                                                    <Text style={{ paddingHorizontal: 10, fontSize: 18, color: COLORS.black, fontWeight: 'bold' }}>
                                                        Notes
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text>
                                                    Lorem ipsum dolor sit amet ConnectEDU. Diam id facilities elementum torpor Eros matrices pianissimo port. Cursus Guam a curator poster. A upstate used Luis argue pellentesque Nisei an argue. Ames curator nigh interim sit vitae. Phaedra sit cursus addendum Masada get.
                                                    Ames Ohio phallus cursus id quit argue. Clique Phaedra menus solicitude advising pianissimo rectus est upstate. Fermentum Mathis denim a.
                                                </Text>
                                            </View>

                                        </View>
                                    }

                                </View>

                            </View>
                        </ScrollView>

                    </View>
                </View>

            </View>
        </Modal>
    )
}

export default UserDetails

const styles = StyleSheet.create({})