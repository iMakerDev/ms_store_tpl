/** @format */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SideMenu from '@custom/react-native-drawer';
import { Drawer } from '@components';

class MenuWide extends PureComponent {
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
    const { isOpenMenu } = this.props;

    return (
      <SideMenu
        ref={(_drawer) => (this.drawer = _drawer)}
        type="static"
        tapToClose
        open={isOpenMenu}
        onClose={() => this.toggleMenu(false)}
        panCloseMask={0.2}
        panThreshold={0.2}
        openDrawerOffset={0.2}
        useInteractionManager
        content={<Drawer goToScreen={this.props.goToScreen} />}>
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
  const { actions: sideMenuActions } = require('@redux/SideMenuRedux');
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
)(MenuWide);
