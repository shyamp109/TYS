import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  BackHandler,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Easing,
  Animated,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.spinValue = new Animated.Value(0);
    this.scaleValue = new Animated.Value(0);
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
    this.spin();
    this.scale();
    this.load();
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.goBack();
    // this.props.navigation.dispatch(backAction);
  };
  spin() {
    this.spinValue.setValue(0);
    Animated.timing(this.spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => this.spin());
  }
  scale() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.scaleValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(this.scaleValue, {
          toValue: 0.002,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }
  load = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      setTimeout(() => {
        Animated.timing(this.scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => this.props.navigation.navigate('Main'));
      }, 1000);
    } else {
      setTimeout(() => {
        Animated.timing(this.scaleValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => this.props.navigation.navigate('Login'));
      }, 1000);
    }
  };
  render() {
    // const {navigate} = this.props.navigation;
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const scale = this.scaleValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 100],
    });
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView
        style={style.container}
        // onLayout={this.load}
      >
        <ImageBackground
          resizeMode="cover"
          source={require('../assets/splash.png')}
          style={style.background}>
          <View style={style.overlay}>
            <Image
              style={style.logo}
              resizeMode="contain"
              source={require('../assets/mainLogo.png')}
            />

            <Animated.View
              style={{transform: [{rotate: spin}, {scale: scale}]}}>
              <View>
                <View style={style.rotate_1}>
                  <View style={style.rotate_2} />
                </View>
              </View>
            </Animated.View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  overlay: {
    backgroundColor: '#00000099',
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingTop: Dimensions.get('window').width / 2,
  },
  logo: {
    width: Dimensions.get('window').width / 2,
    tintColor: 'white',
  },
  rotate_1: {
    backgroundColor: 'transparent',
    height: 50,
    width: 50,
    borderRadius: 25,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#fff',
    borderBottomColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rotate_2: {
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  text: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    opacity: 0.75,
    marginHorizontal: Dimensions.get('window').width / 10,
  },
  text1: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 12,
    opacity: 0.75,
    marginHorizontal: Dimensions.get('window').width / 10,
  },
});
