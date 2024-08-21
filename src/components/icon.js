import React, {Component} from 'react';
import {Image} from 'react-native';
import * as icons from '../components/icons';

export default class Icon extends Component {
  render() {
    return (
      <Image
        resizeMode="contain"
        style={{
          height: this.props.size ? this.props.size : 20,
          width: this.props.size ? this.props.size : 20,
          tintColor: this.props.focused ? '#2D2927' : 'lightgray',
        }}
        source={eval(
          icons[Object.keys(icons)?.find(cv => cv === 'ic_' + this.props.icon)],
        )}
      />
    );
  }
}
