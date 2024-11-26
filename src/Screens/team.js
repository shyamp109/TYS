// import React, {Component} from 'react';
// import {
//   Text,
//   View,
//   SafeAreaView,
//   BackHandler,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   RefreshControl,
//   ActivityIndicator,
//   Dimensions,
// } from 'react-native';
// // import {NavigationActions} from 'react-navigation';
// import SimpleHeader from '../components/simple_header';
// import Icon from '../components/icon';
// import {readTeamNews} from '../redux/action';
// import {connect} from 'react-redux';
// import {baseURL} from '../api';
// import TimeAgo from 'react-native-timeago';
// import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// class Team extends Component {
//   constructor(props) {
//     super(props);
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     this.state = {
//       teamNews: [],
//       refreshing: false,
//       activeRow: '',
//     };
//   }
//   async componentDidMount() {
//     this.focusSubscription = this.props.navigation.addListener(
//       'willFocus',
//       payload => {
//         this.backHandler = BackHandler.addEventListener(
//           'hardwareBackPress',
//           this.handleBackButtonClick,
//         );
//       },
//     );
//     this.props.readTeamNews();
//   }
//   handleBackButtonClick = () => {
//     // const backAction = NavigationActions.back();
//     // this.props.navigation.dispatch(backAction);
//     // return true;
//     const backAction = this.props.navigation.goBack();
//     this.props.navigation.dispatch(backAction);
//     return true;
//   };
//   static getDerivedStateFromProps(nextProps, prevState) {
//     return nextProps.teamNews === prevState.teamNews
//       ? {}
//       : {teamNews: nextProps.teamNews};
//   }
//   _onRefresh = () => {
//     this.setState({
//       teamNews: [],
//       refreshing: true,
//     });
//     this.props.readTeamNews();
//     this.setState({
//       refreshing: false,
//     });
//   };
//   deleteItem = async (id, index) => {
//     let newTeamNews = this.state.teamNews;
//     newTeamNews.splice(index, 1);
//     this.setState({
//       teamNews: newTeamNews,
//     });
//     const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
//     const existing = JSON.parse(await AsyncStorage.getItem('news' + userId));
//     existing.splice(index, 1);
//     AsyncStorage.setItem('news' + userId, JSON.stringify(existing));
//   };
//   renderItem = (data, index) => {
//     const item = data.item;
//     return (
//       <SwipeRow
//         recalculateHiddenLayout
//         disableRightSwipe
//         disableLeftSwipe
//         rightOpenValue={-100}
//         closeOnRowPress>
//         <TouchableOpacity
//           onPress={() => this.deleteItem(item.id, index)}
//           style={style.swipe_container}>
//           <View style={style.swipe_button}>
//             <Icon icon="delete" />
//           </View>
//         </TouchableOpacity>
//         <View style={style.item_container}>
//           <View style={style.item_header}>
//             <View style={style.image_container}>
//               <Image
//                 style={style.image}
//                 source={{uri: baseURL + item.user.profile_picture}}
//                 resizeMode="cover"
//               />
//             </View>
//             <View style={style.title_container}>
//               <View style={style.title}>
//                 <Text style={style.orange}>
//                   {item.user &&
//                     item.user.first_name + ' ' + item.user.last_name}
//                 </Text>
//               </View>
//               <View style={style.time}>
//                 <Icon size={16} icon="clock" />
//                 <Text style={style.time_text}>
//                   <TimeAgo time={item.created_at} />
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <Text style={style.description}>{item.message}</Text>
//           {item.url && item.file_type === '1' && (
//             <TouchableOpacity
//               style={{
//                 borderRadius: 10,
//                 height: 100,
//                 width: Dimensions.get('window').width - 40,
//                 marginTop: 10,
//                 marginLeft: -20,
//                 marginRight: -20,
//                 marginBottom: -20,
//               }}
//               onPress={() =>
//                 this.props.navigation.navigate('photo', {
//                   photo: {uri: baseURL + item.url},
//                 })
//               }>
//               <Image
//                 resizeMode="cover"
//                 style={{
//                   ...StyleSheet.absoluteFillObject,
//                   height: null,
//                   width: null,
//                   borderRadius: 10,
//                 }}
//                 source={{uri: baseURL + item.url}}
//               />
//             </TouchableOpacity>
//           )}
//           {item.url && item.file_type === '2' && (
//             <TouchableOpacity
//               style={{
//                 borderRadius: 10,
//                 height: 50,
//                 width: Dimensions.get('window').width - 40,
//                 marginTop: 10,
//                 marginLeft: -20,
//                 marginRight: -20,
//                 marginBottom: -20,
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 backgroundColor: '#2D2927',
//               }}
//               onPress={() =>
//                 this.props.navigation.navigate('video', {
//                   video: baseURL + item.url,
//                 })
//               }>
//               <Icon icon="play" size={20} />
//             </TouchableOpacity>
//           )}
//         </View>
//       </SwipeRow>
//     );
//   };
//   render() {
//     const {navigate} = this.props.navigation;
//     console.log('this.state.teamNews', this.state.teamNews);
//     //navigate('ScreenName') - forward
//     //this.handleBackButtonClick - back
//     return (
//       <SafeAreaView style={style.container}>
//         <SimpleHeader onPress={this.handleBackButtonClick} title="Team" />
//         {this.props.teamNewsLoading && (
//           <ActivityIndicator
//             style={{marginTop: 50}}
//             size="large"
//             color="#2D2927"
//           />
//         )}
//         {this.props.teamNewsMessage !== '' && (
//           <Text style={style.message}>{this.props.teamNewsMessage}</Text>
//         )}
//         {!this.state.teamNews.length && (
//           <View>
//             <Text
//               style={{
//                 color: '#2D2927',
//                 textAlign: 'center',
//                 fontWeight: 700,
//                 fontSize: 16,
//                 marginTop: 20,
//               }}>
//               No Teams Found
//             </Text>
//           </View>
//         )}
//         {/* <FlatList
//                   data={this.state.teamNews}
//                   renderItem={({ item, index }) => this.renderItem(item, index)}
//                   keyExtractor={(item, index) => JSON.stringify(index)}
//                   refreshControl={
//                       <RefreshControl
//                           refreshing={this.state.refreshing}
//                           onRefresh={this._onRefresh}
//                           colors={['#2D2927']}
//                       />
//                   }
//               /> */}

//         <SwipeListView
//           closeOnRowOpen
//           closeOnRowPress
//           keyExtractor={(item, index) => JSON.stringify(index)}
//           data={this.state.teamNews}
//           renderItem={(data, rowMap) => this.renderItem(data, rowMap)}
//           refreshControl={
//             <RefreshControl
//               refreshing={this.state.refreshing}
//               onRefresh={this._onRefresh}
//               colors={['#2D2927']}
//             />
//           }
//         />
//       </SafeAreaView>
//     );
//   }
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   item_container: {
//     backgroundColor: '#fff',
//     shadowOffset: {width: 0, height: 0},
//     shadowColor: 'black',
//     shadowRadius: 20,
//     shadowOpacity: 0.4,
//     elevation: 20,
//     marginHorizontal: 20,
//     marginTop: 10,
//     marginBottom: 20,
//     borderRadius: 10,
//     padding: 20,
//   },
//   item_header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   image_container: {
//     height: 50,
//     width: 50,
//     borderRadius: 50,
//   },
//   image: {
//     ...StyleSheet.absoluteFillObject,
//     height: null,
//     width: null,
//     borderRadius: 50,
//   },
//   title_container: {
//     justifyContent: 'space-evenly',
//     marginHorizontal: 20,
//   },
//   title: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     flexWrap: 'wrap',
//   },
//   orange: {
//     color: '#2D2927',
//     fontWeight: 'bold',
//   },
//   time: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   time_text: {
//     color: '#8f8f8f',
//     marginLeft: 10,
//   },
//   description: {
//     marginTop: 10,
//     fontSize: 12,
//   },
//   media_button: {
//     backgroundColor: '#fff',
//     position: 'absolute',
//     bottom: 0,
//     right: 0,
//     padding: 5,
//     borderRadius: 50,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   message: {
//     marginTop: 20,
//     fontSize: 12,
//     color: '#999',
//     textAlign: 'center',
//     paddingBottom: 10,
//   },
//   swipe_container: {
//     marginRight: 40,
//     height: '100%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     backgroundColor: 'transparent',
//   },
//   swipe_button: {
//     padding: 10,
//     borderRadius: 50,
//     backgroundColor: '#fff',
//     shadowOffset: {width: 0, height: 0},
//     shadowColor: 'black',
//     shadowRadius: 20,
//     shadowOpacity: 0.4,
//     elevation: 20,
//   },
// });

// function mapStateToProps(state) {
//   return {
//     teamNews: state.reducer.teamNews,
//     teamNewsLoading: state.reducer.teamNewsLoading,
//     teamNewsMessage: state.reducer.teamNewsMessage,
//   };
// }

// function mapDispatchToProps(dispatch, payload) {
//   return {
//     readTeamNews: readTeamNews(dispatch, payload),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Team);

import React, {Component} from 'react';
import {Text, SafeAreaView, View, BackHandler, ScrollView} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';

export default class Team extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick,
        );
      },
    );
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.goBack();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  render() {
    const {navigate} = this.props.navigation;
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={{flex: 1}}>
        <SimpleHeader onPress={this.handleBackButtonClick} title="News" />
        <ScrollView
          style={{marginHorizontal: 10, marginVertical: 10}}
          showsVerticalScrollIndicator={false}>
          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 800,
            }}>
            How to Gain & Retain Volunteer Coaches for your Rec Sports League
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            It can be a challenge to recruit and retain great volunteer coaches
            for rec sports leagues. These volunteer coaches are often parents or
            active community members and have many other responsibilities
            pulling at their time and attention. Another challenge that may
            prevent one from volunteering is that they perhaps don’t feel
            confident in their knowledge of the sport or ability to coach a
            team.
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            A 2018 Sports & Fitness Industry Association (SFIA) survey found
            that fewer than 4 in 10 youth coaches believe they are knowledgeable
            in any of the following areas: sports skills and tactics, effective
            motivational technique, or safety needs. These coaches have the
            heart for community involvement, safe and universal access to sports
            teams, and childhood skill development, but they may lack the
            technical know-how to make those a reality — or simply don’t feel
            confident in their ability to do so
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            This is one of the reasons we felt compelled to create TYS. We hate
            seeing great mentors lack the confidence and training knowledge
            necessary to be a great sports coach.
          </Text>

          <Text
            style={{
              fontSize: 24,
              color: 'black',
              fontWeight: 800,
              marginTop: 15,
            }}>
            Below are 3 of our top ways to recruit and retain great volunteer
            coaches for your league:
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            Provide coaches with the resources to properly evaluate and draft
            players. Having proven and unbiased ways to evaluate and draft
            players helps coaches set up a team for the highest level of success
            (and fun) for every athlete.
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            Be committed to ongoing coaches education on how to properly run
            practices and drills — afterall, there is no need to be a basketball
            expert to be an expert coach! In the same way that you want your
            young athletes to be given the proper skills and teaching to be
            successful, coaches need that, too. When a coach feels confident
            that they have the training and tools to be successful, the team
            will be successful too. Our TYS mobile app is a great resource for
            volunteer coaches, making it effortless to create practice plans and
            guide young athletes.
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            Provide coaches with resources they can share with their players for
            skill work at home. Many teams practice just once per week, and
            that’s just not enough time to learn all of the fundamentals.
            Working on their skills on a regular basis off the court or field
            will take them even further in their game — and take the pressure
            off of your volunteer coaches to fit it all in during their limited
            practice sessions each week.
          </Text>
          <Text
            style={{
              marginVertical: 10,
              fontSize: 14,
              color: '#2D2927',
              fontWeight: 500,
            }}>
            If you are struggling with finding and keeping great coaches, TYS
            can help! Our in-depth, user-friendly programs give coaches the
            confidence, knowledge, and organization they need to succeed. Learn
            more about our resources for coaches and leagues here.{' '}
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
