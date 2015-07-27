import React from 'react';

export default class ContactForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form className="form-horizontal" method="post">
        <div className="form-group">

          <div className="col-md-4">
            <input name="name" type="text" placeholder="Navn" className="form-control"/>
          </div>

          <div className="col-md-4">
            <input name="email" type="text" placeholder="Epost" className="form-control"/>
          </div>

          <div className="col-md-4">
            <input name="phone" type="text" placeholder="Telefon" className="form-control"/>
          </div>
        </div>
        <div className="form-group">

          <div className="col-md-12">
            <input name="subject" type="text" placeholder="Emne" className="form-control"/>
          </div>
        </div>
        <div className="form-group">

          <div className="col-md-12">
            <textarea className="form-control" id="message" name="message"
                      placeholder="Send oss en forespørsel, og vi vil komme tilbake til deg så fort som mulig." rows="7"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12 text-center">
            <button type="submit" className="btn btn-default btn-block" onClick={this.handleSubmit.bind(this)}>Send</button>
          </div>
        </div>
      </form>
    );
  }
}