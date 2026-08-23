import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(frontendDir, 'public');
const distDir = path.resolve(frontendDir, 'dist');
const indexHtmlPath = path.resolve(frontendDir, 'index.html');

const PRODUCTION_DOMAIN = 'https://sentirebypc.com';

const routes = [
  {
    path: 'perfumes',
    title: '35%+ Perfume Oil Extraits & Personalised Perfumes | Sentire by PC',
    description: 'Explore 11 signature extraits de parfum formulated with rare 35%+ perfume oil concentration for beast-mode longevity. Includes complimentary laser photo engraving.',
    ogTitle: '35%+ Pure Oil Extrait de Parfum Catalog | Sentire by PC',
    ogDescription: 'Artisanal high-concentration perfumes formulated with 35%+ pure fragrance oils and bespoke laser flacon engraving in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`
  },
  {
    path: 'bestsellers',
    title: 'Best-Selling 35%+ Perfume Oil Extraits | Sentire by PC',
    description: 'Shop Jaipur\'s most coveted signature extraits de parfum crafted with 35%+ pure perfume oil concentration for all-day sillage, luxury packaging, and express delivery.',
    ogTitle: 'Best-Selling 35%+ Pure Oil Perfumes | Sentire by PC',
    ogDescription: 'Our highest-performing extraits de parfum featuring 35%+ perfume oil concentration and precision laser bottle etching.',
    image: `${PRODUCTION_DOMAIN}/images/product-white-oud.jpg`
  },
  {
    path: 'new-arrivals',
    title: 'New 35%+ Extrait de Parfum Arrivals | Sentire by PC',
    description: 'Discover new artisanal master releases formulated with 35%+ perfume oil concentration and complimentary laser photo engraving directly on the glass bottle.',
    ogTitle: 'New 35%+ Perfume Oil Releases | Sentire by PC',
    ogDescription: 'The latest high-concentration extraits de parfum with rare olfactory accords and bespoke laser flacon etching.',
    image: `${PRODUCTION_DOMAIN}/images/purple-oud-arrival.png`
  },
  {
    path: 'byob',
    title: 'Custom 35%+ Perfume Gift Box & Sets | Sentire by PC',
    description: 'Build a bespoke luxury discovery box with curated 10ml, 30ml, and 50ml extraits de parfum featuring 35%+ perfume oil concentration and luxury gift presentation.',
    ogTitle: 'Build Your Own 35%+ Extrait Discovery Box | Sentire by PC',
    ogDescription: 'Curate a personalized set of 35%+ high-concentration extraits de parfum with custom gift coffret presentation.',
    image: `${PRODUCTION_DOMAIN}/images/build-bundle.png`
  },
  {
    path: 'personalisation',
    title: 'Photo & Name Engraved 35%+ Extrait Perfumes | Sentire by PC',
    description: 'Personalise your 35%+ high-concentration extrait de parfum bottle with precision photo or name laser engraving. Uncompromising longevity and bespoke luxury.',
    ogTitle: 'Bespoke Laser Photo & Name Engraving Atelier | Sentire by PC',
    ogDescription: 'Precision laser etching of customer photos and custom typography directly on 35%+ perfume oil extraits de parfum flacons.',
    image: `${PRODUCTION_DOMAIN}/images/category-personalisation.jpg`
  },
  {
    path: 'about',
    title: 'About Sentire by PC | 35%+ Pure Oil Fragrance House Jaipur',
    description: 'Born in Jaipur with 10,000+ bottles crafted offline. Sentire by PC is one of India\'s only perfume houses bottling 35%+ pure perfume oil extraits with laser engraving.',
    ogTitle: 'The 35%+ Perfume Oil Craftsmanship | Sentire by PC',
    ogDescription: 'Why Sentire refuses to dilute to 15% EDP. 35%+ pure fragrance oil formulation combined with bespoke laser bottle engraving in Jaipur.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`
  },
  {
    path: 'client-services',
    title: 'Client Services & Express Delivery | Sentire by PC',
    description: 'Private client concierge, express shipping timelines, returns policy, and care guidance for Sentire 35%+ extraits de parfum and engraved flacons.',
    ogTitle: 'Private Client Concierge & Support | Sentire by PC',
    ogDescription: 'Dedicated concierge for Sentire by PC artisanal extraits de parfum and custom engraved orders.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`
  },
  {
    path: 'track-order',
    title: 'Track Your Perfume Order | Sentire by PC',
    description: 'Track real-time courier status and express delivery updates for your Sentire by PC 35%+ extrait de parfum and laser-engraved orders.',
    ogTitle: 'Track Your Order | Sentire by PC',
    ogDescription: 'Live tracking for your Sentire luxury perfume shipment.',
    image: `${PRODUCTION_DOMAIN}/images/hero-celestial.png`
  }
];

