import { redirect, json } from "react-router-dom";

/**
 * Fonction action du routeur qui permet le logout de l'utilisateur et sa redirection
 */
export function action() {
  
  logoutUser();
  localStorage.removeItem("token");
  return redirect("/connexion");

  }

  async function logoutUser() {
    let entete = new Headers();
    const api_url = "http://127.0.0.1:8000/api/";
    const token = localStorage.getItem("token");
    entete.append("Content-Type", "application/json");
    entete.append("Authorization", "Bearer " + token);

    const response = await fetch(api_url + "logout", {
      method: "POST",
      headers: entete,
    });

    if (response.status === 422 || response.status === 401) {
      return response;
    }

    if (!response.ok) {
      throw json(
        { message: "Impossible d'identifier l'utilisateur" },
        { status: 500 }
      );
      }

  }