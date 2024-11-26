import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground, Animated} from 'react-native';
import IconButton from './icon_button';
import {baseURL} from '../api';

export default class PracticesHeader extends Component {
  render() {
    return (
      <Animated.View style={{height: this.props.height}}>
        <ImageBackground
          source={{uri: baseURL + this.props.image}}
          style={style.image}
          borderBottomLeftRadius={20}
          borderBottomRightRadius={20}>
          <View style={style.inner}>
            <View style={style.container}>
              <IconButton
                chnageIconColor={true}
                icon="arrow_left"
                onPress={this.props.onPress}
              />
              <Text style={style.title}>{this.props.title}</Text>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  inner: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    backgroundColor: '#00000099',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#fff',
  },
});
