import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  TextInput,
  BackHandler,
  Switch,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import Icon from '../components/icon';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance, {baseURL} from '../api/index';
import {updateUser, changePassword} from '../redux/action';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

async function getToken() {
  const userString = await AsyncStorage.getItem('user');
  if (userString !== null) {
    const userJson = await JSON.parse(userString);
    return userJson.token;
  } else {
    return;
  }
}

class Account extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      switch: false,
      user: {},
      password: '',
      passwordConfirmation: '',
      avatarSource: '',
      loading: false,
    };
  }
  async componentDidMount() {
    this.focusSubscription = this.props.navigation.addListener(
      'willFocus',
      async payload => {
        this.backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick,
        );
        // AsyncStorage.removeItem('user')
      },
    );

    const user = JSON.parse(await AsyncStorage.getItem('user'));
    this.setState({
      user: user,
    });
  }

  handleBackButtonClick = () => {
    // const backAction = NavigationActions.back();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  onSavePassword = () => {
    this.props.changePassword({
      id: this.state.user.id,
      password: this.state.password,
    });
    this.setState({
      password: '',
      passwordConfirmation: '',
    });
  };
  onLogout = async () => {
    await axiosInstance
      .post('patch/user/' + this.state.user.id, {
        fcm_token: null,
      })
      .then(async res => {
        await AsyncStorage.removeItem('user');
        await this.props.navigation.navigate('Login');
      })
      .catch(err => {
        console.log('LOGOUT ERROR', this.props.user.id);
      });
  };
  onPressPicture = async () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri = response.assets[0].uri;
        const data = response.assets[0];

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: uri,
        });

        let photo = {
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: Platform.OS === 'android' ? uri : uri,
        };

        let formData = new FormData();
        formData.append('profile_picture', photo);
        axios
          .post(`${baseURL}/patch/user/` + this.state.user.id, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: 'Bearer ' + (await getToken()),
            },
          })
          .then(res => {})
          .catch(err => {});
        // this.props.updateUser({
        //   id: this.state.user.id,
        //   data: formData,
        // });
      }
    });
  };

  render() {
    const {navigate} = this.props.navigation;
    const {user} = this.state;
    return (
      Object.keys(user).length !== 0 && (
        <SafeAreaView>
          <ScrollView style={style.container}>
            <View style={style.header}>
              <View style={style.header_background} />
              <TouchableOpacity
                onPress={this.onPressPicture}
                style={style.picture_container}>
                {this.state.loading ? (
                  <ActivityIndicator size="large" color="#2D2927" />
                ) : (
                  <Image
                    style={style.picture}
                    source={{
                      uri: this.state.avatarSource
                        ? this.state.avatarSource
                        : baseURL +
                          user.profile_picture +
                          '?time=' +
                          new Date(),
                    }}
                    resizeMode="cover"
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={style.content}>
              <Text style={style.name}>
                {user.first_name} {user.last_name}
              </Text>

              <Text style={style.section_title}>Basic profile</Text>
              <View style={style.section}>
                <View style={style.section_row}>
                  <Icon icon="message" focused={true} />
                  <Text style={style.label}>Email:</Text>
                  <Text style={style.info}>{user.email}</Text>
                </View>
                <View style={style.section_row}>
                  <Icon icon="user_gray" focused={true} />
                  <Text style={style.label}>Name:</Text>
                  <Text style={style.info}>
                    {user.first_name} {user.last_name}
                  </Text>
                </View>
                <View style={style.section_row}>
                  <Icon icon="users_gray" focused={true} />
                  <Text style={style.label}>Team:</Text>
                  <Text style={style.info}>{user.team_name}</Text>
                </View>
              </View>

              {/* <Text style={style.section_title}>Basic information</Text>
                        <View style={style.section}>
                            <View style={style.section_row}>
                                <Icon icon='phone' />
                                <Text style={style.label}>Phone:</Text>
                                <Text style={style.info}>+381 64 578 1522</Text>
                            </View>
                            <View style={style.section_row}>
                                <Icon icon='gender' />
                                <Text style={style.label}>Gender:</Text>
                                <Text style={style.info}>{user.gender === 'm' ? 'male' : 'female'}</Text>
                            </View>
                        </View> */}

              <Text style={style.section_title}>Change password</Text>
              <View style={style.section}>
                <View style={style.section_row}>
                  <Icon icon="lock" focused={true} />
                  <Text style={style.label_input}>Enter New Password:</Text>
                  <TextInput
                    autoCapitalize="none"
                    secureTextEntry
                    returnKeyType="next"
                    style={style.input}
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}
                  />
                </View>
                <View style={style.section_row}>
                  <Icon icon="lock" focused={true} />
                  <Text style={style.label_input}>Retype New Password:</Text>
                  <TextInput
                    autoCapitalize="none"
                    secureTextEntry
                    returnKeyType="done"
                    style={style.input}
                    value={this.state.passwordConfirmation}
                    onChangeText={passwordConfirmation =>
                      this.setState({passwordConfirmation})
                    }
                  />
                </View>
                {this.state.password.length >= 8 &&
                  this.state.password === this.state.passwordConfirmation && (
                    <View style={style.save_button_container}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={style.save_button}
                        onPress={this.onSavePassword}>
                        <Text style={style.save_button_text}>Save</Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>

              {/* <Text style={style.section_title}>Offline videos</Text>
                        <View style={style.section}>
                            <View style={style.section_row1}>
                                <View style={style.section_row}>
                                    <Icon icon='earth' />
                                    <Text style={style.label_offline}>Offline mode videos</Text>
                                </View>
                                <Switch value={this.state.switch} onValueChange={(value) => this.setState({ switch: value })} />
                            </View>
                            <Text style={style.explanation}>
                                Proin fringilla rutrum congue. Praesent tristique nisl erat, feugiat vestibulum mauris tempor at.
                            </Text>
                        </View> */}

              <Text style={style.section_title}>
                About <Text style={{fontSize: 10, color: '#2D2927'}}>1.5</Text>
              </Text>
              <TouchableOpacity
                style={style.section_row}
                onPress={() => navigate('Help')}>
                <Icon icon="info" focused={true} />
                <Text style={style.label_offline}>Help</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.section_row}
                onPress={() => navigate('Privacy')}>
                <Icon icon="lock" focused={true} />
                <Text style={style.label_offline}>Privacy</Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                style={style.section_row}
                onPress={() => navigate('TermsOfService')}>
                <Icon icon="file" focused={true} />
                <Text style={style.label_offline}>Terms Of Service</Text>
              </TouchableOpacity> */}
            </View>
            <View style={style.save_button_container}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={style.save_button}
                onPress={this.onLogout}>
                <Text style={style.save_button_text}>Logout</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      )
    );
  }
}

