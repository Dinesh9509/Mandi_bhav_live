"use client";

import axios from "axios";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export function encryptPassword(password, secretKey) {
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const encrypted = CryptoJS.AES.encrypt(password, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function checkLoginError(err) {
  if (err?.response?.data?.chkLogin === false) {
    toast.error("Your token has expired, kindly login again!");
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.reload();
    }
    return true;
  }
  toast.error(err?.response?.data?.message || "Something went wrong on our side");
  return false;
}

export async function login() {
  const requestBody = { username: "admin", password: "Admin" };
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, requestBody, {
      headers: { "Content-Type": "application/json" },
    });
    const token = response.data?.token || response.data?.data;
    if (token) {
      Cookies.set("apiToken", token, { expires: 30, sameSite: "Strict" });
      return token;
    }
  } catch (e) {
    checkLoginError(e);
    throw e;
  }
}

export async function ensureToken() {
  const saved = Cookies.get("apiToken");
  if (saved && saved !== "null" && saved.length > 4) return saved;
  return login();
}

export async function GetApi(url) {
  try {
    const token = await ensureToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const target = url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
    const response = await axios.get(target, config);
    if (response.status === 200 && response.data) return response.data;
  } catch (e) {
    if (e.response?.status === 403) {
      Cookies.set("apiToken", "null", { expires: 30, sameSite: "Strict" });
    }
    checkLoginError(e);
  }
}

export async function PostApi(url, data, msg) {
  try {
    const token = await ensureToken();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const target = url.startsWith("http") ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
    const response = await axios.post(target, data, config);
    if (response.data) {
      if (msg !== null && msg !== undefined) {
        toast.success(msg || response.data.message);
      }
      return response.data;
    }
  } catch (e) {
    checkLoginError(e);
  }
}
