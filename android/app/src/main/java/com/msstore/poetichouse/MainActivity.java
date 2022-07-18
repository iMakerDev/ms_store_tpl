package {{new_item_android_package}};

import android.content.Intent;
import android.content.Context;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import com.facebook.react.modules.i18nmanager.I18nUtil;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "{{name}}";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        // MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
        I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
        Context context = getApplicationContext();
        sharedI18nUtilInstance.allowRTL(context, true);
    }
}
