import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  BackHandler,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';

export default class PhotoAlbums extends Component {
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
      <SafeAreaView style={style.container}>
        <SimpleHeader
          onPress={this.handleBackButtonClick}
          title="Photo Albums"
        />
        {/* <ScrollView>
                    <View style={style.album_container}>
                        {
                            album.map((photo, i) =>
                                <TouchableOpacity activeOpacity={0.8} style={style.photo_container} onPress={() => navigate('photo', { photo: photo })}>
                                    <Image
                                        resizeMode='cover'
                                        style={style.photo}
                                        source={photo}
                                    />
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </ScrollView> */}
        <View
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#999',
              fontSize: 18,
            }}>
            Coming soon...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  album_container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  photo_container: {
    width: Dimensions.get('window').width / 4 - 2,
    height: Dimensions.get('window').width / 4 - 2,
    margin: 1,
  },
  photo: {
    ...StyleSheet.absoluteFillObject,
    height: null,
    width: null,
  },
});
