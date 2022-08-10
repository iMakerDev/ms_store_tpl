/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  LayoutAnimation,
  I18nManager,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { WooWorker } from "api-ecommerce";
import { connect } from "react-redux";
import { get, has } from "lodash";

import WPUserAPI from "@services/WPUserAPI";
import Button from "@components/Button";
import { Styles, Languages, Color, withTheme } from "@common";
import { toast, error, Validate } from "@app/Omni";
import { Spinner } from "@components";
import {signUpUserInfo} from "@services/Database"

class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    let state = {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      useGeneratePass: false,
      isLoading: false,
    };

    const params = props.params;
    if (params && params.user) {
      state = { ...state, ...params.user, useGeneratePass: true };
    }

    this.state = state;

    this.onFirstNameEditHandle = (firstName) => this.setState({ firstName });
    this.onLastNameEditHandle = (lastName) => this.setState({ lastName });
    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onEmailEditHandle = (email) => this.setState({ email });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.onPasswordSwitchHandle = () =>
      this.setState({ useGeneratePass: !this.state.useGeneratePass });

    this.focusLastName = () => this.lastName && this.lastName.focus();
    this.focusUsername = () => this.username && this.username.focus();
    this.focusEmail = () => this.email && this.email.focus();
    this.focusPassword = () =>
      !this.state.useGeneratePass && this.password && this.password.focus();
  }

  shouldComponentUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    return true;
  }

  onSignUpHandle = async () => {
    const { login, netInfo } = this.props;
    if (!netInfo.isConnected) return toast(Languages.noConnection);
    
    const {
      username,
      email,
      firstName,
      lastName,
      password,
      useGeneratePass,
      isLoading,
    } = this.state;
    if (isLoading) return;
    this.setState({ isLoading: true });
    
    
    const _error = this.validateForm();
    if (_error) return this.stopAndToast(_error);

    const user = {
      username,
      email,
      firstName,
      lastName,
      password: useGeneratePass ? undefined : password,
    };
    const json = await WPUserAPI.register(user);

    if (json === undefined) {
      console.log("*********")
      return this.stopAndToast(Languages.ServerNotResponse);
    }

    if (json.error) {
      console.log("#########注册失败")
      console.log(json.error,'error')
      return this.stopAndToast(json.error);
    }

    if (has(json, "user_id")) {
      const customer = await WooWorker.getCustomerById(get(json, "user_id"));
      
      if (customer) {
        console.log("@@@@@")
        this.setState({ isLoading: false });
        console.log('cookie');
        console.log(json);
        // login(customer, get(json, "cookie"));
 
        // console.log(login)
        signUpUserInfo(customer.id);
        this.props.navigation.goBack();
        toast("SignUp Success!")
        // alert(JSON.stringify(this.props))
        return;
      }
    }

    this.setState({ isLoading: false });

    toast(Languages.CanNotRegister);
  };

  validateForm = () => {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      useGeneratePass,
    } = this.state;
    if (
      Validate.isEmpty(
        username,
        email,
        firstName,
        lastName,
        useGeneratePass ? "1" : password
      )
    ) {
      // check empty
      return Languages.PleaseCompleteForm;
    }

    if (!Validate.isEmail(email)) {
      return Languages.InvalidEmail;
    }

    return undefined;
  };

  stopAndToast = (msg) => {
    toast(msg);
    error(msg);
    this.setState({ isLoading: false });
  };

  render() {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      useGeneratePass,
      isLoading,
    } = this.state;
    const {
      theme: {
        colors: { background, text, placeholder },
      },
    } = this.props;

    const params = this.props.params;
    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <KeyboardAwareScrollView
          style={{position:'relative'}}
          showsVerticalScrollIndicator={false}
          enableOnAndroid>
          <View style={styles.formContainer}>
            <Text style={[styles.label, { color: text }]}>
              {Languages.profileDetail}
            </Text>
            <TextInput
              style={styles.input(text)}
              underlineColorAndroid="transparent"
              ref={(comp) => (this.firstName = comp)}
              placeholder={Languages.firstName}
              onChangeText={this.onFirstNameEditHandle}
              onSubmitEditing={this.focusLastName}
              autoCapitalize="words"
              returnKeyType="next"
              value={firstName}
              placeholderTextColor={placeholder}
            />
            <TextInput
              style={styles.input(text)}
              underlineColorAndroid="transparent"
              ref={(comp) => (this.lastName = comp)}
              placeholder={Languages.lastName}
              onChangeText={this.onLastNameEditHandle}
              onSubmitEditing={this.focusUsername}
              autoCapitalize="words"
              returnKeyType="next"
              value={lastName}
              placeholderTextColor={placeholder}
            />

            <Text style={[styles.label, { color: text }]}>
              {Languages.accountDetails}
            </Text>
            <TextInput
              style={styles.input(text)}
              underlineColorAndroid="transparent"
              ref={(comp) => (this.username = comp)}
              placeholder={Languages.username}
              onChangeText={this.onUsernameEditHandle}
              onSubmitEditing={this.focusEmail}
              autoCapitalize="none"
              returnKeyType="next"
              value={username}
              placeholderTextColor={placeholder}
            />
            <TextInput
              style={styles.input(text)}
              underlineColorAndroid="transparent"
              ref={(comp) => (this.email = comp)}
              placeholder={Languages.email}
              onChangeText={this.onEmailEditHandle}
              onSubmitEditing={this.focusPassword}
              keyboardType="email-address"
              returnKeyType={useGeneratePass ? "done" : "next"}
              value={email}
              placeholderTextColor={placeholder}
            />
            {params && params.user ? (
              <View style={styles.switchWrap}>
                <Switch
                  value={useGeneratePass}
                  onValueChange={this.onPasswordSwitchHandle}
                  thumbTintColor={Color.accent}
                  onTintColor={Color.accentLight}
                />
                <Text
                  style={[
                    styles.text,
                    {
                      color: useGeneratePass
                        ? Color.accent
                        : Color.blackTextSecondary,
                    },
                  ]}>
                  {Languages.generatePass}
                </Text>
              </View>
            ) : null}
            {useGeneratePass ? (
              <View />
            ) : (
              <TextInput
                style={styles.input(text)}
                underlineColorAndroid="transparent"
                ref={(comp) => (this.password = comp)}
                placeholder={Languages.password}
                onChangeText={this.onPasswordEditHandle}
                secureTextEntry
                returnKeyType="done"
                value={password}
                placeholderTextColor={placeholder}
              />
            )}
            <Button
              containerStyle={styles.signUpButton}
              text={Languages.signup}
              onPress={this.onSignUpHandle}
            />
          </View>
        </KeyboardAwareScrollView>
        {isLoading ? <Spinner mode="overlay" /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: Styles.width * 0.1,
  },
  label: {
    fontWeight: "bold",
    fontSize: Styles.FontSize.medium,
    color: Color.blackTextPrimary,
    marginTop: 20,
  },

  input: (text) => ({
    borderBottomWidth: 1,
    borderColor: text,
    height: 40,
    marginTop: 10,
    padding: 0,
    margin: 0,
    // flex: 1,
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: text,
  }),
  signUpButton: {
    marginTop: 20,
    backgroundColor: Color.primary,
    borderRadius: 5,
    elevation: 1,
  },
  switchWrap: {
    ...Styles.Common.RowCenterLeft,
    marginTop: 10,
  },
  text: {
    marginLeft: 10,
    color: Color.blackTextSecondary,
  },
});

const mapStateToProps = (state) => {
  return {
    netInfo: state.netInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");
  return {
    login: (user, token) => dispatch(actions.login(user, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(SignUpScreen));

