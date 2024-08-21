import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from './icon';

export default class HomeHeader extends Component {
  render() {
    return (
      <View style={style.container}>
        <TouchableOpacity style={style.logo_container}>
          <Icon size={30} icon="logo" />
        </TouchableOpacity>
        <Text style={style.title}>True Youth Sports</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#2D2927',
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
});
