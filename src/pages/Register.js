import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
export default function Register() {
    
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post("/api/users/register", form);
      setMsg(data.message || "Registrasi berhasil. Silakan login.");
      navigate("/login"); // ➜ redirect ke halaman login
    } catch (err) {
      setMsg(err?.response?.data?.error || "Registrasi gagal");
    }
  };

  return (
    <section
      className="page-section"
      style={{ maxWidth: 420, margin: "40px auto" }}
    >
      <h2>Registrasi</h2>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 12,
            padding: 8,
          }}
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 12,
            padding: 8,
          }}
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          style={{
            display: "block",
            width: "100%",
            marginBottom: 12,
            padding: 8,
          }}
        />
        <button type="submit">Daftar</button>
      </form>
      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </section>
  );
}