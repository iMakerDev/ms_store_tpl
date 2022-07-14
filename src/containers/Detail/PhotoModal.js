/** @format */

import React, { PureComponent } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import ImageViewer from "react-native-image-zoom-viewer";
import Modal from "react-native-modalbox";

import { Styles, Languages, Constants } from "@common";
import { getProductImage } from "@app/Omni";
import styles from "./ProductDetail_Style";

class PhotoModal extends PureComponent {
  open = () => {
    this._modalPhoto.open();
  };

  close = () => {
    this._modalPhoto.close();
  };

  render() {
    const { product } = this.props;

    return (
      <Modal
        ref={(com) => (this._modalPhoto = com)}
        useNativeDriver
        swipeToClose={false}
        animationDuration={200}
        style={styles.modalBoxWrap}>
        <Swiper
          height={Constants.Window.height - 40}
          activeDotStyle={styles.dotActive}
          removeClippedSubviews={false}
          dotStyle={styles.dot}
          paginationStyle={{ zIndex: 9999, bottom: -15 }}>
          <ImageViewer
            imageUrls={product.images.map((image, index) => ({
              url: getProductImage(image.src, Styles.width),
            }))}
            renderIndicator={() => <View />}
          />
        </Swiper>

        <TouchableOpacity style={styles.iconZoom} onPress={this.close}>
          <Text style={styles.textClose}>{Languages.close}</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}

export default PhotoModal;
