import { Image, SafeAreaView, StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import COLORS from '../../../consts/Colors'
import CustomeButton from '../../components/CustomeButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { mediatorLogin } from '../../../../redux/reducers/Reducers';
import { useDispatch } from 'react-redux';


const RelationshipTypes = [
  {
    id: '1',
    name: 'Event Vendor - POS for booths',
  },
  {
    id: '2',
    name: 'Event Coordinator',
  },
]



const MediatorQuestionRequestAcess = ({ navigation, route }) => {
  const { RelationshipStatus, email, clingy, RelationshipLookingType, Cuddling, InLife, InBed, MovieType, NextLongestRelationship, LongestRelationship, OpenTo, DealBreaker, DealMakers, Firstrefname, FirstRefemail, FirstRefnumber, Secrefname, SecRefemail, SecRefnumber, PartnerBuildType, BuildType, PartnerMaxHeight, PartnerMinHeight, Height, PartnerDisability, Disability, DescribePartner, DescribeYou, PartnerEthnicity, Ethnicity, PartnerExercise, ExerciseStatus, Exercise, FavFood, PartnerDiet, Diet, ParentReligion, religionType, foodtype, KosherType, Relagion, RelationshipType, Education, Interest, CompanyName, PositioninCompany, CompanyType, name, image1, image2, image3, image4, image5, Date, Gender, PartnerGender, Kids, Bio, Experince, Music, PoliticalView, PoliticalPartnerView, Nature, PartnerNature, Lookingfor, Smoke, Vape, Marijauna, Drugs, Drink, InstaUsername } = route.params;
  // console.log(RelationshipStatus);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [uploading, setUploading] = useState(0);
  const [transferred, setTransferred] = useState(0);
  const CurrentUser = auth().currentUser.uid;
  const dispatch = useDispatch();
  // console.log(Education);

  const onReligionScreen = async () => {
    const selectitem = RelationshipTypes[selectedCategoryIndex].name;
    const category = 'Mediator'
    if (selectitem == 'Event Vendor - POS for booths') {
      // console.log(selectitem);
      // return;
      try {
        // setUploading(true)
        const imageUrl = await uploadImage();
        var Data = new Object();
        Data.Category = category;
        Data.RequestAccessType = selectitem;
        Data.PanelAccess = false;
        Data.Event = 1;
        Data.POSFood = 1;
        Data.email = email;
        Data.RelationshipStatus = RelationshipStatus;
        Data.Clingy = clingy;
        Data.Interest = Interest;
        Data.Cuddling = Cuddling;
        Data.InLife = InLife;
        Data.InBed = InBed;
        Data.MovieType = MovieType;
        Data.NextLongestRelationship = NextLongestRelationship;
        Data.LongestRelationship = LongestRelationship;
        Data.OpenTo = OpenTo;
        Data.DealBreaker = DealBreaker;
        Data.DealMakers = DealMakers;
        Data.Firstrefname = Firstrefname;
        Data.FirstRefemail = FirstRefemail;
        Data.FirstRefnumber = FirstRefnumber;
        Data.Secrefname = Secrefname;
        Data.SecRefemail = SecRefemail;
        Data.SecRefnumber = SecRefnumber;
        Data.PartnerBuildType = PartnerBuildType;
        Data.BuildType = BuildType;
        Data.PartnerMaxHeight = PartnerMaxHeight;
        Data.PartnerMinHeight = PartnerMinHeight;
        Data.Height = Height;
        Data.PartnerDisability = PartnerDisability;
        Data.Disability = Disability;
        Data.DescribePartner = DescribePartner;
        Data.DescribeYou = DescribeYou;
        Data.Education = Education;
        Data.RelationshipType = RelationshipType;
        Data.Relagion = Relagion;
        Data.KosherType = KosherType;
        Data.foodtype = foodtype;
        Data.religionType = religionType;
        Data.relationshipLookingType = RelationshipLookingType;
        Data.ParentReligion = ParentReligion;
        Data.Diet = Diet;
        Data.PartnerDiet = PartnerDiet;
        Data.FavFood = FavFood;
        Data.Exercise = Exercise;
        Data.ExerciseStatus = ExerciseStatus;
        Data.PartnerExercise = PartnerExercise;
        Data.Ethnicity = Ethnicity;
        Data.PartnerEthnicity = PartnerEthnicity;
        Data.Name = name;
        Data.InstaUsername = InstaUsername;
        Data.Drink = Drink;
        Data.Drugs = Drugs;
        Data.Marijauna = Marijauna;
        Data.Vape = Vape;
        Data.Smoke = Smoke;
        Data.Lookingfor = Lookingfor;
        Data.Nature = Nature;
        Data.PartnerNature = PartnerNature;
        Data.PoliticalPartnerView = PoliticalPartnerView;
        Data.PoliticalView = PoliticalView;
        Data.Music = Music;
        Data.Experince = Experince;
        Data.Bio = Bio;
        Data.Kids = Kids;
        Data.PartnerGender = PartnerGender;
        Data.Gender = Gender;
        Data.Dates = Date;
        Data.image5 = image5;
        Data.image4 = image4;
        Data.image3 = image3;
        Data.image2 = image2;
        Data.image1 = imageUrl;
        Data.CompanyType = CompanyType;
        Data.PositioninCompany = PositioninCompany;
        Data.CompanyName = CompanyName;
        Data.uid = CurrentUser
        // console.log('test data: ', Data);
        // dispatch(mediatorLogin(Data))
        // return;
        // console.log(CurrentUser);
        firestore()
          .collection('Users').doc(CurrentUser).set({
            userDetails: Data
          }).then(() => {
            // redux
            dispatch(mediatorLogin(Data))
            ToastAndroid.show('Welcome to Honey and Dates Mediator Panel', ToastAndroid.SHORT)
            // navigation.navigate('QuestionCongratulationScreen')
          })
        // setImage(null)
        setUploading(false)
      } catch (error) {
        console.log('error test1', error);
      }
      // navigation.navigate('MediatorApprovalScreen', { RequestAccessType: selectitem, RelationshipStatus: RelationshipStatus, email: email, clingy: clingy, RelationshipLookingType: RelationshipLookingType, Cuddling: Cuddling, InLife: InLife, InBed: InBed, MovieType: MovieType, NextLongestRelationship: NextLongestRelationship, LongestRelationship: LongestRelationship, OpenTo: OpenTo, DealBreaker: DealBreaker, DealMakers: DealMakers, Firstrefname: Firstrefname, FirstRefemail: FirstRefemail, FirstRefnumber: FirstRefnumber, Secrefname: Secrefname, SecRefemail: SecRefemail, SecRefnumber: SecRefnumber, PartnerBuildType: PartnerBuildType, BuildType: BuildType, PartnerMaxHeight: PartnerMaxHeight, PartnerMinHeight: PartnerMinHeight, Height: Height, PartnerDisability: PartnerDisability, Disability: Disability, DescribePartner: DescribePartner, DescribeYou: DescribeYou, PartnerEthnicity: PartnerEthnicity, Ethnicity: Ethnicity, PartnerExercise: PartnerExercise, ExerciseStatus: ExerciseStatus, Exercise: Exercise, FavFood: FavFood, PartnerDiet: PartnerDiet, Diet: Diet, ParentReligion: ParentReligion, religionType: religionType, foodtype: foodtype, KosherType: KosherType, Relagion: Relagion, RelationshipType: RelationshipType, Education: Education, Interest: Interest, CompanyName: CompanyName, PositioninCompany: PositioninCompany, CompanyType: CompanyType, InstaUsername: InstaUsername, Drink: Drink, Drugs: Drugs, Marijauna: Marijauna, Vape: Vape, Smoke: Smoke, Lookingfor: Lookingfor, PartnerNature: PartnerNature, Nature: Nature, PoliticalPartnerView: PoliticalPartnerView, PoliticalView: PoliticalView, Music: Music, Experince: Experince, Bio: Bio, name: name, image1: image1, image2: image2, image3: image3, image4: image4, image5: image5, Date: Date, Gender: Gender, PartnerGender: PartnerGender, Kids: Kids })
    }
    else if (selectitem == 'Event Coordinator') {
      try {
        // setUploading(false)
        // const imageUrl = await uploadImage();
        var Data = new Object();
        Data.RequestAccess = selectitem;
        Data.PanelAccess = false;
        Data.Event = 1;
        Data.POSFood = 0;
        Data.email = email;
        Data.RelationshipStatus = RelationshipStatus;
        Data.Clingy = clingy;
        Data.Interest = Interest;
        Data.Cuddling = Cuddling;
        Data.InLife = InLife;
        Data.InBed = InBed;
        Data.MovieType = MovieType;
        Data.NextLongestRelationship = NextLongestRelationship;
        Data.LongestRelationship = LongestRelationship;
        Data.OpenTo = OpenTo;
        Data.DealBreaker = DealBreaker;
        Data.DealMakers = DealMakers;
        Data.Firstrefname = Firstrefname;
        Data.FirstRefemail = FirstRefemail;
        Data.FirstRefnumber = FirstRefnumber;
        Data.Secrefname = Secrefname;
        Data.SecRefemail = SecRefemail;
        Data.SecRefnumber = SecRefnumber;
        Data.PartnerBuildType = PartnerBuildType;
        Data.BuildType = BuildType;
        Data.PartnerMaxHeight = PartnerMaxHeight;
        Data.PartnerMinHeight = PartnerMinHeight;
        Data.Hieght = Height;
        Data.PartnerDisability = PartnerDisability;
        Data.Disability = Disability;
        Data.DescribePartner = DescribePartner;
        Data.DescribeYou = DescribeYou;
        Data.Education = Education;
        Data.RelationshipType = RelationshipType;
        Data.Relagion = Relagion;
        Data.KosherType = KosherType;
        Data.foodtype = foodtype;
        Data.religionType = religionType;
        Data.relationshipLookingType = RelationshipLookingType;
        Data.ParentReligion = ParentReligion;
        Data.Diet = Diet;
        Data.PartnerDiet = PartnerDiet;
        Data.FavFood = FavFood;
        Data.Exercise = Exercise;
        Data.ExerciseStatus = ExerciseStatus;
        Data.PartnerExercise = PartnerExercise;
        Data.Ethnicity = Ethnicity;
        Data.PartnerEthnicity = PartnerEthnicity;
        Data.Name = name;
        Data.InstaUsername = InstaUsername;
        Data.Drink = Drink;
        Data.Drugs = Drugs;
        Data.Marijauna = Marijauna;
        Data.Vape = Vape;
        Data.Smoke = Smoke;
        Data.Lookingfor = Lookingfor;
        Data.Nature = Nature;
        Data.PartnerNature = PartnerNature;
        Data.PoliticalPartnerView = PoliticalPartnerView;
        Data.PoliticalView = PoliticalView;
        Data.Music = Music;
        Data.Experince = Experince;
        Data.Bio = Bio;
        Data.Kids = Kids;
        Data.PartnerGender = PartnerGender;
        Data.Gender = Gender;
        Data.Dates = Date;
        Data.image5 = image5;
        Data.image4 = image4;
        Data.image3 = image3;
        Data.image2 = image2;
        Data.image1 = 'imageUrl';
        Data.CompanyType = CompanyType;
        Data.PositioninCompany = PositioninCompany;
        Data.CompanyName = CompanyName;
        Data.uid = CurrentUser
        // dispatch(mediatorLogin(Data))
        console.log('test data: ', Data);
        return;
        // console.log(CurrentUser);
        firestore()
          .collection('Users').doc(CurrentUser).set({
            userDetails: Data
          }).then(() => {
            // redux
            ToastAndroid.show('Welcome to Honey and Dates', ToastAndroid.SHORT)
            navigation.navigate('QuestionCongratulationScreen')
          })
        // setImage(null)
        setUploading(false)
      } catch (error) {
        console.log('error test2', error);
      }
    }
    else {
      ToastAndroid.show("Please select your interest!", ToastAndroid.SHORT);
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
    filename = name + '.' + extension;

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
  // const AddToRedux = (Data) => {
  //   // console.log('Redux data', Data);
  // }

  const ListRelationShips = ({ value, setValue }) => {
    return (
      <View>
        {RelationshipTypes.map((TypeTestimonial, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.8}
            onPress={() => setValue(index)}>
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
      <StatusBar backgroundColor={COLORS.black} />
      <View style={styles.container}>


        <View style={styles.contentContainer}>


          <View style={{
            paddingTop: 40,
            alignItems: 'center',
            paddingHorizontal: 50,
          }}>
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.black,
              textAlign: 'center'
            }}>What type of relationship you are looking for?</Text>
          </View>
          <View style={{
            alignItems: 'center',
            paddingTop: 10
          }}>
            <Text style={{
              color: COLORS.black
            }}>Select all that apply</Text>
          </View>
          <View>
            <ListRelationShips value={selectedCategoryIndex}
              setValue={setSelectedCategoryIndex} />
          </View>


        </View>


        <View style={{
          alignItems: 'center',
          paddingBottom: 5,
          height: '15%'
        }}>
          {!uploading == true ? (
            <CustomeButton onpress={() => onReligionScreen()}
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


export default MediatorQuestionRequestAcess

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    alignItems: 'center',
    height: '85%',
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
    height: 45,
    width: 340,
    backgroundColor: COLORS.light,
    borderRadius: 5,
  },
  TextInput: {
    padding: 0,
    backgroundColor: COLORS.transparent,
  },
})