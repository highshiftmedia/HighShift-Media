import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schema?: Record<string, any>;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  canonicalUrl?: string;
}

const BASE_URL = 'https://highshiftmedia.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

export const SEO: React.FC<SEOProps> = ({
  title = 'Highshift Media | Premier AI Automation & Development Agency',
  description = 'Transform your business with Highshift Media. We specialize in custom AI agents, chatbots, marketing automation, and enterprise LLM integration. Trusted by 500+ businesses worldwide.',
  keywords = 'AI Agency, Artificial Intelligence, Automation, Chatbots, LLM, Machine Learning, Business Automation, Marketing AI, Highshift Media, AI Agents, Voice AI, WhatsApp Bot',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  schema,
  article,
  noindex = false,
  canonicalUrl
}) => {
  const siteTitle = title.includes('Highshift') ? title : `${title} | Highshift Media`;
  const finalUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const finalCanonical = canonicalUrl || finalUrl;
  const finalImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;

  // Default Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    "name": "Highshift Media",
    "alternateName": "Highshift AI Agency",
    "url": BASE_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${BASE_URL}/highshift-icon.svg`,
      "width": 512,
      "height": 512
    },
    "image": DEFAULT_IMAGE,
    "description": description,
    "email": "info@highshiftmedia.com",
    "telephone": "+1-630-703-3569",
    "sameAs": [
      "https://twitter.com/highshiftmedia",
      "https://linkedin.com/company/highshiftmedia",
      "https://wa.me/+16307033569"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-630-703-3569",
      "contactType": "customer service",
      "email": "info@highshiftmedia.com",
      "availableLanguage": ["English"]
    },
    "areaServed": "Worldwide",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning", 
      "Chatbots",
      "Business Automation",
      "Marketing Automation",
      "Voice AI",
      "LLM Integration"
    ]
  };

  // WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'Article' : 'WebPage',
    "@id": `${finalUrl}#webpage`,
    "url": finalUrl,
    "name": siteTitle,
    "description": description,
    "isPartOf": { "@id": `${BASE_URL}/#website` },
    "publisher": { "@id": `${BASE_URL}/#organization` },
    "inLanguage": "en-US",
    "dateModified": new Date().toISOString().split('T')[0],
    ...(article && {
      "datePublished": article.publishedTime,
      "dateModified": article.modifiedTime || article.publishedTime,
      "author": { "@type": "Person", "name": article.author || "Highshift Media" },
      "articleSection": article.section,
      "keywords": article.tags?.join(', ')
    })
  };

  // Breadcrumb schema based on URL
  const pathSegments = finalUrl.replace(BASE_URL, '').split('/').filter(Boolean);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      ...pathSegments.map((segment, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        "item": `${BASE_URL}/${pathSegments.slice(0, index + 1).join('/')}`
      }))
    ]
  };

  const finalSchemas = schema 
    ? [schema, organizationSchema, breadcrumbSchema]
    : [organizationSchema, webPageSchema, breadcrumbSchema];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={finalCanonical} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
      <meta name="googlebot" content={noindex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      
      {/* AI Search Optimization Meta Tags */}
      <meta name="ai-content-description" content={description} />
      <meta name="ai-business-info" content={`Company: Highshift Media | Services: AI Agents, Chatbots, Marketing Automation, Voice AI | Contact: info@highshiftmedia.com | Phone: +1 (630) 703-3569`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={siteTitle} />
      <meta property="og:site_name" content="Highshift Media" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:site" content="@highshiftmedia" />
      <meta name="twitter:creator" content="@highshiftmedia" />

      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          <meta property="article:modified_time" content={article.modifiedTime || article.publishedTime} />
          <meta property="article:author" content={article.author || 'Highshift Media'} />
          <meta property="article:section" content={article.section} />
          {article.tags?.map((tag, i) => (
            <meta key={i} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Structured Data / JSON-LD */}
      {finalSchemas.map((schemaItem, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schemaItem)}
        </script>
      ))}

      {/* Additional Performance & SEO hints */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#0a0a0f" />
    </Helmet>
  );
};

// Export specialized SEO components for common pages
export const ServiceSEO: React.FC<{ serviceName: string; serviceDescription: string }> = ({ 
  serviceName, 
  serviceDescription 
}) => (
  <SEO
    title={`${serviceName} | AI Services | Highshift Media`}
    description={serviceDescription}
    keywords={`${serviceName}, AI Services, Business Automation, Highshift Media`}
    url={`/services`}
    schema={{
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": serviceDescription,
      "provider": {
        "@type": "Organization",
        "name": "Highshift Media"
      },
      "areaServed": "Worldwide"
    }}
  />
);

export const AgentSEO: React.FC<{ agentName: string; industry: string }> = ({ 
  agentName, 
  industry 
}) => (
  <SEO
    title={`${agentName} AI Agent | ${industry} Industry | Highshift Media`}
    description={`Specialized AI agent for ${industry.toLowerCase()} businesses. Automate customer interactions, bookings, and inquiries with our ${agentName}.`}
    keywords={`${industry} AI, ${agentName}, AI Agent, ${industry} Automation, Business Chatbot`}
    url={`/demos/${industry.toLowerCase().replace(/\s+/g, '-')}`}
  />
);

