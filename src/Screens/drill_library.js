// import React, {Component} from 'react';
// import {
//   SafeAreaView,
//   BackHandler,
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Dimensions,
//   Modal,
//   ActivityIndicator,
// } from 'react-native';
// // import {NavigationActions} from 'react-navigation';
// import SimpleHeader from '../components/simple_header';
// import {connect} from 'react-redux';
// import {filterPractices, readAllSubsessions, readItems} from '../redux/action';
// import Icon from '../components/icon';
// import IconButton from '../components/icon_button';
// import {baseURL} from '../api';

// class DrillLibrary extends Component {
//   constructor(props) {
//     super(props);
//     this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     this.state = {
//       items: [],
//       search: '',
//       modalVisible: false,
//       selectType: '',
//       trainings: [],
//       subsessions: [],
//       selectedTraining: '',
//       selectedTrainingId: '',
//       selectedSubsession: '',
//       selectedSubsessionId: '',
//       modalSearch: '',
//     };
//   }

//   componentDidMount() {
//     this.focusSubscription = this.props.navigation.addListener(
//       'willFocus',
//       payload => {
//         this.backHandler = BackHandler.addEventListener(
//           'hardwareBackPress',
//           this.handleBackButtonClick,
//         );
//       },
//     );
//     this.props.filterPractices();
//     this.props.readSubsessions();
//   }
//   handleBackButtonClick = () => {
//     // const backAction = NavigationActions.goBack();
//     // this.props.navigation.dispatch(backAction);
//     // return true;
//     const backAction = this.props.navigation.goBack();
//     this.props.navigation.dispatch(backAction);
//     return true;
//   };
//   static getDerivedStateFromProps(nextProps, prevState) {
//     if (nextProps.items !== prevState.items) {
//       return {
//         items: nextProps.items,
//       };
//     }
//     if (nextProps.trainings !== prevState.trainings) {
//       return {
//         trainings: nextProps.trainings,
//       };
//     }
//     if (nextProps.subsessions !== prevState.subsessions) {
//       return {
//         subsessions: nextProps.subsessions,
//       };
//     }
//     return {};
//   }

//   selectFilter = item => {
//     if (this.state.selectType === 'trainings') {
//       this.setState(
//         {
//           selectedTraining: item.name,
//           selectedTrainingId: item.id,
//           modalVisible: false,
//         },
//         () => this.filter(),
//       );
//     } else if (this.state.selectType === 'subsessions') {
//       this.setState(
//         {
//           selectedSubsession: item?.name,
//           selectedSubsessionId: item.id,
//           modalVisible: false,
//         },
//         () => this.filter(),
//       );
//     }
//   };

//   filter = () => {
//     let postObject = {};

//     if (this.state.selectedTrainingId) {
//       Object.assign(postObject, {training_id: this.state.selectedTrainingId});
//     }
//     if (this.state.selectedSubsessionId) {
//       Object.assign(postObject, {
//         subsession_id: this.state.selectedSubsessionId,
//       });
//     }

//     if (Object.keys(postObject).length > 0) {
//       this.props.filterPractices(postObject);
//     } else {
//       this.props.filterPractices();
//     }
//   };

//   renderModal = () => {
//     return (
//       <TouchableOpacity
//         activeOpacity={1}
//         onPress={() => this.setState({modalVisible: false, selectType: {}})}
//         style={style.modal}>
//         <TouchableOpacity activeOpacity={1} style={style.modal_container}>
//           <View style={style.modal_title_container}>
//             <IconButton
//               icon="arrow_left"
//               onPress={() =>
//                 this.setState({modalVisible: false, selectType: {}})
//               }
//             />
//             <Text style={style.modal_title}>Select Training</Text>
//           </View>

//           <View style={style.search_container}>
//             <TextInput
//               autoCapitalize="none"
//               placeholder="Search"
//               style={style.input}
//               returnKeyType="next"
//               value={this.state.modalSearch}
//               onChangeText={modalSearch => this.setState({modalSearch})}
//             />
//             <View style={style.icon_container}>
//               <Icon icon="search" />
//             </View>
//           </View>

