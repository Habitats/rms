package no.rms.auth

import no.rms.{Config, Log}

import scala.collection.mutable

object Users {

  val active: mutable.Map[String, User] = scala.collection.mutable.Map[String, User]()

  def login(user: User): Option[User] = {
    if (user.username.getOrElse("") == Config.username && user.password.getOrElse("") == Config.password) {
      Some(update(user.copy(admin = true)))
    } else {
      None
    }
  }

  def update(updated: User): User = {
    Log.i("User > Update: " + updated)
    active += (updated.id -> updated)
    updated
  }

  def logout(user: User) {
    active.remove(user.id)
  }
}
