import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
let post = require('./temp_post.json');

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state={
      light_theme:true,
      post_id:this.props.post.key,
      post_data:this.props.post.value
    }
  }
  renderItem = ({ item: story }) => {
    return <PostCard story={story} />;
  };

  keyExtractor = (item, index) => {
    index.toString();
  };

  render() {
    return (
        <View style={this.state.light_theme ? styles.containerLight : styles.container}>
          <View style={styles.authorContainer}>
            <View style={styles.authorImageContainer}>
              <Image
                source={require('../assets/profile_img.png')}
                style={styles.postImage}></Image>
            </View>
            <View style={styles.authorNameContainer}>
              <Text style={this.state.light_theme?styles.postAuthorTextLight:styles.postAuthorText}>
                {this.props.post.author}
              </Text>
            </View>
          </View>
          <Image
            source={require('../assets/post.jpeg')}
            style={styles.postImage}
          />
          <View style={styles.captionContainer}>
            <Text style={
              this.state.light_theme?styles.captionTextLight:styles.captionText
            }>{this.props.post.caption}</Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={'heart'} size={RFValue(30)} color={'white'} />
              <Text style={this.state.light_theme?styles.likeTextLight:styles.likeText}>12k</Text>
            </View>
          </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  containerLight:{
    flex:1,
    backgroundColor:"white"
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: '#2f345d',
    borderRadius: RFValue(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2)
  },
  authorImageContainer: {
    alignSelf: 'center',
  },
  postImage: {
    resizeMode: 'contain',
    width: '95%',
    alignSelf: 'center',
    height: RFValue(250),
  },
  authorContainer: {
    flex: 1,
  },
  authorNameContainer: { paddingLeft: RFValue(2), justifyContent: 'center' },
  postAuthorText: {
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
    color: 'white',
  },
  postAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black"
  },
  captionText: {
    fontFamily: 'Bubblegum-Sans',
    fontSize: 13,
    color: 'white',
  },
  captionTextLight:{
    fontFamily:'Bubblegum-Sans',
    fontSize:13,
    color:"black"
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
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
