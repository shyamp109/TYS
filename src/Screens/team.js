import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  BackHandler,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import Icon from '../components/icon';
import {readTeamNews} from '../redux/action';
import {connect} from 'react-redux';
import {baseURL} from '../api';
import TimeAgo from 'react-native-timeago';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Team extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      teamNews: [],
      refreshing: false,
      activeRow: '',
    };
  }
  async componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick,
        );
      },
    );
    this.props.readTeamNews();
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.back();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.teamNews === prevState.teamNews
      ? {}
      : {teamNews: nextProps.teamNews};
  }
  _onRefresh = () => {
    this.setState({
      teamNews: [],
      refreshing: true,
    });
    this.props.readTeamNews();
    this.setState({
      refreshing: false,
    });
  };
  deleteItem = async (id, index) => {
    let newTeamNews = this.state.teamNews;
    newTeamNews.splice(index, 1);
    this.setState({
      teamNews: newTeamNews,
    });
    const userId = JSON.parse(await AsyncStorage.getItem('user')).id;
    const existing = JSON.parse(await AsyncStorage.getItem('news' + userId));
    existing.splice(index, 1);
    AsyncStorage.setItem('news' + userId, JSON.stringify(existing));
  };
  renderItem = (data, index) => {
    const item = data.item;
    return (
      <SwipeRow
        recalculateHiddenLayout
        disableRightSwipe
        disableLeftSwipe
        rightOpenValue={-100}
        closeOnRowPress>
        <TouchableOpacity
          onPress={() => this.deleteItem(item.id, index)}
          style={style.swipe_container}>
          <View style={style.swipe_button}>
            <Icon icon="delete" />
          </View>
        </TouchableOpacity>
        <View style={style.item_container}>
          <View style={style.item_header}>
            <View style={style.image_container}>
              <Image
                style={style.image}
                source={{uri: baseURL + item.user.profile_picture}}
                resizeMode="cover"
              />
            </View>
            <View style={style.title_container}>
              <View style={style.title}>
                <Text style={style.orange}>
                  {item.user &&
                    item.user.first_name + ' ' + item.user.last_name}
                </Text>
              </View>
              <View style={style.time}>
                <Icon size={16} icon="clock" />
                <Text style={style.time_text}>
                  <TimeAgo time={item.created_at} />
                </Text>
              </View>
            </View>
          </View>
          <Text style={style.description}>{item.message}</Text>
          {item.url && item.file_type === '1' && (
            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: 100,
                width: Dimensions.get('window').width - 40,
                marginTop: 10,
                marginLeft: -20,
                marginRight: -20,
                marginBottom: -20,
              }}
              onPress={() =>
                this.props.navigation.navigate('photo', {
                  photo: {uri: baseURL + item.url},
                })
              }>
              <Image
                resizeMode="cover"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  height: null,
                  width: null,
                  borderRadius: 10,
                }}
                source={{uri: baseURL + item.url}}
              />
            </TouchableOpacity>
          )}
          {item.url && item.file_type === '2' && (
            <TouchableOpacity
              style={{
                borderRadius: 10,
                height: 50,
                width: Dimensions.get('window').width - 40,
                marginTop: 10,
                marginLeft: -20,
                marginRight: -20,
                marginBottom: -20,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#2D2927',
              }}
              onPress={() =>
                this.props.navigation.navigate('video', {
                  video: baseURL + item.url,
                })
              }>
              <Icon icon="play" size={20} />
            </TouchableOpacity>
          )}
        </View>
      </SwipeRow>
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    console.log('this.state.teamNews', this.state.teamNews);
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <SimpleHeader onPress={this.handleBackButtonClick} title="Team" />
        {this.props.teamNewsLoading && (
          <ActivityIndicator
            style={{marginTop: 50}}
            size="large"
            color="#2D2927"
          />
        )}
        {this.props.teamNewsMessage !== '' && (
          <Text style={style.message}>{this.props.teamNewsMessage}</Text>
        )}
        {!this.state.teamNews.length && (
          <View>
            <Text
              style={{
                color: '#2D2927',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 16,
                marginTop: 20,
              }}>
              No Teams Found
            </Text>
          </View>
        )}
        {/* <FlatList
                  data={this.state.teamNews}
                  renderItem={({ item, index }) => this.renderItem(item, index)}
                  keyExtractor={(item, index) => JSON.stringify(index)}
                  refreshControl={
                      <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh}
                          colors={['#2D2927']}
                      />
                  }
              /> */}

        <SwipeListView
          closeOnRowOpen
          closeOnRowPress
          keyExtractor={(item, index) => JSON.stringify(index)}
          data={this.state.teamNews}
          renderItem={(data, rowMap) => this.renderItem(data, rowMap)}
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
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    padding: 20,
  },
  item_header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image_container: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: null,
    width: null,
    borderRadius: 50,
  },
  title_container: {
    justifyContent: 'space-evenly',
    marginHorizontal: 20,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  orange: {
    color: '#2D2927',
    fontWeight: 'bold',
  },
  time: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time_text: {
    color: '#8f8f8f',
    marginLeft: 10,
  },
  description: {
    marginTop: 10,
    fontSize: 12,
  },
  media_button: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 5,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    paddingBottom: 10,
  },
  swipe_container: {
    marginRight: 40,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  swipe_button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
  },
});

function mapStateToProps(state) {
  return {
    teamNews: state.reducer.teamNews,
    teamNewsLoading: state.reducer.teamNewsLoading,
    teamNewsMessage: state.reducer.teamNewsMessage,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readTeamNews: readTeamNews(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
