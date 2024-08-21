import React, {Component} from 'react';
import {BackHandler, StyleSheet, Platform} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import Video from 'react-native-video';
// import WebView from 'react-native-webview';
// import Orientation from 'react-native-orientation';

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      message: '',
      loading: false,
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
        // Orientation.unlockAllOrientations();
      },
    );
    this.focusSubscription = this.props.navigation.addListener(
      'willBlur',
      payload => {
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick,
        );
        // Orientation.lockToPortrait();
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
    // const {navigate, getParam} = this.props.navigation;
    return (
      <React.Fragment>
        <Video
          controls={true}
          resizeMode="contain"
          style={style.player}
          source={{uri: encodeURI(this.props.route.params.video)}}
          onEnd={this.handleBackButtonClick}
          onError={e =>
            console.log(
              'video error',
              e,
              encodeURI(this.props.route.params.video),
            )
          }
        />
        {/* {Platform.OS === 'ios' ?
                    <Video
                        controls={true}
                        resizeMode='contain'
                        style={style.player}
                        source={{ uri: getParam('video') }}
                        onEnd={this.handleBackButtonClick}
                    />
                    :
                    <WebView
                        style={style.player}
                        source={{ uri: getParam('video') }}
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                    />
                } */}
      </React.Fragment>
    );
  }
}

const style = StyleSheet.create({
  player: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
  },
});
