"use client";

import { ToastContainer } from "react-toastify";

export default function ClientProviders({ children }) {
  return (
    <>
      {children}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