//           <ScrollView style={style.select_items_container}>
//             <TouchableOpacity
//               style={style.select_item}
//               onPress={() => this.selectFilter('')}>
//               <Text style={style.select_item_text}>All</Text>
//             </TouchableOpacity>
//             {this.state.selectType === 'trainings'
//               ? this.state?.trainings?.map(
//                   (item, i) =>
//                     item.name
//                       .toLowerCase()
//                       .includes(this.state.modalSearch.toLowerCase()) && (
//                       <TouchableOpacity
//                         style={style.select_item}
//                         onPress={() => this.selectFilter(item)}
//                         key={i}>
//                         <Text style={style.select_item_text}>{item.name}</Text>
//                       </TouchableOpacity>
//                     ),
//                 )
//               : this.state.selectType === 'subsessions'
//               ? this?.state?.subsessions?.data?.map(
//                   (item, i) =>
//                     item.name
//                       .toLowerCase()
//                       .includes(this.state.modalSearch.toLowerCase()) && (
//                       <TouchableOpacity
//                         style={style.select_item}
//                         onPress={() => this.selectFilter(item)}
//                         key={i}>
//                         <Text style={style.select_item_text}>{item.name}</Text>
//                       </TouchableOpacity>
//                     ),
//                 )
//               : null}
//           </ScrollView>
//         </TouchableOpacity>
//       </TouchableOpacity>
//     );
//   };

//   render() {
//     const {navigate} = this.props.navigation;
//     //navigate('ScreenName') - forward
//     //this.handleBackButtonClick - back

//     return (
//       <SafeAreaView style={style.container}>
//         <Modal visible={this.state.modalVisible} transparent={true}>
//           {this.renderModal()}
//         </Modal>

//         <View
//           style={{elevation: 2, backgroundColor: '#fff', paddingBottom: 10}}>
//           <SimpleHeader
//             onPress={this.handleBackButtonClick}
//             title="Drill Library"
//           />

//           <View style={style.search_container}>
//             <TextInput
//               autoCapitalize="none"
//               placeholder="Search"
//               style={style.input}
//               returnKeyType="next"
//               value={this.state.search}
//               onChangeText={search => this.setState({search})}
//             />
//             <View style={style.icon_container}>
//               <Icon icon="search" />
//             </View>
//           </View>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={style.button_container}
//             onPress={() =>
//               this.setState({modalVisible: true, selectType: 'trainings'})
//             }>
//             <Icon icon="arrow_right_orange" size={10} />
//             {this.state.selectedTraining ? (
//               <Text style={[style.button_text, {color: '#2D2927'}]}>
//                 {this.state.selectedTraining}
//               </Text>
//             ) : (
//               <Text style={style.button_text}>Select Training</Text>
//             )}
//           </TouchableOpacity>

//           <TouchableOpacity
//             activeOpacity={0.8}
//             style={style.button_container}
//             onPress={() =>
//               this.setState({modalVisible: true, selectType: 'subsessions'})
//             }>
//             <Icon icon="arrow_right_orange" size={10} />
//             {this.state.selectedSubsession ? (
//               <Text style={[style.button_text, {color: '#2D2927'}]}>
//                 {this.state.selectedSubsession}
//               </Text>
//             ) : (
//               <Text style={style.button_text}>Select Subsession</Text>
//             )}
//           </TouchableOpacity>
//         </View>

//         {this.props.filterPracticesLoading ? (
//           <View style={{marginTop: 50}}>
//             <ActivityIndicator size="large" color="#2D2927" />
//           </View>
//         ) : this.props.filterPracticesMessage ? (
//           <Text style={style.message}>{this.props.filterPracticesMessage}</Text>
//         ) : (
//           <ScrollView>
//             <View style={style.items_container}>
//               {this.state.items.map(
//                 (item, i) =>
//                   item.name
//                     .toLowerCase()
//                     .includes(this.state.search.toLowerCase()) && (
//                     <TouchableOpacity
//                       key={i}
//                       activeOpacity={0.8}
//                       style={style.item_container}
//                       onPress={() => {
//                         navigate('Video', {
//                           video: item.videoPlayer,
//                         });
//                       }}>
//                       <View style={style.item_icon}>
//                         <Icon icon="play_orange" />
//                       </View>

