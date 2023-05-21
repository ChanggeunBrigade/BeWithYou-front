package com.bewithyou;
import expo.modules.ReactActivityDelegateWrapper;

import android.os.Bundle;
import android.content.Intent;

import android.content.Context;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import io.invertase.notifee.NotifeeApiModule;


public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  @Override
    protected String getMainComponentName() {
      return NotifeeApiModule.getMainComponent("BeWithYou");
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
      SplashScreen.show(this); // 추가
      super.onCreate(savedInstanceState);

      Context context = getApplicationContext();
      Intent intent = new Intent(this, MyTaskService.class);
      context.startService(intent);
      HeadlessJsTaskService.acquireWakeLockNow(context);
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED, new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        ));
  }
}
