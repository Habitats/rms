import React from 'react';
import Marty from 'marty';

class ContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {clicked: false, sent: false};
    this.valid = {};
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({clicked: true});
    if (this.isValid()) {
      this.app.projectActionCreators.sendMail(this.state);
      console.log('Sending email ...');
      this.setState({sent: true});
    }
  }

  isValid() {
    let valid = this.valid;
    return valid.name && valid.contactEmail && valid.contactPhone && valid.subject && valid.message;
  }

  onNameChange(e) {
    let name = e.target.value;
    this.setState({name: name});
    this.valid.name = name.length > 0;
  }

  onPhoneChange(e) {
    let contactPhone = e.target.value;
    this.setState({contactPhone: contactPhone});
    this.valid.contactPhone = contactPhone.length > 0;
  }

  onAddressChange(e) {
    let contactEmail = e.target.value;
    this.setState({contactEmail: contactEmail});
    this.valid.contactEmail = contactEmail.match('.+\@.+\..+');
  }

  onSubjectChange(e) {
    let subject = e.target.value;
    this.setState({subject: subject});
    this.valid.subject = subject.length > 0;
  }

  onMessageChange(e) {
    let message = e.target.value;
    this.setState({message: message});
    this.valid.message = message.length > 0;
  }

  render() {
    let valid = this.valid;
    var clicked = this.state.clicked;
    var sent = this.state.sent;
    let nameClasses = 'col-md-4 disabled ' + (!clicked || sent ? '' : (valid.name ? 'has-success' : 'has-error'));
    let contactPhoneClasses = 'col-md-4 ' + (!clicked || sent ? '' : (valid.contactPhone ? 'has-success' : 'has-error'));
    let contactEmailClasses = 'col-md-4 ' + (!clicked || sent ? '' : (valid.contactEmail ? 'has-success' : 'has-error'));
    let subjectClasses = 'col-md-12 ' + (!clicked || sent ? '' : (valid.subject ? 'has-success' : 'has-error'));
    let messageClasses = 'col-md-12 ' + (!clicked || sent ? '' : (valid.message ? 'has-success' : 'has-error'));
    let disabled = sent ? 'disabled' : undefined;
    let error = this.isValid() || !clicked || sent ? '' : (<p>Fyll inn alle feltene!</p>);
    let button =
      sent ? <h4>Din forespørsel er sendt!</h4> :
      (<button type="submit" className="btn btn-default btn-block" onClick={this.handleSubmit.bind(this)}>Send</button>);

    return (
      <div>
        <form className="form-horizontal" method="post">
          <div className="form-group">

            <div className={nameClasses}>
              <input name="name" disabled={disabled} onChange={this.onNameChange.bind(this)} type="text" placeholder="Navn"
                     className="form-control"/>
            </div>

            <div className={contactEmailClasses}>
              <input name="email" disabled={disabled} onChange={this.onAddressChange.bind(this)} type="text" placeholder="Epost"
                     className="form-control "/>
            </div>

            <div className={contactPhoneClasses}>
              <input name="phone" disabled={disabled} onChange={this.onPhoneChange.bind(this)} type="text" placeholder="Telefon"
                     className="form-control"/>
            </div>
          </div>
          <div className="form-group">

            <div className={subjectClasses}>
              <input name="subject" disabled={disabled} onChange={this.onSubjectChange.bind(this)} type="text" placeholder="Emne"
                     className="form-control"/>
            </div>
          </div>
          <div className="form-group">

            <div className={messageClasses}>
            <textarea onChange={this.onMessageChange.bind(this)} disabled={disabled} className="form-control" id="message" name="message"
                      placeholder="Send oss en forespørsel, og vi vil komme tilbake til deg så fort som mulig." rows="7"/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-12 text-center">
              {button}
            </div>
          </div>
        </form>
        {error}
      </div>
    );
  }
}

export default Marty.createContainer(ContactForm, {
  listenTo: 'projectStore',
  fetch: {}
});
