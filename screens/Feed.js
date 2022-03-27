import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
    Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from "./PostCard";

import { FlatList } from "react-native-gesture-handler";

let posts = require("./temp_post.json");

export default class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts:[]
        };
    }

    componentDidMount() { }

    renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation}/>;
    };

    keyExtractor = (item, index) => index.toString();
    fetchPosts = () => {
        firebase
          .database()
          .ref('/posts/')
          .on(
            'value',
            (snapshot) => {
              let stories = [];
              if (snapshot.val()) {
                Object.keys(snapshot.val()).forEach(function (key) {
                  stories.push({
                    key: key,
                    value: snapshot.val()[key],
                  });
                });
              }
              this.setState = {
                posts:posts,
              };
              this.props.setUpdateToFalse();
            },
            function (errorObject) {
              console.log('Read Failed ' + errorObject.code);
            }
          );
      };
    render() {
        return (
            <View style={            
                this.state.light_theme ? styles.containerLight : styles.container
            }>
                <SafeAreaView style={styles.droidSafeArea} />
                <View style={styles.appTitle}>
                    <View style={styles.appIcon}>
                        <Image
                            source={require("../assets/logo.png")}
                            style={styles.iconImage}
                        ></Image>
                    </View>
                    <View style={styles.appTitleTextContainer}>
                        <Text style={
                            this.state.light_theme
                            ? styles.appTitleTextLight
                            : styles.appTitleText
                        }>Spectagram</Text>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={posts}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    containerLight: {
        flex: 1,
        backgroundColor: "white"
      },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
        flex: 0.07,
        flexDirection: "row"
    },
    appIcon: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    iconImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    appTitleTextContainer: {
        flex: 0.8,
        justifyContent: "center"
    },
    appTitleText: {
        color: "white",
        fontSize: RFValue(28),
    },
    appTitleTextLight: {
        color: "black",
        fontSize: RFValue(28),
        fontFamily: "Bubblegum-Sans"
      },
    cardContainer: {
        flex: 0.85
    }
});