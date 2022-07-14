/** 
 * @format
 * 底部导航栏
 */

import React, { PureComponent } from "react";
import { View } from "react-native";

import { ModalBox } from "@components";
import { Events, Config } from "@common";

import ItemLayout from "./ItemLayout";
import styles from "./styles";

export default class Layout extends PureComponent {
  componentDidMount() {
    Events.onOpenModalLayout(this.open);
  }

  open = () => {
    this.modal && this.modal.openModal && this.modal.openModal();
  };

  close = () => {
    this.modal && this.modal.openModal && this.modal.closeModal();
  };

  render() {
    return (
      <ModalBox ref={(modal) => (this.modal = modal)}>
        <View style={styles.layoutBox}>
          {Config.layouts.map((item, index) => {
            return (
              <ItemLayout
                key={index}
                close={this.close}
                layout={item.layout}
                image={item.image}
                text={item.text}
              />
            );
          })}
        </View>
      </ModalBox>
    );
  }
}
