package com.nativeforegroundtask

import android.content.Intent
import android.os.Bundle
import android.os.PersistableBundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

  override fun getMainComponentName(): String = "NativeForegroundTask"
    override fun onCreate(savedInstanceState: Bundle?, persistentState: PersistableBundle?) {
        super.onCreate(savedInstanceState, persistentState)

    }
    override fun onResume() {
        super.onResume()
//        val headlessService = Intent(this, MyHeadlessJsTaskService::class.java)
//        val bundle = Bundle()
//        bundle.putBoolean("appInFront", true)
//        headlessService.putExtras(bundle)
//        startService(headlessService)
    }

    override fun onPause() {
        super.onPause()
//        val headlessService = Intent(this, MyHeadlessJsTaskService::class.java)
//        val bundle = Bundle()
//        bundle.putBoolean("appInFront", false)
//        headlessService.putExtras(bundle)
//        startService(headlessService)
    }

    /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
