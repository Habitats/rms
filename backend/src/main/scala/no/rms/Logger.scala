package no.rms

import org.slf4j.LoggerFactory

object Logger {
  val logger = LoggerFactory.getLogger(getClass)

  def info(msg: String) {
    logger.info(msg)
  }
}


