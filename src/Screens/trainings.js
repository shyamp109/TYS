import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  ActivityIndicator,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import HomeHeader from '../components/home_header';
import Icon from '../components/icon';
import Carousel from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import {readItems} from '../redux/action';
import {baseURL} from '../api/index';
import * as icons from '../components/icons';
// import configurePushNotifications from '../push';
// import {request, PERMISSIONS} from 'react-native-permissions';
// import {Alert, Platform} from 'react-native';

// import {Notifications} from 'react-native-notifications';

class Trainings extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      items: [],
      message: 'Loading...',
      refreshing: true,
    };
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

    // Notifications.registerRemoteNotifications();

    // Notifications.events().registerRemoteNotificationsRegistered(event => {
    //   // TODO: Send the token to my server so it could send back push notifications...
    //   console.log('Device Token Received', event.deviceToken);
    //   configurePushNotifications(event.deviceToken);
    //   // Alert.alert("reg", JSON.stringify(event));
    // });

    // Notifications.events().registerNotificationReceivedForeground(
    //   (notification, completion) => {
    //     console.log(
    //       'FOREGROUND',
    //       JSON.stringify({
    //         title: notification.payload.title,
    //         body: notification.payload.body,
    //       }),
    //     );
    //     // Alert.alert("Notification");
    //     Notifications.postLocalNotification(notification.payload);
    //     completion({alert: true, sound: true, badge: false});
    //   },
    // );

    // Notifications.events().registerNotificationOpened(
    //   (notification, completion) => {
    //     // Alert.alert("Notification");
    //     console.log(`OPENED`, notification.payload);
    //     completion();
    //   },
    // );

    this.props.readItems({
      type: 'training',
    });
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.goBack();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.items === prevState.items
      ? {}
      : {items: nextProps?.items?.filter(value => value.active > 0)};
  }
  renderItem({item, index}) {
    // console.log('item: ', index, '===', item);
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        style={style.item_container}
        onPress={() =>
          this.props.navigation.navigate('Sessions', {
            training_id: item.id,
            training_name: item.name,
          })
        }>
        <ImageBackground
          resizeMode="cover"
          style={style.item_background}
          imageStyle={{borderRadius: 20}}
          source={{uri: baseURL + item.picture}}>
          <View style={style.item_overlay}>
            <View style={style.item_title_container}>
              {/* <Icon icon='basketball' /> */}
              <Image
                resizeMode="contain"
                style={{height: 30, width: 30}}
                source={item.icon ? {uri: baseURL + item.icon} : icons.ic_bas}
              />
              <Text style={style.item_title}>{item.name}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
  render() {
    const {navigate} = this.props.navigation;

    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <HomeHeader />
        {/* <Text>{JSON.stringify(this.state.items)}</Text> */}
        <View style={style.buttons_container}>
          {/* <View style={style.button_container}>
                        <TouchableOpacity activeOpacity={0.8} style={style.button} onPress={() => navigate('drill_manuals')}>
                            <Icon icon='manual' />
                        </TouchableOpacity>
                        <Text style={style.button_text}>Drill Manuals</Text>
                    </View> */}

          {/* <View style={style.button_container}>
                        <TouchableOpacity activeOpacity={0.8} style={style.button} onPress={() => navigate('photo_albums')}>
                            <Icon icon='picture' />
                        </TouchableOpacity>
                        <Text style={style.button_text}>Photo Albums</Text>
                    </View> */}

          <View style={style.button_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.button}
              onPress={() => navigate('DrillLibrary')}>
              <Icon icon="manual" focused={true} />
            </TouchableOpacity>
            <Text style={style.button_text}>Drill Library</Text>
          </View>

          <View style={style.button_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.button}
              onPress={() => navigate('About')}>
              <Icon icon="about" focused={true} />
            </TouchableOpacity>
            <Text style={style.button_text}>About</Text>
          </View>

          <View style={style.button_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.button}
              onPress={() => navigate('Help')}>
              <Icon icon="help" focused={true} />
            </TouchableOpacity>
            <Text style={style.button_text}>Help</Text>
          </View>

          <View style={style.button_container}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.button}
              onPress={() => navigate('OfflineVideos')}>
              <Icon icon="play_orange" focused={true} />
            </TouchableOpacity>
            <Text style={style.button_text}>Offline Videos</Text>
          </View>
        </View>

        <View style={{flex: 1, marginVertical: 15}}>
          {this.props.trainingsLoading ? (
            <ActivityIndicator size="large" color="#2D2927" />
          ) : this.props.trainingsMessage ? (
            <Text style={style.message}>{this.props.trainingsMessage}</Text>
          ) : (
            <Carousel
              containerCustomStyle={{...StyleSheet.absoluteFillObject}}
              ref={c => {
                this._carousel = c;
              }}
              layout="default"
              data={this.state.items}
              sliderWidth={Dimensions.get('window').width}
              itemWidth={Dimensions.get('window').width - 100}
              inactiveSlideScale={1}
              inactiveSlideOpacity={1}
              enableMomentum={true}
              hasParallaxImages={true}
              renderItem={(item, index) => this.renderItem(item, index)}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons_container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 15,
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    borderRadius: 100,
    padding: 20,
    marginBottom: 10,
  },
  button_text: {
    color: '#8f8f8f',
    fontSize: 10,
  },
  cards_container: {
    flex: 5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  item_container: {
    ...StyleSheet.absoluteFillObject,
    marginHorizontal: 10,
  },
  item_background: {
    flex: 1,
    width: null,
    height: null,
  },
  item_overlay: {
    backgroundColor: '#00000077',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    justifyContent: 'flex-end',
    padding: 20,
  },
  item_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item_title: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  message: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    items: state.reducer.trainings,
    trainingsLoading: state.reducer.trainingsLoading,
    trainingsMessage: state.reducer.trainingsMessage,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readItems: readItems(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Trainings);
