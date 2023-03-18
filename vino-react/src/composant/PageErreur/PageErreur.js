import Entete from "../Entete/Entete";

function PageErreur(){

  return (
    <>
    <Entete/>
    <main>
      <h1>Oops, on dirait qu'une erreur est survenue</h1>
      <p>Cette page ne semble pas exister</p>
    </main>
    </>
  );
}

export default PageErreur;