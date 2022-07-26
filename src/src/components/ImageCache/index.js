/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-native";

const ImageCache = ({ style, defaultSource, uri }) => {
  return <Image style={style} defaultSource={defaultSource} source={{ uri }} />;
};

ImageCache.propTypes = {
  style: PropTypes.any,
  uri: PropTypes.any,
};

export default ImageCache;
