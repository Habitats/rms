package no.rms

import java.io.{File, FileReader}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Properties

object Config {
  val df = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  val conf = new Properties
  conf.load(new FileReader(getClass.getResource("/conf.properties").getFile))

  def username = conf.getProperty("username")
  def password = conf.getProperty("password")
  def test = conf.getProperty("test").toBoolean
  def imageRoot = formatPath(conf.getProperty("images_dir"))

  def formatPath(path: String): String = {
    path
      .replace("%DROPBOX_HOME%", sys.env("DROPBOX_HOME"))
      .replace("~", System.getProperty("user.home"))
      .replace("\\", "/")
  }

  val COOKIE_ID     = "YOLO"
  val ONE_WEEK      = 7 * 24 * 3600
  val DEBUG         = true
  val DB_FILE: File = {
    val f = new File("db/rms.mv.db")
    f
  }

  def parse(date: String): LocalDateTime = LocalDateTime.parse(date)
  def format(date: LocalDateTime): String = date.format(df)
}


