import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import * as Speech from 'expo-speech';
import firebase from 'firebase';
let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class PostScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        fontsLoaded: false,
        speakerColor: 'gray',
        speakerIcon: 'volume-high-outline',
        light_theme:false
      };
    }

    async loadFontsAsync() {
      await Font.loadAsync(customFonts);
      this.setState({
        fontsLoaded: true,
      });
    }
    componentDidMount() {
      this.loadFontsAsync();
    }
    fetchUser = () => {
      let theme;
      firebase
        .database()
        .ref("/users/" + firebase.auth().currentUser.uid)
        .on("value", snapshot => {
          theme = snapshot.val().current_theme;
          this.setState({ light_theme: theme === "light" });
        });
    };
    async initateTTS(author,caption) {
      const currentColor = this.state.speakerColor;
      this.setState({
        speakerColor: currentColor === 'gray' ? '#ee8249' : 'gray',
      });
      if (currentColor === 'gray') {
        Speech.speak('Post by ${author}');
        Speech.speak('&{caption}');
      } else {
        Speech.stop();
      }
    }
    render() {
      if (!this.props.route.params) {
        this.props.navigation.navigate('Home');
      } else if (!this.state.fontsLoaded) {
        return <AppLoading />;
      } else {
        return (
          <View style={this.state.light_theme ? styles.containerLight : styles.container}>
            <SafeAreaView style={styles.droidSafeArea} />
            <View style={styles.appTitle}>
              <View style={styles.appIcon}>
                <Image
                  source={require('../assets/logo.png')}
                  style={styles.iconImage}></Image>
              </View>
            </View>
            <View style={styles.postContainer}>
              <ScrollView style={styles.postCard}>
                <Image
                  source={require('../assets/image_1.png')}
                  style={styles.image}></Image>
                <View style={styles.dataContainer}>
                  <View style={styles.titleTextContainer}>
                    <Text style={this.state.light_theme?styles.postAuthorTextLight:styles.postAuthorText}>
                      {this.props.route.params.post.author}
                    </Text>
                    <Text style={this.state.light_theme?styles.postCaptionTextLight:styles.postCaptionText}>
                      {this.props.route.params.post.caption}
                    </Text>
                  </View>
                  <View style={styles.iconContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        this.initiateTTS(
                          this.props.route.params.story.author,
                          this.props.route.params.story.caption,
                        )
                      }>
                      <Ionicons
                        name={this.state.speakerIcon}
                        size={RFValue(30)}
                        color={this.state.speakerColor}
                        style={{ margin: RFValue(15) }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.actionContainer}>
                  <View style={styles.likeButton}>
                    <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
                    <Text style={styles.likeText}>12k</Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#15193c',
    },
    containerLight:{
      flex:1,
      backgroundColor:"white"
    },
    droidSafeArea: {
      marginTop:
        Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
    },
    appTitle: {
      flex: 0.07,
      flexDirection: 'row',
    },
    appIcon: {
      flex: 0.3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: 'center',
    },
    appTitleText: {
      color: 'white',
      fontSize: RFValue(28),
      fontFamily: 'Bubblegum-Sans',
    },
    postContainer: {
      flex: 1,
    },
    postCard: {
      margin: RFValue(20),
      backgroundColor: '#2f345d',
      borderRadius: RFValue(20),
    },
    image: {
      width: '100%',
      alignSelf: 'center',
      height: RFValue(200),
      borderTopLeftRadius: RFValue(20),
      borderTopRightRadius: RFValue(20),
      resizeMode: 'contain',
    },
    dataContainer: {
      flexDirection: 'row',
      padding: RFValue(20),
    },
    titleTextContainer: {
      flex: 0.8,
    },
    postAuthorText: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(18),
      color: 'white',
    },
    postAuthorTextLight: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      color: "black"
    },
    postCaptionText: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(18),
      color: 'white',
    },
    postCaptionTextLight: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      color: "black"
    },
    iconContainer: {
      flex: 0.2,
    },
    postTextContainer: {
      padding: RFValue(20),
    },
    postText: {
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(15),
      color: 'white',
    },
    postTextLight: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(15),
      color: "black"
    },
   ionContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      margin: RFValue(10),
    },
    likeButton: {
      width: RFValue(160),
      height: RFValue(40),
      flexDirection: 'row',
      backgroundColor: '#eb3948',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: RFValue(30),
    },
    likeText: {
      color: 'white',
      fontFamily: 'Bubblegum-Sans',
      fontSize: RFValue(25),
      marginLeft: RFValue(5),
    },
    likeTextLight: {
      fontFamily: "Bubblegum-Sans",
      fontSize: RFValue(25),
      marginLeft: RFValue(5)
    }
  });