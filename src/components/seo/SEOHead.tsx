import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  price?: number;
  currency?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  category?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Prayan Masale - Premium Organic Spices Online | Pure Indian Spices",
  description = "Buy premium organic spices online from Prayan Masale. Pure Haldi, Red Chilli, Dhaniya, Garam Masala. Free delivery, authentic taste, lab tested quality. Order now!",
  keywords = "organic spices online, pure spices, haldi powder, red chilli powder, dhaniya powder, garam masala, indian spices, spices online india, premium spices, authentic spices",
  image = "/prayan-logo.png",
  url,
  type = "website",
  price,
  currency = "INR",
  availability = "InStock",
  brand = "Prayan Masale",
  category
}) => {
  // Get current domain dynamically
  const currentDomain = typeof window !== 'undefined' ? window.location.origin : 'https://prayan-shop.shop';
  const fullUrl = url || currentDomain;
  const fullImageUrl = image?.startsWith('http') ? image : `${currentDomain}${image}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'product' ? "Product" : "WebSite",
    "name": title,
    "description": description,
    "url": fullUrl,
    "image": fullImageUrl,
    ...(type === 'product' && price && {
      "offers": {
        "@type": "Offer",
        "price": price,
        "priceCurrency": currency,
        "availability": `https://schema.org/${availability}`,
        "seller": {
          "@type": "Organization",
          "name": brand
        }
      },
      "brand": {
        "@type": "Brand",
        "name": brand
      },
      "category": category
    }),
    ...(type === 'website' && {
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${fullUrl}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    })
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Prayan Masale" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Prayan Masale" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      
      {/* Additional SEO Tags */}
      <meta name="theme-color" content="#ea580c" />
      <meta name="msapplication-TileColor" content="#ea580c" />
      <link rel="canonical" href={fullUrl} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {/* Local Business Schema for Homepage */}
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Prayan Masale",
            "description": "Premium organic spices and masalas online store",
            "url": currentDomain,
            "telephone": "+91-XXXXXXXXXX",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "IN",
              "addressLocality": "India"
            },
            "openingHours": "Mo-Su 00:00-23:59",
            "priceRange": "₹₹",
            "servesCuisine": "Indian",
            "paymentAccepted": "Cash, Credit Card, UPI, Net Banking",
            "currenciesAccepted": "INR"
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;