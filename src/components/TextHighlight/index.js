/** @format */

import React from "react";
import { View, Text } from "react-native";

export default class TextHighlight extends React.PureComponent {
  renderLines() {
    const lines = [];
    let textString = this.props.children;
    // splitOn is integer value. Enter expected max char count per line as prop
    const splitOn = this.props.splitOn;
    // Adds space to end of string, preventing cutoff of last word
    const singleSpace = " ";
    textString = textString.concat(singleSpace);
    const numOfLines = Math.ceil(textString.length / splitOn);
    let lineStart = 0;
    let lineEnd = textString.slice(0, splitOn).lastIndexOf(" ");
    let fakeLineEnd = lineStart + splitOn;
    /* multiplying x2 to handle for awkward splits before very long words
         that can push content beyond the above calculated numOfLines */
    for (let i = 0; i < numOfLines * 2; i++) {
      let line = textString.slice(lineStart, lineEnd);
      // Adds spaces to start and end of already populated lines for visual padding
      if (line.length > 0) {
        line = singleSpace + line + singleSpace;
        lines.push(line);
      }
      lineStart = lineEnd + 1;
      fakeLineEnd = lineStart + splitOn;
      lineEnd = textString.slice(0, fakeLineEnd).lastIndexOf(" ");
    }
    return lines.map((line, i) => (
      <View
        key={i}
        style={{
          marginTop: this.props.marginTop,
        }}>
        <Text>
          <Text style={this.props.textStyle}>{line}</Text>
        </Text>
      </View>
    ));
  }

  render() {
    return <View style={this.props.style}>{this.renderLines()}</View>;
  }
}
