import React, {Component} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import IconButton from './icon_button';
export default class SimpleHeader extends Component {
  render() {
    return (
      <View style={style.container}>
        <View style={style.left}>
          <IconButton icon="arrow_left" onPress={this.props.onPress} />
          <TouchableOpacity onPress={this.props.onPress}>
            <Text style={style.title}>{this.props.title}</Text>
          </TouchableOpacity>
        </View>
        {this.props.right && (
          <IconButton
            icon={this.props.rightIcon}
            onPress={this.props.onPressRight}
          />
        )}
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 10,
    color: '#2D2927',
  },
});
