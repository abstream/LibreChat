import { useEffect } from 'react';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  canonicalUrl?: string;
}

const DEFAULT_SEO = {
  title: 'Omnexio - All Your AI in One Place',
  description:
    'Access dozens of AI agents and models through one account - our AI search engine integrates real time data with the perfect AI tool, increasing your productivity.',
  keywords:
    'AI, artificial intelligence, chatbot, language models, OpenAI, Anthropic, AI agents, productivity',
  ogImage: '/assets/omnexio-logo.png',
  twitterCard: 'summary_large_image' as const,
};

export function useSEO(config: SEOConfig = {}) {
  useEffect(() => {
    const {
      title = DEFAULT_SEO.title,
      description = DEFAULT_SEO.description,
      keywords = DEFAULT_SEO.keywords,
      ogTitle = title,
      ogDescription = description,
      ogImage = DEFAULT_SEO.ogImage,
      ogUrl = window.location.href,
      twitterCard = DEFAULT_SEO.twitterCard,
      canonicalUrl = window.location.href,
    } = config;

    // Update document title
    document.title = title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let tag = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, name);
        document.head.appendChild(tag);
      }

      tag.setAttribute('content', content);
    };

    // Helper function to update or create link tags
    const updateLinkTag = (rel: string, href: string) => {
      let tag = document.querySelector(`link[rel="${rel}"]`);

      if (!tag) {
        tag = document.createElement('link');
        tag.setAttribute('rel', rel);
        document.head.appendChild(tag);
      }

      tag.setAttribute('href', href);
    };

    // Update basic meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph tags
    updateMetaTag('og:title', ogTitle, true);
    updateMetaTag('og:description', ogDescription, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:url', ogUrl, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'Omnexio', true);

    // Update Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:title', ogTitle);
    updateMetaTag('twitter:description', ogDescription);
    updateMetaTag('twitter:image', ogImage);

    // Update canonical URL
    updateLinkTag('canonical', canonicalUrl);
  }, [config]);
}
