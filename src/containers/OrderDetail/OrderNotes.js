/** @format */

import React from "react";
import { View, Text, I18nManager } from "react-native";

// import { log } from "@app/Omni";
import { Languages, Tools } from "@common";
import styles from "./styles";
import moment from 'moment';
import HTML from 'react-native-render-html';

export default class OrderNotes extends React.PureComponent {
  render() {
    const {
      orderNotes,
      theme: {
        colors: { text, primary },
      },
    } = this.props;

    return (
      <View>
        <View style={[styles.header, I18nManager.isRTL ? {alignItems: 'flex-end'} : {}]}>
          <Text style={styles.label(text)}>{Languages.OrderNotes}</Text>
        </View>
        <View style={styles.addressContainer}>
          {orderNotes && orderNotes.map((item, index) => (
            <View key={index} style={styles.noteItem}>
              <Text style={styles.noteContent(text)}>{item.note.replace(/<\/?[span|br][^>]*>/g,"")}</Text>
              <Text style={styles.noteTime}>{moment(item.date_created).fromNow()}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  }
}
