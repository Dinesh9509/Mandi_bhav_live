"use client";

export default function TipDetail({ title, image, paragraphs = [], shareTitle, shareText }) {
  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle || title,
          text: shareText || title,
          url: window.location.href,
        });
      } catch (e) {
        console.error("Error sharing:", e);
      }
    } else {
      alert("Share feature is not supported in your browser.");
    }
  };

  return (
    <div className="tips_info_main">
      <div className="container">
        <div className="title">
          <h2>{title}</h2>
        </div>
        <div className="info">
          <img src={image} alt={title} />
          {paragraphs.map((p, i) => (
            <p key={i} className="info_para">
              {p}
            </p>
          ))}
          <p className="social_share">
            यदि आपको यह जानकारी उपयोगी लगी हो तो इसे अपने अन्य मित्रों के साथ साझा करना ना भूले ।
            <span className="share">
              <a onClick={handleShare} style={{ cursor: "pointer" }}>
                Click to Share
              </a>
              <a href="/Tips">कृषि सलाह</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
