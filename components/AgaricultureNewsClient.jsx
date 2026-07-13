"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AgaricultureNewsClient() {
  const [pressReleases, setPressReleases] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const pageSize = 8;

  const fetchPressReleases = async (pageNumber) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://medicalportal.rajasthan.gov.in/webapi/api/Sectoral/SectoralOrderPressReleaseListByFilter",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            AdvanceSearchModel: {},
            CategoryCode: 0,
            IsPostBack: false,
            OrderBy: "PressreleaseDate",
            OrderByAsc: 0,
            Page: pageNumber,
            PageSize: pageSize,
            Search: "",
            SectoralDeptCode: "945",
            SubCategoryCode: 0,
            VIPCategoryCode: "",
            VIPPersonCode: "",
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to fetch press releases.");
      const result = await response.json();
      if (result.IsSuccess) {
        setPressReleases(result.Data.Data || []);
        setTotalRows(result.Data.Data?.[0]?.TotalRows || 0);
      } else {
        setError("No data found.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPressReleases(page);
  }, [page]);

  const renderPagination = () => {
    const totalPages = Math.ceil(totalRows / pageSize);
    const visiblePages = 5;
    const pages = [];

    if (page > 1) {
      pages.push(
        <button key="first" onClick={() => setPage(1)} className="page-button">
          First
        </button>
      );
    }

    let start = Math.max(1, page - Math.floor(visiblePages / 2));
    let end = Math.min(totalPages, start + visiblePages - 1);
    if (end - start < visiblePages - 1) start = Math.max(1, end - visiblePages + 1);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => setPage(i)}
          className={`page-button ${i === page ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) pages.push(<span key="dots" className="dots">...</span>);
    if (page < totalPages)
      pages.push(
        <button key="last" onClick={() => setPage(totalPages)} className="page-button">
          Last
        </button>
      );

    return pages;
  };

  return (
    <>
      <div className="inner_banner">
        <div className="container">
          <h2>कृषि सूचना</h2>
        </div>
      </div>

      <div className="tips">
        <div className="container">
          <div className="tips_list govt_scheme">
            <ul>
              {loading && <div className="loading-spinner" style={{ margin: "100px auto 100px" }} />}
              {error && <li className="error">{error}</li>}
              {!loading &&
                !error &&
                pressReleases.map((item) => (
                  <li key={item.Id}>
                    <div className="press-release">
                      <img
                        src={item.HomePageImageUrl || "/images/no-img.png"}
                        alt="Press Release"
                        style={{ width: "100%", maxWidth: "300px", margin: "10px 0" }}
                      />
                      <div className="details">
                        <h4 dangerouslySetInnerHTML={{ __html: item.PressReleaseDateHindi || "" }} />
                        <p dangerouslySetInnerHTML={{ __html: item.Description || "" }} />
                      </div>
                      <div className="links">
                        <Link href={`/AgaricultureNews/${item.Id}`} className="details-link">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>

            <div className="pagination">{renderPagination()}</div>
          </div>
        </div>
      </div>
    </>
  );
}
