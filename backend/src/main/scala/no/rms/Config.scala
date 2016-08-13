package no.rms

import java.io.{File, FileReader}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Properties

object Config {
  val df = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  val conf = new Properties
  conf.load(new FileReader(new File("secret/conf.properties")))

  def username = conf.getProperty("username")
  def password = conf.getProperty("password")
  def token = new File("secret/dropbox_token")
  def dropboxAppKey = conf.getProperty("dropbox_app_key")
  def dropboxAppSecret = conf.getProperty("dropbox_app_secret")
  def test = conf.getProperty("test").toBoolean

  val COOKIE_ID = "YOLO"
  val ONE_WEEK  = 7 * 24 * 3600
  val DEBUG     = true
  val DB_FILE   = {
    val home = System.getProperty("user.home")
    val f = new File(home + "/" + "rms/rms.mv.db")
    Logger.info("------ DATABASE: " + f.getAbsolutePath)
    f
  }

  def parse(date: String): LocalDateTime = LocalDateTime.parse(date)
  def format(date: LocalDateTime): String = date.format(df)
}


