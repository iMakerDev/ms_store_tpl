/* eslint-disable */
/** @format */

import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Image, TextInput, TouchableOpacity, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { WooWorker } from "api-ecommerce";
import appleAuth, {
  AppleButton,
} from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { firebase } from '@react-native-firebase/database';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, has, trim } from "lodash";
import Spinner from "react-native-loading-spinner-overlay";

import {
  Icons,
  Languages,
  Styles,
  Config,
  withTheme,
  Constants,
} from "@common";
import { Icon, toast, warn, FacebookAPI } from "@app/Omni";
import { ButtonIndex, SafeAreaView } from "@components";
import WPUserAPI from "@services/WPUserAPI";

import InputPhoneModal from "./InputPhoneModal";
import InputVerifyCodeModal from "./InputVerifyCodeModal";
import styles from "./styles";

class LoginScreen extends PureComponent {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    user: PropTypes.object,
    isLogout: PropTypes.bool,
    onViewCartScreen: PropTypes.func,
    onViewHomeScreen: PropTypes.func,
    onViewSignUp: PropTypes.func,
    logout: PropTypes.func,
    navigation: PropTypes.object,
    onBack: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      logInFB: false,
      phoneNumber: "",
      modalVisible: false,
      showConfirmCode: false,
      verifyCode: "",
      confirmResult: null,
      loadingVerify: false,
    };

    this.onUsernameEditHandle = (username) => this.setState({ username });
    this.onPasswordEditHandle = (password) => this.setState({ password });

    this.focusPassword = () => this.password && this.password.focus();
  }

  componentDidMount() {
    const { user, isLogout } = this.props;
    // check case after logout
    if (user && isLogout) {
      this._handleLogout();
    }
  }

  componentWillUnmount() {

    this.setState({})

  }


  // handle the logout screen and navigate to cart page if the new user login object exist
  UNSAFE_componentWillReceiveProps(nextProps) {
    const {
      onViewCartScreen,
      user: oldUser,
      onViewHomeScreen,
      route,
    } = this.props;

    const { user } = nextProps.user;
    const params = route?.params;

    // check case after logout
    if (user) {
      if (nextProps.isLogout) {
        this._handleLogout();
      } else if (!oldUser.user) {
        // check case after login
        this.setState({ isLoading: false });

        if (params && typeof params.onCart !== "undefined") {
          onViewCartScreen();
        } else {
          onViewHomeScreen();
        }
        // console.log(user, 'user')
        const displayName =
          has(user, "last_name") && has(user, "first_name")
            ? `${get(user, "last_name")} ${get(user, "first_name")}`
            : get(user, "username");

        toast(`${Languages.welcomeBack} ${displayName}.`);

        this.props.initAddresses(user);
      }
    }
  }

  _handleLogout = () => {
    const { logout, onViewHomeScreen } = this.props;
    logout();
    if (this.state.logInFB) {
      if (FacebookAPI.getAccessToken()) {
        FacebookAPI.logout();
      }
    }
    onViewHomeScreen();
  };

  _onBack = () => {
    const { onBack, goBack } = this.props;
    if (onBack) {
      onBack();
    } else {
      goBack();
    }
  };

  onLoginPressHandle = async () => {


    if(!!this.state.isLoading)return;

    const { login, netInfo } = this.props;
    //  没有连接网络
    if (!netInfo.isConnected) {
      return toast(Languages.noConnection);
    }

    this.setState({ isLoading: true });

    const { username, password } = this.state;
    // login the customer via Wordpress API and get the access token
    const json = await WPUserAPI.login(trim(username), password);

    console.log('-----------------------')
    console.log('-----------------------')
    console.log('-----------------------')
    console.log('-----------------------')
    console.log('-----------------------')
    console.log(json);
    console.log('-----------------------')
    console.log('-----------------------')
    console.log('-----------------------')
    console.log('-----------------------')
    console.log('-----------------------')
    // console.log(json, 'json')
    if (!json) {
      this.stopAndToast(Languages.GetDataError); //无法从服务器获取数据
    } else if (json.error || json.message) {
      this.stopAndToast(json.error || json.message);
    } else {
      if (has(json, "user.id")) {
        
        let customers = await WooWorker.getCustomerById(get(json, "user.id"));
        console.log(customers);
        customers = { ...customers, username, password };
        firebase.app().database().ref('/users/').once('value', (value) => {
            let userData = value.val()
            console.log(userData, 'userData')
            if (userData[customers.id]) {
              if (userData[customers.id].avatar_url) {
                customers.avatar_url = userData[customers.id].avatar_url
              } else {
                //@@ 支持默认头像
                customers.avatar_url = '../../../assets/icons/app.png';
              }
              customers.IsMember = userData[customers.id].IsMember
            }
            // console.log(customers, 'customers')
            this.setState({ isLoading: false });

            this._onBack();
            console.log('cookie');
            console.log(json);
            login(customers, json.cookie);

            return;
          })

      }else{
        this.stopAndToast(Languages.CanNotLogin); //无法登录，出现问题!

      }

    }
    // auth()
    //   .signInWithEmailAndPassword('123456@163.com', '123456')
    //   .then(() => {
    //     console.log('登录成功');
    //   })
    //   .catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error, '错误');
    //   });
  };

  onFBLoginPressHandle = () => {
    const { login } = this.props;
    this.setState({ isLoading: true });
    FacebookAPI.login()
      .then(async (token) => {
        if (token) {
          const json = await WPUserAPI.loginFacebook(token);
          warn(["json", json]);
          if (json === undefined) {
            this.stopAndToast(Languages.GetDataError);
          } else if (json.error || json.message) {
            this.stopAndToast(json.error || json.message);
          } else {
            let customers = await WooWorker.getCustomerById(json.wp_user_id);
            customers = { ...customers, token, picture: json.user.picture };
            this._onBack();
            login(customers, json.cookie);
          }
        } else {
          this.setState({ isLoading: false });
        }
      })
      .catch((err) => {
        warn(err);
        this.setState({ isLoading: false });
      });
  };

  // 发送短信验证

  onSMSLoginPressHandle = async (phoneNumber) => {
    this.setState({ phoneNumber: phoneNumber, loadingVerify: true });

    try {

      // let testNumber = '+86 134 7084 9837';
      console.log('###')
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber,true);
      console.log('成功回调');
      console.log(confirmation, '11短信登入信息');
      if (confirmation._verificationId) {
        this.setState({
          showConfirmCode: true,
          modalVisible: false,
          confirmResult: confirmation,
          loadingVerify: false,
        });
      } else {
        this.setState({ loadingVerify: false, modalVisible: false });
        toast("Please try again");
      }
    } catch (error) {
      console.log('@@@@')
      console.log(error)

      this.setState({ loadingVerify: false, modalVisible: false });
      toast(`Sign In With Phone Number Error: ${error.message}`);
    }
  };

  confirmVerifyCode = async (verifyCode) => {
    const { login } = this.props;
    const { phoneNumber, confirmResult } = this.state;

    this.setState({ loadingVerify: true });
    // console.log(confirmResult,'confirmResult')
    try {
      // User entered code
      // Successful login - onAuthStateChanged is triggered
      const result = await confirmResult.confirm(verifyCode);
      // console.log(result,'result')
      if (result?.user?._user?.uid) {
        const endpoint = `${Config.WooCommerce.url}/wp-json/api/flutter_user/firebase_sms_login?phone=${phoneNumber}&isSecure`;

        fetch(endpoint)
          .then((response) => response.json())
          .then(async (json) => {
            warn(["json", json]);
            if (json === undefined) {
              this.stopAndToast(Languages.GetDataError);
            } else if (json.error || json.message) {
              this.stopAndToast(json.error || json.message);
            } else {
              let customers = await WooWorker.getCustomerById(json.wp_user_id);

              customers = { ...customers, phoneNumber, picture: null };
              // console.log(json, customers, 'userInfo')
              this.setState(
                { showConfirmCode: false, loadingVerify: false },
                () => {
                  this._onBack();
                  login(customers, json.cookie);
                }
              );
            }
          })
          .catch((e) => {
            toast(`Please type code again`);
            this.setState({ isLoading: false, showConfirmCode: false , loadingVerify:false});
          });
      } else {
        toast(`Please type code again`);
        this.setState({ isLoading: false, showConfirmCode: false, loadingVerify:false });
      }
    } catch (err) {
      console.log("confirmVerifyCode error", err);

      toast(`Verify fail!`);
      this.setState({ isLoading: false, showConfirmCode: false, loadingVerify:false });
    }
  };

  onSignUpHandle = () => {
    this.props.onViewSignUp();
  };

  checkConnection = () => {
    const { netInfo } = this.props;
    if (!netInfo.isConnected) toast(Languages.noConnection);
    return netInfo.isConnected;
  };

  stopAndToast = (msg) => {
    toast(msg);
    this.setState({ isLoading: false });
  };

  setModalVisible=(key, visible) =>{
    this.setState({ [key]: visible ,loadingVerify:false});
  }

  renderVerificationCodeInput = () => {
    const { loadingVerify, showConfirmCode } = this.state;
    return (
      <InputVerifyCodeModal
        loadingVerify={loadingVerify}
        showConfirmCode={showConfirmCode}
        confirmVerifyCode={this.confirmVerifyCode}
      />
    );
  };

  renderModal = () => {
    const { loadingVerify, modalVisible } = this.state;
    return (
      <InputPhoneModal
        modalVisible={modalVisible}
        loadingVerify={loadingVerify}
        onSMSLoginPressHandle={this.onSMSLoginPressHandle}
        setModalVisible={this.setModalVisible}
      />
    );
  };

  // issues login https://github.com/invertase/react-native-apple-authentication#faqs
  appleSignIn = async () => {
    let error = false;
    // sign in request
    const responseObject = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // initialized first login, so apple don't allow login again, we will get data from the store to handle.
    if (!responseObject || (responseObject && !responseObject.email)) {
      const resp = await AsyncStorage.getItem(Constants.AppleData);
      const appleData = resp ? JSON.parse(resp) : null;

      if (appleData) {
        responseObject.email = appleData.email;
        responseObject.fullName = appleData.fullName;
      } else {
        error = true;
      }
    }

    if (!error) {
      const {
        email,
        fullName: { familyName, givenName, middleName },
      } = responseObject;

      await AsyncStorage.setItem(
        Constants.AppleData,
        JSON.stringify(responseObject)
      );

      this.setState({ isLoading: true });

      const fullName = `${familyName || ""} ${middleName || ""} ${givenName ||
        ""}`;
      const { login } = this.props;
      const json = await WPUserAPI.appleLogin(
        email,
        fullName,
        email.split("@")[0]
      );

      if (json === undefined) {
        this.stopAndToast(Languages.GetDataError);
      } else if (json.error) {
        this.stopAndToast(json.error);
      } else {
        const customers = await WooWorker.getCustomerById(json.wp_user_id);

        this._onBack();
        login(customers, json.cookie);
      }
    } else {
      // eslint-disable-next-line no-alert
      alert(
        "Currently, we can not get your email, please go to the " +
        "Settings > Apple ID, iCloud, iTunes & App Store > Password & Security > Apps Using Your Apple ID, " +
        "tap on your app and tap Stop Using Apple ID"
      );
    }
  };

  render() {
    const { username, password, isLoading } = this.state;
    const {
      theme: {
        colors: { background, text, placeholder },
      },
    } = this.props;

    return (
      <KeyboardAwareScrollView
        enableOnAndroid={false}
        style={{ backgroundColor: background }}
        contentContainerStyle={styles.container}>
        <SafeAreaView>
          <View style={styles.logoWrap}>
            <Image
              source={Config.LogoWithText}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.subContain}>
            <View style={styles.loginForm}>
              <View style={styles.inputWrap}>
                <Icon
                  name={Icons.MaterialCommunityIcons.Email}
                  size={Styles.IconSize.TextInput}
                  color={text}
                />
                <TextInput
                  style={styles.input(text)}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={placeholder}
                  ref={(comp) => (this.username = comp)}
                  placeholder={Languages.UserOrEmail}
                  keyboardType="email-address"
                  onChangeText={this.onUsernameEditHandle}
                  onSubmitEditing={this.focusPassword}
                  returnKeyType="next"
                  value={username}
                />
              </View>
              <View style={styles.inputWrap}>
                <Icon
                  name={Icons.MaterialCommunityIcons.Lock}
                  size={Styles.IconSize.TextInput}
                  color={text}
                />
                <TextInput
                  style={styles.input(text)}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={placeholder}
                  ref={(comp) => (this.password = comp)}
                  placeholder={Languages.password}
                  onChangeText={this.onPasswordEditHandle}
                  secureTextEntry
                  returnKeyType="go"
                  value={password}
                />
              </View>
              <ButtonIndex
                text={Languages.Login.toUpperCase()}
                containerStyle={styles.loginButton}
                onPress={this.onLoginPressHandle}
              />
            </View>
            <View style={styles.separatorWrap}>
              <View style={styles.separator(text)} />
              <Text style={styles.separatorText(text)}>{Languages.Or}</Text>
              <View style={styles.separator(text)} />
            </View>

            {/* {appleAuth.isSupported && (
              <AppleButton
                style={styles.appleBtn}
                cornerRadius={5}
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                onPress={this.appleSignIn}
              />
            )}

            {'ios'===Platform.OS&&<ButtonIndex
              text={Languages.FacebookLogin.toUpperCase()}
              icon={Icons.MaterialCommunityIcons.Facebook}
              containerStyle={styles.fbButton}
              onPress={this.onFBLoginPressHandle}
            />} */}

            <ButtonIndex
              text={Languages.SMSLogin.toUpperCase()}
              icon={Icons.MaterialCommunityIcons.SMS}
              containerStyle={styles.smsButton}
              onPress={() => {
                this.setModalVisible("modalVisible", true);
              }}
            />
            {this.renderModal()}
            {this.renderVerificationCodeInput()}

            <TouchableOpacity
              style={Styles.Common.ColumnCenter}
              onPress={this.onSignUpHandle}>
              <Text style={[styles.signUp, { color: text }]}>
                {Languages.DontHaveAccount}{" "}
                <Text style={styles.highlight}>{Languages.signup}</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <Spinner visible={isLoading} />

        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

LoginScreen.propTypes = {
  netInfo: PropTypes.object,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = ({ netInfo, user }) => ({ netInfo, user });

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@redux/UserRedux");
  const AddressRedux = require("@redux/AddressRedux");

  return {
    login: (user, token) => dispatch(actions.login(user, token)),
    logout: () => dispatch(actions.logout()),
    initAddresses: (customerInfo) => {
      AddressRedux.actions.initAddresses(dispatch, customerInfo);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(LoginScreen));
