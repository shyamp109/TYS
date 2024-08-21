import React, {Component} from 'react';
import {SafeAreaView, View, BackHandler, Image, StyleSheet} from 'react-native';
// import { NavigationActions } from 'react-navigation'
import IconButton from '../components/icon_button';

export default class Photo extends Component {
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
    const {navigate, getParam} = this.props.navigation;
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <Image
          source={getParam('photo')}
          resizeMode="contain"
          style={style.image}
        />
        <View style={style.icon_container}>
          <IconButton onPress={this.handleBackButtonClick} icon="arrow_left" />
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: null,
    width: null,
  },
  icon_container: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
});
