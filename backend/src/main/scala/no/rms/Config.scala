package no.rms

import java.io.FileReader
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Properties

object Config {
  val df = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  val conf = new Properties
  conf.load(new FileReader(getClass.getResource("/conf.properties").getFile))

  def username: String = conf.getProperty("username")
  def password: String = conf.getProperty("password")
  def mail: String = conf.getProperty("mail")
  def mailPass: String = conf.getProperty("mail_pass")
  def mailUser: String = conf.getProperty("mail_user")
  def mailSmtp: String = conf.getProperty("mail_smtp")
  def sendGridApi: String = conf.getProperty("sendgrid_api")
  def mailPort: Int = conf.getProperty("mail_port").toInt
  def test: Boolean = conf.getProperty("test").toBoolean
  def imageRoot: String = conf.getProperty("images_dir")

  val COOKIE_ID     = "YOLO"
  val ONE_WEEK: Int = 7 * 24 * 3600
  val DEBUG         = true

  def parse(date: String): LocalDateTime = LocalDateTime.parse(date)
  def format(date: LocalDateTime): String = date.format(df)
}


