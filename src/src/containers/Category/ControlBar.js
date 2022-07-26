/** @format */

import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  LayoutAnimation,
} from "react-native";
import { connect } from "react-redux";

import { Color, Images, Styles, withTheme, Languages } from "@common";
import { ActionSheets } from "@components";
import { DisplayMode } from "@redux/CategoryRedux";
import { actions as FiltersActions } from "@redux/FilterRedux";

const controlBarHeight = 50;

class ControlBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideSubCategory: true,
      modalVisible: false,
      selected: 1,
    };
    this.options = [
      {
        title: "Sort by Date descending",
        order: "desc",
        orderby: "date",
      },
      {
        title: "Sort by Date ascending",
        order: "asc",
        orderby: "date",
      },
      {
        title: "Sort by Name descending",
        order: "desc",
        orderby: "title",
      },
      {
        title: "Sort by Name ascending",
        order: "asc",
        orderby: "title",
      },
      {
        title: "Cancel",
        actionStyle: "cancel",
        isCancel: true,
      },
    ];
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  changeModalVisible = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  _find = (options, key) => {
    for (let i = 0; i < options.length; i++) {
      if (key.order && key.orderby) {
        if (
          options[i].order === key.order &&
          options[i].orderby === key.orderby
        ) {
          return options[i];
        }
      } else {
        return options[0];
      }
    }
  };

  render() {
    const {
      switchDisplayMode,
      categories,
      openCategoryPicker,
      isVisible,
      name,
      theme: {
        colors: { background, text },
        dark: isDark,
      },
      filters,
    } = this.props;

    let valueDefault = this._find(this.options, filters);

    return (
      <View
        style={[
          styles.container,
          {
            height: isVisible ? controlBarHeight : 0,
            backgroundColor: background,
          },
        ]}>
        <View style={styles.iconAndTextWrap}>
          <TouchableOpacity
            onPress={openCategoryPicker}
            style={styles.iconAndTextWrap}>
            <Image
              source={Images.IconFilter}
              style={[
                styles.iconStyle,
                styles.dark,
                isDark && { tintColor: "#fff" },
              ]}
            />
            <Text style={[styles.text, { color: text }]}>
              {name.replace(/&amp;/g, "&")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.refs.picker.show();
            }}
            style={styles.iconAndTextWrap}>
            <Image
              source={Images.IconSort}
              style={[
                styles.iconStyle,
                styles.dark,
                isDark && { tintColor: "#fff" },
              ]}
            />
            <Text style={[styles.text, { color: text }]}>{Languages.Sort}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {Platform.OS === "ios" && (
            <TouchableOpacity
              onPress={() => switchDisplayMode(DisplayMode.CardMode)}
              style={styles.modeButton}>
              <Image
                source={Images.IconCard}
                style={[
                  styles.iconStyle,
                  categories.displayMode === DisplayMode.CardMode &&
                    styles.dark,
                  isDark && { tintColor: "#fff" },
                ]}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => switchDisplayMode(DisplayMode.ListMode)}
            style={styles.modeButton}>
            <Image
              source={Images.IconList}
              style={[
                styles.iconStyle,
                categories.displayMode === DisplayMode.ListMode && styles.dark,
                isDark && { tintColor: "#fff" },
              ]}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => switchDisplayMode(DisplayMode.GridMode)}
            style={styles.modeButton}>
            <Image
              source={Images.IconGrid}
              style={[
                styles.iconStyle,
                categories.displayMode === DisplayMode.GridMode && styles.dark,
                isDark && { tintColor: "#fff" },
              ]}
            />
          </TouchableOpacity>
        </View>
        {/* actionsheets sort */}
        <ActionSheets
          ref="picker"
          titles={this.options}
          separateHeight={1}
          separateColor="#dddddd"
          defaultValue={valueDefault.title}
          backgroundColor="rgba(0, 0, 0, 0.3)"
          containerStyle={{ margin: 10, borderRadius: 5 }}
          onPress={(title) => {
            let filters = { order: title.order, orderby: title.orderby };
            this.props.updateFilter(filters);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: controlBarHeight,
    backgroundColor: Color.category.navigationBarColor,
    borderColor: Color.lightDivide,
    borderTopWidth: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 5,

    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modeButton: {
    ...Styles.Common.ColumnCenter,
    borderColor: Color.lightDivide,
    borderLeftWidth: 1,
    width: controlBarHeight - 10,
    height: controlBarHeight - 10,
  },
  iconAndTextWrap: {
    ...Styles.Common.RowCenter,
    marginHorizontal: 20,
  },
  text: {
    color: Color.black,
    paddingLeft: 10,
  },
  iconStyle: {
    resizeMode: "contain",
    width: 18,
    height: 18,
    opacity: 0.2,
  },
  dark: {
    opacity: 0.9,
  },
});

ControlBar.propTypes = {
  switchDisplayMode: PropTypes.func.isRequired,
  openCategoryPicker: PropTypes.func.isRequired,
  isVisible: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    filters: state.filters,
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/CategoryRedux");

  return {
    ...ownProps,
    ...stateProps,
    switchDisplayMode: (mode) => {
      dispatch(actions.switchDisplayMode(mode));
    },
    updateFilter: (filters) => {
      dispatch(FiltersActions.updateFilter(filters));
    },
  };
};

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(ControlBar));
