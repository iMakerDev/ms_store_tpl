/** @format */

import React, { PureComponent } from "react";
import { View, ScrollView, Image, I18nManager } from "react-native";
import { connect } from "react-redux";
import { Styles, Config, Tools } from "@common";
import { Text } from "@components";
import { DrawerButton } from "../DrawerButton";
import styles from "./styles";

class DrawerDefault extends PureComponent {
  constructor(props) {
    super(props);

    const { user } = props.userProfile;

    // Config Menu
    if (user) {
      this.buttonList = [
        ...Config.menu.listMenu,
        ...Config.menu.listMenuLogged,
      ];
    } else {
      this.buttonList = [
        ...Config.menu.listMenu,
        ...Config.menu.listMenuUnlogged,
      ];
    }

    this.state = {
      reload: false,
    };
  }

  /**
   * Update when logged in
   */
  componentWillReceiveProps(props) {
    const { userProfile } = props;

    if (userProfile && userProfile.user) {
      this.buttonList = [
        ...Config.menu.listMenu,
        ...Config.menu.listMenuLogged,
      ];
    }
  }

  _handlePress = (item) => {
    const { goToScreen } = this.props;

    goToScreen(item.routeName, item.params, item.isReset);
  };

  render() {
    const { userProfile } = this.props;
    const user = userProfile.user;
    const avatar = Tools.getAvatar(user);
    const name = Tools.getName(user);

    return (
      <View style={{...styles.container,
      shadowColor:'rgba(0,0,0,0.7)',shadowRadius:2,shadowOpacity:0.2,shadowOffset:{width:5,height:5},backgroundColor:'red'
        }}>
        <View style={[styles.avatarBackground, Styles.Common.ColumnCenter]}>
          <Image
            source={avatar}
            style={[styles.avatar, I18nManager.isRTL && { left: -20 }]}
          />

          <View style={styles.textContainer}>
            <Text style={styles.fullName}>{name.replace(/&amp;/g, "&")}</Text>
            <Text style={styles.email}>{user ? user.email : ""}</Text>
          </View>
        </View>
        <ScrollView>
          {this.buttonList.map((item, index) => (
            <DrawerButton
              onPress={() => this._handlePress(item)}
              key={index}
              {...item}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = ({ user, netInfo }) => ({
  userProfile: user,
  netInfo, // auto reload when netInfo change, also fix reload menu to change language
});

export default connect(mapStateToProps)(DrawerDefault);
