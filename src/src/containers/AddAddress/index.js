/** @format */

import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountryPicker from "react-native-country-picker-modal";
import Tcomb from "tcomb-form-native";
import { cloneDeep, isObject } from "lodash";

import { Validator, Languages, withTheme, Styles, Config } from "@common";
import styles from "./styles";

const Form = Tcomb.form.Form;
const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const customInputStyle = cloneDeep(Tcomb.form.Form.stylesheet);
// const labelStyle = cloneDeep(Tcomb.form.Form.stylesheet);

class AddAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        first_name: "",
        last_name: "",
        address_1: "",
        state: "",
        postcode: "",
        country: Config.DefaultCountry.countryCode,
        email: "",
        phone: "",
        note: "",
      },
    };

    this.initFormValues();
  }

  onChange = (value) => this.setState({ value });

  _getCustomStyle = () => {
    const {
      theme: {
        colors: { text },
      },
    } = this.props;
    // Customize Form Stylesheet
    customStyle.textbox.normal = {
      ...customStyle.textbox.normal,
      height: 150,
      color: text,
    };
    customStyle.controlLabel.normal = {
      ...customStyle.controlLabel.normal,
      fontSize: 15,
      color: text,
    };

    return customStyle;
  };

  _getCustomInputStyle = () => {
    const {
      theme: {
        colors: { text },
      },
    } = this.props;

    customInputStyle.controlLabel.normal = {
      ...customInputStyle.controlLabel.normal,
      fontSize: 15,
      color: text,
    };
    customInputStyle.textbox.normal = {
      ...customInputStyle.textbox.normal,
      color: text,
      width: Styles.width / 2,
    };
    customInputStyle.textbox.error = {
      ...customInputStyle.textbox.normal,
      color: text,
      width: Styles.width / 2,
    };
    customInputStyle.formGroup.normal = {
      ...customInputStyle.formGroup.normal,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    };
    customInputStyle.formGroup.error = {
      ...customInputStyle.formGroup.normal,
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
    };
    customInputStyle.errorBlock = {
      ...customInputStyle.errorBlock,
      width: Styles.width,
    };
    return customInputStyle;
  };

  initFormValues = () => {
    const {
      theme: {
        colors: { placeholder },
      },
    } = this.props;
    // const countries = this.props.countries;
    // override the validate method of Tcomb lib for multi validate requirement.
    // const Countries = Tcomb.enums(countries);
    const Email = Tcomb.refinement(
      Tcomb.String,
      (s) => Validator.checkEmail(s) === undefined
    );
    Email.getValidationErrorMessage = (s) => Validator.checkEmail(s);

    // define customer form
    this.Customer = Tcomb.struct({
      first_name: Tcomb.String,
      last_name: Tcomb.String,
      address_1: Tcomb.String,
      country: Tcomb.String,
      state: Tcomb.String,
      city: Tcomb.String,
      postcode: Tcomb.String,
      email: Email,
      phone: Tcomb.String,
      note: Tcomb.maybe(Tcomb.String), // maybe = optional
    });

    // form options
    this.options = {
      auto: "none", // we have labels and placeholders as option here (in Engrish, ofcourse).
      // stylesheet: css,
      fields: {
        first_name: {
          label: Languages.FirstName,
          placeholder: Languages.TypeFirstName,
          error: Languages.EmptyError, // for simple empty error warning.
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
        },
        last_name: {
          label: Languages.LastName,
          placeholder: Languages.TypeLastName,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
        },
        address_1: {
          label: Languages.Address,
          placeholder: Languages.TypeAddress,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
        },
        city: {
          label: Languages.City,
          placeholder: Languages.TypeCity,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
          autoCorrect: false,
        },
        state: {
          label: Languages.State,
          placeholder: Languages.TypeState,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
          autoCorrect: false,
        },
        postcode: {
          label: Languages.Postcode,
          placeholder: Languages.TypePostcode,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
          autoCorrect: false,
        },
        country: {
          label: Languages.TypeCountry,
          placeholder: Languages.Country,
          error: Languages.NotSelectedError,
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
          template: this.renderCountry,
        },
        email: {
          label: Languages.Email,
          placeholder: Languages.TypeEmail,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          placeholderTextColor: placeholder,
          autoCorrect: false,
        },
        phone: {
          label: Languages.Phone,
          placeholder: Languages.TypePhone,
          underlineColorAndroid: "transparent",
          error: Languages.EmptyError,
          stylesheet: this._getCustomInputStyle(),
          template: this.renderPhoneInput,
          placeholderTextColor: placeholder,
          autoCorrect: false,
        },
        note: {
          label: Languages.Note,
          placeholder: Languages.TypeNote,
          underlineColorAndroid: "transparent",
          multiline: true,
          stylesheet: this._getCustomStyle(),
          placeholderTextColor: placeholder,
          autoCorrect: false,
        },
      },
    };
  };

  renderPhoneInput = (locals) => {
    const {
      theme: {
        colors: { placeholder },
      },
    } = this.props;
    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let textboxStyle = stylesheet.textbox.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    const label = locals.label ? (
      <Text style={controlLabelStyle}>{locals.label}</Text>
    ) : null;
    const help = locals.help ? (
      <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null;
    const error =
      locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
          {locals.error}
        </Text>
      ) : null;

    return (
      <View style={formGroupStyle}>
        {label}
        <TextInputMask
          type="cel-phone"
          style={textboxStyle}
          onChangeText={(value) => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          placeholderTextColor={placeholder}
          value={locals.value}
        />
        {help}
        {error}
      </View>
    );
  };

  renderCountry = (locals) => {
    const {
      theme: {
        colors: { placeholder },
      },
    } = this.props;
    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    let textboxStyle = stylesheet.textbox.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      textboxStyle = stylesheet.textbox.error;
      helpBlockStyle = stylesheet.helpBlock.error;
    }

    const label = locals.label ? (
      <Text style={controlLabelStyle}>{locals.label}</Text>
    ) : null;
    const help = locals.help ? (
      <Text style={helpBlockStyle}>{locals.help}</Text>
    ) : null;
    const error =
      locals.hasError && locals.error ? (
        <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
          {locals.error}
        </Text>
      ) : null;

    const { value: valueState } = this.state;

    return (
      <View style={formGroupStyle}>
        {label}
        <CountryPicker
          onSelect={(value) => {
            // console.log(value,'vvaalluuee')
            this.setState({
              value: {
                ...valueState,
                country: value.cca2,
              },
            });

            locals.onChange(value.name);
          }}
          cca2={valueState.country}
          countryCode={valueState.country}
          filterable
          withCountryNameButton
        />
        {help}
        {error}
      </View>
    );
  };

  addAddress = () => {
    const { countries } = this.props;
    const value = this.refs.form.getValue();
    // console.log(
    //   "Luyx: 🚀🚀🚀 ~ file: index.js ~ line 343 ~ AddAddress ~ value",
    //   value
    // );

    // * find country code to save instead of country name
    if (countries && isObject(countries)) {
      const countryCode = Object.keys(countries).find(
        (key) => countries[key] === value?.country
      );

      if (value && countryCode) {
        const newValue = { ...value, country: countryCode };

        this.props.addAddress(newValue);
        this.props.onBack();
      }
    }
  };

  render() {
    const {
      theme: {
        colors: { background },
      },
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <KeyboardAwareScrollView
          style={styles.form}
          keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <Form
              ref="form"
              type={this.Customer}
              options={this.options}
              value={this.state.value}
              onChange={this.onChange}
            />

            <TouchableOpacity style={styles.btnAdd} onPress={this.addAddress}>
              <Text style={styles.add}>{Languages.AddToAddress}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

AddAddress.defaultProps = {
  countries: [],
};

const mapStateToProps = ({ addresses, countries }) => {
  return {
    countries: countries.list,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const { actions } = require("@redux/AddressRedux");

  return {
    ...ownProps,
    ...stateProps,
    addAddress: (address) => {
      actions.addAddress(dispatch, address);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(AddAddress));
