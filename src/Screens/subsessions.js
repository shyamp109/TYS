import React, {Component} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
  Dimensions,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import {connect} from 'react-redux';
import {readItems} from '../redux/action';
import {baseURL} from '../api';
import * as icons from '../subsessionPictures';

class Subsessions extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      items: [],
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
    this.props.readItems({
      type: 'subsession',
      training_id: this.props.route.params.training_id,
      session_id: this.props.route.params.session_id,
    });
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.goBack();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.route.params.training_id !==
        this.props.route.params.training_id ||
      prevProps.route.params.session_id !== this.props.route.params.session_id
    ) {
      this.props.readItems({
        type: 'session',
        training_id: this.props.route.params.training_id,
        session_id: this.props.route.params.session_id,
      });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.items === prevState.items
      ? {}
      : // : { items: nextProps.items.items }
        {items: nextProps.items};
  }
  getIcon = name => {
    let lCaseName = name.toLowerCase();
    switch (lCaseName) {
      default:
        return icons.ballHandling;
      case 'ball handling':
        return icons.ballHandling;
      case 'defence':
        return icons.deffense;
      case 'deffense':
        return icons.deffense;
      case 'defense':
        return icons.deffense;
      case 'dribbling':
        return icons.dribbling;
      case 'offense':
        return icons.offense;
      case 'ofense':
        return icons.offense;
      case 'ofence':
        return icons.offense;
      case 'passing':
        return icons.passing;
      case 'rebounding':
        return icons.rebounding;
      case 'shooting':
        return icons.shooting;
    }
  };
  renderItem = (item, index) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          style.item_container,
          {
            height:
              index === 0
                ? Dimensions.get('window').height / 3
                : Dimensions.get('window').height / 8,
          },
        ]}
        onPress={() =>
          this.props.navigation.navigate('Practices', {
            subsession_name: item.name,
            drill_manual: item.drill_manual,
            subsession_id: item.subsession_id,
            subsession_picture: item.picture,
            session_id: this.props.route.params.session_id,
            training_id: this.props.route.params.training_id,
            training_name: this.props.route.params.training_name,
          })
        }>
        <ImageBackground
          resizeMode="cover"
          style={style.item_background}
          source={{uri: baseURL + item.picture}}
          borderRadius={20}>
          <View
            style={[
              style.item_overlay,
              {
                flexDirection: 'row',
                alignItems: index === 0 ? 'flex-end' : 'center',
              },
            ]}>
            <Image
              style={style.icon}
              resizeMode="contain"
              source={this.getIcon(item.name)}
            />
            <Text style={style.item_text}>{item.name}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };
  _onRefresh = () => {
    this.setState({
      items: [],
      refreshing: true,
    });
    this.props.readItems({
      type: 'subsession',
      training_id: this.props.route.params.training_id,
      session_id: this.props.route.params.session_id,
    });
    this.setState({
      refreshing: false,
    });
  };
  render() {
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <SimpleHeader
          onPress={this.handleBackButtonClick}
          title={this.props.route.params.session_name}
        />
        {this.props.subsessionsLoading ? (
          <ActivityIndicator size="large" color="#2D2927" />
        ) : this.props.subsessionsMessage ? (
          <Text style={style.message}>{this.props.subsessionsMessage}</Text>
        ) : (
          <FlatList
            data={this.state.items}
            renderItem={({item, index}) =>
              item ? this.renderItem(item, index) : null
            }
            keyExtractor={(item, index) => JSON.stringify(index)}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
                colors={['#2D2927']}
              />
            }
          />
        )}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_container: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: Dimensions.get('window').height / 8,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    borderRadius: 20,
  },
  item_background: {
    flex: 1,
    height: null,
    width: null,
  },
  icon: {
    height: 30,
    width: 30,
  },
  item_overlay: {
    backgroundColor: '#00000099',
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    padding: 20,
  },
  item_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  message: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    items: state.reducer.subsessions,
    subsessionsLoading: state.reducer.subsessionsLoading,
    subsessionsMessage: state.reducer.subsessionsMessage,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readItems: readItems(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Subsessions);
