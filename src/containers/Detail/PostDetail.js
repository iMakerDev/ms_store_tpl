/** @format */

import React, { PureComponent } from "react";
import { Text, Animated, Platform, View } from "react-native";
import TimeAgo from "react-native-timeago";

import { Constants, Tools } from "@common";
import { WebView, Video } from "@components";
import styles from "./PostDetail_Style";

const HEADER_MIN_HEIGHT = Platform.OS === "ios" ? 42 : 42;
const HEADER_SCROLL_DISTANCE =
  Constants.Window.headerHeight - HEADER_MIN_HEIGHT;

export default class PostDetail extends PureComponent {
  state = { isShowToTop: false, scrollY: new Animated.Value(0) };

  updateScroll() {
    this.refs.scrollView._component.scrollTo({ x: 0, y: 0, animated: true });
  }

  render() {
    const { post } = this.props;

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - HEADER_MIN_HEIGHT],
      extrapolate: "clamp",
    });

    const animateScrollTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [100, 0],
      extrapolate: "clamp",
    });

    const animateOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: "clamp",
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: "clamp",
    });

    const imageURL = Tools.getImage(post, Constants.PostImage.large);

    const postTitle =
      typeof post.title.rendered === "undefined" ? "" : post.title.rendered;
    const postContent =
      typeof post.content.rendered === "undefined" ? "" : post.content.rendered;
    const videoUrl =
      post.content.rendered != null
        ? Tools.getLinkVideo(post.content.rendered)
        : "";

    const renderBanner = () => {
      return (
        <Animated.View
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}>
          {videoUrl.length > 0 ? (
            <View style={styles.videoView}>
              <Video source={videoUrl} style={styles.video} />
            </View>
          ) : (
            <Animated.Image
              source={{ uri: imageURL }}
              style={[
                styles.imageBackGround,
                {
                  opacity: animateOpacity,
                  transform: [{ translateY: imageTranslate }],
                },
              ]}
            />
          )}

          {/* <LinearGradient style={styles.linearGradientBottom}
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"]} /> */}
        </Animated.View>
      );
    };

    const renderContent = () => {
      return (
        <View key={"content"} style={styles.scrollViewContent}>
          <Text style={styles.detailDesc}>
            {Tools.getDescription(postTitle, 300)}
          </Text>
          <Text style={styles.author}>
            <TimeAgo time={post.date} hideAgo /> ago
          </Text>
          <WebView key={`webview`} html={postContent} />
        </View>
      );
    };

    return (
      <View style={styles.body}>
        {renderBanner()}

        <Animated.ScrollView
          ref="scrollView"
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}>
          {renderContent()}
        </Animated.ScrollView>

        {/* <ScrollTop css={{transform: [{translateY: animateScrollTop}]}} onUpdate={this.updateScroll.bind(this)} /> */}
      </View>
    );
  }
}
