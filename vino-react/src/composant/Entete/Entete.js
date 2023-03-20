import "./Entete.css";
import logoVino from "../../img/vinoLogo-blanc.svg";
import { Link, json, Outlet, Form } from "react-router-dom";
import { ReactComponent as CaretIcon } from "../../img/caret.svg";
import { ReactComponent as CogIcon } from "../../img/cog.svg";
import { ReactComponent as ChevronIcon } from "../../img/chevron.svg";
import { ReactComponent as ChevronLeftIcon } from "../../img/chevronLeft.svg";
import { ReactComponent as BoltIcon } from "../../img/bolt.svg";
import { ReactComponent as BurgerIcon } from "../../img/menu_burger_blanc.svg";
// import { ReactComponent as BurgerIcon } from '../../img/menuBurgerRouge.svg';
import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function Entete() {
  return (
    <>
      <Navbar>
        <Link to="/">
          <img className="entete__logo" src={logoVino} alt="" onClick={"/"} />
        </Link>

        <NavItem icon={<BurgerIcon />}>
          <DropdownMenu></DropdownMenu>
        </NavItem>
      </Navbar>

      <Outlet />
    </>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-buttonMain" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight + 30);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight + 30;
    console.log(height);
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }


  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ChevronIcon />}>Mon profil</DropdownItem>
          <DropdownItem
            leftIcon={<ChevronIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="celliers"
          >
            Mes Celliers
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="params"
          >
            Paramètres
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>
            {" "}
            <Form action="/logout" method="POST"><button>Déconnexion</button>  </Form>
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "params"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ChevronLeftIcon />}>
            <h2>Paramètres</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Thème</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Unitées</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "celliers"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<ChevronLeftIcon />} goToMenu="main">
            <h2>Mes Celliers</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />}>Maison</DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />}>Chalet</DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />}>
            Manoir en France
          </DropdownItem>
          <DropdownItem leftIcon={<ChevronIcon />}>
            La villa en españa
          </DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Entete;
