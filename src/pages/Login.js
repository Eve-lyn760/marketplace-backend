import { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
export default function Login() {
    
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosClient.post("/api/users/login", form);
      localStorage.setItem("token", data.token);
      setMsg("Login sukses");
      navigate("/profile");
    } catch (err) {
      setMsg(err?.response?.data?.error || "Login gagal");
    }
  };

  return (
    <section
      className="page-section"
      style={{ maxWidth: 420, margin: "40px auto" }}
    >
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
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
        <button type="submit">Masuk</button>
      </form>
      {msg && <p style={{ marginTop: 10 }}>{msg}</p>}
    </section>
  );
}