//                       <View style={style.item_text_container}>
//                         <Text style={{color: '#999'}}>{item.name}</Text>
//                       </View>
//                     </TouchableOpacity>
//                   ),
//               )}
//             </View>
//           </ScrollView>
//         )}
//       </SafeAreaView>
//     );
//   }
// }

// const style = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   search_container: {
//     height: 40,
//     marginHorizontal: 20,
//     position: 'relative',
//   },
//   input: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#8f8f8f13',
//     padding: 0,
//     paddingHorizontal: 5,
//     flex: 1,
//     borderRadius: 5,
//     color: '#333333',
//     height: 40,
//     fontSize: 18,
//   },
//   icon_container: {
//     position: 'absolute',
//     right: 10,
//     top: 10,
//   },
//   button_container: {
//     marginHorizontal: 20,
//     marginTop: 10,
//     padding: 10,
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     backgroundColor: '#fff',
//   },
//   button_text: {
//     marginLeft: 10,
//     color: '#999',
//   },
//   items_container: {
//     flexWrap: 'wrap',
//     flexDirection: 'row',
//     marginTop: 10,
//   },
//   item_container: {
//     width: Dimensions.get('window').width / 2 - 20,
//     height: Dimensions.get('window').width / 2 - 20,
//     margin: 10,
//     backgroundColor: '#fff',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//     borderRadius: 10,
//     shadowOffset: {width: 0, height: 0},
//     shadowColor: 'black',
//     shadowRadius: 20,
//     shadowOpacity: 0.4,
//     elevation: 20,
//     position: 'relative',
//   },
//   item_icon: {
//     // backgroundColor: '#2D2927',
//     borderRadius: 100,
//     display: 'flex',
//     height: '80%',
//     width: '80%',
//     // opacity: 0.7,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   item_text_container: {
//     position: 'absolute',
//     bottom: 10,
//   },

//   modal: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     ...StyleSheet.absoluteFillObject,
//     position: 'absolute',
//     backgroundColor: '#00000099',
//   },
//   modal_container: {
//     padding: 10,
//     backgroundColor: '#fff',
//     width: Dimensions.get('window').width - 50,
//     borderRadius: 10,
//   },
//   modal_description: {
//     marginVertical: 10,
//     color: '#8f8f8f',
//   },
//   modal_title: {
//     marginVertical: 10,
//     marginLeft: 5,
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   modal_title_container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },

//   select_items_container: {
//     maxHeight: Dimensions.get('window').width / 2,
//     marginTop: 10,
//     paddingHorizontal: 20,
//   },
//   select_item: {
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: '#2D2927',
//     borderRadius: 10,
//   },
//   select_item_text: {
//     color: '#fff',
//   },

//   message: {
//     marginTop: 20,
//     fontSize: 12,
//     color: '#999',
//     textAlign: 'center',
//   },
// });

// function mapStateToProps(state) {
//   return {
//     items: state.reducer.filteredPractices,
//     filterPracticesLoading: state.reducer.filterPracticesLoading,
//     filterPracticesMessage: state.reducer.filterPracticesMessage,

//     subsessions: state.reducer.allSubsessions,
//     subsessionsLoading: state.reducer.allSubsessionsLoading,
//     subsessionsMessage: state.reducer.allSubsessionsMessage,

//     trainings: state.reducer.trainings,
//     trainingsLoading: state.reducer.trainingsLoading,
//     trainingsMessage: state.reducer.trainingsMessage,
//   };
// }

// function mapDispatchToProps(dispatch, payload) {
//   return {
//     filterPractices: filterPractices(dispatch, payload),
//     readSubsessions: readAllSubsessions(dispatch, payload),
//     readTraining: readItems(dispatch, payload),
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DrillLibrary);
import React, {Component} from 'react';
import {
  SafeAreaView,
  BackHandler,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator,
} from 'react-native';
// import {NavigationActions} from 'react-navigation';
import SimpleHeader from '../components/simple_header';
import {connect} from 'react-redux';
import {filterPractices, readAllSubsessions, readItems} from '../redux/action';
import Icon from '../components/icon';
import IconButton from '../components/icon_button';
import {baseURL} from '../api/index';

