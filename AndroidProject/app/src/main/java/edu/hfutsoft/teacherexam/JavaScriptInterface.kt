package edu.hfutsoft.teacherexam

import android.content.Context
import android.webkit.JavascriptInterface
import cn.jpush.android.api.JPushInterface
import java.util.*

class JavaScriptInterface(val context: Context) {
  @JavascriptInterface
  fun setAlias(s:String){
    JPushInterface.setAlias(context, Date().time.toInt(),s)
  }
//  @JavascriptInterface
//  fun deleteAlias(s:String){
//    JPushInterface.deleteAlias(context,s)
//  }
}
