import "./Connexion.css";
import {
    Route,
    Routes,
    BrowserRouter,
    useNavigate,
    Link,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import logoVino from "../../img/vinoLogo-rouge.svg";

export default function Connexion() {
    const api_url = "http://127.0.0.1:8000/api/";
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        //
    }, []);

    async function loginUser(userObject) {
        let entete = new Headers();
        entete.append("Content-Type", "application/json");

        const response = await fetch(api_url + "login", {
            method: "POST",
            body: JSON.stringify(userObject),
            headers: entete,
        });

        const responseCode = await response.json();
        const accessToken = responseCode.access_token;
        console.log(accessToken);
        console.log("reponse connexion utilsateur:", responseCode);
        navigate("/cellier", { state: { data: accessToken } });
    }

    const emailChangeHandler = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value);
    };

    const passwordChangeHandler = (event) => {
        // console.log(event.target.value);
        setPassword(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        loginUser({ email: email, password: password });
    };

    return (
        <section>
            <div>
                <div className="connexion__header">
                    <Link to="/">
                        <img
                            className="logo__connection--hover"
                            src={logoVino}
                            alt="Vino Logo"
                        />
                    </Link>
                    <div className="connexion__titre">Connexion</div>
                </div>
                <form className="connexion__form" onSubmit={submitHandler}>
                    
                        <div className="form__group field">
                            <input
                                placeholder="Email"
                                className="form__field"
                                id="email"
                                name="email"
                                type="text"
                                value={email}
                                onChange={emailChangeHandler}
                                required
                            />
                            <label className="form__label">Courriel</label>
                        </div>
                        <div className="form__group field">
                            <input
                                placeholder="Mot de passe"
                                className="form__field"
                                id="password"
                                name="password"
                                type="text"
                                value={password}
                                onChange={passwordChangeHandler}
                                required
                            />
                            <label className="form__label">Mot de passe</label>
                        </div>
                  
          
                    <div className="connexion__bouton">
                        <button
                            className="connexion__bouton--btn"
                            type="submit"
                        >
                            Se connecter
                        </button>
                        <p>
                            Vous n'avez pas de compte ?{" "}
                            <Link to="/inscription" className="">
                                Cliquez ici
                            </Link>{" "}
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
