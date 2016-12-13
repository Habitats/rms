package no.rms

import com.sendgrid.{Email => SendGridEmail, _}
import no.rms.models.Email

import scala.util.Try

trait SendGridMailer {

  def send(email: Email): Unit = {
    val from = new SendGridEmail(email.contactEmail)
    val subject = email.subject
    val to = new SendGridEmail(Config.mail)
    val content = new Content("text/plain", email.message)
    val mail = new Mail(from, subject, to, content)

    val sg = new SendGrid(Config.sendGridApi)
    val request = new Request()
    Try {
      request.method = Method.POST
      request.endpoint = "mail/send"
      request.body = mail.build()
      val response = sg.api(request)
      Logger.info("Email sent: " + response.statusCode)
    }
  }
}
