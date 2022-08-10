/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Text, Switch, Modal, Image, TouchableOpacity,Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import _ from "lodash";

import {
  UserProfileHeader,
  UserProfileItem,
  ModalBox,
  CurrencyPicker,
} from "@components";
import { Languages, Color, Tools, Config, withTheme, Images } from "@common";
import { getNotification } from "@app/Omni";
import { firebase } from '@react-native-firebase/database';
import { toast } from "@app/Omni";

import styles from "./styles";

class UserProfile extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      pushNotification: false,
      modalVisible: false,
      avatar: "",
    };
  }

  componentDidMount() {
    this._getNotificationStatus();
    this._handleSwitchNotification(true);
  }

  _getNotificationStatus = async () => {
    const notification = await getNotification();

    this.setState({ pushNotification: notification || false });
  };

  /**
   * TODO: refactor to config.js file
   */
  _getListItem = () => {
    const { currency, wishListTotal, userProfile, isDarkTheme } = this.props;
    const listItem = [...Config.ProfileSettings];
    const items = [];
    let index = 0;
    // console.log(listItem, 'firstListItem')
    for (let i = 0; i < listItem.length; i++) {
      const item = listItem[i];
      if (item.label === "PushNotification") {
        item.icon = () => (
          <Switch
            onValueChange={this._handleSwitchNotification}
            value={this.state.pushNotification}
            trackColor={Color.blackDivide}
          />
        );
      }
      // if (item.label == "memberCenter") {
      //   items.push({ label: Languages.MemberCenter })
      // }
      if (item.label === "DarkTheme") {
        item.icon = () => (
          <Switch
            onValueChange={this._onToggleDarkTheme}
            value={isDarkTheme}
            trackColor={Color.blackDivide}
          />
        );
      }
      if (item.label === "Currency") {
        item.value = currency.code;
      }

      if (item.label === "WishList") {
        items.push({
          ...item,
          label: `${Languages.WishList} (${wishListTotal})`,
        });
      } else {
        items.push({ ...item, label: Languages[item.label] });
      }
    }

    if (!userProfile.user) {
      index = _.findIndex(items, (item) => item.label === Languages.Address);
      if (index > -1) {
        items.splice(index, 1);
      }
    }

    if (!userProfile.user || Config.Affiliate.enable) {
      index = _.findIndex(items, (item) => item.label === Languages.MyOrder);
      if (index > -1) {
        items.splice(index, 1);
      }
    }
    return items;
  };

  _onToggleDarkTheme = () => {
    this.props.toggleDarkTheme();
  };

  _handleSwitchNotification = (value) => {
    AsyncStorage.setItem("@notification", JSON.stringify(value), () => {
      this.setState({
        pushNotification: value,
      });
    });
  };
  //跳转
  _handlePress = (item) => {
    const { navigation, userProfile } = this.props;
    const { routeName, isActionSheet } = item;

    if (routeName && !isActionSheet) {
      const user = userProfile.user || {};
      const name = Tools.getName(user);
      if ('MemberCenter' === routeName) {
        if (Languages.Guest === name) {
          toast(Languages.RegisterErr)
          return
        } else if (!user.IsMember) {
          toast(Languages.MemberErr)
          return
        }
      }
      navigation.navigate(routeName, item.params);
    }

    if (isActionSheet) {
      this.currencyPicker.openModal();
    }
  };

  //删除用户弹框
  _deleteConsumer=()=>{
    //Languages.deleteTips
      Alert.alert('',Languages.deleteTip,[
        { text: '取消' },
        { text: '确定', onPress:()=>this._toDelConsumer()},
      ])
   }
   _toDelConsumer=async ()=>{
        const {userProfile,navigation}=this.props;
        console.log(userProfile.user.id);
        alert(Languages.deleteSuccess)
        navigation.navigate("LoginScreen", { isLogout: true })
        
        //删除账号
        // let res=await WPUserAPI.DeleteConsumer(userProfile.user.id);
        // if(res.code){
        //   alert(Languages.deleteDefault)
        //   return;
        // }
        // alert(Languages.deleteSuccess)
        // navigation.navigate("LoginScreen", { isLogout: true })
        // console.log("点了确定")
   }
   
  /**
   * 
   * @param {Boolean} boolean
   * 打开或关闭选择头像弹窗 
   */
  openPopup = (boolean) => {
    this.setState({ modalVisible: boolean })
  }
  /**
   * 
   * @param {object} user 
   * @param {string} url
   * 选择头像上传
   */
  selectImg = (user, url) => {
    const { userProfile } = this.props;
    let userData = JSON.parse(JSON.stringify(user))
    this.setState({ avatar: url, modalVisible: false })
    let data = {}
    data = { avatar_url: url }
    userData.avatar_url = url
    firebase
      .app().database()
      .ref(`/users/${user.id}`)
      .update(data)
      .then(() => {
        this.props.login(userData, userProfile.token)
      })
      .catch((err) => { console.log(err, '上传失败') })
  }

  /**
   * 注册为会员
   * @returns 
   */
  member = () => {
    const { userProfile } = this.props;
    const userInfo = userProfile.user || {};
    let userData = JSON.parse(JSON.stringify(userInfo))
    if (!userInfo.id) {
      toast(Languages.RegisterErr)
      return
    }

    //注册
    firebase
      .app().database()
      .ref(`/users/${userInfo.id}`)
      .update({ usedPoints: 0, IsMember: true })
      .then((res) => {
        console.log(res, '注册会员成功')
        toast(Languages.MemberSuccess)
        userData.IsMember = true
        this.props.login(userData, userProfile.token)
      })
      .catch((err) => { console.log(err, '注册会员失败') })
  }


  render() {
    const { userProfile, navigation, currency, changeCurrency } = this.props;
    const user = userProfile.user || {};
    // console.log(userProfile, '999999999')
    const name = Tools.getName(user);
    const listItem = this._getListItem();
    const {
      theme: {
        colors: { background },
        dark,
      },
    } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <ScrollView ref="scrollView">
          <UserProfileHeader
            isMember={this.isMember}
            avatar={this.state.avatar}
            openPopup={this.openPopup}
            member={this.member}
            onLogin={() => navigation.navigate("LoginScreen")}
            onLogout={() =>
              navigation.navigate("LoginScreen", { isLogout: true })
            }
            userInfo={{
              ...user,
              name,
            }}
          />

          {userProfile.user && (
            <View style={[styles.profileSection(dark)]}>
              <Text style={styles.headerSection}>
                {Languages.AccountInformations.toUpperCase()}
              </Text>
              <UserProfileItem
                label={Languages.Name}
                onPress={this._handlePress}
                value={name}
              />
              <UserProfileItem label={Languages.Email} value={user.email} />
              {/* <UserProfileItem label={Languages.Address} value={user.address} /> */}
            </View>
          )}
          {/* 用户资料列表 */}
          <View style={[styles.profileSection(dark)]}>
            {listItem.map((item, index) => {
              if (item.label) {
                return (
                  item && (
                    <UserProfileItem
                      icon
                      key={index.toString()}
                      onPress={() => this._handlePress(item)}
                      {...item}
                    />
                  )
                );
              }
            })}
          </View>
          {
          //删除用户按钮
          }
          <TouchableOpacity onPress={this._deleteConsumer}>
          {
              userProfile.user&& 
              <Text style={{textAlign:'center',color:'white',backgroundColor:'tomato',padding:15}}>{Languages.deleteButton}</Text>
           }
           </TouchableOpacity>
        </ScrollView>

        <ModalBox ref={(c) => (this.currencyPicker = c)}>
          <CurrencyPicker currency={currency} changeCurrency={changeCurrency} />
        </ModalBox>
        <Modal
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setState({ modalVisible: false }) }}
        >
          <View style={styles.mask}>
            <View style={styles.imgContent}>
              {
                Images.portrait.map((item, index) => {
                  return <TouchableOpacity key={'q' + index} onPress={() => { this.selectImg(user, index) }}>
                    <Image source={item} style={styles.imgStyle} />
                  </TouchableOpacity>
                })
              }
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = ({ user, language, currency, wishList, app }) => ({
  userProfile: user,
  language,
  currency,
  wishListTotal: wishList.wishListItems.length,
  isDarkTheme: app.isDarkTheme,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions: CurrencyActions } = require("@redux/CurrencyRedux");
  const { toggleDarkTheme } = require("@redux/AppRedux");
  const { actions } = require("@redux/UserRedux");
  return {
    ...ownProps,
    ...stateProps,
    changeCurrency: (currency) =>
      CurrencyActions.changeCurrency(dispatch, currency),
    toggleDarkTheme: () => {
      dispatch(toggleDarkTheme());
    },
    login: (user, token) => dispatch(actions.login(user, token)),
  };
}

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(withTheme(UserProfile));
