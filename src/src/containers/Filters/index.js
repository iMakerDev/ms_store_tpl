/** @format */

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { connect } from "react-redux";

import { Languages, withTheme, Tools, Color } from "@common";
import { ProductCatalog, ProductTags } from "@components";
import Slider from "react-native-fluid-slider";
import styles from "./styles";

class Filters extends React.PureComponent {
  constructor(props) {
    super(props);
    this.filter = {};
    this.state = {
      // scrollY: new Animated.Value(0),
      // expanded: true,
      value: 2000,
    };
  }

  render() {
    const { categories, tags } = this.props;

    const {
      theme: {
        colors: { background, text },
      },
    } = this.props;

    return (
      <ScrollView style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.content}>
          <Text style={[styles.headerLabel, { color: text }]}>
            {Languages.Filters}
          </Text>

          <ProductCatalog
            categories={categories}
            onSelectCategory={this.onSelectCategory}
          />
          <ProductTags tags={tags} onSelectTag={this.onSelectTag} />

          <Text style={[styles.pricing, { color: text }]}>
            {Languages.Pricing}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>{Tools.getCurrencyFormatted(0)}</Text>
            <Text style={styles.value}>
              {Tools.getCurrencyFormatted(this.state.value)}
            </Text>
            <Text style={styles.label}>{Tools.getCurrencyFormatted(4000)}</Text>
          </View>
          <View style={styles.slideWrap}>
            <Slider
              value={this.state.value}
              onValueChange={this.onValueChange}
              onSlidingComplete={(value) => {}}
              minimumTrackTintColor={Color.primary}
              maximumTrackTintColor="#bdc2cc"
              thumbTintColor={Color.primary}
              minimumValue={0}
              maximumValue={4000}
            />
          </View>

          <TouchableOpacity style={styles.btnFilter} onPress={this.onFilter}>
            <Text style={styles.filterText}>{Languages.Filter}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnClear} onPress={this.clearFilter}>
            <Text style={styles.clearFilter}>{Languages.ClearFilter}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  onSelectCategory = (item) => {
    this.filter = { ...this.filter, category: item.id };
  };

  onSelectTag = (item) => {
    this.filter = { ...this.filter, tag: item.id };
  };

  onValueChange = (value) => {
    this.setState({ value });
    this.filter = { ...this.filter, max_price: value };
  };

  onFilter = () => {
    const { route, onBack } = this.props;

    route.params.onSearch(this.filter);

    onBack();
  };

  clearFilter = () => {
    const { route, onBack } = this.props;

    route.params.onSearch({});

    onBack();
  };

  componentDidMount() {
    this.props.fetchTags();
  }
}

Filters.defaultProps = {
  tags: [],
};

const mapStateToProps = (state) => {
  return {
    categories: state.categories.list,
    tags: state.tags.list,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/TagRedux");

  return {
    ...ownProps,
    ...stateProps,
    fetchTags: () => {
      actions.fetchTags(dispatch);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(Filters));
