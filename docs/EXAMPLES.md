# PROMPT Protocol Examples

Real-world examples of using PROMPT Protocol effectively.

---

## Table of Contents

1. [UI Components](#ui-components)
2. [API Routes](#api-routes)
3. [Database Schemas](#database-schemas)
4. [Full Features](#full-features)
5. [Performance Optimization](#performance-optimization)
6. [Before/After Comparisons](#beforeafter-comparisons)

---

## UI Components

### Example 1: Simple Button (MVP)

```typescript
// PROMPT O-[min]
// CTA button for landing page hero section
export function HeroButton() {
  return (
    <Button 
      size="lg" 
      className="bg-primary hover:bg-primary/90"
    >
      Get Started
    </Button>
  );
}
```

**Rules Applied:**
- ✓ Uses shadcn/ui Button component (O-[min] #1)
- ✓ Tailwind classes (O-[min] #2)
- ✓ Mobile-responsive by default (O-[min] #3)

---

### Example 2: Product Card (Production)

```typescript
// PROMPT O-[std] P-[min]
// Product card with image, title, price, and add to cart button
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      await addToCart(product.id);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-square">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold mt-2">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isAdding ? 'Adding...' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
```

**Rules Applied:**

**O-[std] (Output & UX):**
- ✓ shadcn/ui components (Card, Button)
- ✓ Tailwind classes
- ✓ Responsive (works on mobile)
- ✓ Semantic HTML (Card is article-based)
- ✓ Loading state (isAdding)
- ✓ Lucide icon (ShoppingCart)
- ✓ ARIA via Button component

**P-[min] (Patterns):**
- ✓ TypeScript strict (ProductCardProps)
- ✓ Error handling (try-catch)
- ✓ Next.js Image optimization

---

### Example 3: Form with Validation (Complete)

```typescript
// PROMPT O-[std] P-[std] T-[std]
// Contact form with name, email, message, and validation
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      reset();
      toast.success('Message sent successfully!');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <Input
          id="name"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-destructive mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="text-sm text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          Message
        </label>
        <Textarea
          id="message"
          rows={5}
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="text-sm text-destructive mt-1">
            {errors.message.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
```

**Rules Applied:**

**O-[std]:** shadcn/ui, Tailwind, semantic HTML (form, label), loading states, ARIA labels  
**P-[std]:** TypeScript types, meaningful names, error handling, React hooks correct  
**T-[std]:** Zod validation, type inference, runtime validation, error messages

---

## API Routes

### Example 4: Simple GET Endpoint

```typescript
// PROMPT M-[min] T-[min] R-[min]
// GET /api/products - List all products
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        imageUrl: true,
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
```

**Rules Applied:**
- ✓ TypeScript types (M-[min])
- ✓ Meaningful names (R-[min])
- ✓ Error handling (T-[min])
- ✓ Separation of concerns (R-[min])

---

### Example 5: POST with Validation

```typescript
// PROMPT M-[std] T-[std] R-[std]
// POST /api/products - Create a new product
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db';

const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  price: z.number().positive(),
  categoryId: z.string().uuid(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validationResult = createProductSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validationResult.error.flatten() },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Create product
    const product = await db.product.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
```

**Rules Applied:**

**M-[std]:**
- ✓ Zod schema validation
- ✓ UUID for IDs
- ✓ Timestamps (createdAt, updatedAt)
- ✓ Foreign key relationship (categoryId)

**T-[std]:**
- ✓ Runtime validation with Zod
- ✓ Type inference from schema
- ✓ Explicit error handling

**R-[std]:**
- ✓ Clear function purpose
- ✓ Early return on validation failure
- ✓ Organized imports

---

## Database Schemas

### Example 6: Simple Table (Supabase)

```sql
-- PROMPT M-[min]
-- Products table
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price decimal(10, 2) not null,
  category_id uuid references categories(id),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**TypeScript types:**

```typescript
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};
```

---

### Example 7: Complete Schema with RLS

```sql
-- PROMPT M-[std] T-[min]
-- E-commerce schema with RLS

-- Categories
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_categories_slug on categories(slug);

-- Products
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price decimal(10, 2) not null check (price > 0),
  stock integer not null default 0 check (stock >= 0),
  category_id uuid not null references categories(id) on delete cascade,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_products_category_id on products(category_id);

-- RLS Policies
alter table products enable row level security;

create policy "Products are viewable by everyone"
  on products for select
  using (true);

create policy "Admins can insert products"
  on products for insert
  with check (auth.jwt() ->> 'role' = 'admin');
```

**Zod schemas:**

```typescript
import { z } from 'zod';

export const categorySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  description: z.string().min(10).max(500),
  price: z.number().positive(),
  stock: z.number().int().nonnegative(),
  categoryId: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
```

---

## Full Features

### Example 8: Product Listing Page

```typescript
// PROMPT O-[std] P-[std] M-[min] P-[min]
// Product listing with filters, search, and pagination
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/product-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search } from 'lucide-react';

export function ProductListing() {
  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState<string>('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', search, categoryId],
    queryFn: () => fetchProducts({ search, categoryId }),
  });

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load products</p>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Products</h1>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              aria-label="Search products"
            />
          </div>
          
          <Select
            value={categoryId}
            onValueChange={setCategoryId}
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {/* Categories from API */}
          </Select>
        </div>
      </header>

      <section>
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        ) : data?.products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```

**Rules Applied:**

**O-[std]:** Semantic HTML, loading/empty/error states, responsive, ARIA labels, Lucide icons  
**P-[std]:** React Query caching, meaningful names, TypeScript types, hooks correctly used  
**M-[min]:** Types match API  
**P-[min]:** TypeScript strict, error handling

---

## Performance Optimization

### Example 9: Image Gallery (Performance Critical)

```typescript
// PROMPT P-[max] O-[std]
// Optimized image gallery with 1000+ images
'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useVirtualizer } from '@tanstack/react-virtual';

interface ImageGalleryProps {
  images: Array<{
    id: string;
    url: string;
    alt: string;
  }>;
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  // Virtual scrolling for performance
  const virtualizer = useVirtualizer({
    count: images.length,
    getScrollElement: () => parentRef.current,
    estimateSize: useCallback(() => 300, []),
    overscan: 5,
  });

  return (
    <div
      ref={parentRef}
      className="h-screen overflow-auto"
      role="region"
      aria-label="Image gallery"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const image = images[virtualRow.index];
          
          return (
            <div
              key={image.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Image
                src={image.url}
                alt={image.alt}
                width={300}
                height={300}
                loading="lazy"
                quality={75}
                className="rounded-lg object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
```

**Performance optimizations:**
- ✓ Virtual scrolling (only renders visible items)
- ✓ Next.js Image with lazy loading
- ✓ Optimized quality setting
- ✓ WebP format (automatic with Next.js)
- ✓ Debounced scroll (built into virtualizer)

---

## Before/After Comparisons

### Example 10: Without PROMPT

```typescript
// No PROMPT tag - AI generates inconsistent code
export function UserCard(props) {
  return (
    <div>
      <img src={props.user.avatar} />
      <div>{props.user.name}</div>
      <div>{props.user.email}</div>
    </div>
  );
}
```

**Issues:**
- ❌ No TypeScript types
- ❌ Using raw `<img>` instead of Next.js Image
- ❌ No styling framework
- ❌ Not responsive
- ❌ Missing semantic HTML
- ❌ No accessibility

---

### Example 10: With PROMPT O-[std] P-[min]

```typescript
// PROMPT O-[std] P-[min]
// User profile card with avatar, name, and email
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  };
}

export function UserCard({ user }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="w-full sm:w-80">
      <CardContent className="pt-6">
        <article className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{user.name}</h3>
            <p className="text-sm text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
```

**Improvements:**
- ✅ TypeScript strict with proper types
- ✅ shadcn/ui components (Card, Avatar)
- ✅ Tailwind CSS responsive (sm: breakpoint)
- ✅ Semantic HTML (`<article>`)
- ✅ Accessibility (alt text, fallback)
- ✅ Error handling (AvatarFallback)

---

## Summary

These examples demonstrate:

1. **Incremental quality** - Use `[min]` for MVPs, `[std]` for production
2. **Category combinations** - Combine P.R.O.M.P.T categories logically
3. **Validation** - Each example follows specific rules
4. **Real-world patterns** - Production-ready code examples

**Next steps:**
- Copy and adapt examples to your projects
- Use PROMPT tags consistently
- Validate with checklists from [VALIDATION_GUIDE.md](VALIDATION_GUIDE.md)

---

**More examples:** See [examples/](../examples/) directory for complete projects.
