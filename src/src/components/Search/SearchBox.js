/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, TextInput, Image } from "react-native";
import {
  connectSearchBox,
  connectInfiniteHits,
  connectHits,
  connectRefinementList,
} from "react-instantsearch/connectors";
import { InstantSearch, Configure, Index } from "react-instantsearch/native";

class SearchBox extends PureComponent {
  render() {
    return (
      <View style={styles.searchBoxContainer}>
        <Image
          source={{
            uri:
              "https://d13yacurqjgara.cloudfront.net/users/1090953/avatars/small/3a0f064859092a0e82bedddcee24a4a8.png?148154278",
          }}
          style={styles.algoliaLogo}
        />
        <TextInput
          style={styles.searchBox}
          onChangeText={(text) => {
            if (text === "") {
              this.props.clearFilter();
            }
            this.props.refine(text);
          }}
          value={this.props.currentRefinement}
          placeholder="Search a product..."
          placeholderTextColor="black"
          clearButtonMode="always"
          underlineColorAndroid="white"
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize="none"
          onFocus={this.props.displaySuggestions}
          onChange={() => {
            if (this.props.isFirstKeystroke) {
              this.props.displaySuggestions();
              this.props.firstKeystroke();
            }
          }}
        />
      </View>
    );
  }
}

export default (ConnectedSearchBox = connectSearchBox(SearchBox));

SearchBox.propTypes = {
  currentRefinement: PropTypes.string,
  displaySuggestions: PropTypes.func,
  firstKeystroke: PropTypes.func,
  refine: PropTypes.func,
  isFirstKeystroke: PropTypes.bool,
  clearFilter: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
  },
  suggestionsContainer: {
    flex: 1,
  },
  algoliaLogo: {
    width: 40,
    height: 40,
    margin: 10,
  },
  searchBoxContainer: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  bestResults: {
    backgroundColor: "lightgrey",
    height: 40,
    justifyContent: "center",
    padding: 10,
  },
  searchBox: {
    color: "black",
    height: 50,
    width: 300,
    alignSelf: "center",
  },
  hitsContainer: {
    flexDirection: "row",
    margin: 10,
  },
  suggestions: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  suggestionsIcon: {
    marginRight: 10,
  },
  hitsPicture: { width: 40, height: 40 },
  hitsText: {
    alignSelf: "center",
    paddingLeft: 5,
    flex: 1,
    flexWrap: "wrap",
  },
  hitsSeparator: {
    height: 1,
    backgroundColor: "lightgrey",
    marginTop: 10,
    marginBottom: 10,
  },
  categoryTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  categoryTextIn: { fontStyle: "italic" },
  categoryText: { color: "#cc8008" },
});
