/** @format */

const FBSDK = require("react-native-fbsdk-next");

const { LoginManager, AccessToken } = FBSDK;

export default class Facebook {
  static logInWithReadPermissionsAsync(logInID, options) {
    return LoginManager.logInWithPermissions(options.permissions).then(
      (result) => {
        if (result.isCancelled) {
          
          return;
        }
        return AccessToken.getCurrentAccessToken().then((data) => {
          return { type: "success", token: data.accessToken };
        });
      }
    );
  }
}
