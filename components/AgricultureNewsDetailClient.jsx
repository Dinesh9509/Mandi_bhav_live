"use client";

import { useEffect, useState } from "react";

export default function AgricultureNewsDetailClient({ id }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      const requestBody = {
        AdvanceSearchModel: {},
        DepartmentCode: 0,
        DistrictDepartmentCode: 0,
        EntryNumber: id,
        IsBase64File: false,
        IsImageRequired: false,
        IsLokarpanInauguration: false,
        IsPostBack: false,
        OrderBy: "FormSubmissionDate",
        OrderByAsc: 0,
        Page: 1,
        PageSize: 3,
        Search: "",
        SectorPortalDeptCode: 0,
      };
      try {
        const response = await fetch(
          "https://medicalportal.rajasthan.gov.in/webapi//PublicPortal/DepartmentWebsite/GetPressReleaseByFilter",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch press release details.");
        const result = await response.json();
        if (result.IsSuccess && result.Data?.Data?.length > 0) {
          setDetails(result.Data.Data[0]);
        } else {
          setError("Details not found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div
        className="loading-spinner"
        style={{ alignContent: "center", textAlign: "center", margin: "100px auto 100px" }}
      />
    );

  if (error)
    return (
      <div className="error details_error">
        <img src="/images/404-error-page.gif" alt="Error occurred" style={{ width: "700px", height: "auto" }} />
        <br />
        Data not found!
      </div>
    );

  return (
    <div className="container">
      <div className="details-page">
        {details ? (
          <div>
            <div className="main_img_news">
              <img src={details.HomePageImageUrl || "/images/no-img.png"} alt="No Image" />
            </div>
            <div className="title">
              <h2 dangerouslySetInnerHTML={{ __html: details.Description || "" }} />
            </div>
            <p className="dateandpdf">
              <span
                dangerouslySetInnerHTML={{
                  __html: details.PressReleaseDateHindi || "Press Release Date",
                }}
              />{" "}
              <a href={details.Attachments} target="_blank" rel="noopener noreferrer">
                Show PDF
              </a>
            </p>
            <div dangerouslySetInnerHTML={{ __html: details.GeneralDescription }} />
          </div>
        ) : (
          <p>No details available.</p>
        )}
      </div>
    </div>
  );
}
