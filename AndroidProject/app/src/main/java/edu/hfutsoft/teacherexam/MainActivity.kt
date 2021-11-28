package edu.hfutsoft.teacherexam

import android.annotation.SuppressLint
import android.content.pm.PackageManager
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.KeyEvent
import android.view.WindowManager
import android.widget.Toast
import androidx.core.content.ContextCompat
import cn.jpush.android.api.JPushInterface
import com.tencent.smtt.export.external.interfaces.ConsoleMessage
import com.tencent.smtt.sdk.WebChromeClient
import com.tencent.smtt.sdk.WebSettings
import com.tencent.smtt.sdk.WebView
import java.util.*

class MainActivity : AppCompatActivity() {
  private var time = 0L

  @SuppressLint("SetJavaScriptEnabled", "ShowToast")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    toast = Toast.makeText(this, "", Toast.LENGTH_SHORT)
    window.setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN)

    setContentView(R.layout.activity_main)

    if (ContextCompat.checkSelfPermission(
        this,
        android.Manifest.permission.READ_PHONE_STATE
      ) == PackageManager.PERMISSION_DENIED
    )
      JPushInterface.requestPermission(this)

    findViewById<WebView>(R.id.wv).apply {
      settings.javaScriptEnabled = true
      settings.domStorageEnabled = true
//      设置缓存可以加载更快，但还需要有缓存更新的策略，我先不设置
//      settings.cacheMode=WebSettings.LOAD_CACHE_ELSE_NETWORK
      /** @see android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW*/
      settings.mixedContentMode=0
      webChromeClient = object : WebChromeClient() {
        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
          consoleMessage?.apply {
            Log.i(
              this::class.qualifiedName,
              "${message()} -- From line ${lineNumber()} of ${sourceId()}"
            )
          }
          return super.onConsoleMessage(consoleMessage)
        }
      }
      addJavascriptInterface(JavaScriptInterface(this@MainActivity), "Android")
      loadUrl("https://qingcheng.asia/hfutexam/")
    }
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    val webView = findViewById<WebView>(R.id.wv)
    if (keyCode == KeyEvent.KEYCODE_BACK) {
      arrayOf("changeSquare", "myInfo", "allInvigilationInfo").forEach {
        if (webView.url?.endsWith(it) == true) {
          if (Date().time - time < 2000) {
            toast?.cancel()
            finish()
          } else {
            time = Date().time
            showToast("再按一次退出应用")
          }
          return true
        }
      }
      if (webView.canGoBack()) webView.goBack()
      return true
    }
    return super.onKeyDown(keyCode, event)
  }

  override fun onDestroy() {
    toast = null
    super.onDestroy()
  }
}

var toast: Toast? = null
fun showToast(text: CharSequence, duration: Int = Toast.LENGTH_SHORT) {
  if (toast == null) throw NullPointerException("toast dose not init")
  toast?.setText(text)
  toast?.duration = duration
  toast?.show()
}
