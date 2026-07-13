"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";
import faqData from "../public/faq.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVTIjpbIkFETUlOIl0sImV4cCI6MTc2Mzc5MDY5NSwiaWF0IjoxNzMyMjU0Njk1fQ.6zN5pAHdL21Y3BNzrEAshRc8XAy52uBEfHhTdXgxqOg";

export default function MandiDataClient({ mandiName }) {
  const [mandiData, setMandiData] = useState([]);
  const [mandiHindiName, setMandiHindiName] = useState("");
  const [error, setError] = useState({ errors: {}, isError: false });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [pressReleases, setPressReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [currentDate, setCurrentDate] = useState("");
  const marqueeRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const headers = { Authorization: `Bearer ${PUBLIC_TOKEN}` };
        const [priceRes, listRes] = await Promise.all([
          axios.get(
            `${BASE_URL}/admin/getApmcPriceByName?name=${encodeURIComponent(mandiName)}`,
            { headers }
          ),
          axios.get(`${BASE_URL}/admin/getAllApmc`, { headers }),
        ]);
        const prices = priceRes.data?.data || [];
        setMandiData(prices);

        const list = listRes.data?.data || [];
        const match = list.find(
          (m) => (m.apmcNameEng || "").toUpperCase() === mandiName.toUpperCase()
        );
        setMandiHindiName(prices[0]?.apmc_HindiName || match?.apmcNameHin || mandiName);
      } catch (e) {
        console.error("Error fetching data:", e);
        setError({ errors: e, isError: true });
        setMandiHindiName(mandiName);
      } finally {
        setIsLoading(false);
      }
    };
    if (mandiName) fetchData();
  }, [mandiName]);

  useEffect(() => {
    const date = new Date();
    setCurrentDate(date.toLocaleDateString("en-GB").split("/").join("-"));
  }, []);

  useEffect(() => {
    const fetchPressReleases = async () => {
      setLoading(true);
      try {
        const initialResponse = await fetch(
          "https://medicalportal.rajasthan.gov.in/webapi//PublicPortal/DepartmentWebsite/GetPressReleaseByFilter",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              AdvanceSearchModel: {},
              CategoryCode: 0,
              DepartmentCode: 81,
              DistrictDepartmentCode: 0,
              IsBase64File: false,
              IsImageRequired: false,
              IsLokarpanInauguration: false,
              IsMultipleImage: true,
              IsPostBack: false,
              OrderBy: "PressreleaseDate",
              OrderByAsc: 0,
              Page: 1,
              PageSize: 100,
              Search: null,
              SubCategoryCode: "0",
              VIPCategoryCode: "",
              VIPPersonCode: "",
            }),
          }
        );
        const finalData = await initialResponse.json();
        if (finalData.IsSuccess) setPressReleases(finalData.Data.Data || []);
      } catch (e) {
        console.error("Error fetching press releases:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchPressReleases();
  }, []);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = mandiData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(mandiData.length / itemsPerPage);
  const paginate = (n) => setCurrentPage(n);
  const toggleAnswer = (i) => setOpenIndex(openIndex === i ? null : i);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {isLoading ? (
        <div className="loading-spinner" style={{ alignContent: "center", textAlign: "center", margin: "100px auto 100px" }} />
      ) : (
        <div className="mandibhavinner">
          <div className="Breadcrumbs">
            <div className="container">
              <ul>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <li>
                  <Link href="/MandiBhav">Mandi Bhav</Link>
                </li>
                <i className="fa fa-angle-right" aria-hidden="true"></i>
                <li>{mandiHindiName}</li>
              </ul>
            </div>
          </div>

          <div className="data">
            <div className="container">
              <h1>
                {mandiHindiName} : आज {mandiHindiName} मंडी में फ़सलो की आवक तथा भाव की जानकारी
              </h1>
              <div className="row bhavMarqueanddata">
                <div className="col-md-8">
                  <div className="Mandiimg">
                    <span>{mandiHindiName}</span>
                  </div>

                  <div className="contant">
                    <p>
                      {mandiHindiName} आज के मंडी भाव, आज {mandiHindiName} मंडी में फ़सलो की क्या आवक बनी तथा सभी
                      फ़सलो के भाव में कितना उतर चड़ाव देखने को मिला पूरी जानकारी विश्वसनीयता के साथ देखे।
                      <br />
                      <br />
                    </p>
                  </div>

                  <div className="bhav">
                    <span>
                      {mandiHindiName} <span className="date">{currentDate}, 10:00 AM</span> का भाव
                    </span>

                    <div className="bhaw_list">
                      <table id="mandiBhavTable" className="min-w-full text-center borde dark:border-gray-70">
                        <thead>
                          <tr>
                            <th>फ़सल</th>
                            <th>न्यूनतम</th>
                            <th>अधिकतम</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.length === 0 ? (
                            <tr>
                              <td colSpan={3} style={{ padding: "20px", color: "red", textAlign: "center" }}>
                                {mandiHindiName} मंडी के लिए आज कोई भाव उपलब्ध नहीं है। कृपया कल पुनः देखें।
                              </td>
                            </tr>
                          ) : (
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td>{item.commodityNameHindi}</td>
                                <td>{item.minPrice}</td>
                                <td>{item.maxPrice}</td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className="pagination_bottom">
                      <div className="pagination">
                        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                          Previous
                        </button>
                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => paginate(i + 1)}
                            className={currentPage === i + 1 ? "active" : ""}
                          >
                            {i + 1}
                          </button>
                        ))}
                        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                          Next
                        </button>
                      </div>
                    </div>

                    <p className="table_info">
                      सभी दरें 100 किलोग्राम और उत्तम गुणवत्ता के लिए हैं, || दरों में परिवर्तन हो सकता है। || दरें केवल आज
                      के बाजार की स्थिति को इंगित करती हैं
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="bhavToday" style={{ overflow: "hidden", height: "450px" }}>
                    <h3>सरकारी योज़नाए</h3>

                    {loading ? (
                      <div className="spinnerrr" style={{ textAlign: "center", marginTop: "50px" }}>
                        <div className="loading-circlee" />
                      </div>
                    ) : (
                      <div
                        className="marquee"
                        ref={marqueeRef}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          animation: "scroll 30s linear infinite",
                        }}
                        onMouseEnter={() => marqueeRef.current && (marqueeRef.current.style.animationPlayState = "paused")}
                        onMouseLeave={() => marqueeRef.current && (marqueeRef.current.style.animationPlayState = "running")}
                      >
                        {pressReleases.map((release) => (
                          <a
                            key={release.Id}
                            href={release.Attachments?.[0] || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginBottom: "10px" }}
                            dangerouslySetInnerHTML={{ __html: release.Description || "" }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="faq-container">
                  <h2>Frequently Asked Questions</h2>
                  {faqData.map((faq, i) => (
                    <div key={i} className="faq-item">
                      <button className="faq-question" onClick={() => toggleAnswer(i)}>
                        {faq.question}
                      </button>
                      <div className={`faq-answer ${openIndex === i ? "show" : ""}`}>{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
