/** @format */

import React from "react";
import { View, Text, I18nManager } from "react-native";
import { connect } from "react-redux";

import { Accordion } from "@components";
import { Icons, Styles, withTheme } from "@common";
import { IconIO, log } from "@app/Omni";
import Content from "./Content";
import Price from "./Price";

class Section extends React.PureComponent {
  state = { selected: this.props.selected };

  _onSelect = (selected, type) => {
    this.setState({ selected }, () => {
      this.props.onChangeFilter(type, selected);
    });
  };

  _renderHeader = (section, index, isActive) => {
    const { selected } = this.state;
    const {
      theme: {
        colors: { text, primary },
      },
    } = this.props;
    log(selected);

    return (
      <View style={styles.headerContainer}>
        <Text style={styles.title(text)}>{section.title}</Text>
        <View style={styles.rightSection}>
          <Text style={styles.titleSelected(primary)}>
            {selected && selected.name}
          </Text>
          <IconIO
            color={text}
            name={
              isActive
                ? Icons.Ionicons.Down
                : I18nManager.isRTL
                ? Icons.Ionicons.Back
                : Icons.Ionicons.Forward
            }
            size={18}
          />
        </View>
      </View>
    );
  };

  _renderContent = (section) => {
    const { selected } = this.props;

    return (
      <View style={styles.contentContainer}>
        <Content {...section} selected={selected} onSelect={this._onSelect} />
      </View>
    );
  };

  render() {
    const { selected } = this.state;
    const {
      item,
      theme: {
        colors: { lineColor },
      },
    } = this.props;

    if (item.type === "price")
      return <Price {...item} value={selected} onChange={this._onSelect} />;

    return (
      <Accordion
        underlayColor={lineColor}
        sections={[item]}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}

const styles = {
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginTop: 20
  },
  title: (textColor) => ({
    color: textColor,
    fontSize: Styles.FontSize.medium,
  }),
  titleSelected: (primary) => ({
    color: primary,
    fontSize: Styles.FontSize.medium,
    marginRight: 10,
  }),
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
};

const mapStateToProps = ({ filters }, { item }) => {
  return {
    selected: filters[item.type], // sometime name redux store different
  };
};

export default connect(
  mapStateToProps,
  null
)(withTheme(Section));
