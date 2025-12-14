// PROMPT O-[std] Patterns-[min] P-[min]
// This file demonstrates PROMPT Protocol validation

export function ProductCard({ product }: any) {
  return (
    <div>
      <img src={product.image} />
      <h2>{product.title}</h2>
      <p>${product.price}</p>
    </div>
  );
}

// Expected violations:
// ❌ [O-std-1] Should use shadcn/ui components instead of raw HTML/CSS
// ❌ [O-std-2] Should use Tailwind CSS for styling
// ❌ [Patterns-min-1] Avoid using "any" type. Use proper TypeScript types
// ❌ [P-min-1] Use Next.js Image component instead of <img> tag
