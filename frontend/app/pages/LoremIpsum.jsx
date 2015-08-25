import React from 'react';
import Marty from 'marty';

class LoremIpsum extends React.Component {
  render() {
    console.log('FLUX > rendering > main');
    return (
      <div>
        <div>
          <div className="row">
            <div className="col-lg-12 text-center box">
              <img className="img-responsive img-full" src={'http://www.pic2014.com/wp-content/uploads/2014-nice-cat-picture.jpg'}/>

              <h2 className="brand-before">
                <small>Welcome to</small>
              </h2>
              <h1 className="brand-name">Romerike Markiseservice</h1>
              <hr/>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 box">

              <hr/>
              <h2 className="intro-text text-center">HTML Ipsum Presents</h2>
              <hr/>

              <p><strong>Pellentesque habitant morbi tristique</strong> senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. <em>Aenean
                  ultricies mi vitae est.</em> Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.
                Vestibulum erat wisi, condimentum sed, <code>commodo vitae</code>, ornare sit amet, wisi. Aenean fermentum, elit eget
                tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. <a href="#">Donec non enim</a> in turpis
                pulvinar facilisis. Ut felis.</p>

              <hr/>
              <h2 className="intro-text text-center">Hello header</h2>
              <hr/>

              <dl className="dl-horizontal">
                <dt>Description lists</dt>
                <dd>A description list is perfect for defining terms.</dd>
                <dt>Euismod</dt>
                <dd>Vestibulum id ligula porta felis euismod semper eget lacinia odio sem nec elit.</dd>
                <dd>Donec id elit non mi porta gravida at eget metus.</dd>
                <dt>Malesuada porta</dt>
                <dd>Etiam porta sem malesuada magna mollis euismod.</dd>
                <dt>Felis euismod semper eget lacinia</dt>
                <dd>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</dd>
              </dl>
              <blockquote><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus magna. Cras in mi at felis aliquet congue.
                Ut a est eget ligula molestie gravida. Curabitur massa. Donec eleifend, libero at sagittis mollis, tellus est malesuada
                tellus, at luctus turpis elit sit amet quam. Vivamus pretium ornare est.</p></blockquote>

              <hr/>
              <h2 className="intro-text text-center">You are pretty cool</h2>
              <hr/>

              <ul>
                <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                <li>Aliquam tincidunt mauris eu risus.</li>
              </ul>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim. In
                hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 box">

              <hr/>
              <h2 className="intro-text text-center">Lorem ipsum dolor <strong>sit amet</strong></h2>
              <hr/>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc placerat diam quis nisl vestibulum dignissim. In
                hac habitasse platea dictumst. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque
                habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Marty.createContainer(LoremIpsum, {});
