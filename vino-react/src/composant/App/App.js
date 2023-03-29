import './App.css';
import React from 'react';
import Entete from '../Entete/Entete';
import BouteilleList from '../Bouteille/BouteilleList';
import BouteilleShow from '../Bouteille/BouteilleShow';
import BouteilleCreate from '../Bouteille/BouteilleCreate';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Accueil from '../Accueil/Accueil';
import Inscription from '../Inscription/Inscription';
import CellierList from '../Cellier/CellierList';
import CellierCreate from '../Cellier/CellierCreate';
import CellierShow from '../Cellier/CellierShow';
import CellierUpdate from '../Cellier/CellierUpdate';
import Connexion from '../Connexion/Connexion';
import PageErreur from '../PageErreur/PageErreur';
import { useLocation } from 'react-router-dom';
import BouteilleUpdate from '../Bouteille/BouteilleUpdate';
import { action as logoutAction } from '../Logout';
import { checkAuthLoader, checkAuthConnexionLoader } from '../Auth';
import EspaceMembre from '../EspaceMembre/EspaceMembre';
import Admin from '../Admin/Admin'

const router = createBrowserRouter([
  { path: '/', element: <Accueil />, errorElement: <PageErreur /> },
  { path: '/inscription', element: <Inscription /> },
  { path: '/connexion', element: <Connexion />, loader: checkAuthConnexionLoader },
  { path: '/logout', element: <Connexion />, action: logoutAction },
  {
    path: "/",
    element: <Entete />,
    loader: checkAuthLoader,
    children: [
      { path: "/cellier", element: <CellierList /> },
      { path: "/cellier/create", element: <CellierCreate /> },
      { path: "/cellier/:id", element: <CellierShow /> },
      { path: "/cellier/update/:idCellier", element: <CellierUpdate /> },
      { path: "/bouteille", element: <BouteilleList /> },
      { path: "/bouteille/create/:idCellier", element: <BouteilleCreate /> },
      { path: "/bouteille/:idCellier/update/:id", element: <BouteilleUpdate /> },
      { path: "/espacemembre", element: <EspaceMembre /> },
      { path: "/admin", element: <Admin /> },
    ],
  },
])

// function AppRoutes() {
//   const location = useLocation();

//   if (location.pathname === '/' || location.pathname === '/connexion' || location.pathname === '/inscription' || location.pathname === '/Connexion' || location.pathname === '/Inscription') {
//     return (
//       <Routes className="AppBody">
//         <Route path="/" element={<Accueil />} />
//         <Route path="/inscription" element={<Inscription />} />
//         <Route path="/connexion" element={<Connexion />} />
//         <Route path="/cellier" element={<CellierList />} />
//         <Route path="/cellier/:id" element={<CellierShow />} />
//         <Route path="/cellier/create" element={<CellierCreate />} />
//         <Route path="/bouteille" element={<BouteilleList />} />
//         <Route path="/bouteille/create/:idCellier" element={<BouteilleCreate />} />
//         <Route path="/bouteille/:id" element={<BouteilleShow />} />
//       </Routes>
//     );
//   } else {
//     return (
//       <>
//         <Entete />
//         <Routes className="AppBody">
//           <Route path="/" element={<Accueil />} />
//           <Route path="/inscription" element={<Inscription />} />
//           <Route path="/connexion" element={<Connexion />} />
//           <Route path="/cellier" element={<CellierList />} />
//           <Route path="/cellier/:id" element={<CellierShow />} />
//           <Route path="/cellier/create" element={<CellierCreate />} />
//           <Route path="/bouteille" element={<BouteilleList />} />
//           <Route path="/bouteille/create/:idCellier" element={<BouteilleCreate />} />
//           <Route path="/bouteille/:id" element={<BouteilleShow />} />
//         </Routes>
//       </>
//     );
//   }
// }

export default function App() {
  return <RouterProvider router={router} />
  // return (
  //   <Router id="App">
  //     <AppRoutes />
  //   </Router>
  // );
}
