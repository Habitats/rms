package no.rms

import no.rms.dropbox.Dropbox
import org.junit.runner.RunWith
import org.scalatest.FunSuite
import org.scalatest.junit.JUnitRunner


@RunWith(classOf[JUnitRunner])
class RmsTest extends FunSuite {

  test("that dropbox works") {
    Dropbox.login
  }
}