package edu.hfutsoft.teacherexam

import android.content.Context
import android.util.Log
import android.webkit.JavascriptInterface
import cn.jpush.android.api.JPushInterface

class JavaScriptInterface(val context: Context) {
  @JavascriptInterface
  fun setAlias(s: String) {
    JPushInterface.setAlias(context, 0, s)
    Log.i("jPush","webView set Alias: $s")
  }

  @JavascriptInterface
  fun deleteAlias() {
    JPushInterface.deleteAlias(context, 0)
    Log.i("jPush", "webView delete alias")
  }
}
