import './Entete.css';
import logoVino from '../../img/vinoLogo-blanc.svg';
import iconeBurger from '../../img/menu_burger_blanc.svg';
import iconeUser from '../../img/User_icone_blanc.svg';


function Entete() {
  return (
    <header class="entete">
        <div class="entete__wrapper">
            <div>
                <img class="entete__icone" src={iconeBurger} alt="" />
            </div>
            <div>
                <img class="entete__logo" src={logoVino} alt="" />
            </div>
            <div>
                <img class="entete__icone" src={iconeUser} alt="" />
            </div>
        </div>
    </header>
  );
}

export default Entete;
