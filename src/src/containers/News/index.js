/** @format */

import React from "react";
import PropTypes from "prop-types";
import { PostList } from "@components";
import { Constants } from "@common";

const NewsScreen = ({ onViewNewsScreen }) => {
  return (
    <PostList
      type="news"
      layoutHome={Constants.Layout.threeColumn}
      onViewNewsScreen={onViewNewsScreen}
    />
  );
};

NewsScreen.propTypes = {
  onViewNewsScreen: PropTypes.func,
};

export default NewsScreen;
