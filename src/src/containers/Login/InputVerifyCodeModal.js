/** @format */

import React, { Component } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "@components";
import styles from "./styles";

export default class InputVerifyCodeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verifyCode: "",
    };
  }

  render() {
    const { loadingVerify, showConfirmCode, confirmVerifyCode } = this.props;
    return (
      <Modal
        transparent={false}
        visible={showConfirmCode}
        animationTyped="slide">
        <SafeAreaView>
          <KeyboardAvoidingView
            style={styles.containerSMS}
            behavior="height"
            enabled>
            <TouchableWithoutFeedback
              style={styles.containerSMS}
              onPress={Keyboard.dismiss}>
              <View style={styles.containerSMS}>
                <View style={styles.infoContainer}>
                  <View style={styles.formInputConfirmContainer}>
                    <View style={styles.formInputConfirm}>
                      <TextInput
                        ref={(ref) => {
                          this.textConfirm = ref;
                        }}
                        placeholderTextColor="#adb4bc"
                        placeholder="--- ---"
                        keyboardType={"phone-pad"}
                        returnKeyType="done"
                        autoCapitalize="none"
                        autoFocus={true}
                        autoCorrect={false}
                        value={this.state.verifyCode}
                        onChangeText={(val) =>
                          this.setState({ verifyCode: val })
                        }
                        secureTextEntry={false}
                        style={[
                          styles.textInput,
                          this.state.verifyCode
                            ? { fontSize: 20 }
                            : { fontSize: 30 },
                        ]}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.btnSendSMS}
                    onPress={() => {
                      confirmVerifyCode(this.state.verifyCode);
                    }}>
                    {loadingVerify ? (
                      <ActivityIndicator size="small" color="#ffffff" />
                    ) : (
                      <Text style={styles.textBtn}>{"Apply code"}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
}
