import React, {Component} from 'react';
import {
  SafeAreaView,
  BackHandler,
  Dimensions,
  ScrollView,
  View,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import {connect} from 'react-redux';
import {readAbout} from '../redux/action';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {htmlStart, htmlEnd} from '../html';
import {useNavigation} from '@react-navigation/native';

class About extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      html: '',
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
    this.props.readAbout();
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
    return nextProps.about === prevState.about
      ? {}
      : {html: nextProps.about.html};
  }
  render() {
    const {navigate} = this.props.navigation;
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView>
        <ScrollView>
          <SimpleHeader onPress={this.handleBackButtonClick} title="About" />
          <View style={{paddingHorizontal: 15, minHeight: 100}}>
            <AutoHeightWebView
              style={{width: Dimensions.get('window').width - 30}}
              originWhitelist={['*']}
              source={{html: htmlStart + this.state.html + htmlEnd}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function mapStateToProps(state) {
  return {
    about: state.reducer.about,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readAbout: readAbout(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
