import React, { Component } from "react";
import "../styles/Footer.css";

class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <h4>Usefull Links</h4>
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
          <h4>Desgined By</h4>
          <div className="footerDesigner">
            <p>Tunahan Dizdaroglu</p>
            <p>Yusuf Demir</p>
            <p>Fatih Sancaktar</p>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
