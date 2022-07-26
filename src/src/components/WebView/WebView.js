/** @format */

import React, { Component } from "react";
import { View, Dimensions } from "react-native";

// it's possible to use this library still
import { WebView } from "react-native-webview";

const { width, scale } = Dimensions.get("window");

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webViewHeight: 600,
    };
  }

  updateHeight = (event) => {
    this.setState({ webViewHeight: parseInt(event.jsEvaluationValue) });
  };

  render() {
    const getHTML = () => {
      const html = this.props.html;

      return `<html><head><style type="text/css">
				      body {
				        margin: 8;
				        padding: 0;
				        font: 14px arial, sans-serif;
				        background: white;
				        width: ${(width - 50) * scale}
				      }
				      p {
				        width: ${(width - 50) * scale}
				      }
				      a, h1, h2, h3, li {
				        font: 14px arial, sans-serif !important;
				      }
				      img {
				        height: auto;
				        width: ${(width - 50) * scale}
			        }
				</style></head><body>${html}</body>`;
    };

    // log(getHTML());

    return (
      <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 40, paddingHorizontal: 5 }}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: getHTML() }}
          startInLoadingState
          injectedJavaScript="document.body.scrollHeight;"
          onNavigationStateChange={this.updateHeight}
          style={{
            flex: 1,
            width: (width - 50) * scale,
            height: 900,
          }}
        />
      </View>
    );
  }
}
