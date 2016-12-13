package no.rms

import java.time.LocalDateTime

import org.slf4j.{Logger, LoggerFactory}

object Logger {
  val logger: Logger = LoggerFactory.getLogger(getClass)

  def info(msg: Any) {
    //    logger.info(msg)
    println(LocalDateTime.now + " > " + msg)
  }
}


