// import React, {Component} from 'react';
// import {BackHandler, StyleSheet, Platform} from 'react-native';
// // import {NavigationActions} from 'react-navigation';
// import Video from 'react-native-video';
// // import WebView from 'react-native-webview';
// // import Orientation from 'react-native-orientation';

// export default class VideoScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     this.state = {
//       message: '',
//       loading: false,
//     };
//   }
//   componentDidMount() {
//     this.focusSubscription = this.props.navigation.addListener(
//       'willFocus',
//       payload => {
//         this.backHandler = BackHandler.addEventListener(
//           'hardwareBackPress',
//           this.handleBackButtonClick,
//         );
//         // Orientation.unlockAllOrientations();
//       },
//     );
//     this.focusSubscription = this.props.navigation.addListener(
//       'willBlur',
//       payload => {
//         this.backHandler = BackHandler.addEventListener(
//           'hardwareBackPress',
//           this.handleBackButtonClick,
//         );
//         // Orientation.lockToPortrait();
//       },
//     );
//   }
//   handleBackButtonClick = () => {
//     // const backAction = NavigationActions.goBack();
//     // this.props.navigation.dispatch(backAction);
//     // return true;
//     const backAction = this.props.navigation.goBack();
//     this.props.navigation.dispatch(backAction);
//     return true;
//   };
//   render() {
//     // const {navigate, getParam} = this.props.navigation;
//     return (
//       <React.Fragment>
//         <Video
//           controls={true}
//           resizeMode="contain"
//           style={style.player}
//           source={{uri: encodeURI(this.props.route.params.video)}}
//           onEnd={this.handleBackButtonClick}
//           onError={e =>
//             console.log(
//               'video error',
//               e,
//               encodeURI(this.props.route.params.video),
//             )
//           }
//         />
//         {/* {Platform.OS === 'ios' ?
//                     <Video
//                         controls={true}
//                         resizeMode='contain'
//                         style={style.player}
//                         source={{ uri: getParam('video') }}
//                         onEnd={this.handleBackButtonClick}
//                     />
//                     :
//                     <WebView
//                         style={style.player}
//                         source={{ uri: getParam('video') }}
//                         javaScriptEnabled={true}
//                         domStorageEnabled={true}
//                     />
//                 } */}
//       </React.Fragment>
//     );
//   }
// }

// const style = StyleSheet.create({
//   player: {
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: '#000',
//   },
// });
import React, {Component} from 'react';
import {
  BackHandler,
  StyleSheet,
  Platform,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import Video from 'react-native-video';
import SimpleHeader from '../components/simple_header';

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      loading: true, // Initially set loading to true
      error: false, // State to track video loading errors
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
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };

  // Set loading to true when the video starts loading
  handleLoadStart = () => {
    this.setState({loading: true, error: false});
  };

  // Set loading to false when the video is ready to play
  handleOnLoad = () => {
    this.setState({loading: false});
  };

  // Set loading to false when buffering is completed
  handleBuffer = ({isBuffering}) => {
    this.setState({loading: isBuffering});
  };

  // Handle video load errors
  handleError = () => {
    this.setState({loading: false, error: true});
  };

  render() {
    console.log(
      'this.props.route.params.video: ',
      this.props.route.params.video,
    );
    return (
      <>
        <SimpleHeader onPress={this.handleBackButtonClick} title="Video" />
        <React.Fragment>
          <View style={style.playerContainer}>
            {this.state.loading && !this.state.error && (
              <ActivityIndicator
                style={style.loader}
                size="large"
                color="#2D2927"
              />
            )}
            {this.state.error && (
              <Text style={style.errorMessage}>
                Video is currently unavailable
              </Text>
            )}
            {!this.state.error && this?.props?.route?.params?.video && (
              <Video
                controls={true}
                resizeMode="contain"
                style={style.player}
                source={{uri: encodeURI(this.props.route.params.video)}}
                onEnd={this.handleBackButtonClick}
                onLoadStart={this.handleLoadStart} // Video started loading
                onLoad={this.handleOnLoad} // Video is ready to play
                onBuffer={this.handleBuffer} // Video is buffering
                onError={this.handleError}
                bufferConfig={{
                  minBufferMs: 1000,
                  maxBufferMs: 5000, // Max buffer 5 seconds
                  bufferForPlaybackMs: 200, // Start playing after 0.2 seconds of buffer
                  bufferForPlaybackAfterRebufferMs: 500, // After rebuffer, buffer for 0.5 seconds
                }}
              />
            )}
          </View>
        </React.Fragment>
      </>
    );
  }
}

const style = StyleSheet.create({
  playerContainer: {
    position: 'absolute',
    top: '8%',
    bottom: 0,
    left: 0,
    right: 0,
    height: '92%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  player: {
    height: '100%',
    width: '100%',
  },
  loader: {
    position: 'absolute',
    zIndex: 1, // Ensure the loader is on top of the video
  },
  errorMessage: {
    color: 'gray', // Red color for error message
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
