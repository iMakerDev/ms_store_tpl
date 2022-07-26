/** @format */

import React, { PureComponent } from "react";
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import { Languages, Color, Events } from "@common";
import Rating from "react-native-star-rating";
import CustomAPI from "@services/CustomAPI";
import Icon from "@expo/vector-icons/SimpleLineIcons";
import { toast } from "@app/Omni";
import { connect } from "react-redux";
import css from "./styles";

class Review extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      txtComment: "",
      //   addComment: false,
      starCount: 0,
      //   statusRate: "Very Good",
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }

  submitComment = () => {
    const { cookie, post } = this.props;
    const self = this;
    if (this.state.txtComment == "") {
      return toast(Languages.errInputComment);
    }
    if (this.state.starCount == 0) {
      return toast(Languages.errRatingComment);
    }

    const commentData = {
      post_id: post.id,
      content: this.state.txtComment,
      cookie,
      meta: JSON.stringify({
        rating: this.state.starCount,
        verified: 0,
      }),
    };
    CustomAPI.createComment(commentData).then((data) => {
      if (data.status == "ok") {
        self.setState({
          addComment: true,
          txtComment: "",
        });
        toast(Languages.thanksForReview);
        Events.closeModalReview();
      }
    })
  };

  renderCommentInput = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={css.rowHead}>
          <Text style={css.headText}>{Languages.yourcomment}</Text>
        </View>
        <View style={css.inputCommentWrap}>
          <TextInput
            style={css.inputCommentText}
            underlineColorAndroid="transparent"
            autoCorrect={false}
            multiline
            value={this.state.txtComment}
            onChangeText={(text) => this.setState({ txtComment: text })}
            placeholder={Languages.placeComment}
            onSubmitEditing={this.submitComment}
          />
          <TouchableOpacity onPress={this.submitComment} style={css.sendView}>
            <Icon
              name="cursor"
              size={16}
              color="white"
              style={css.sendButton}
            />
            <Text style={css.sendText}>{Languages.send}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderStatusRate = (value) => {
    switch (value) {
      case 1:
        return "Terrible";
      case 2:
        return "Poor";
      case 3:
        return "Average";
      case 4:
        return "Very Good";
      case 5:
        return "Exceptional";
      default:
        return "Average";
    }
  };

  render() {
    return (
      <View style={css.wrapComment}>
        <Text style={css.headCommentText}>{Languages.comment}</Text>
        <View style={css.fullWidth}>
          <View style={css.wrapRating}>
            <Rating
              disabled={false}
              maxStars={5}
              starSize={26}
              emptyStar="star-o"
              fullStar="star"
              // halfStar={'star-half-o'}
              // halfStarEnabled
              rating={this.state.starCount}
              starColor={Color.starRating}
              fullStarColor={Color.starRating}
              halfStarColor={Color.starRating}
              emptyStarColor="#ccc"
              selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={css.besideStar}>
            <View style={css.statusRate}>
              <Text style={css.textStatusRate}>
                {this.renderStatusRate(this.state.starCount)}
              </Text>
            </View>
          </View>
        </View>
        {this.renderCommentInput()}
        {/* <DropdownAlert ref={ref => (this.dropdown = ref)} /> */}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    cookie: user.token,
  };
};
export default connect(mapStateToProps)(Review);
