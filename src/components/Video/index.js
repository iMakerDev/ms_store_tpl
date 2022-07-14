/** @format */

import React, { Component } from "react";
import { WebView } from "react-native-webview";

import VideoSourceReader from "./VideoSourceReader";

export default class Video extends Component {
  createSourceObject(source) {
    const sourceReader = new VideoSourceReader(source);
    const url = sourceReader.getUrl();

    if (sourceReader.isEmbeddableVideo()) {
      return {
        uri: url,
      };
    }

    const HTML = `
			    <video width="100%" height="auto" controls  >
			       <source src="${url}" >
			     </video>
			  `;
    return {
      html: HTML,
    };
  }

  render() {
    return (
      <WebView
        startInLoadingState
        style={this.props.style ? this.props.style : null}
        source={this.createSourceObject(this.props.source)}
        scrollEnabled={false}
      />
    );
  }
}
