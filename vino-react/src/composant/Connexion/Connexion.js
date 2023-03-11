import './Connexion.css';
import { Route, Routes, BrowserRouter, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";



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
    navigate('/cellier', { state: { data: accessToken } });

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
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={email}
          onChange={emailChangeHandler}
          placeholder="Email"
        />
        <input
          type="text"
          value={password}
          onChange={passwordChangeHandler}
          placeholder="Mot de passe"
        />
        <button>Se connecter</button>
      </form>
    </section>
  );

}


