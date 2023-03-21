import { redirect, useLocation } from 'react-router-dom';



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
