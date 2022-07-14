/** @format */

import React, { PureComponent } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideMenu from "react-native-drawer";
import { Drawer } from "@components";
import {Color} from '@common'

/**
 * MenuScale only support IOS
 */
class MenuScale extends PureComponent {
  static propTypes = {
    goToScreen: PropTypes.func,
    routes: PropTypes.object,
  };

  toggleMenu = (isOpen) => {
    if (!isOpen) {
      this.props.toggleMenu(isOpen);
    }
  };

  render() {
    const { isOpenMenu } = this.props;

    if (Platform.OS === "android") {
      const drawerStyles = {
        drawer: { backgroundColor: Color.primary },
        main: { paddingLeft: 0, paddingRight: 0 },
      };
      return (
        <SideMenu
          ref={(_drawer) => (this.drawer = _drawer)}
          type="overlay"
          open={isOpenMenu}
          onClose={() => this.toggleMenu(false)}
          tapToClose
          panCloseMask={0.2}
          openDrawerOffset={0.2}
          styles={drawerStyles}
          useInteractionManager
          content={<Drawer goToScreen={this.props.goToScreen} />}>
          {this.props.routes}
        </SideMenu>
      );
    }

    return (
      <SideMenu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="static"
        backgroundColor={Color.primary}
        isScale
        captureGestures
        tapToClose
        open={isOpenMenu}
        onClose={() => this.toggleMenu(false)}
        panCloseMask={0.25}
        openDrawerOffset={0.25}
        useInteractionManager
        content={
          <Drawer
            backgroundMenu={Color.primary}
            colorTextMenu="#FFF"
            goToScreen={this.props.goToScreen}
          />
        }>
        {this.props.routes}
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ sideMenu }) => ({
  isOpenMenu: sideMenu.isOpen,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions: sideMenuActions } = require("@redux/SideMenuRedux");
  return {
    ...ownProps,
    ...stateProps,
    toggleMenu: (isOpen) => dispatch(sideMenuActions.toggleMenu(isOpen)),
  };
};
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(MenuScale);
