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
            <div className="contenu">
         
                <section className="section-fonctionnement">
                    <div className="section-fonctionnement--globalWrapper">
                        <div className="section-fonctionnement--wrapper">
                            <div className="section-fonctionnement--colonne">
                                <h2>Par où commencer?</h2>
                                <p>Vous pouvez parcourir l’entièrté du catalogue des bières sans besoin de vous connecter. Ne perdez pas plus de temps et   passez directement à la section des bières ! Plus de 1500 bières de tout genre n’attendent plus que vous. À votre santé !
                                </p>
                            </div>
                            <div className="section-fonctionnement--colonne">
                                <h2>Par ici les avis !</h2>
                                <p>Votre avis est important pour nous! Vous pouvez laisser un commentaire et une évaluation notée sur une bière que vous aurez  essayée de préférence. Vous aurez toutefois besoin de vous connecter à l'aide de votre courriel afin de créer automatiquement un  compte d’utilisateur et ainsi pouvoir laisser vos commentaires.
                                </p>
                            </div>
                            <div className="section-fonctionnement--colonne">
                                <h2>Pas sur la liste ?</h2>
                                <p> L’équipe de la plateforme Biero s’affaire à présenter uniquement le meilleur en matière de zythologie. Vous êtes un brasseur-malteur et vos bières ne figurent pas sur notre  plateforme? Contactez-nous afin de permettre au monde entier de découvrir vos meilleures créations. </p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
}
