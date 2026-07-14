"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import faqData from "../public/faq.json";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function HomeClient() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMandi, setSelectedMandi] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [apmcData, setApmcData] = useState([]);
  const [randomTiles, setRandomTiles] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [priceRes, apmcRes] = await Promise.all([
          axios.get(`${BASE_URL}/admin/getAllApmcPrice`),
          axios.get(`${BASE_URL}/admin/getAllApmc`),
        ]);
        setData(priceRes.data?.data || []);
        setFilteredData(priceRes.data?.data || []);

        const list = apmcRes.data?.data || [];
        // API returns mandis sorted by Hindi name; the dropdown still uses
        // this sorted list, but the home tiles below cycle a random subset.
        setApmcData(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();

    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 768 ? 9 : 10);
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Pick `itemsPerPage` random mandis and rotate them every 9 seconds so the
  // home page tiles always feel fresh.
  useEffect(() => {
    if (apmcData.length === 0) return;
    const pickRandom = () => {
      const shuffled = apmcData.slice().sort(() => Math.random() - 0.5);
      setRandomTiles(shuffled.slice(0, itemsPerPage));
    };
    pickRandom();
    const interval = setInterval(pickRandom, 9000);
    return () => clearInterval(interval);
  }, [apmcData, itemsPerPage]);

  const handleFilterChange = (mandi, crop) => {
    setFilteredData(
      data.filter(
        (item) =>
          (mandi === "" || item.apmc_HindiName === mandi) &&
          (crop === "" || item.commodityNameHindi === crop)
      )
    );
    setCurrentPage(1);
  };

  const mandiNames = apmcData.map((i) => i.apmcNameHin).filter(Boolean);
  const cropNames = [...new Set(data.map((i) => i.commodityNameHindi))];
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const goToPage = (p) => p >= 1 && p <= totalPages && setCurrentPage(p);
  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handleLast = () => setCurrentPage(totalPages);

  const renderPagination = () => {
    const items = [];
    const max = 4;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + max - 1);
    items.push(
      <button key={1} onClick={() => goToPage(1)} disabled={currentPage === 1}>
        पिछला
      </button>
    );
    if (start > 1) items.push(<span key="ellipsis-start">...</span>);
    for (let p = start; p <= end; p++) {
      items.push(
        <button key={p} onClick={() => goToPage(p)} disabled={currentPage === p}>
          {p}
        </button>
      );
    }
    if (end < totalPages - 1) items.push(<span key="ellipsis-end">...</span>);
    if (totalPages > 1)
      items.push(
        <button
          key={totalPages}
          onClick={() => goToPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </button>
      );
    items.push(
      <button key="next" onClick={handleNext} disabled={currentPage === totalPages}>
        अगला
      </button>
    );
    items.push(
      <button key="last" onClick={handleLast} disabled={currentPage === totalPages}>
        अंतिम
      </button>
    );
    return items;
  };

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
    <div className="home_main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mandi_list">
        <div className="container">
          <div className="hero_section">
            <div className="contant">
              <img src="/images/main_home.jpg" alt="मंडी भाव मुख्य छवि - मंडी भाव जानकारी" />
              <div className="text">
                <h2>
                  मंडी भाव जानकारी में आपका स्वागत है <br /> दैनिक मंडी भाव के लिए हमारे साथ जुड़े रहें.
                </h2>
                <p>
                  मंडी भाव की कई वेबसाइटें हैं लेकिन उनका उपयोग करना मुश्किल है। दूसरी ओर, हम विस्तृत
                  मंडी भाव प्रदान करते हैं, <br />
                  और हमें उम्मीद है कि हम आपको सही जानकारी प्रदान कर रहे हैं।
                </p>
                <a href="/MandiBhav">देखें सभी मंडी भाव</a>
              </div>
            </div>
            <marquee direction="left">
              आप यहां आज के बाजार भाव और फसलों की कीमतों में उतार-चढ़ाव को देख सकते हैं।
              MandiBhavJanakri.com बाजार मूल्य वेबसाइट बाजार मूल्य जानने का एक बहुत ही विश्वसनीय स्रोत है, इस
              वेबसाइट के माध्यम से हम आपको बिल्कुल सटीक मूल्य की जानकारी देने की पूरी कोशिश करते हैं।
            </marquee>
          </div>

          <div className="title">
            <h2>राजस्थान मंडी</h2>
            <p>आज के मंडी भाव- दैनिक मंडी भाव जानने के लिए नीचे अलग अलग शहरों की मंडियों के लिए लिंक दिए गए हैं</p>
          </div>

          {isLoading ? (
            <div
              className="loading-spinner"
              style={{ alignContent: "center", textAlign: "center", margin: "100px auto 100px" }}
            />
          ) : (
            <div className="Mandi List">
              <ul>
                {randomTiles.map((item) => (
                  <li key={item.id} className="mandi-tile-fade">
                    <a href={`/${item.apmcNameEng}`}>
                      <span>{item.apmcNameHin}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="showall">
                <a href="/MandiBhav">सभी देखें</a>
              </div>
            </div>
          )}

          <div className="whatsapp">
            <div className="block max-w-xxl my-2 px-1 py-3 md:p-3 bg-green-600 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="grid grid-cols-12 md:px-2">
                <div className="col-span-9 flex">
                  <div>
                    <a
                      href="https://chat.whatsapp.com/FMDfAPyfdrE1mJM4mjLOzw"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="khetiwadi contact whatsapp"
                      className="text-green-600 hover:bg-primary dark:bg-white hover:border-primary mr-1 flex h-11 w-11 md:h-16 md:w-16 items-center justify-center rounded-full border border-[#E5E5E5] hover:text-slate-600 sm:mr-4 lg:mr-3 xl:mr-4"
                    >
                      <svg width="48" height="48" viewBox="0 0 30 30" className="fill-current">
                        <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z" />
                      </svg>
                    </a>
                  </div>
                  <div>
                    <p className="mb-2 text-sm md:text-2xl font-bold tracking-tight text-black dark:text-white">
                      हमें व्हाट्सएप पर फॉलो करें
                    </p>
                    <p className="text-[9px] md:text-base font-normal text-black dark:text-gray-400">
                      नवीनतम जानकारी के लिए हमारे व्हाट्सएप ग्रुप से जुड़ें
                    </p>
                  </div>
                </div>
                <div className="col-span-3 text-right align-middle">
                  <a
                    href="https://chat.whatsapp.com/FMDfAPyfdrE1mJM4mjLOzw"
                    title="whatsapp channel"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-1 md:px-3 py-2 text-xs md:text-sm font-medium text-center text-dark bg-gray-100 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Join now
                    <svg
                      className="w-3.5 h-3.5 ml-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div
              className="loading-spinner"
              style={{ alignContent: "center", textAlign: "center", margin: "100px auto 100px" }}
            />
          ) : (
            <div className="madi_data">
              <div className="filters">
                <div className="filter">
                  <label>मंडी चुनें:</label>
                  <select
                    value={selectedMandi}
                    onChange={(e) => {
                      setSelectedMandi(e.target.value);
                      handleFilterChange(e.target.value, selectedCrop);
                    }}
                  >
                    <option value="">सभी</option>
                    {mandiNames.map((m, i) => (
                      <option key={i} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="filter">
                  <label>फ़सल चुनें:</label>
                  <select
                    value={selectedCrop}
                    onChange={(e) => {
                      setSelectedCrop(e.target.value);
                      handleFilterChange(selectedMandi, e.target.value);
                    }}
                  >
                    <option value="">सभी</option>
                    {cropNames.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>मंडी का नाम</th>
                    <th>फ़सल</th>
                    <th>न्यूनतम मूल्य</th>
                    <th>अधिकतम मूल्य</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding: "20px", color: "red", textAlign: "center" }}>
                        चयनित मंडी के लिए आज कोई भाव उपलब्ध नहीं है।
                      </td>
                    </tr>
                  ) : (
                    filteredData
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((item, i) => (
                        <tr key={i}>
                          <td>{item.apmc_HindiName}</td>
                          <td>{item.commodityNameHindi}</td>
                          <td>{item.minPrice}</td>
                          <td>{item.maxPrice}</td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>

              <div className="pagination_with_text">
                <p className="text">
                  Showing {currentPage} to {totalPages} of {itemsPerPage} entries, Click Next to see more.
                </p>
                <div className="Pagination">{renderPagination()}</div>
              </div>
            </div>
          )}

          <p className="table_info">
            सभी दरें 100 किलोग्राम और उत्तम गुणवत्ता के लिए हैं, || दरों में परिवर्तन हो सकता है। || दरें केवल आज के बाजार
            की स्थिति को इंगित करती हैं
          </p>

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
  );
}
