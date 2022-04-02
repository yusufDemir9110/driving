import React, { Component } from "react";
import "../styles/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <h3>Usefull Links</h3>
          <div className="footerImg">
            <div>
              <div>
                <a href="https://www.rdw.nl/over-rdw">
                  <img src="https://logovtor.com/wp-content/uploads/2020/01/rdw-logo-vector.png" />
                  <span>Rijksdienst voor het Wegverkeer (RDW)</span>
                </a>
              </div>
              <div>
                <a href="https://www.cbr.nl/nl.htm">
                  <img src="https://www.mijnhuisartsgoirle.nl/wp-content/uploads/sites/138/2019/10/Afbeelding-CBR-logo-300x182.png" />
                  <span>Centraal Bureau Rijvaardigheid (CBR)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h3>Designed By</h3>
          <div className="footerDesigner">
            <p>Mesut Demirturk</p>
            <p>Yusuf Demir</p>
            <p>Fatih Sancaktar</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
