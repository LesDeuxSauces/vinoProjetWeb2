// a completer


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

  const responseCode = await response.json();

  localStorage.removeItem("token");

  window.location.pathname("/connexion");
}