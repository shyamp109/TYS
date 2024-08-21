import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import SimpleHeader from '../components/simple_header';
import Icon from '../components/icon';
import {ic_button_end} from '../components/icons';
import {connect} from 'react-redux';
import {readItems} from '../redux/action';

class Sessions extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      items: [],
      refresing: false,
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
      type: 'session',
      training_id: this.props.route.params.training_id,
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.route.params.training_id !== this.props.route.params.training_id
    ) {
      this.props.readItems({
        type: 'session',
        training_id: this.props.route.params.training_id,
      });
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.items === prevState.items
      ? {}
      : // : { items: nextProps.items.items }
        {items: nextProps.items};
  }

  renderItem = item => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={style.item_container}
        onPress={() =>
          this.props.navigation.navigate('Subsessions', {
            training_id: this.props.route.params.training_id,
            training_name: this.props.route.params.training_name,
            session_id: item.session_id,
            session_name: item.name,
          })
        }>
        <View style={style.item_text_container}>
          <Icon icon="basketball_gray" size={24} />
          <Text style={style.item_text}>{item.name}</Text>
        </View>
        <View style={style.button_end_container}>
          <Image
            resizeMode="cover"
            source={ic_button_end}
            style={style.button_end}
          />
        </View>
      </TouchableOpacity>
    );
  };
  _onRefresh = () => {
    this.setState({
      items: [],
      refreshing: true,
    });
    this.props.readItems({
      type: 'session',
      training_id: this.props.route.params.training_id,
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
          title={this.props.route.params.training_name}
        />
        {this.props.sessionsLoading ? (
          <ActivityIndicator size="large" color="#2D2927" />
        ) : this.props.sessionsMessage ? (
          <Text style={style.message}>{this.props.sessionsMessage}</Text>
        ) : (
          <FlatList
            data={this.state.items}
            renderItem={({item}) => (item ? this.renderItem(item) : null)}
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
  buttons_container: {
    flex: 1,
  },
  item_container: {
    marginHorizontal: 20,
    marginVertical: 10,
    height: Dimensions.get('window').height / 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 10,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item_text_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 15,
  },
  item_text: {
    marginLeft: 15,
    color: '#2D2927',
  },
  item_text_x: {
    color: '#2D2927',
  },
  button_end_container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button_end: {
    height: Dimensions.get('window').height / 10,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    marginRight: -2,
    tintColor: 'gray',
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
    items: state.reducer.sessions,
    sessionsLoading: state.reducer.sessionsLoading,
    sessionsMessage: state.reducer.sessionsMessage,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    readItems: readItems(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
