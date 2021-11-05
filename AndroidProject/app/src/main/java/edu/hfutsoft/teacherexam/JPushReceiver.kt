package edu.hfutsoft.teacherexam

import android.content.Context
import android.util.Log
import cn.jpush.android.api.JPushMessage
import cn.jpush.android.service.JPushMessageReceiver

class JPushReceiver:JPushMessageReceiver(){
  override fun onAliasOperatorResult(p0: Context?, p1: JPushMessage?) {
    Log.i("jPush","alias: ${p1?.alias.toString()} \n errorcode: ${p1?.errorCode}")
    super.onAliasOperatorResult(p0, p1)
  }
}
