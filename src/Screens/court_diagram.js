import React, {Component} from 'react';
import {Text, SafeAreaView, View, BackHandler} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';

export default class CourtDiagram extends Component {
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
      <SafeAreaView>
        <SimpleHeader
          onPress={this.handleBackButtonClick}
          title="Court Diagrams"
        />
        <Text> CourtDiagram </Text>
      </SafeAreaView>
    );
  }
}
