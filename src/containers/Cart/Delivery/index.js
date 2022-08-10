/** @format */

import React, { PureComponent } from "react";
import { Text, View, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";
import Tcomb from "tcomb-form-native";
import { cloneDeep, get, size, findKey } from "lodash";
import { TextInputMask } from "react-native-masked-text";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CountryPicker from "react-native-country-picker-modal";

import Buttons from "@cart/Buttons";
import css from "@cart/styles";
import { ShippingMethod } from "@components";
import { Config, Validator, Languages, withTheme, Styles } from "@common";
import { toast } from "@app/Omni";

import styles from "./styles";

const Form = Tcomb.form.Form;

const customStyle = cloneDeep(Tcomb.form.Form.stylesheet);
const customInputStyle = cloneDeep(Tcomb.form.Form.stylesheet);

class Delivery extends PureComponent {
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

  componentDidMount() {
    const { getShippingMethod } = this.props;

    this.fetchCustomer(this.props);

    getShippingMethod(Config.shipping.zoneId);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.fetchCustomer(nextProps);
    }
  }

   _getCustomStyle = () => {
    console.log('__________')
    console.log(this.props.theme.dark);
    console.log('++++++++=')
    let {
      theme: {
        colors: { text }
      },
    } = this.props;
    // text = this.props.theme.dark ? 'orange':'green';
    // Customize Form Stylesheet
    customStyle.textbox.normal = {
      ...customStyle.textbox.normal,
      height: 150,
      marginBottom: 200,
      color:'#706e6e',
      textAlign: "left",
    };
    customStyle.controlLabel.normal = {
      ...customStyle.controlLabel.normal,
      fontSize: 15,
      color:'#706e6e',
      textAlign: "left",
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
      color:'#8d8d8d',
      textAlign: "left",
    };
    customInputStyle.textbox.normal = {
      ...customInputStyle.textbox.normal,
      color:'#8d8d8d',
      width: Styles.width / 2,
      textAlign: "left",
    };
    customInputStyle.textbox.error = {
      ...customInputStyle.textbox.normal,
      color:'#8d8d8d',
      width: Styles.width / 2,
      textAlign: "left",
    };
    customInputStyle.formGroup.normal = {
      ...customInputStyle.formGroup.normal,
      flexDirection: "row",
      flexWrap: "wrap",
      color:'#8d8d8d',
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

  onChange = (value) => this.setState({ value });

  onPress = () => this.refs.form.getValue();

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

    const Phone = Tcomb.refinement(
      Tcomb.String,
      (s) => Validator.checkPhone(s) === undefined
    );
    Phone.getValidationErrorMessage = (s) => Validator.checkPhone(s);

    // define customer form
    this.Customer = Tcomb.struct({
      first_name: Tcomb.String,
      last_name: Tcomb.String,
      address_1: Tcomb.String,
      ...(Config.DefaultCountry.hideCountryList
        ? {}
        : { country: Tcomb.String }),
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
        ...(Config.DefaultCountry.hideCountryList
          ? {}
          : {
            country: {
              label: Languages.TypeCountry,
              placeholder: Languages.Country,
              error: Languages.NotSelectedError,
              stylesheet: this._getCustomInputStyle(),
              template: this.renderCountry,
              placeholderTextColor: placeholder,
            },
          }),
        state: {
          label: Languages.State,
          placeholder: Languages.TypeState,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          autoCorrect: false,
          placeholderTextColor: placeholder,
        },
        city: {
          label: Languages.City,
          placeholder: Languages.TypeCity,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          autoCorrect: false,
          placeholderTextColor: placeholder,
        },
        postcode: {
          label: Languages.Postcode,
          placeholder: Languages.TypePostcode,
          error: Languages.EmptyError,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          autoCorrect: false,
          placeholderTextColor: placeholder,
        },
        email: {
          label: Languages.Email,
          placeholder: Languages.TypeEmail,
          underlineColorAndroid: "transparent",
          stylesheet: this._getCustomInputStyle(),
          autoCorrect: false,
          placeholderTextColor: placeholder,
        },
        phone: {
          label: Languages.Phone,
          placeholder: Languages.TypePhone,
          underlineColorAndroid: "transparent",
          error: Languages.EmptyError,
          stylesheet: this._getCustomInputStyle(),
          template: this.renderPhoneInput,
          autoCorrect: false,
          placeholderTextColor: placeholder,
        },
        note: {
          label: Languages.Note,
          placeholder: Languages.TypeNote,
          underlineColorAndroid: "transparent",
          multiline: true,
          stylesheet: this._getCustomStyle(),
          autoCorrect: false,
          placeholderTextColor: placeholder,
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
          options={{
            maskType: 'BRL',
            withDDD: true,
            dddMask: '+99999999999'
          }}
          maxLength={18}
          onChangeText={(value) => locals.onChange(value)}
          onChange={locals.onChangeNative}
          placeholder={locals.placeholder}
          value={locals.value}
          placeholderTextColor={placeholder}
        />
        {help}
        {error}
      </View>
    );
  };

  renderCountry = (locals) => {
    const stylesheet = locals.stylesheet;
    let formGroupStyle = stylesheet.formGroup.normal;
    let controlLabelStyle = stylesheet.controlLabel.normal;
    // eslint-disable-next-line no-unused-vars
    const textboxStyle = stylesheet.textbox.normal;
    let helpBlockStyle = stylesheet.helpBlock.normal;
    const errorBlockStyle = stylesheet.errorBlock;

    if (locals.hasError) {
      formGroupStyle = stylesheet.formGroup.error;
      controlLabelStyle = stylesheet.controlLabel.error;
      // textboxStyle = stylesheet.textbox.error;
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
    // console.log(
    //   "Luyx: 🚀🚀🚀 ~ file: index.js ~ line 352 ~ Delivery ~ valueState",
    //   valueState
    // );

    return (
      <View style={formGroupStyle}>
        {label}
        <CountryPicker
          onSelect={(value) => {
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

  fetchCustomer = async (props) => {
    const { selectedAddress } = props;
    const { user: customer } = props.user;

    let value = selectedAddress;

    if ((!selectedAddress || size(selectedAddress) === 0) && customer) {
      const country =
        get(customer, "billing.country") !== ""
          ? get(customer, "billing.country")
          : Config.DefaultCountry.countryCode;
      value = {
        first_name:
          customer.billing.first_name === ""
            ? customer.first_name
            : customer.billing.first_name,
        last_name:
          customer.billing.last_name === ""
            ? customer.last_name
            : customer.billing.last_name,
        email:
          customer.billing.email === ""
            ? customer.email
            : customer.billing.email,
        address_1: customer.billing.address_1,
        city: customer.billing.city,
        state: customer.billing.state,
        postcode: customer.billing.postcode,
        phone: customer.billing.phone,
      };
    }
    value.country = Config.DefaultCountry.countryCode
    this.setState({ value });
  };

  validateCustomer = async (customerInfo) => {
    await this.props.validateCustomerInfo(customerInfo);

    if (this.props.type === "INVALIDATE_CUSTOMER_INFO") {
      toast(this.props.message);
      return false;
    }
    this.props.onNext();
  };

  saveUserData = async (userInfo) => {
    this.props.updateSelectedAddress(userInfo);

    try {
      await AsyncStorage.setItem("@userInfo", JSON.stringify(userInfo));
    } catch (error) {}
  };

  selectShippingMethod = (item) => {
    this.props.selectShippingMethod(item);
  };

  getCodeFromCountry = (value) => {
    const { countries } = this.props;
    const country = get(value, "country");

    return findKey(countries ? countries:[], (c) => c.toLowerCase() === country.toLowerCase());
  };

  nextStep = () => {
    const value = this.refs.form.getValue();

    if (value) {
      let country = "";
      if (Config.DefaultCountry.hideCountryList) {
        country = Config.DefaultCountry.countryCode.toUpperCase();
      } else {
        // Woocommerce only using cca2 to checkout
        // country = this.getCodeFromCountry(value);
      }

      // console.log('111111');
      // console.log(this.state.value.country)

      // if validation fails, value will be null
      this.props.onNext({ ...this.state.value, country:this.state.value.country });

      // save user info for next use
      this.saveUserData({ ...this.state.value, country:this.state.value.country });
    }
  };

  render() {
    const { shippings, shippingMethod } = this.props;
    const isShippingEmpty = typeof shippingMethod.id === "undefined";
    const {
      theme: {
        colors: { text },
      },
      currency,
    } = this.props;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.form} enableOnAndroid>
          {Config.shipping.visible && shippings.length > 0 && (
            <View>
              <View style={css.rowEmpty}>
                <Text style={[css.label, { color: text }]}>
                  {Languages.ShippingType}
                </Text>
              </View>

              <ScrollView contentContainerStyle={styles.shippingMethod}>
                {shippings.map((item, index) => (
                  <ShippingMethod
                    item={item}
                    currency={currency}
                    key={`${index}shipping`}
                    onPress={this.selectShippingMethod}
                    selected={
                      (index === 0 && isShippingEmpty) ||
                      item.id === shippingMethod.id
                    }
                  />
                ))}
              </ScrollView>
            </View>
          )}

          <View style={css.rowEmpty}>
            <Text style={[css.label, { color: text }]}>
              {Languages.YourDeliveryInfo}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Form
              ref="form"
              type={this.Customer}
              options={this.options}
              value={this.state.value}
              onChange={this.onChange}
            />
          </View>
        </KeyboardAwareScrollView>

        <Buttons
          isAbsolute
          onPrevious={this.props.onPrevious}
          onNext={this.nextStep}
        />
      </View>
    );
  }
}

Delivery.defaultProps = {
  shippings: [],
  shippingMethod: {},
  selectedAddress: {},
};

const mapStateToProps = ({ carts, user, countries, addresses, currency }) => {
  return {
    user,
    customerInfo: carts.customerInfo,
    message: carts.message,
    type: carts.type,
    isFetching: carts.isFetching,
    shippings: carts.shippings,
    shippingMethod: carts.shippingMethod,
    countries: countries.list,
    selectedAddress: addresses.selectedAddress,
    currency,
  };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const CartRedux = require("@redux/CartRedux");
  const AddressRedux = require("@redux/AddressRedux");

  return {
    ...ownProps,
    ...stateProps,
    validateCustomerInfo: (customerInfo) => {
      CartRedux.actions.validateCustomerInfo(dispatch, customerInfo);
    },
    getShippingMethod: (zoneId) => {
      CartRedux.actions.getShippingMethod(dispatch, zoneId);
    },
    selectShippingMethod: (shippingMethod) => {
      CartRedux.actions.selectShippingMethod(dispatch, shippingMethod);
    },
    updateSelectedAddress: (address) => {
      AddressRedux.actions.updateSelectedAddress(dispatch, address);
    },
  };
}

export default connect(
  mapStateToProps,
  undefined,
  mergeProps
)(withTheme(Delivery));