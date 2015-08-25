package no.rms.dropbox

import java.io.{File, PrintWriter}
import java.util.Locale

import com.dropbox.core.{DbxAppInfo, DbxClient, DbxRequestConfig, DbxWebAuthNoRedirect}
import no.rms.Config

import scala.io.Source

object Dropbox {

  def auth: String = {
    val appInfo = new DbxAppInfo(Config.dropboxAppKey, Config.dropboxAppSecret)
    val config = new DbxRequestConfig("rms", Locale.getDefault.toString)
    val webAuth = new DbxWebAuthNoRedirect(config, appInfo)

    val authUrl = webAuth.start
    println("Auth url:")
    println(authUrl)
    println("Enter key")
    //    val code = new Scanner(System.in).nextLine
    val code = "dPufeS5iFqcAAAAAAABeH9DxCJF3TaNTtoTp1tO8pZk"
    val authFinish = webAuth.finish(code)
    val token = authFinish.accessToken
    val f = new PrintWriter(new File("secret/dropbox_token"))
    f.write(token)
    f.close
    val client = new DbxClient(config, token)
    println("Linked account: " + client.getAccountInfo.displayName)
    token
  }

  def login = {
    println(new File("").getAbsoluteFile)
    val f = Config.token
    val token = if (f.exists) Source.fromFile(f).getLines().mkString else auth
    val config = new DbxRequestConfig("rms", Locale.getDefault.toString)
    val client = new DbxClient(config, token)
    client
  }
}
