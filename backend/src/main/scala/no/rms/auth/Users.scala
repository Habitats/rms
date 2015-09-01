package no.rms.auth

/**
 * Created by mail on 31.08.2015.
 */
object Users {

  var active = Map[String, User]()

  def add(user: User) = {
    active += (user.id -> user)
  }

  def findById(id: String) = {
    active(id)
  }
}
