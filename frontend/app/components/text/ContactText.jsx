import React from 'react';

export default class ContactText extends React.Component {

  render() {
    return (
      <div>

        <div className="row">
          <div className="col-md-12">
            <h3>Adresse:</h3>

            <p>Romerike Markiseservice AS<br />
              Døhlengården<br />
              2032 MAURA
            </p>

            <p>
              Tlf: 63 99 95 32<br />
              Fax: 63 99 95 18 <br />
              Mobil Morten: 90 73 19 07<br />
              Mobil Roar: 90 73 18 80<br />
              E-post kontor: <a href="mailto:post@romerike-markiseservice.no">post@romerike-markiseservice.no</a><br />
              E-post Morten: <a href="mailto:morten@romerike-markiseservice.no">morten@romerike-markiseservice.no</a><br />
              E-post Roar: <a href="mailto:roar@romerike-markiseservice.no">roar@romerike-markiseservice.no</a>
            </p>

            <h3>Kontortid:</h3>

            <p>Mandag-fredag: 0900-1600</p>

            <h3>Tlf. betjening:</h3>

            <p>Mandag-fredag: 0800-2000<br />
              Lørdag: 1000-1400</p>
          </div>
        </div>
      </div>
    );
  }
}

