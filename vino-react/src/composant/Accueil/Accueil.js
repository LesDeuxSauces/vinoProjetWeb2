import './Accueil.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default class Accueil extends React.Component {
  constructor(props) {
      super(props);
      this.state = {};
  }
  render() {
    return (
        <div className="pageAccueil">
            <div className="bandeau">
                <Link to="/Cellier" className="btnAction">Voir mes celliers</Link>
            </div>
        </div>
    );
}
}
