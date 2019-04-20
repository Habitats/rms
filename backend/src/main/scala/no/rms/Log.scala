package no.rms

import java.time.LocalDateTime

import org.slf4j.{Logger, LoggerFactory}

object Log {
  val logger: Logger = LoggerFactory.getLogger(getClass)

  def i(msg: Any) {
    //    logger.info(msg)
    println(LocalDateTime.now + " > " + msg)
  }
}


