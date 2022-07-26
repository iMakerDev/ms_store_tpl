/** @format */

import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Modal, ScrollView } from "react-native";
import { connect } from "react-redux";

import { Button } from "@components";
import { Styles, Color, Languages, withTheme } from "@common";
import { actions as FiltersActions } from "@redux/FilterRedux";
import Section from "./Section";

const sections = [
  { title: "Sub Category", type: "category", storeName: "category" },
  // { title: "Brands", type: "brand", storeName: "brands" },
  { title: "Tags", type: "tag", storeName: "tags" },
  { title: "Price", type: "price", storeName: "price" },
];

class FilterPicker extends React.PureComponent {
  filters = {};

  _onFilter = () => {
    const { closeModal } = this.props;

    this.props.updateFilter(this.filters);
    closeModal();
  };

  _onChangeFilter = (type, selected) => {
    this.filters = {
      ...this.filters,
      [type]: selected,
    };
  };

  render() {
    const { visible, closeModal } = this.props;
    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={closeModal}
        onShow={this.onShow}>
        <View style={styles.container}>
          <View style={[styles.subContainer, { backgroundColor: background }]}>
            <ScrollView>
              <View style={styles.titleWrap}>
                <Text style={[styles.title, { color: text }]}>
                  {Languages.Filter}
                </Text>
              </View>
              <View style={styles.filterContainer}>
                {sections.map((o, i) => {
                  return (
                    <Section
                      key={i.toString()}
                      item={o}
                      onChangeFilter={this._onChangeFilter}
                    />
                  );
                })}
              </View>
            </ScrollView>

            <View style={styles.row}>
              <Button
                text={Languages.Cancel}
                style={styles.cancelContainer}
                textStyle={styles.cancelText}
                onPress={closeModal}
              />
              <Button
                text={Languages.Select}
                style={styles.selectContainer}
                textStyle={styles.selectText}
                onPress={this._onFilter}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  subContainer: {
    backgroundColor: Color.background,
    height: "100%",
    justifyContent: "space-between",
  },
  titleWrap: {
    ...Styles.Common.ColumnCenter,
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontWeight: "500",
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.medium,
  },
  contentContainer: {
    marginHorizontal: 20,
  },
  titleSection: {
    color: Color.blackTextPrimary,
    fontSize: Styles.FontSize.medium,
  },
  selectContainer: {
    padding: 15,
    backgroundColor: "rgba(0,145,234,1)",
    flex: 1,
    color: "rgba(0,0,0,1)",
  },
  selectText: {
    color: "white",
    fontSize: 14,
  },
  cancelContainer: {
    padding: 15,
    flex: 1,
    color: "rgba(0,0,0,1)",
  },
  cancelText: {
    color: "white",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  filterContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

FilterPicker.propTypes = {
  visible: PropTypes.bool,
  closeModal: PropTypes.func,
};
FilterPicker.defaultProps = {
  visible: false,
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    selectedCategory: state.categories.selectedCategory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filters) => {
      dispatch(FiltersActions.updateFilter(filters));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(FilterPicker));
