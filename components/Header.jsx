"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [show, setShow] = useState(false);
  return (
    <header>
      <div className="container">
        <div className="header-inner row">
          <h1 className="logo">
            <Link href="/">
              <img src="/images/logo.png" alt="Mandi Bhav Jankari" />
            </Link>
            <div
              id="toggle-menu"
              onClick={() => setShow(!show)}
              className={show ? "toggle_active" : "hide"}
            >
              <span className="one"></span>
              <span className="two"></span>
              <span className="three"></span>
            </div>
          </h1>

          <div className="mobile_app" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/TodayBhav">
              <span></span>आज के भाव
            </Link>
            <a 
              href="/MandiBhavJankari.apk" 
              download 
              style={{ background: "#43a100", padding: "8px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}
              aria-label="Download App"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>

          <div id="menu" className={show ? "site-menu show" : "hide"}>
            <ul className="site-menu">
              <li className="hide_mobile">
                <Link href="/">होम</Link>
              </li>
              <li className="hide_mobile">
                <Link href="/MandiBhav">मंडी</Link>
              </li>
              <li>
                <Link href="/Tips">कृषि सलाह</Link>
              </li>
              <li>
                <Link href="/Technology">कृषि यंत्र</Link>
              </li>
              <li className="hide_mobile">
                <Link href="/AgaricultureNews">कृषि सूचना</Link>
              </li>
              <li>
                <Link href="/AboutUs">हमारे बारे में</Link>
              </li>
              <li>
                <Link href="/ContactUs">संपर्क करें</Link>
              </li>

              <li className="Hide_desktop">
                <Link href="/ContactUs">Contact &amp; Support</Link>
              </li>
              <li className="Hide_desktop">
                <Link href="/Disclaimer">Disclaimer</Link>
              </li>
              <li className="Hide_desktop">
                <Link href="/PrivacyPolicy">Privacy Policy</Link>
              </li>
              <li className="Hide_desktop">
                <Link href="/TermsandConditions">Terms &amp; Conditions</Link>
              </li>

              <li className="download_app todayBhav">
                <Link href="/TodayBhav">
                  <span></span>आज के भाव
                </Link>
              </li>

              <li className="download_app hide_mobile">
                <a href="/MandiBhavJankari.apk" download>Download app</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
