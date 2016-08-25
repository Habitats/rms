package no.rms

import java.io.{File, FileReader}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Properties

import scala.io.{BufferedSource, Source}

object Config {
  val df = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  val conf = new Properties
  conf.load(new FileReader(getClass.getResource("/conf.properties").getFile))

  def username = conf.getProperty("username")
  def password = conf.getProperty("password")
  def token = new File(getClass.getResource("/dropbox_token").getFile)
  def dropboxAppKey = conf.getProperty("dropbox_app_key")
  def dropboxAppSecret = conf.getProperty("dropbox_app_secret")
  def test = conf.getProperty("test").toBoolean

  val COOKIE_ID = "YOLO"
  val ONE_WEEK  = 7 * 24 * 3600
  val DEBUG     = true
  val DB_FILE: File   = {
    val f = new File(getClass.getResource("/rms.mv.db").getFile)
    f
  }

  def parse(date: String): LocalDateTime = LocalDateTime.parse(date)
  def format(date: LocalDateTime): String = date.format(df)
}