const width = Dimensions.get('window').width;

const style = StyleSheet.create({
  container: {
    marginTop: -width * 1.6,
  },
  header: {
    //top: - width * 1.6,
    alignItems: 'center',
    //marginBottom: - width * 1.6,
  },
  content: {
    //top: - width * 1.85,
  },
  header_background: {
    height: width * 2,
    width: width * 2,
    backgroundColor: '#2D2927',
    borderRadius: width * 2,
  },
  picture_container: {
    height: width / 2.5,
    width: width / 2.5,
    borderRadius: width / 2.5,
    marginTop: -width / 4,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    height: null,
    width: null,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2D2927',
  },
  section_title: {
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 20,
    color: '#2D2927',
  },
  section_row1: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  section_row: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginLeft: 10,
    width: width / 5,
    color: '#2D2927',
  },
  info: {
    marginLeft: 10,
    color: '#2D2927',
  },
  label_input: {
    fontWeight: 'bold',
    marginLeft: 10,
    width: width / 2.25,
    color: '#2D2927',
  },
  input: {
    backgroundColor: 'white',
    padding: 0,
    paddingHorizontal: 5,
    flex: 1,
    borderRadius: 5,
    color: '#333333',
    height: 30,
    fontSize: 18,
  },
  label_offline: {
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2D2927',
  },
  explanation: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 10,
    color: '#8f8f8f',
  },
  save_button_container: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  save_button: {
    backgroundColor: '#2D2927',
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#2D2927',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
  },
  save_button_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

function mapDispatchToProps(dispatch, payload) {
  return {
    updateUser: updateUser(dispatch, payload),
    changePassword: changePassword(dispatch, payload),
  };
}

function mapStateToProps(state) {
  return {
    user: state.reducer.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
