import React from 'react';
import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import {
  SafeAreaView,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native';
// import { GiftedChat } from "react-native-gifted-chat";
import Icon from '../components/icon';
import AsyncStorage from '@react-native-community/async-storage';
import {configureChat} from '../configChat';

let userChat;

async function getUserChat() {
  const userString = await AsyncStorage.getItem('user');

  if (userString) {
    const user = JSON.parse(userString);
    // Alert.alert(JSON.stringify(user.id));
    userChat = await configureChat(JSON.stringify(user.id));
  }
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      modal_visible: true,
      rooms: [],
      messages: [],
      room: '',
      roomSearch: '',
      searched: [],
      refreshing: false,
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
    this.refresh();
  }

  refresh = () => {
    this.setState({refreshing: true});
    getUserChat().then(() => {
      try {
        const rooms = Object.keys(userChat.roomStore.rooms).map(
          key => userChat.roomStore.rooms[key],
        );
        this.setState({
          rooms: rooms,
          searched: rooms,
        });
        this.setState({refreshing: false});
      } catch (e) {
        this.setState({refreshing: false});
      }
    });
  };

  handleBackButtonClick = () => {
    const backAction = NavigationActions.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  onPressRoom = id => {
    this.setState({messages: []});
    userChat
      .subscribeToRoom({
        roomId: id,
        name: userChat.name,
        hooks: {
          onMessage: message => {
            this.onReceive(message);
            return userChat.setReadCursor({
              roomId: id,
              position: message.id,
            });
          },
        },
      })
      .then(() => this.setState({room: id, modal_visible: false}));
  };
  onReceive = data => {
    const {id, senderId, text, createdAt} = data;
    const incomingMessage = {
      _id: id,
      text: text,
      createdAt: new Date(createdAt),
      user: {
        _id: senderId,
        name: data.userStore.users[senderId].name,
        avatar: data.userStore.users[senderId].avatarURL,
      },
    };
    // this.setState((previousState) => ({
    //   messages: GiftedChat.append(previousState.messages, incomingMessage),
    // }));
  };
  onSend = (messages = []) => {
    messages.forEach(message => {
      userChat
        .sendMessage({
          text: message.text,
          roomId: this.state.room,
        })
        .catch(err => {});
    });
  };
  renderRoom = item => {
    if (this.isSearched(item)) {
      return (
        <TouchableOpacity
          style={style.room_container}
          onPress={() => this.onPressRoom(item.id)}>
          {item.unreadCount > 0 && (
            <Text
              style={[
                style.room_badge,
                {paddingHorizontal: item.unreadCount >= 10 ? 7 : 10},
              ]}>
              {item.unreadCount}
            </Text>
          )}
          <Text style={style.room_name}>{item.name}</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  isSearched = item => {
    return item.name
      .toLowerCase()
      .includes(this.state.roomSearch.toLowerCase());
  };
  handleSearchInput = text => {
    this.setState({
      roomSearch: text,
    });
    const nextSearched = this.state.rooms.filter(item => this.isSearched(item));
    this.setState({
      searched: nextSearched,
    });
  };
  render() {
    return (
      <SafeAreaView style={style.container}>
        <SimpleHeader
          onPress={
            this.state.modal_visible && this.state.room
              ? () => this.setState({modal_visible: false})
              : this.handleBackButtonClick
          }
          title={this.state.modal_visible ? 'Chat Rooms' : 'Chat'}
          right={!this.state.modal_visible}
          rightIcon="rooms"
          onPressRight={() => this.setState({modal_visible: true})}
        />
        {!this.state.modal_visible ? (
          // <GiftedChat
          //   messages={this.state.messages}
          //   onSend={(messages) => this.onSend(messages)}
          //   user={{
          //     _id: userChat.id,
          //     avatar: userChat.avatarURL,
          //     name: userChat.name,
          //   }}
          // />
          <View />
        ) : (
          <React.Fragment>
            <View style={style.search_container}>
              <TextInput
                autoCapitalize="none"
                placeholder="Search"
                style={style.input}
                returnKeyType="next"
                value={this.state.roomSearch}
                onChangeText={roomSearch => this.handleSearchInput(roomSearch)}
              />
              <View style={style.icon_container}>
                <Icon icon="search" />
              </View>
            </View>
            <FlatList
              data={this.state.rooms}
              extraData={this.state.searched}
              renderItem={({item}) => this.renderRoom(item)}
              keyExtractor={(item, index) => JSON.stringify(index)}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.refresh}
                  colors={['#2D2927']}
                />
              }
            />
          </React.Fragment>
        )}
      </SafeAreaView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  search_container: {
    height: 40,
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: '100%',
    width: '100%',
    backgroundColor: '#8F8F8F13',
    padding: 0,
    paddingHorizontal: 5,
    flex: 1,
    borderRadius: 5,
    color: '#333333',
    height: 40,
    fontSize: 18,
  },
  icon_container: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  item_container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  item_title: {},
  item_button: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#2D2927',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: '#00000099',
  },
  modal_bottom: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal_checkbox: {
    borderRadius: 5,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_container: {
    padding: 10,
    backgroundColor: '#fff',
    // width: Dimensions.get("window").width - 50,
    // maxHeight: Dimensions.get("window").height - 100,
    // borderRadius: 10
  },
  modal_description: {
    marginVertical: 10,
    color: '#8F8F8F',
  },
  modal_download: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#2D2927',
    padding: 10,
    borderRadius: 10,
  },
  modal_download_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal_picture: {
    marginVertical: 10,
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width - 70,
  },
  modal_title: {
    marginVertical: 10,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  modal_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  room_container: {
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 10,
    borderRadius: 5,
  },
  room_name: {
    color: '#666',
  },
  room_badge: {
    position: 'absolute',
    zIndex: 2,
    display: 'flex',
    backgroundColor: '#E52058',
    color: '#fff',
    paddingVertical: 5,
    borderRadius: 50,
    right: -5,
    top: -5,
  },
});