function generateHtml(templateHtml, route) {
  let html = templateHtml;
  const canonicalUrl = `${PRODUCTION_DOMAIN}/${route.path}`;

  // Replace Title
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  
  // Replace Meta Description
  html = html.replace(/<meta name="description" content="[\s\S]*?" \/>/, `<meta name="description" content="${route.description}" />`);
  
  // Replace Canonical Link
  html = html.replace(/<link rel="canonical" href="[\s\S]*?" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`);
  
  // Replace OG tags
  html = html.replace(/<meta property="og:url" content="[\s\S]*?" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta property="og:title" content="[\s\S]*?" \/>/, `<meta property="og:title" content="${route.ogTitle}" />`);
  html = html.replace(/<meta property="og:description" content="[\s\S]*?" \/>/, `<meta property="og:description" content="${route.ogDescription}" />`);
  html = html.replace(/<meta property="og:image" content="[\s\S]*?" \/>/, `<meta property="og:image" content="${route.image}" />`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:url" content="[\s\S]*?" \/>/, `<meta name="twitter:url" content="${canonicalUrl}" />`);
  html = html.replace(/<meta name="twitter:title" content="[\s\S]*?" \/>/, `<meta name="twitter:title" content="${route.ogTitle}" />`);
  html = html.replace(/<meta name="twitter:description" content="[\s\S]*?" \/>/, `<meta name="twitter:description" content="${route.ogDescription}" />`);
  html = html.replace(/<meta name="twitter:image" content="[\s\S]*?" \/>/, `<meta name="twitter:image" content="${route.image}" />`);

  return html;
}

export function buildStaticRoutes() {
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. Generate in public directory
  routes.forEach(route => {
    const routeDir = path.resolve(publicDir, route.path);
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    const routeHtml = generateHtml(baseHtml, route);
    fs.writeFileSync(path.resolve(routeDir, 'index.html'), routeHtml, 'utf8');
    fs.writeFileSync(path.resolve(publicDir, `${route.path}.html`), routeHtml, 'utf8');
    console.log(`Generated public/${route.path}/index.html and public/${route.path}.html`);
  });

  // 2. If dist exists, also generate in dist directory with built assets
  if (fs.existsSync(distDir)) {
    const distIndexHtml = fs.readFileSync(path.resolve(distDir, 'index.html'), 'utf8');
    routes.forEach(route => {
      const distRouteDir = path.resolve(distDir, route.path);
      if (!fs.existsSync(distRouteDir)) {
        fs.mkdirSync(distRouteDir, { recursive: true });
      }
      const distRouteHtml = generateHtml(distIndexHtml, route);
      fs.writeFileSync(path.resolve(distRouteDir, 'index.html'), distRouteHtml, 'utf8');
      fs.writeFileSync(path.resolve(distDir, `${route.path}.html`), distRouteHtml, 'utf8');
      console.log(`Generated dist/${route.path}/index.html and dist/${route.path}.html`);
    });
  }
}

buildStaticRoutes();

