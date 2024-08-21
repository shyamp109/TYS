import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';

import Icon from '../components/icon';
import {connect} from 'react-redux';
import {login} from '../redux/action';
import {useNavigation} from '@react-navigation/native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      email: '',
      password: '',
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
  }
  handleBackButtonClick = () => {
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  onSubmit = () => {
    let formData = new FormData();
    formData.append('password', this.state.password);
    formData.append('email', this.state.email);
    this.props.login({password: this.state.password, email: this.state.email});
  };
  render() {
    const {navigate} = this.props.navigation;
    // console.log(this.props.loginLoading);
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <View style={style.header_container}>
          <TouchableOpacity style={style.logo_container}>
            <Icon size={30} icon="logo" />
          </TouchableOpacity>
          <Text style={style.header_text}>Login</Text>
        </View>

        <View>
          <Text style={style.welcome}>
            Welcome to
            <Text style={style.bold}>True Youth Sports</Text>
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholder="Email or Username"
            style={style.input}
            placeholderTextColor="#2D2927"
            returnKeyType="next"
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
          <TextInput
            autoCapitalize="none"
            placeholder="Password"
            placeholderTextColor="#2D2927"
            style={style.input}
            secureTextEntry
            returnKeyType="done"
            value={this.state.password}
            onChangeText={password => this.setState({password})}
          />
          <Text
            style={[
              {opacity: this.props.loginMessage ? 1 : 0},
              style.error_message,
            ]}>
            {this.props.loginMessage}
          </Text>
        </View>
        <View style={style.button_container}>
          {this.props.loginLoading ? (
            <ActivityIndicator size="large" color="#2D2927" />
          ) : (
            <React.Fragment>
              <TouchableOpacity
                activeOpacity={0.8}
                style={style.button}
                onPress={this.onSubmit}>
                <Text style={style.button_text}>Go on!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('EnterEmail')}>
                <Text style={{color: '#2D2927'}}>Forgot password?</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  logo_container: {
    backgroundColor: '#2D2927',
    padding: 5,
    borderRadius: 5,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#2D2927',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
  },
  header_text: {
    borderBottomWidth: 2,
    fontWeight: 'bold',
    padding: 5,
    color: '#2D2927',
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
    color: '#2D2927',
  },
  bold: {
    fontWeight: 'bold',
    color: '#2D2927',
  },
  input: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderBottomWidth: 1,
    marginVertical: 10,
    color: '#333333',
    height: 30,
    fontSize: 18,
  },
  button_container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    height: 100,
  },
  button: {
    backgroundColor: '#2D2927',
    borderRadius: 15,
    paddingHorizontal: 40,
    paddingVertical: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: '#2D2927',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    marginBottom: 15,
  },
  button_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  error_message: {
    textAlign: 'center',
    color: '#c986a1',
    height: 40,
    fontSize: 12,
    marginTop: 20,
  },
});

function mapDispatchToProps(dispatch, payload) {
  return {
    login: login(dispatch, payload),
  };
}

function mapStateToProps(state) {
  return {
    loginLoading: state.reducer.loginLoading,
    loginMessage: state.reducer.loginMessage,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
