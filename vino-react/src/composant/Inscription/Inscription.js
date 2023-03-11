import React, { useEffect, useState } from "react";
import "./Inscription.css";

export default function Inscription(props) {
  
  const api_url = "http://127.0.0.1:8000/api/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //
  }, []);

  async function registerUser(userObject) {

    let entete = new Headers();
    entete.append("Content-Type", "application/json");

    const response = await fetch(api_url + "register", {
      method: "POST",
      body: JSON.stringify(userObject),
      headers: entete,
    });

    const responseCode = await response.json();
    console.log("reponse ajout utilsateur:", responseCode);
  }

  const nameChangeHandler = (event) => {
    // console.log(event.target.value);
    setName(event.target.value);
  };

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
    registerUser({ name: name, email: email, password: password });
  };

  return (
    <section>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={name}
          onChange={nameChangeHandler}
          placeholder="Nom"
        />
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
        <button>S'inscrire</button>
      </form>
    </section>
  );
}
