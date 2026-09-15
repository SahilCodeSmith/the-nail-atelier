import { organizationJsonLd, faqJsonLd } from "@/lib/config/seo";

function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, generated from our own config.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return <JsonLd data={organizationJsonLd()} />;
}

export function FaqJsonLd({ items }: { items: { q: string; a: string }[] }) {
  return <JsonLd data={faqJsonLd(items)} />;
}
