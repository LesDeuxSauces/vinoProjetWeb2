import './Entete.css';
import logoVino from '../../img/vinoLogo-blanc.svg';
import iconeBurger from '../../img/menu_burger_blanc.svg';
import iconeUser from '../../img/User_icone_blanc.svg';


function Entete() {
  return (
    <header className="entete">
        <div className="entete__wrapper">
            <div>
                <img className="entete__icone" src={iconeBurger} alt="" />
            </div>
            <div>
                <img className="entete__logo" src={logoVino} alt="" />
            </div>
            <div>
                <img className="entete__icone" src={iconeUser} alt="" />
            </div>
        </div>
    </header>
  );
}

export default Entete;
