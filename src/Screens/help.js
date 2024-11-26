import React, {Component} from 'react';
import {
  SafeAreaView,
  BackHandler,
  Dimensions,
  ScrollView,
  View,
  Text,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import {connect} from 'react-redux';
import {readHelp} from '../redux/action';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {htmlStart, htmlEnd} from '../html';

class Help extends Component {
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
    this.props.readHelp();
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
    return nextProps.help === prevState.help ? {} : {html: nextProps.help.html};
  }
  render() {
    const {navigate} = this.props.navigation;
    //navigate('ScreenName') - forward
    console.log('this.state.html', this.state.html);
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView>
        <ScrollView>
          <SimpleHeader onPress={this.handleBackButtonClick} title="Help" />
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
    help: state.reducer.help,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readHelp: readHelp(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);
