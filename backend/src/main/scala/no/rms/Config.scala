package no.rms

import java.io.{File, FileReader}
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.Properties

import scala.collection.JavaConverters._
import scala.util.{Failure, Success, Try}

object Config {
  val df = DateTimeFormatter.ISO_LOCAL_DATE_TIME

  println(System.getenv().asScala.map { case (k, v) => k + "=" + v }.toList.sorted.mkString("\n"))

  private val conf: Option[Properties] = {

    def load(propPath: String) = {
      Try {
        val conf = new Properties
        println(s"Attempting to load props from $propPath ...")
        conf.load(new FileReader(loadFile(propPath)))
        println(s"Successfully loaded props from $propPath!")
        conf
      } match {
        case Failure(f) => println(s"Couldn't load props from $propPath: $f"); None
        case Success(p) => Some(p)
      }
    }

    Stream("/conf.properties", "conf.properties", System.getenv("RMS_PROPS_PATH"))
      .flatMap(Option(_))
      .flatMap(load)
      .headOption
  }

  def username: String = prop("username", "RMS_USERNAME")
  def password: String = prop("password", "RMS_PASSWORD")

  def mailFrom: String    = prop("mail_from", "RMS_MAIL_FROM")
  def mailTo: String      = prop("mail_to", "RMS_MAIL_TO")
  def sendGridApi: String = prop("sendgrid_api", "RMS_SENDGRID_API_KEY")

  def test: Boolean     = prop("test", "RMS_TEST").toBoolean
  def imageRoot: String = prop("images_dir", "RMS_IMAGE_ROOT")
  def appRoot: String   = prop("app_dir", "RMS_APP_ROOT")
  def dbPath: String   =   Option(System.getenv("RMS_DB_PATH")).getOrElse(throw new IllegalArgumentException("Missing RMS_DB_PATH"))

  val COOKIE_ID     = "YOLO"
  val ONE_WEEK: Int = 7 * 24 * 3600
  val DEBUG         = true

  def parse(date: String): LocalDateTime  = LocalDateTime.parse(date)
  def format(date: LocalDateTime): String = date.format(df)

  def loadFile(path: String): File = {
    new File(Try(getClass.getResource(path).getFile)
      .orElse(Try(getClass.getClassLoader.getResource(path).getFile))
      .getOrElse(path))
  }

  private def prop(prop: String, env: String): String = {
    val value = Option(System.getenv(env))
      .filter(_.nonEmpty)
      .orElse(conf.flatMap(p => Option(p.getProperty(prop))))
      .getOrElse(throw new IllegalArgumentException(s"No valid key: $prop/$env"))
    println(s"Loaded property: $prop/$env = $value")
    value
  }
}
