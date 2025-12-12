# Supabase Schema Example

> **PROMPT Tags Used:** `PROMPT M-[std] T-[std]`

This example demonstrates database schema design with PROMPT Protocol for Supabase (PostgreSQL).

## Schema Overview

- E-commerce database with products, categories, and users
- RLS (Row Level Security) policies
- TypeScript types and Zod schemas
- Indexes on frequently queried fields

## Files

```
supabase-schema/
├── schema.sql              # Database schema
├── types.ts                # TypeScript types
├── validation.ts           # Zod schemas
└── README.md
```

## PROMPT Rules Applied

### M-[std] (Modeling)
- ✓ TypeScript types match schema
- ✓ Foreign keys defined explicitly
- ✓ Meaningful table/field names
- ✓ created_at and updated_at timestamps
- ✓ UUIDs for primary keys
- ✓ Indexes on queried fields
- ✓ Zod schemas for validation
- ✓ RLS policies implemented
- ✓ Schema documented

### T-[std] (Types)
- ✓ TypeScript strict mode
- ✓ API inputs validated with Zod
- ✓ Explicit error handling
- ✓ Types exported and reused
- ✓ Runtime validation
- ✓ Environment variables validated

## Tables

1. **users** - User accounts
2. **categories** - Product categories
3. **products** - Product catalog
4. **orders** - Customer orders
5. **order_items** - Order line items

## How to Use

```bash
# Initialize Supabase
npx supabase init

# Apply schema
psql -f schema.sql

# Copy types to your project
cp types.ts your-project/types/database.ts
cp validation.ts your-project/lib/validation.ts
```

## Validation

Check your schema follows PROMPT rules:

- [ ] All tables have UUID primary keys
- [ ] All tables have created_at/updated_at
- [ ] Foreign keys defined with ON DELETE actions
- [ ] Indexes on foreign keys and queried fields
- [ ] RLS policies enabled
- [ ] Zod schemas match database types

---

**Note:** This is a placeholder. Full implementation coming soon. Want to contribute? See [CONTRIBUTING.md](../CONTRIBUTING.md)
