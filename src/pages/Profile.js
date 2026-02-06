import axiosClient from "../api/axiosClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [me, setMe] = useState(null);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    axiosClient
      .get("/api/users/me")
      .then((res) => setMe(res.data))
      .catch(() => setMe(null));
  }, []);
  
  return (
    <section className="page-section">
      <h2>Profil</h2>
      {me ? <pre>{JSON.stringify(me, null, 2)}</pre> : <p>Memuat…</p>}
      <button onClick={logout} style={{ marginTop: 20 }}>
        Logout
      </button>
    </section>
  );
}