/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, TouchableOpacity, Image, Button, TouchableHighlight } from "react-native";
import { Languages, Tools, withTheme } from "@common";
import styles from "./styles";
import { Images } from "@common";
import { toast } from "@app/Omni";

class UserProfileHeader extends PureComponent {

  static propTypes = {
    onLogin: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
    user: PropTypes.object,
  };

  loginHandle = () => {
    if (this.props.userInfo.name === Languages.Guest) {
      this.props.onLogin();
    } else {
      this.props.onLogout();
    }
  };

  /**
   * 
   * @param {string} name 
   * 更换头像
   */
  replaceAvatar = (name) => {
    return;
    if (Languages.Guest === name) {
      toast(Languages.RegisterErr)
      return
    }
    this.props.openPopup(true)
  }


  render() {
    const { userInfo } = this.props;
    const avatar = Tools.getAvatar(userInfo);
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.header}>
          <TouchableHighlight style={styles.imgView} onPress={() => { this.replaceAvatar(userInfo.name) }}>
          {/* {
            this.props.avatar ||this.props.avatar===0? <Image
              source={Images.portrait[this.props.avatar]}
              resizeMethod='scale'
              style={styles.avatar}
            /> :
            <Image 
            style={styles.avatar}  
            resizeMethod='scale' 
            source={Images.defaultAvatar}
            />
          } */}
           <Image
              source={Images.portrait[11]}
              resizeMethod='scale'
              style={styles.avatar}
            />
           {/* {this.props.avatar?<Image 
           style={styles.avatar}  
           resizeMethod='scale' 
           source={Images.portrait[this.props.avatar]}
           />:'Guest' === avatar?<Image 
           style={styles.avatar}  
           resizeMethod='scale' 
           source={Images.defaultAvatar}
           />
           :<Image style={styles.avatar}  
           resizeMethod='scale' 
           source={Images.defaultAvatar}></Image>} */}
           {/* <View style={{...styles.avatar,backgroundColor:'gray'}}></View> */}
          </TouchableHighlight>
          <View style={styles.textContainer}>
            <View style={styles.line}>
              <Text style={[styles.fullName, { color: text }]}>{userInfo.name}</Text>
              <Text style={[styles.address, { color: text }]}>
                {userInfo ? userInfo.address : ""}
              </Text>
            </View>

            <TouchableOpacity onPress={this.loginHandle}>
              <Text style={styles.loginText}>
                {userInfo.name === Languages.Guest
                  ? Languages.Login
                  : Languages.Logout}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {!userInfo.IsMember&&<Button title={Languages.RegisteredMembers} onPress={this.props.member}></Button>}
      </View>
    );
  }
}

export default withTheme(UserProfileHeader);
