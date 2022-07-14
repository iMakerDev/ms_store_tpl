/** @format */

import React, { PureComponent } from "react";
import { Alert, FlatList } from "react-native";

import { Constants, withTheme } from "@common";
import WPUserAPI from "@app/services/WPUserAPI";
import Item from "./Item";

class Categories extends PureComponent {


  state = {
    items: [],
  };

  //首页顶部分类导航修复
  async getIndexCategorys() {
    let configCat = this.props.categories.filter((r) => r.name === "IndexCat");
    if (!configCat) return;
    const items = (await WPUserAPI.getCategoryById(configCat[0].id));
    this.setState({ items });
  }

  componentDidMount() {
    //顶部导航获取数据
    this.getIndexCategorys();
  }
  render() {
    const { type, onPress, config } = this.props;
    const items = this.state.items;

    const column = typeof config.column !== "undefined" ? config.column : 1;

    return (
      <FlatList
        keyExtractor={(item, index) => `${index}`}
        contentContainerStyle={styles.flatlist}
        showsHorizontalScrollIndicator={false}
        horizontal={column === 1}
        numColumns={column}
        data={items}
        renderItem={({ item, index }) => (
          <Item key={index} item={item} type={type} label={item.label} onPress={onPress}
          />
        )}
      />
    );
  }
}

const styles = {
  flatlist: {
    marginBottom: 10,
  },
};

export default withTheme(Categories);
