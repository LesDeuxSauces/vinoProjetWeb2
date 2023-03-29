import "./EspaceMembre.css";
import {
  Route,
  Routes,
  BrowserRouter,
  useNavigate,
  Link,
  json,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function EspaceMembre() {
  const api_url = "http://127.0.0.1:8000/api/";
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [celliers, setCelliers] = useState("");
  const [bouteilles, setBouteilles] = useState("");

  useEffect(() => {
    //
  }, []);

  
  return (
    <div>
      <h1>Espace Membre</h1>
    </div>
  );
}
