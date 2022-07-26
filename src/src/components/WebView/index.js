/** @format */

import React, { PureComponent } from "react";
import { View, Image, Dimensions } from "react-native";
import HTML from "react-native-render-html";
import { Tools, Constants } from "@common";

const { width, height } = Dimensions.get("window");

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fontSize: Constants.fontText.size,
    };

    Tools.getFontSizePostDetail().then((data) => {
      this.setState({ fontSize: data });
    });
  }

  render() {
    const htmlContent = this.props.html;
    const { textColor, key } = this.props;
    const color = textColor || "#333";

    const tagsStyles = {
      p: { margin: 0, padding: 0, color },
      li: { color },
    };

    return (
      <View style={{ padding: 10 }}>
        <HTML
          html={`${htmlContent}<div style="width: ${width - 40}"></div>`}
          tagsStyles={tagsStyles}
          renderers={{
            img: (htmlAttribs, children, convertedCSSStyles, passProps) => {
              const { src, alt, } = htmlAttribs;
              if (!src) {
                return false;
              }
              const newWidth = width - 20;
              const newHeight = height * 0.6;
              return (
                <Image
                  source={{ uri: src }}
                  key={key}
                  style={{
                    width: newWidth,
                    height: newHeight,
                    resizeMode: "contain",
                  }}
                />
              );
            },
          }}
        />
      </View>
    );
  }
}