class DrillLibrary extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      items: [],
      search: '',
      modalVisible: false,
      selectType: '',
      trainings: [],
      subsessions: [],
      selectedTraining: '',
      selectedTrainingId: '',
      selectedSubsession: '',
      selectedSubsessionId: '',
      modalSearch: '',
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
    this.props.filterPractices();
    this.props.readSubsessions();
  }
  handleBackButtonClick = () => {
    // const backAction = NavigationActions.back();
    // this.props.navigation.dispatch(backAction);
    // return true;
    const backAction = this.props.navigation.goBack();
    this.props.navigation.dispatch(backAction);
    return true;
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.items !== prevState.items) {
      return {
        items: nextProps.items,
      };
    }
    if (nextProps.trainings !== prevState.trainings) {
      return {
        trainings: nextProps.trainings,
      };
    }
    if (nextProps.subsessions !== prevState.subsessions) {
      return {
        subsessions: nextProps.subsessions,
      };
    }
    return {};
  }

  selectFilter = item => {
    if (this.state.selectType === 'trainings') {
      this.setState(
        {
          selectedTraining: item.name,
          selectedTrainingId: item.id,
          modalVisible: false,
        },
        () => this.filter(),
      );
    } else if (this.state.selectType === 'subsessions') {
      this.setState(
        {
          selectedSubsession: item.name,
          selectedSubsessionId: item.id,
          modalVisible: false,
        },
        () => this.filter(),
      );
    }
  };

  filter = () => {
    let postObject = {};

    if (this.state.selectedTrainingId) {
      Object.assign(postObject, {training_id: this.state.selectedTrainingId});
    }
    if (this.state.selectedSubsessionId) {
      Object.assign(postObject, {
        subsession_id: this.state.selectedSubsessionId,
      });
    }

    if (Object.keys(postObject).length > 0) {
      this.props.filterPractices(postObject);
    } else {
      this.props.filterPractices();
    }
  };

  renderModal = () => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => this.setState({modalVisible: false, selectType: {}})}
        style={style.modal}>
        <TouchableOpacity activeOpacity={1} style={style.modal_container}>
          <View style={style.modal_title_container}>
            <IconButton
              icon="arrow_left"
              onPress={() =>
                this.setState({modalVisible: false, selectType: {}})
              }
            />
            <Text style={style.modal_title}>Select Training</Text>
          </View>

          <View style={style.search_container}>
            <TextInput
              autoCapitalize="none"
              placeholder="Search"
              style={style.input}
              returnKeyType="next"
              value={this.state.modalSearch}
              onChangeText={modalSearch => this.setState({modalSearch})}
            />
            <View style={style.icon_container}>
              <Icon icon="search" />
            </View>
          </View>

          <ScrollView style={style.select_items_container}>
            <TouchableOpacity
              style={style.select_item}
              onPress={() => this.selectFilter('')}>
              <Text style={style.select_item_text}>All</Text>
            </TouchableOpacity>
            {this.state.selectType === 'trainings'
              ? this.state.trainings.map(
                  (item, i) =>
                    item.name
                      .toLowerCase()
                      .includes(this.state.modalSearch.toLowerCase()) && (
                      <TouchableOpacity
                        style={style.select_item}
                        onPress={() => this.selectFilter(item)}
                        key={i}>
                        <Text style={style.select_item_text}>{item.name}</Text>
                      </TouchableOpacity>
                    ),
                )
              : this.state.selectType === 'subsessions'
              ? this.state.subsessions.map(
                  (item, i) =>
                    item.name
                      .toLowerCase()
                      .includes(this.state.modalSearch.toLowerCase()) && (
                      <TouchableOpacity
                        style={style.select_item}
                        onPress={() => this.selectFilter(item)}
                        key={i}>
                        <Text style={style.select_item_text}>{item.name}</Text>
                      </TouchableOpacity>
                    ),
                )
              : null}
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    //navigate('ScreenName') - forward
    //this.handleBackButtonClick - back
    return (
      <SafeAreaView style={style.container}>
        <Modal visible={this.state.modalVisible} transparent={true}>
          {this.renderModal()}
        </Modal>

        <View
          style={{elevation: 2, backgroundColor: '#fff', paddingBottom: 10}}>
          <SimpleHeader
            onPress={this.handleBackButtonClick}
            title="Drill Library"
          />

          <View style={style.search_container}>
            <TextInput
              autoCapitalize="none"
              placeholder="Search"
              style={style.input}
              returnKeyType="next"
              value={this.state.search}
              onChangeText={search => this.setState({search})}
            />
            <View style={style.icon_container}>
              <Icon icon="search" />
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={style.button_container}
            onPress={() =>
              this.setState({modalVisible: true, selectType: 'trainings'})
            }>
            <Icon icon="arrow_right_orange" size={10} />
            {this.state.selectedTraining ? (
              <Text style={[style.button_text, {color: '#2D2927'}]}>
                {this.state.selectedTraining}
              </Text>
            ) : (
              <Text style={style.button_text}>Select Training</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            style={style.button_container}
            onPress={() =>
              this.setState({modalVisible: true, selectType: 'subsessions'})
            }>
            <Icon icon="arrow_right_orange" size={10} />
            {this.state.selectedSubsession ? (
              <Text style={[style.button_text, {color: '#2D2927'}]}>
                {this.state.selectedSubsession}
              </Text>
            ) : (
              <Text style={style.button_text}>Select Subsession</Text>
            )}
          </TouchableOpacity>
        </View>

        {this.props.filterPracticesLoading ? (
          <View style={{marginTop: 50}}>
            <ActivityIndicator size="large" color="#2D2927" />
          </View>
        ) : this.props.filterPracticesMessage ? (
          <Text style={style.message}>{this.props.filterPracticesMessage}</Text>
        ) : (
          <ScrollView>
            <View style={style.items_container}>
              {this?.state?.items?.map(
                (item, i) =>
                  item.name
                    .toLowerCase()
                    .includes(this.state.search.toLowerCase()) && (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.8}
                      style={style.item_container}
                      onPress={() =>
                        navigate('Video', {
                          video:
                            baseURL + item.video?.slice(1, item?.video?.length),
                        })
                      }>
                      <View style={style.item_icon}>
                        <Icon icon="play_orange" />
                      </View>

                      <View style={style.item_text_container}>
                        <Text style={{color: '#999'}}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  ),
              )}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  search_container: {
    height: 40,
    marginHorizontal: 20,
    position: 'relative',
  },
  input: {
    height: '100%',
    width: '100%',
    backgroundColor: 'lightgray',
    padding: 0,
    paddingHorizontal: 5,
    flex: 1,
    borderRadius: 5,
    color: 'black',
    height: 40,
    fontSize: 18,
  },
  icon_container: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button_container: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  button_text: {
    marginLeft: 10,
    color: '#999',
  },
  items_container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 10,
  },
  item_container: {
    width: Dimensions.get('window').width / 2 - 20,
    height: Dimensions.get('window').width / 2 - 20,
    margin: 10,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 0},
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.4,
    elevation: 20,
    position: 'relative',
  },
  item_icon: {
    // backgroundColor: '#2D2927',
    borderRadius: 100,
    display: 'flex',
    height: '80%',
    width: '80%',
    // opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item_text_container: {
    position: 'absolute',
    bottom: 10,
  },

  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
    position: 'absolute',
    backgroundColor: '#00000099',
  },
  modal_container: {
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width - 50,
    borderRadius: 10,
  },
  modal_description: {
    marginVertical: 10,
    color: '#8f8f8f',
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

  select_items_container: {
    maxHeight: Dimensions.get('window').width / 2,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  select_item: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  select_item_text: {
    color: '#fff',
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
    items: state.reducer.filteredPractices,
    filterPracticesLoading: state.reducer.filterPracticesLoading,
    filterPracticesMessage: state.reducer.filterPracticesMessage,

    subsessions: state.reducer.allSubsessions,
    subsessionsLoading: state.reducer.allSubsessionsLoading,
    subsessionsMessage: state.reducer.allSubsessionsMessage,

    trainings: state.reducer.trainings,
    trainingsLoading: state.reducer.trainingsLoading,
    trainingsMessage: state.reducer.trainingsMessage,
  };
}

function mapDispatchToProps(dispatch, payload) {
  return {
    filterPractices: filterPractices(dispatch, payload),
    readSubsessions: readAllSubsessions(dispatch, payload),
    readTraining: readItems(dispatch, payload),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DrillLibrary);
