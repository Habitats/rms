package no.rms.auth

object Users {

  var active = Map[String, User]()

  def add(user: User) {
    active += (user.id -> user)
  }

  def findById(id: String) = {
    active(id)
  }
}
