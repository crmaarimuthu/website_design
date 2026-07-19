import { site } from "@/content/site";

/**
 * JSON-LD structured data (LocalBusiness / PhotographyBusiness) for rich results.
 * Rendered once in the root layout.
 */
export function Schema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "PhotographyBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/media/images/banner4.jpg`,
    logo: `${site.url}${site.logo}`,
    priceRange: "₹₹",
    openingHours: "Mo-Sa 09:00-20:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    sameAs: site.socials.map((s) => s.href),
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
