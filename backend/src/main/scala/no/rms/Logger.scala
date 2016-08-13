package no.rms

import java.time.LocalDateTime

import org.slf4j.LoggerFactory

object Logger {
  val logger = LoggerFactory.getLogger(getClass)

  def info(msg: AnyRef) {
    //    logger.info(msg)
    println(LocalDateTime.now + " > " + msg)
  }
}


