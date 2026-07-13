"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const PUBLIC_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsIlJPTEVTIjpbIkFETUlOIl0sImV4cCI6MTc2Mzc5MDY5NSwiaWF0IjoxNzMyMjU0Njk1fQ.6zN5pAHdL21Y3BNzrEAshRc8XAy52uBEfHhTdXgxqOg";

export default function TodayBhavClient() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedMandi, setSelectedMandi] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const headers = { Authorization: `Bearer ${PUBLIC_TOKEN}` };
        const priceRes = await axios.get(`${BASE_URL}/admin/getAllApmcPrice`, { headers });
        const list = priceRes.data?.data || [];
        setData(list);
        setFilteredData(list);
      } catch (e) {
        console.error("Error fetching data:", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const mandiNames = [...new Set(data.map((i) => i.apmc_HindiName))];
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirst, indexOfLast);

  const goToPage = (p) => p >= 1 && p <= totalPages && setCurrentPage(p);
  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handleLast = () => setCurrentPage(totalPages);

  const renderPagination = () => {
    const items = [];
    const max = 5;
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + max - 1);

    items.push(
      <button key="first" onClick={() => goToPage(1)} disabled={currentPage === 1}>
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
    if (end < totalPages - 1) items.push(<span key="ellipsis-end"> ...... </span>);
    if (totalPages > 1)
      items.push(
        <button key={totalPages} onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>
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

  return (
    <div className="container today_bhav">
      {isLoading ? (
        <div className="loading-spinner" style={{ alignContent: "center", textAlign: "center", margin: "100px auto 100px" }} />
      ) : (
        <div className="madi_data" id="Aajkebhaw">
          <div className="filters">
            <div className="filter" style={{ width: "100%" }}>
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
              {currentItems.map((item, i) => (
                <tr key={i}>
                  <td>{item.apmc_HindiName}</td>
                  <td>{item.commodityNameHindi}</td>
                  <td>{item.minPrice}</td>
                  <td>{item.maxPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination_with_text">
            <p className="text">
              Showing {currentPage} to {totalPages} of {itemsPerPage} entries, Click Next to see more.
            </p>
            <div className="Pagination">{renderPagination()}</div>
          </div>

          <p className="table_info">
            सभी दरें 100 किलोग्राम और उत्तम गुणवत्ता के लिए हैं, || दरों में परिवर्तन हो सकता है। || दरें केवल आज के बाजार
            की स्थिति को इंगित करती हैं
          </p>
        </div>
      )}
    </div>
  );
}
