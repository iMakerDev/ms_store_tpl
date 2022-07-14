/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SideMenu from "react-native-drawer";

import { withTheme, warn} from "@common";
import { Drawer } from "@components";


@withTheme
class MenuOverlay extends PureComponent {
  static propTypes = {
    goToScreen: PropTypes.func,
    routes: PropTypes.object,
    isOpenMenu: PropTypes.bool.isRequired,
  };

  toggleMenu = (isOpen) => {
    if (!isOpen) {
      this.props.toggleMenu(isOpen);
    }
  };

  render() {
    const {
      isOpenMenu,
      theme: {
        colors: {text, background },
      },
    } = this.props;

    warn(this.props.theme)

    return (
      <SideMenu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="overlay"
        tapToClose
        open={isOpenMenu}
        onClose={() => this.toggleMenu(false)}
        panCloseMask={0.3}
        panThreshold={0.3}
        openDrawerOffset={0.3}
        useInteractionManager
        content={
          <Drawer
            colorTextMenu={text}
            backgroundMenu={background}
            goToScreen={this.props.goToScreen}p
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
)(MenuOverlay);
