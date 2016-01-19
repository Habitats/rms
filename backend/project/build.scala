import com.mojolly.scalate.ScalatePlugin.ScalateKeys._
import com.mojolly.scalate.ScalatePlugin._
import org.scalatra.sbt._
import sbt.Keys._
import sbt._

object BackendBuild extends Build {
  val Organization = "no.rms"
  val Name = "backend"
  val Version = "0.1.0-SNAPSHOT"
  val ScalaVersion = "2.11.7"
  val ScalatraVersion = "2.3.1"

  lazy val project = Project(
    "backend",
    file("."),
    settings = ScalatraPlugin.scalatraSettings ++ scalateSettings ++ Seq(
      organization := Organization,
      name := Name,
      version := Version,
      ivyScala := ivyScala.value map {
        _.copy(overrideScalaVersion = true)
      },
      scalaVersion := ScalaVersion,
      resolvers += Classpaths.typesafeReleases,
      resolvers += "Scalaz Bintray Repo" at "http://dl.bintray.com/scalaz/releases",
      resolvers += "softprops-maven" at "http://dl.bintray.com/content/softprops/maven",

      libraryDependencies ++= Seq(
        "org.scalatra" %% "scalatra" % ScalatraVersion,
        "org.scalatra" %% "scalatra-scalate" % ScalatraVersion,
        "org.scalatra.scalate" %% "scalate-core" % "1.7.0" % "compile" intransitive(),
        "org.scala-lang" % "scala-reflect" % ScalaVersion,
        "org.scala-lang" % "scala-compiler" % ScalaVersion,
        "org.scala-lang" % "scalap" % ScalaVersion,
        "org.scala-lang.modules" % "scala-parser-combinators_2.11" % "1.0.4",
        "org.scalatra" %% "scalatra-json" % ScalatraVersion,
        "ch.qos.logback" % "logback-classic" % "1.1.2" % "runtime",
        "org.eclipse.jetty" % "jetty-webapp" % "9.2.10.v20150310" % "container;compile",
        "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided",
        "com.typesafe.slick" %% "slick" % "3.1.1",
        "com.typesafe" % "config" % "1.3.0",
        "com.h2database" % "h2" % "1.4.190",
        "org.json4s" % "json4s-jackson_2.11" % "3.3.0.RC3",
        "org.json4s" % "json4s-native_2.11" % "3.3.0.RC3",
        "com.mchange" % "c3p0" % "0.9.5.1",
        "com.sksamuel.scrimage" %% "scrimage-core" % "2.0.1",
        "com.sksamuel.scrimage" %% "scrimage-io" % "2.0.1",
        "com.sksamuel.scrimage" %% "scrimage-filters" % "2.0.1",
        "org.apache.xmlgraphics" % "batik-codec" % "1.7",
        "me.lessis" %% "courier" % "0.1.3",
        "com.dropbox.core" % "dropbox-core-sdk" % "1.7.7",
        "org.scalatest" % "scalatest_2.11" % "3.0.0-M7",
        "junit" % "junit" % "4.11",
        "org.scalatra" %% "scalatra-auth" % "2.3.0"
      ),
      scalateTemplateConfig in Compile <<= (sourceDirectory in Compile) { base =>
        Seq(
          TemplateConfig(
            base / "webapp" / "WEB-INF" / "templates",
            Seq.empty, /* default imports should be added here */
            Seq(
              Binding("context", "_root_.org.scalatra.scalate.ScalatraRenderContext", importMembers = true, isImplicit = true)
            ), /* add extra bindings here */
            Some("templates")
          )
        )
      }
    )
  )
}
