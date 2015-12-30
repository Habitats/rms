package no.rms.auth

case class SafeUser(username: Option[String], rememberMe: Boolean, admin: Boolean) {
  def this(user: User) = this(user.username, user.rememberMe, user.admin)
}
