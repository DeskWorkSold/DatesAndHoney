import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useDispatch } from 'react-redux';
import { login } from '../../../../redux/reducers/Reducers';



const EducationData = [
  {
    id: '1',
    name: 'Very I like to stay with my partner 24/7 even go to work together if possible',
  },
  {
    id: '2',
    name: 'I am not clingy at all',
  }
]



const MediatorQuestionClingyScreen = ({ navigation, route }) => {
  const { RelationshipLookingType, Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, OpenTo, DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, DateOfBirth, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  // console.log(image1);
  // console.log(Nature,PartnerNature);

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [transferred, setTransferred] = useState(0);
  const [checked, setChecked] = React.useState(null); //initial choice
  const [clingy, setclingy] = useState(null);
  const CurrentUser = auth().currentUser.uid;
  // const [image, setImage] = useState(image1);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();



  const AddToRedux = (Data) => {
    // console.log('Redux data', Data);
    dispatch(login(Data))
  }

  const onCongratsScreen = async () => {
    if (clingy) {
      // console.log(clingy);
      // return
      navigation.navigate('MediatorLoginWithEmail', { clingy: clingy, RelationshipLookingType: RelationshipLookingType, Cuddling: Cuddling, InLife: InLife, InBed: InBed, MovieType: MovieType, NextLongestRelationship: NextLongestRelationship, LongestRelationship: LongestRelationship, OpenTo: OpenTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, DateOfBirth: DateOfBirth, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else {
      ToastAndroid.show("Please select relationships!", ToastAndroid.SHORT);
    }
  }

  const uploadImage = async () => {
    if (image1 == null) {
      return null;
    }
    const uploadUri = image1;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    // setUploading(true);
    // setTransferred(0);

    const storageRef = storage().ref(`Users/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      // setUploading(false);
      // setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  const SelectedClingy = (index) => {
    setSelectedCategoryIndex(index)
    setclingy(EducationData[selectedCategoryIndex].name)
  }



  const ListEducation = ({ data, value, setValue, cancle }) => {
    return (
      <View>
        {data.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => SelectedClingy(index)}>
            <View style={{
              backgroundColor: value == index ? COLORS.main : COLORS.transparent,
              ...styles.NumberInput
            }}>
              <View style={{ width: '90%' }}>
                <Text style={{ color: COLORS.black }}>
                  {TypeTestimonial.name}
                </Text>
              </View>
              <View style={{
                alignItems: 'flex-end'
              }}>
                {value == index ? (
                  <Image source={require('../../../assets/tik.png')} resizeMode='contain' style={{
                    width: 20,
                    height: 20
                  }} />
                ) : (<View></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </View>
    )
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>


        <View style={styles.contentContainer}>

          <View style={{
            alignItems: 'center',
            paddingTop: 10,
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <Image source={require('../../../assets/notify.png')} resizeMode='contain'
              style={{
                width: 15,
                height: 15,
              }} />
            <Text style={{
              color: COLORS.black,
              marginLeft: 5
            }}>Response is Not Public</Text>
          </View>


          <View style={{
            paddingTop: 30,
            alignItems: 'center',
            paddingHorizontal: 60,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>Are you Clingy?
            </Text>
          </View>

          <View>
            <ListEducation data={EducationData} value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} cancle={require('../../../assets/cross.png')} />
          </View>

          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: COLORS.black }}> Other </Text>
              <View style={styles.NumberInput2}>
                <TextInput
                  value={clingy}
                  placeholder={'Write here'}
                  onChangeText={clingy => setclingy(clingy)
                  }
                  style={styles.TextInput}
                />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 30, marginTop: 20 }}>
            <Text style={{ color: COLORS.green }}>Attention!</Text>
            <View style={{ paddingTop: 10, paddingRight: 50 }}>
              <Text>Being clingy is not a Bad thing it's
                preference Some couples Love it
                Some hate it. we Only use it for
                Preference in concierge service
                responses are Not public!</Text>
            </View>
          </View>

        </View>

        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '10%'
        }}>
          <View style={{ marginHorizontal: 5 }}>
            {!uploading == true ? (
              <CustomeButton onpress={() => onCongratsScreen()}
                title={'Continue'} />
            ) : (
              <View style={{
                backgroundColor: COLORS.main,
                width: 329,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ActivityIndicator size="small" color={COLORS.white} animating={uploading} />
              </View>
            )}
          </View>

          <View style={{
            paddingTop: 5,
            width: 310,
          }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              By continue you agree our Terms and Privacy Policy.
            </Text>
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}


export default MediatorQuestionClingyScreen

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '90%'
  },
  footer: {
    alignItems: 'center'
  },
  NumberInput: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    height: 50,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  NumberInput2: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 50,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})