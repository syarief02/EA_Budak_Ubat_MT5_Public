import { getCatalog } from "@/lib/productCatalog";

export const revalidate = 3600;

export default async function sitemap() {
  const baseUrl = 'https://eabudakubat.com';
  const lastModified = new Date();

  const products = (await getCatalog())
    .filter((p) => p.slug && !p.has_page)
    .map((p) => ({ url: `${baseUrl}/products/${p.slug}`, lastModified, changeFrequency: 'monthly', priority: 0.7 }));

  return [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/brokers`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/community`, lastModified, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/changelog`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/learn`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/guide`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ea-budak-ubat`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/goldmind-ai`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/bracketblitz`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/mathedge-pro`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/aligator-gozaimasu`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/encik-moku`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/headway`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/bubat-ai`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ...products,
  ];
}
