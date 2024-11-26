import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  Modal,
  Alert,
  Linking,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import Icon from '../components/icon';
import IconButton from '../components/icon_button';
import axiosInstance, {baseURL} from '../api/index';
import RNFetchBlob from 'rn-fetch-blob';

export default class Goals extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      modal_visible: false,
      item: {},
      check: false,
      goals: [],
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

    axiosInstance
      .get('load/goals/all')
      .then(res => {
        this.setState({
          goals: res.data,
        });
        console.log(res.data);
      })
      .catch(err => {});
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.back();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };

  download = () => {
    const downloadFile = (item, cb) => {
      // Get today's date to add the time suffix in filename
      let date = new Date().getTime();
      // File URL which we want to download
      let FILE_URL = baseURL + item.drill_manual;
      // Function to get extention of the file url

      file_ext = '.pdf';

      // config: To get response by passing the downloading related options
      // fs: Root directory path to download
      const {config, fs} = RNFetchBlob;
      let RootDir = fs.dirs.PictureDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path: RootDir + '/TrueCoach/' + item.name + date + file_ext,
          description: 'downloading file...',
          notification: true,
          // useDownloadManager works with Android only
          useDownloadManager: true,
        },
        path: RootDir + '/TrueCoach/' + item.name + date + file_ext,
      };
      config(options)
        .fetch('GET', FILE_URL)
        .then(res => {
          // Alert after successful downloading
          // console.log('res -> ', JSON.stringify(res));
          // alert(JSON.stringify(res.path()));
          cb(res);
        });
    };

    downloadFile(this.state.item, () => {});
  };

  check = async () => {
    const nextState = this.state.check ? false : true;
    const route = nextState ? 'check' : 'uncheck';
    console.log(`goals/${route}/${this.state.item.id}`);

    const newGoals = this.state.goals.map(el =>
      el.id === this.state.item.id ? {...el, done: nextState ? 1 : 0} : el,
    );

    console.log(newGoals);

    axiosInstance
      .get(`goals/${route}/${this.state.item.id}`)
      .then(res => {
        this.setState({
          check: nextState,
          goals: newGoals,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderModal = item => {
    return this.state.item ? (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({modal_visible: false, item: {}})}
        style={style.modal}>
        <TouchableOpacity activeOpacity={1} style={style.modal_container}>
          <View style={style.modal_title_container}>
            <IconButton
              icon="arrow_left"
              onPress={() => this.setState({modal_visible: false, item: {}})}
            />
            <Text style={style.modal_title}>{item.name}</Text>
          </View>
          <Text style={style.modal_description}>{item.description}</Text>
          <Image
            resizeMode="cover"
            style={style.modal_picture}
            source={{uri: baseURL + item.picture}}
          />
          <View style={style.modal_bottom}>
            <TouchableOpacity
              style={style.modal_left}
              // onPress={() => this.setState({ check: !this.state.check })}
              onPress={this.check}>
              <View style={style.modal_checkbox}>
                {this.state.check && <Icon icon="orangestikla" />}
              </View>
              <Text style={{color: '#2D2927'}}>Mark done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.modal_download}
              // onPress={() => this.setState({ modal_visible: false, item: {} })}
              // onPress={() => this.download()}
              onPress={() => {
                Linking.openURL(baseURL + item.drill_manual);
              }}>
              <Icon icon="download" />
              <Text style={style.modal_download_text}>Download PDF</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    ) : null;
  };
  renderItem = item => {
    return (
      <TouchableOpacity
        key={item.id}
        activeOpacity={0.8}
        style={style.item_container}
        onPress={() =>
          this.setState({
            modal_visible: true,
            item: item,
            check: item.done == 1 ? true : false,
          })
        }>
        <Text style={style.item_title}>{item.name}</Text>
        <View style={style.item_button}>
          <Icon icon="arrow_right" />
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <SimpleHeader onPress={this.handleBackButtonClick} title="Goals" />
        {!this.state.goals.length && (
          <View>
            <Text
              style={{
                color: '#2D2927',
                textAlign: 'center',
                fontWeight: 700,
                fontSize: 16,
                marginTop: 20,
              }}>
              No Goals Found
            </Text>
          </View>
        )}
        <FlatList
          data={this.state.goals}
          renderItem={({item}) => this.renderItem(item)}
        />
        <Modal visible={this.state.modal_visible} transparent={true}>
          {this.renderModal(this.state.item)}
        </Modal>
        {/*
                    <View
                    style={{
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                    <Text
                        style={{
                            color: '#999',
                            fontSize: 18
                        }}
                    >
                        Coming soon...
                    </Text>
                </View>
            */}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  item_container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  item_title: {
    color: '#2D2927',
  },
  item_button: {
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#2D2927',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: '#00000099',
  },
  modal_bottom: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modal_checkbox: {
    borderRadius: 5,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal_container: {
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
  },
  modal_description: {
    marginVertical: 10,
    color: '#2D2927',
  },
  modal_download: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#2D2927',
    padding: 10,
    borderRadius: 10,
  },
  modal_download_text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modal_left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modal_picture: {
    marginVertical: 10,
    height: Dimensions.get('window').height / 5,
    width: Dimensions.get('window').width - 70,
  },
  modal_title: {
    marginVertical: 10,
    marginLeft: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D2927',
  },
  modal_title_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
