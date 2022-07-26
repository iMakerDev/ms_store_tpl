/** @format */

"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text } from "react-native";
import Tcomb from "tcomb-form-native";
import { Constants, Color, Languages } from "@common";
import { EventEmitter } from "./../../Omni";

export default class VariationsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {}, //contain form data set.
      form: null, //our form, generate after receive props
      formOption: {}, //display options for our form
      variations: undefined, //variations data
    };
    this.onChange = this.onChange.bind(this);
  }

  static propTypes = {
    variations: PropTypes.array.isRequired,
    attributes: PropTypes.array.isRequired,
    defaultVariation: PropTypes.object.isRequired,
    //variations: PropTypes.object,
  };

  UNSAFE_componentWillMount() {
    this.prepareFormData();
    this.onPress = () => this.refs.form.validate();
  }

  componentDidMount() {
    const { defaultVariation } = this.props;
    if (Object.keys(defaultVariation).length !== 0) {
      this.onChange({
        [`${defaultVariation.id}`]: defaultVariation.option.toUpperCase(),
      });
    }
  }

  prepareFormData() {
    const { variations, attributes } = this.props;
    if (variations.length === 0) return;
    //if there is no variations, it's pointless to display selectable attribute
    if (attributes !== null || attributes.length === 0) {
      let formComponents = {},
        componentOptions = {};
      for (let i = 0; i < attributes.length; i++) {
        formComponents[`${attributes[i].id}`] = Tcomb.enums.of(
          attributes[i].options
        );
        componentOptions[`${attributes[i].id}`] = {
          label: attributes[i].name,
          error: "",
          nullOption: { value: "", text: Languages.NotSelected },
        };
      }
      this.setState({
        form: Tcomb.struct(formComponents),
        formOption: {
          auto: "labels",
          stylesheet: stylesheet,
          fields: componentOptions,
        },
        variations: this.props.variations,
      });
    }
  }

  render() {
    return this.state.form === null ? (
      <Text
        style={{
          flex: 1,
          textAlign: "center",
          textAlignVertical: "center",
          height: 60,
        }}>
        {Languages.NoVariation}
      </Text>
    ) : (
      <Tcomb.form.Form
        ref="form"
        type={this.state.form}
        options={this.state.formOption}
        value={this.state.value}
        onChange={this.onChange.bind(this)}
      />
    );
  }

  onChange(value) {
    this.refs.form.validate(); //default code line for this function, do not touch
    this.setState({ value: value });
    let variation = this.getVariationFromAtts(value);
    this.props.updateVariation(variation);
    if (variation != undefined) {
      EventEmitter.emit(Constants.EmitCode.ProductPriceChanged, {
        price: variation.price,
      });
    }
  }

  /**
   *
   * @param {value} customer attributes option
   * @returns matched variation (from this.state.variations)
   *
   * @memberOf VariationsForm
   */
  getVariationFromAtts(value) {
    for (let variation of this.state.variations) {
      let isMatch = true;
      for (let attribute of variation.attributes) {
        //loop through variation's attributes
        let selectedOption = value[attribute.id + ""];
        if (selectedOption == undefined) break;
        if (!(isMatch = slugify(selectedOption) == slugify(attribute.option)))
          break;
      }
      if (isMatch) return variation;
    }
    return undefined;

    //sub function to parse slug
    function slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "-") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    }
  }
}
const stylesheet = require("lodash").cloneDeep(Tcomb.form.Form.stylesheet);

stylesheet.controlLabel.normal = {
  color: Color.product.TextDark,
  fontSize: 14,
  marginBottom: 7,
  fontWeight: "bold",
};
stylesheet.controlLabel.error = {
  color: "red",
  fontSize: 14,
  marginBottom: 7,
  fontWeight: "bold",
};

stylesheet.select.normal.backgroundColor = Color.DirtyBackground;
stylesheet.select.error.backgroundColor = Color.DirtyBackground;
stylesheet.select.normal.color = Color.product.TextDark;
stylesheet.select.error.color = "red";
