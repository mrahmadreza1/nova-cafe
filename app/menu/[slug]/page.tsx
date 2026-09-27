import { notFound } from "next/navigation";
import { getBySlug, products } from "@/content/menu";
import { ProductDetail } from "./ProductDetail";

/** صفحات محصول به‌صورت استاتیک ساخته و هر ۶۰ ثانیه revalidate می‌شوند */
export const revalidate = 60;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getBySlug(slug);
  return { title: product ? `${product.name} — کافه نُوا` : "کافه نُوا" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getBySlug(slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
