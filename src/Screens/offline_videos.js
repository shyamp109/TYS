// import React, {Component} from 'react';
// import {
//   Text,
//   SafeAreaView,
//   View,
//   BackHandler,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ActivityIndicator,
//   Platform,
//   Alert,
//   FlatList,
// } from 'react-native';

// import axiosInstance, {baseURL} from '../api';
// import RNFetchBlob from 'rn-fetch-blob';
// import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const OfflineVideos = props => {
//   const [loading, setLoading] = React.useState(true);
//   const [server, setServer] = React.useState([]);
//   const [hasPermission, setHasPermission] = React.useState(false);
//   const [saved, setSaved] = React.useState([]);
//   const [endNumber, setEndNumber] = React.useState(0);

//   React.useEffect(() => {
//     AsyncStorage.getItem('offline_videos').then(value => {
//       if (value) {
//         setSaved(JSON.parse(value));
//       }
//     });
//   }, []);

//   React.useEffect(() => {
//     AsyncStorage.setItem('offline_videos', JSON.stringify(saved));
//   }, [saved]);

//   React.useEffect(() => {
//     checkPermission();
//     axiosInstance
//       .post('videos/paths/tssp', {})
//       .then(res => {
//         setLoading(false);
//         setServer(res.data.data);
//       })
//       .catch(err => {
//         setLoading(false);
//       });
//   }, []);

//   const checkPermission = async () => {
//     if (Platform.OS === 'ios') {
//       try {
//         request(PERMISSIONS.IOS.PHOTO_LIBRARY)
//           .then(res => {
//             console.log('permission granted', res);
//             setHasPermission(true);
//           })
//           .catch(error => console.log('permission denied', error));
//       } catch (err) {
//         console.log('error ios' + err);
//       }
//     } else {
//       try {
//         request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO, {
//           title: 'Storage Permission Required',
//           message:
//             'Application needs access to your storage to download videos',
//         })
//           .then(res => {
//             setHasPermission(true);
//           })
//           .catch(error => {
//             console.log('permission denied', error);
//           });
//       } catch (err) {
//         console.log('error in android' + err);
//       }
//     }
//   };

//   const getFileExtention = fileUrl => {
//     // To get the file extension
//     return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
//   };

//   const downloadFile = (item, cb) => {
//     let date = new Date().getTime();
//     let FILE_URL = baseURL + item.video_path;
//     let file_ext = getFileExtention(FILE_URL);

//     file_ext = '.' + file_ext[0];
//     const {config, fs} = RNFetchBlob;
//     let iosDir = fs.dirs.DocumentDir;
//     let androidDir = fs.dirs.PictureDir;
//     let options = {
//       fileCache: true,
//       addAndroidDownloads: {
//         path: Platform.select({
//           ios: iosDir + '/TrueCoach/' + item.name + date + file_ext,
//           android: androidDir + '/TrueCoach/' + item.name + date + file_ext,
//         }),
//         description: 'downloading file...',
//         notification: true,
//         useDownloadManager: true,
//       },
//       path: Platform.select({
//         ios: iosDir + '/TrueCoach/' + item.name + date + file_ext,
//         android: androidDir + '/TrueCoach/' + item.name + date + file_ext,
//       }),
//     };
//     config(options)
//       .fetch('GET', FILE_URL)
//       .then(res => {
//         console.log('res -> ', JSON.stringify(res.path()));
//         cb(res);
//       });
//   };

//   const downloadAll = () => {
//     if (hasPermission) {
//       const toDownload = server.filter(el => !isSaved(el));
//       const size = toDownload.reduce((acc, curr) => {
//         return acc + curr.size;
//       }, 0);

//       const start = () => {
//         setEndNumber(toDownload.length);
//         toDownload.forEach(element => {
//           downloadFile(element, res => {
//             setEndNumber(endNumber - 1);
//             setSaved(prev => [
//               ...prev,
//               {
//                 url: res.path(),
//                 name: element.name,
//                 id: element.id,
//               },
//             ]);
//           });
//         });
//       };
//       if (toDownload.length > 0) {
//         // Alert.alert(
//         //   'Download videos',
//         //   `Download size is ${size}MB. Make sure you have enough space.\nStay online and don't close the application.`,
//         //   [
//         //     {
//         //       onPress: () => start(),
//         //       text: 'Download',
//         //       style: 'default',
//         //     },
//         //     {
//         //       onPress: null,
//         //       text: 'Cancel',
//         //       style: 'cancel',
//         //     },
//         //   ],
//         // );
//       } else {
//         // Alert.alert('All videos downloaded.');
//       }
//     } else {
//       checkPermission();
//     }
//   };

