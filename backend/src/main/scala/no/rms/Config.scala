package no.rms

import java.io.{File, FileReader}
import java.util.Properties

object Config {
  val conf = new Properties
  conf.load(new FileReader(new File("secret/conf.properties")))

  def username = conf.getProperty("username")

  def password = conf.getProperty("password")

  def token = new File("secret/dropbox_token")

  def dropboxAppKey = conf.getProperty("dropbox_app_key")

  def dropboxAppSecret = conf.getProperty("dropbox_app_secret")
}


