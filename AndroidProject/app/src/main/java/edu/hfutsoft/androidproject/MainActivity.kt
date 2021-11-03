package edu.hfutsoft.androidproject

import android.annotation.SuppressLint
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.KeyEvent
import android.webkit.ConsoleMessage
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient

class MainActivity : AppCompatActivity() {
  @SuppressLint("SetJavaScriptEnabled")
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    findViewById<WebView>(R.id.wv).apply {
      settings.javaScriptEnabled = true
      settings.domStorageEnabled = true
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
      loadUrl("file:///android_asset/dist/index.html")
    }
  }

  override fun onKeyDown(keyCode: Int, event: KeyEvent?): Boolean {
    val webView = findViewById<WebView>(R.id.wv)
    if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
      arrayOf("changeSquare", "myInfo", "allInvigilationInfo").forEach {
        if (webView.url?.endsWith(it) == true) return super.onKeyDown(keyCode, event)

      }
      webView.goBack()
      return true
    }
    return super.onKeyDown(keyCode, event)
  }
}