//   const downloadOne = (element, hasIt) => {
//     if (hasIt) {
//       const start = () => {
//         setEndNumber(1);
//         downloadFile(element, res => {
//           setEndNumber(endNumber - 1);

//           console.log('my video', {
//             url: res.path(),
//             name: element.name,
//             id: element.id,
//           });

//           setSaved(prev => [
//             ...prev,
//             {
//               url: res.path(),
//               name: element.name,
//               id: element.id,
//             },
//           ]);
//         });
//       };
//     } else {
//       checkPermission();
//     }
//   };

//   const isSaved = item => saved.find(sav => sav.id == item.id);

//   if (endNumber > 0) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: 40,
//         }}>
//         <ActivityIndicator />
//         <Text style={{marginTop: 20}}>
//           Stay online and don't close the application while download is in
//           progress.
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={style.container}>
//       <View>
//         <TouchableOpacity
//           activeOpacity={0.8}
//           style={style.button}
//           onPress={() => downloadAll()}>
//           <Text style={style.button_text}>Download all videos</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={server.length > 0 ? server : saved}
//         extraData={saved}
//         renderItem={({item, index}) =>
//           isSaved(item) ? (
//             <TouchableOpacity
//               style={[style.item, {backgroundColor: 'white'}]}
//               onPress={() => {
//                 props.navigation.navigate('video', {
//                   video:
//                     Platform.OS === 'android'
//                       ? 'file://' + saved.find(el => el.id == item.id).url
//                       : saved.find(el => el.id == item.id).url,
//                 });
//               }}>
//               <Text numberOfLines={1} style={{flex: 1, marginRight: 8}}>
//                 {item.name}
//               </Text>
//               <Text style={style.play}>Play</Text>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity
//               activeOpacity={0.8}
//               style={[style.item, {backgroundColor: 'lightgrey'}]}
//               onPress={() => {
//                 downloadOne(item, hasPermission);
//               }}>
//               <Text numberOfLines={1} style={{flex: 1, marginRight: 8}}>
//                 {item.name}
//               </Text>
//               <Text style={style.download}>Download</Text>
//             </TouchableOpacity>
//           )
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     margin: 20,
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   button: {
//     backgroundColor: '#2D2927',
//     borderRadius: 15,
//     paddingHorizontal: 40,
//     paddingVertical: 10,
//     shadowOffset: {width: 0, height: 0},
//     shadowColor: '#2D2927',
//     shadowRadius: 20,
//     shadowOpacity: 0.4,
//     elevation: 20,
//     marginBottom: 15,
//   },
//   button_text: {
//     color: '#fff',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   error_message: {
//     textAlign: 'center',
//     color: '#c986a1',
//     height: 40,
//     fontSize: 12,
//     marginTop: 20,
//   },
//   item: {
//     backgroundColor: '#ffffff',
//     borderRadius: 15,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginBottom: 10,
//     borderWidth: 0.5,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   play: {
//     color: '#2D2927',
//     fontWeight: 'bold',
//   },
//   download: {
//     color: 'grey',
//     fontWeight: 'bold',
//   },
// });

// export default OfflineVideos;
import React, {useEffect, useState} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
  FlatList,
} from 'react-native';
import axiosInstance, {baseURL} from '../api';
import RNFetchBlob from 'rn-fetch-blob';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
async function getToken() {
  const userString = await AsyncStorage.getItem('user');
  if (userString !== null) {
    const userJson = await JSON.parse(userString);
    return userJson.token;
  } else {
    return;
  }
}
const OfflineVideos = props => {
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState([]);
  const [hasPermission, setHasPermission] = useState(false);
  const [saved, setSaved] = useState([]);
  const [downloading, setDownloading] = useState(0);

  useEffect(() => {
    AsyncStorage.getItem('offline_videos').then(value => {
      if (value) {
        setSaved(JSON.parse(value));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('offline_videos', JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    checkPermission();
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    axios
      .get('http://api.truecoachapp.com/load/media/all', {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + (await getToken()),
        },
      })
      .then(res => {
        setLoading(false);
        setServer(res.data);
      })
      .catch(err => {
        setLoading(false);
        console.error('Error fetching videos:', err);
        Alert.alert('Error', 'Failed to fetch videos from server.');
      });
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      try {
        request(PERMISSIONS.IOS.PHOTO_LIBRARY)
          .then(res => {
            setHasPermission(true);
          })
          .catch(error => console.log('permission denied', error));
      } catch (err) {
        console.log('error ios' + err);
      }
    } else {
      try {
        request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO, {
          title: 'Storage Permission Required',
          message:
            'Application needs access to your storage to download videos',
        })
          .then(res => {
            setHasPermission(true);
          })
          .catch(error => {
            console.log('permission denied', error);
          });
      } catch (err) {
        console.log('error in android' + err);
      }
    }
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const downloadFile = (item, cb) => {
    console.log('item: ', item);
    // Get today's date to add the time suffix in filename
    let date = new Date().getTime();
    // File URL which we want to download
    let FILE_URL = baseURL + item.url;
    // let FILE_URL =
    //   'http://api.truecoachapp.com/storage/media_gallery/videos/Sample%20video%202.mp4';
    console.log('FILE_URL: ', FILE_URL);
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let iosDir = fs.dirs.DocumentDir;
    let androidDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: Platform.select({
          ios: iosDir + '/TrueCoach/' + item.name + date + file_ext,
          android: androidDir + '/TrueCoach/' + item.name + date + file_ext,
        }),
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
      path: Platform.select({
        ios: iosDir + '/TrueCoach/' + item.name + date + file_ext,
        android: androidDir + '/TrueCoach/' + item.name + date + file_ext,
      }),
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        if (Platform.OS === 'ios') {
          CameraRoll.saveAsset(res?.data, {type: 'video'})
            .then(res => {
              console.log('video downloaded');
            })
            .catch(err => {
              console.log('error to download video');
            });
        }
        cb(res);
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const downloadAll = () => {
    if (hasPermission) {
      const toDownload = server.filter(el => !isSaved(el));

      setDownloading(toDownload.length);

      toDownload.forEach(element => {
        downloadFile(element, res => {
          setSaved(prev => [
            ...prev,
            {
              url: res.path(),
              name: element.name,
              id: element.id,
            },
          ]);
          setDownloading(prev => prev - 1);
        });
      });
    } else {
      checkPermission();
    }
  };

  const downloadOne = element => {
    console.log('element: ', element);
    if (hasPermission) {
      setDownloading(1);
      downloadFile(element, res => {
        setSaved(prev => [
          ...prev,
          {
            url: res.path(),
            name: element.name,
            id: element.id,
          },
        ]);
        setDownloading(0);
      });
    } else {
      checkPermission();
    }
  };

  const isSaved = item => saved.some(sav => sav.id === item.id);

  if (downloading > 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator />
        <Text style={styles.loadingText}>
          Stay online and don't close the application while download is in
          progress.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={downloadAll}>
          <Text style={styles.buttonText}>Download all videos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={server?.length > 0 ? server : saved}
        extraData={saved}
        renderItem={({item}) =>
          isSaved(item) ? (
            <TouchableOpacity
              style={[styles.item, {backgroundColor: 'white'}]}
              onPress={() => {
                const videoUrl =
                  Platform.OS === 'android'
                    ? `file://${saved.find(el => el.id === item.id).url}`
                    : saved.find(el => el.id === item.id).url;

                props.navigation.navigate('Video', {video: videoUrl});
              }}>
              <Text
                numberOfLines={1}
                style={{flex: 1, marginRight: 8, color: '#2D2927'}}>
                {item.name}
              </Text>
              <Text style={styles.playText}>Play</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.item, {backgroundColor: 'lightgrey'}]}
              onPress={() => {
                console.log('item', item);
                downloadOne(item);
              }}>
              <Text
                numberOfLines={1}
                style={{flex: 1, marginRight: 8, color: '#2D2927'}}>
                {item.name}
              </Text>
              <Text style={styles.downloadText}>Download</Text>
            </TouchableOpacity>
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#2D2927',
  },
  item: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playText: {
    color: '#2D2927',
    fontWeight: 'bold',
  },
  downloadText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default OfflineVideos;
