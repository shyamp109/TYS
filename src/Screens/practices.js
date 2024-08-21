import React, {Component} from 'react';
import {
  Linking,
  SafeAreaView,
  Text,
  View,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  ImageBackground,
  Switch,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import PracticesHeader from '../components/practices_header';
import Icon from '../components/icon';
import {connect} from 'react-redux';
import {readItems} from '../redux/action';
import {baseURL} from '../api';
// import Video from 'react-native-video';

const header_min_height = Dimensions.get('window').height / 6;
const header_max_height = Dimensions.get('window').height / 3;

class Practices extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.scrollYAnimatedValue = new Animated.Value(0);
    this.state = {
      items: [],
      refreshing: false,
      switch: false,
      showVideo: '',
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
    Linking.addEventListener('url', this._handleOpenURL);
    this.props.readItems({
      type: 'practice',
      training_id: this.props.route.params.training_id,
      session_id: this.props.route.params.session_id,
      subsession_id: this.props.route.params.subsession_id,
    });
  }
  componentDidUpdate(prevProps) {
    this.linkListener = Linking.addEventListener('url', this._handleOpenURL);
    if (
      prevProps.route.params.training_id !==
        this.props.route.params.training_id ||
      prevProps.route.params.session_id !==
        this.props.route.params.session_id ||
      prevProps.route.params.subsession_id !==
        this.props.route.params.subsession_id
    ) {
      this.props.readItems({
        type: 'practice',
        training_id: this.props.route.params.training_id,
        session_id: this.props.route.params.session_id,
        subsession_id: this.props.route.params.subsession_id,
      });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.items === prevState.items ? {} : {items: nextProps.items};
  }
  componentWillUnmount() {
    // Linking.removeEventListener('url', this._handleOpenURL);
    if (this.linkListener) {
      this.linkListener.remove();
    }
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.goBack();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  _handleOpenURL = () => {
    let drillManual = this.props.route.params.drill_manual;
    // console.log(drillManual)
    Linking.openURL(baseURL + drillManual);
  };

  backToSession = () => {
    // this.props.navigation.navigate('Sessions', {
    //   training_id: this.props.route.params.training_id,
    //   training_name: this.props.route.params.training_name,
    // });
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  renderPlayButton = video => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={style.play_container}
        onPress={() => {
          // Linking.openURL(video);
          this.props.navigation.navigate('Video', {
            // video: baseURL + video,
            video: video,
          });
        }}>
        <Icon icon="play" />
      </TouchableOpacity>
    );
  };
  renderProgress = () => {
    return (
      <View style={style.progress_container}>
        <Text style={style.progress_text}>Session progress</Text>
        <View style={style.progress_bar}>
          <View style={[style.progress, {width: '50%'}]} />
        </View>
        <Text style={style.progress_text}>Offline</Text>
        <Switch
          value={this.state.switch}
          onValueChange={value => this.setState({switch: value})}
        />
      </View>
    );
  };
  renderButtons = () => {
    let a = {
      drill_manual: '/storage/drill_manual/36.pdf',
      session_id: 24,
      subsession_id: 36,
      subsession_name: 'Dynamic Flex',
      subsession_picture: '/storage/media_gallery/pictures/1.jpeg',
      training_id: 94,
      training_name: 'Elementary School Program Design (Grades 1-5)',
    };
    return (
      <View style={style.buttons_container}>
        <TouchableOpacity style={style.button} onPress={this.backToSession}>
          <Text style={style.button_text}>Back to Session</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.props.route.params.drill_manual &&
            this.props.route.params.drill_manual !== 'null'
              ? style.button_disabled
              : style.button_disabled
          }
          disabled={this.props.route.params.drill_manual && true}
          onPress={this._handleOpenURL}>
          <Text style={style.button_text}>Drill Manuals</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            this.props.route.params.court_diagram
              ? style.button
              : style.button_disabled
          }
          disabled={this.props.route.params.court_diagram ? false : true}
          onPress={() => this.props.navigation.navigate('CourtDiagram')}>
          <Text style={style.button_text}>Court Diagram</Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderItem = (item, index) => {
    return (
      <View>
        {index === 0 && (
          <View>
            {/* {this.renderProgress()} */}
            {this.renderButtons()}
          </View>
        )}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            console.log(
              'baseURL + item.videoPlayer,',
              baseURL + item.videoPlayer,
            );
            this.props.navigation.navigate('Video', {
              video: baseURL + item.videoPlayer,
            });
          }}
          style={style.item_container}>
          <ImageBackground
            resizeMode="cover"
            style={style.item_background}
            source={{uri: baseURL + item.picture}}
            borderRadius={20}>
            <View style={style.item_overlay}>
              <Text style={style.item_text}>{item.name}</Text>
              <Text numberOfLines={6} style={style.item_description}>
                {item.description
                  ? item.description
                  : item.practice
                  ? item.practice.description
                  : ''}
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {this.renderPlayButton(baseURL + item.videoPlayer)}
      </View>
    );
  };
  onScroll = e => {
    this.setState({
      scroll: e.nativeEvent.contentOffset.y,
    });
  };
  _onRefresh = () => {
    this.setState({
      items: [],
      refreshing: true,
    });
    this.props.readItems({
      type: 'practice',
      training_id: this.props.route.params.training_id,
      session_id: this.props.route.params.session_id,
      subsession_id: this.props.route.params.subsession_id,
    });
    this.setState({
      refreshing: false,
    });
  };
  render() {
    const {navigate, getParam} = this.props.navigation;
    const header_height = this.scrollYAnimatedValue.interpolate({
      inputRange: [0, header_max_height - header_min_height],
      outputRange: [header_max_height, header_min_height],
      extrapolate: 'clamp',
    });
    return (
      <SafeAreaView style={style.container}>
        <FlatList
          ListHeaderComponent={
            <React.Fragment>
              <PracticesHeader
                height={header_height}
                onPress={this.handleBackButtonClick}
                title={this.props.route.params.subsession_name}
                image={this.props.route.params.subsession_picture}
              />
              {this.props.practicesLoading && (
                <ActivityIndicator
                  style={{marginTop: 50}}
                  size="large"
                  color="#2D2927"
                />
              )}
              {!this.props.practicesLoading &&
                this.props.practicesMessage !== '' && (
                  <Text style={style.message}>
                    {this.props.practicesMessage}
                  </Text>
                )}
            </React.Fragment>
          }
          stickyHeaderIndices={[0]}
          data={this.state.items}
          scrollEventThrottle={1}
          renderItem={({item, index}) =>
            !this.props.practicesLoading && item
              ? this.renderItem(item, index)
              : null
          }
          keyExtractor={(item, index) => JSON.stringify(index)}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.scrollYAnimatedValue}},
            },
          ])}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              colors={['#2D2927']}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_container: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: Dimensions.get('window').height / 4,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    borderRadius: 20,
  },
  item_background: {
    flex: 1,
    height: null,
    width: null,
  },
  item_overlay: {
    backgroundColor: '#00000099',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    padding: 20,
  },
  item_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item_description: {
    color: '#fff',
    fontSize: 10,
  },
  progress_container: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progress_text: {
    fontSize: 10,
  },
  progress_bar: {
    flex: 1,
    height: 5,
    backgroundColor: '#c7c7c7',
    borderRadius: 5,
    margin: 10,
  },
  progress: {
    backgroundColor: '#2D2927',
    height: 5,
    borderRadius: 5,
  },
  buttons_container: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2D2927',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button_disabled: {
    backgroundColor: '#e0e0e0',
    borderRadius: 7,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button_text: {
    color: '#fff',
    fontSize: 10,
  },
  play_container: {
    backgroundColor: '#2D2927',
    padding: 20,
    borderRadius: 100,
    position: 'absolute',
    elevation: 21,
    zIndex: 21,
    bottom: 0,
    marginHorizontal: 40,
    right: 0,
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
    items: state.reducer.practices,
    practicesLoading: state.reducer.practicesLoading,
    practicesMessage: state.reducer.practicesMessage,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readItems: readItems(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Practices);
