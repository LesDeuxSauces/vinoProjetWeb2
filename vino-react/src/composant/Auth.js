import { redirect, useLocation } from 'react-router-dom';

/**
 * Fonction d'authentification qui redirige en fonction de la présence d'un token.
 */

export function checkAuthLoader() {

  const token = localStorage.getItem("token");

  if (!token) {
    return redirect('/connexion');
  } 

  return null;
}

export function checkAuthConnexionLoader(){
  const token = localStorage.getItem("token");
  if (token) {
    return redirect('/cellier');
  }

  return null;
}
