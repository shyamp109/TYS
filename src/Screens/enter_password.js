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
// import {NavigationActions} from 'react-navigation';
// import Icon from '../components/icon';
import axiosInstance from '../api';

const EnterPassword = props => {
  const [password, setPassword] = React.useState('');
  const [passwordConfirmation, setPasswordConfirmation] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const onSubmit = () => {
    const email = props.route.params.email;
    axiosInstance
      .post('user/change-reset-password', {
        email,
        password,
        password_repeat: passwordConfirmation,
      })
      .then(data => {
        setLoading(false);
        props.navigation.navigate('Login', {
          email,
        });
      })
      .catch(err => {
        setErrorMessage(err.response.data.message);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={style.container}>
      <View>
        <Text style={style.welcome}>Enter new password</Text>
        <TextInput
          autoCapitalize="none"
          placeholder="Password"
          style={style.input}
          secureTextEntry
          placeholderTextColor={'#2D2927'}
          returnKeyType="done"
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Confirm Password"
          style={style.input}
          secureTextEntry
          placeholderTextColor={'#2D2927'}
          returnKeyType="done"
          value={passwordConfirmation}
          onChangeText={text => setPasswordConfirmation(text)}
        />
        <Text style={[{opacity: errorMessage ? 1 : 0}, style.error_message]}>
          {errorMessage}
        </Text>
      </View>
      <View style={style.button_container}>
        {loading ? (
          <ActivityIndicator size="large" color="#2D2927" />
        ) : (
          <React.Fragment>
            <TouchableOpacity
              activeOpacity={0.8}
              style={style.button}
              onPress={onSubmit}>
              <Text style={style.button_text}>Submit</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    </SafeAreaView>
  );
};

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
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 20,
    color: '#2D2927',
  },
  bold: {
    fontWeight: 'bold',
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

export default EnterPassword;
