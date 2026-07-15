const SITE_URL = (process.env.NEXT_PUBLIC_BASE_URL || "https://mandibhavjankari.vercel.app").replace(/\/$/, "");
const DEFAULT_OG_IMAGE = "/images/main_home.jpg";

/**
 * Build a consistent Next.js Metadata object for static info pages.
 * @param {object} opts
 * @param {string} opts.title       Page title (without site suffix; layout adds " | Mandi Bhav Jankari").
 * @param {string} opts.description 150-160 char meta description.
 * @param {string} opts.path        Page path starting with "/".
 * @param {string[]} [opts.keywords] Optional keyword list.
 * @param {string} [opts.image]     Optional OG image path.
 * @param {string} [opts.type]      OG type (default "website").
 */
export function buildMetadata({ title, description, path, keywords = [], image, type = "website" }) {
  const url = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_OG_IMAGE;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      locale: "hi_IN",
      siteName: "Mandi Bhav Jankari",
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}
