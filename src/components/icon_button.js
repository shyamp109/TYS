import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from './icon';

export default class IconButton extends Component {
  render() {
    return (
      <TouchableOpacity style={{padding: 5}} onPress={this.props.onPress}>
        <Icon
          icon={this.props.icon}
          size={this.props.size}
          focused={true}
          chnageIconColor={this.props.chnageIconColor}
        />
      </TouchableOpacity>
    );
  }
}
