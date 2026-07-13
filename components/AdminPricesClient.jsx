"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const STORAGE_KEY = "mandi_admin_pwd";

export default function AdminPricesClient() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState({});
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [newRow, setNewRow] = useState({
    apmcName: "",
    commodityName: "",
    minPrice: "",
    maxPrice: "",
    modalPrice: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPassword(saved);
        setAuthed(true);
      }
    }
  }, []);

  const fetchRows = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { data } = await axios.get(`${BASE_URL}/api/admin/prices?limit=1000`);
      setRows(data?.data || []);
    } catch (e) {
      setMessage(`Load error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) fetchRows();
  }, [authed]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password) return;
    window.sessionStorage.setItem(STORAGE_KEY, password);
    setAuthed(true);
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setPassword("");
    setRows([]);
  };

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const s = search.toLowerCase();
    return rows.filter((r) =>
      `${r.apmcName} ${r.apmcHindiName || ""} ${r.commodityName} ${r.commodityNameHindi || ""}`
        .toLowerCase()
        .includes(s)
    );
  }, [rows, search]);

  const startEdit = (row) => {
    setEditing({
      ...editing,
      [row.id]: { minPrice: row.minPrice, maxPrice: row.maxPrice, modalPrice: row.modalPrice },
    });
  };

  const cancelEdit = (id) => {
    const next = { ...editing };
    delete next[id];
    setEditing(next);
  };

  const saveEdit = async (id) => {
    setSavingId(id);
    setMessage("");
    try {
      const body = { id, ...editing[id] };
      const { data } = await axios.put(`${BASE_URL}/api/admin/prices`, body, {
        headers: { "x-admin-password": password },
      });
      setRows((prev) =>
        prev.map((r) =>
          r.id === id
            ? {
                ...r,
                minPrice: data.data.minPrice,
                maxPrice: data.data.maxPrice,
                modalPrice: data.data.modalPrice,
                latestTransactionDate: data.data.latestTransactionDate,
              }
            : r
        )
      );
      cancelEdit(id);
      setMessage("भाव सफलतापूर्वक अपडेट हुआ");
    } catch (e) {
      const status = e.response?.status;
      if (status === 401) {
        setMessage("गलत पासवर्ड — पुनः लॉगिन करें");
        handleLogout();
      } else {
        setMessage(`Save error: ${e.response?.data?.message || e.message}`);
      }
    } finally {
      setSavingId(null);
    }
  };

  const deleteRow = async (id) => {
    if (!window.confirm("क्या आप वाकई इस भाव को हटाना चाहते हैं?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/admin/prices?id=${id}`, {
        headers: { "x-admin-password": password },
      });
      setRows((prev) => prev.filter((r) => r.id !== id));
      setMessage("Row हटाई गई");
    } catch (e) {
      setMessage(`Delete error: ${e.response?.data?.message || e.message}`);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newRow.apmcName || !newRow.commodityName) return;
    try {
      const { data } = await axios.post(`${BASE_URL}/api/admin/prices`, newRow, {
        headers: { "x-admin-password": password },
      });
      setRows((prev) => [data.data, ...prev]);
      setShowAdd(false);
      setNewRow({ apmcName: "", commodityName: "", minPrice: "", maxPrice: "", modalPrice: "" });
      setMessage("नया भाव जोड़ा गया");
    } catch (e) {
      setMessage(`Add error: ${e.response?.data?.message || e.message}`);
    }
  };

  if (!authed) {
    return (
      <div style={{ maxWidth: 420, margin: "80px auto", padding: 24, border: "1px solid #ddd", borderRadius: 8 }}>
        <h2 style={{ marginTop: 0 }}>Admin — मंडी भाव संपादन</h2>
        <p style={{ color: "#666", fontSize: 14 }}>
          भावों में परिवर्तन करने के लिए एडमिन पासवर्ड दर्ज करें।
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            style={inputStyle}
            autoFocus
          />
          <button type="submit" style={{ ...btnStyle, width: "100%", marginTop: 12 }}>
            लॉगिन
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ margin: 0 }}>मंडी भाव संपादन ({rows.length})</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setShowAdd(!showAdd)} style={btnStyle}>
            {showAdd ? "रद्द करें" : "+ नया भाव"}
          </button>
          <button onClick={fetchRows} style={btnStyle} disabled={loading}>
            {loading ? "..." : "Refresh"}
          </button>
          <button onClick={handleLogout} style={{ ...btnStyle, background: "#888" }}>
            Logout
          </button>
        </div>
      </div>

      {message && (
        <div style={{ background: "#e6f4ea", padding: "10px 14px", margin: "12px 0", borderRadius: 6, color: "#1e6e3a" }}>
          {message}
        </div>
      )}

      {showAdd && (
        <form onSubmit={handleAdd} style={{ background: "#f6f8fa", padding: 16, borderRadius: 8, margin: "12px 0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 10 }}>
          <input style={inputStyle} placeholder="मंडी (English, e.g. ALWAR)" value={newRow.apmcName} onChange={(e) => setNewRow({ ...newRow, apmcName: e.target.value })} required />
          <input style={inputStyle} placeholder="फसल (English, e.g. MUSTARD)" value={newRow.commodityName} onChange={(e) => setNewRow({ ...newRow, commodityName: e.target.value })} required />
          <input style={inputStyle} placeholder="न्यूनतम भाव" type="number" value={newRow.minPrice} onChange={(e) => setNewRow({ ...newRow, minPrice: e.target.value })} />
          <input style={inputStyle} placeholder="अधिकतम भाव" type="number" value={newRow.maxPrice} onChange={(e) => setNewRow({ ...newRow, maxPrice: e.target.value })} />
          <input style={inputStyle} placeholder="मॉडल भाव" type="number" value={newRow.modalPrice} onChange={(e) => setNewRow({ ...newRow, modalPrice: e.target.value })} />
          <button type="submit" style={btnStyle}>Add</button>
        </form>
      )}

      <input
        style={{ ...inputStyle, margin: "12px 0", width: "100%" }}
        placeholder="मंडी या फसल खोजें... (e.g. अलवर, सरसों, ALWAR)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
          <thead>
            <tr style={{ background: "#f0f0f0", textAlign: "left" }}>
              <th style={thStyle}>मंडी</th>
              <th style={thStyle}>फसल</th>
              <th style={thStyle}>न्यूनतम</th>
              <th style={thStyle}>अधिकतम</th>
              <th style={thStyle}>मॉडल</th>
              <th style={thStyle}>तिथि</th>
              <th style={thStyle}>क्रिया</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 24, textAlign: "center", color: "#666" }}>कोई परिणाम नहीं</td></tr>
            )}
            {filtered.map((r) => {
              const ed = editing[r.id];
              return (
                <tr key={r.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>{r.apmcHindiName || r.apmcName}<div style={{ fontSize: 11, color: "#888" }}>{r.apmcName}</div></td>
                  <td style={tdStyle}>{r.commodityNameHindi || r.commodityName}<div style={{ fontSize: 11, color: "#888" }}>{r.commodityName}</div></td>
                  <td style={tdStyle}>{ed ? <input style={smallInput} type="number" value={ed.minPrice} onChange={(e) => setEditing({ ...editing, [r.id]: { ...ed, minPrice: e.target.value } })} /> : r.minPrice}</td>
                  <td style={tdStyle}>{ed ? <input style={smallInput} type="number" value={ed.maxPrice} onChange={(e) => setEditing({ ...editing, [r.id]: { ...ed, maxPrice: e.target.value } })} /> : r.maxPrice}</td>
                  <td style={tdStyle}>{ed ? <input style={smallInput} type="number" value={ed.modalPrice} onChange={(e) => setEditing({ ...editing, [r.id]: { ...ed, modalPrice: e.target.value } })} /> : r.modalPrice}</td>
                  <td style={tdStyle}>{r.latestTransactionDate ? r.latestTransactionDate.slice(0, 10) : "-"}</td>
                  <td style={tdStyle}>
                    {ed ? (
                      <>
                        <button style={smallBtn} onClick={() => saveEdit(r.id)} disabled={savingId === r.id}>{savingId === r.id ? "..." : "Save"}</button>
                        <button style={{ ...smallBtn, background: "#888" }} onClick={() => cancelEdit(r.id)}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button style={smallBtn} onClick={() => startEdit(r)}>Edit</button>
                        <button style={{ ...smallBtn, background: "#c33" }} onClick={() => deleteRow(r.id)}>Del</button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { padding: "8px 12px", border: "1px solid #ccc", borderRadius: 6, fontSize: 14 };
const smallInput = { padding: "4px 8px", border: "1px solid #ccc", borderRadius: 4, width: 90, fontSize: 13 };
const btnStyle = { padding: "8px 16px", background: "#239f2e", color: "white", border: 0, borderRadius: 6, cursor: "pointer", fontSize: 14 };
const smallBtn = { padding: "4px 10px", background: "#239f2e", color: "white", border: 0, borderRadius: 4, cursor: "pointer", fontSize: 12, marginRight: 4 };
const thStyle = { padding: "10px 12px", fontWeight: 600, fontSize: 13, borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "8px 12px", fontSize: 14 };
