## Error Type
Build Error

## Error Message
Parsing ecmascript source code failed

## Build Output
./app/admin/properties/page.tsx:59:1
Parsing ecmascript source code failed
  57 | }
  58 | if (location) query = query.ilike('location', `%${location}%`)
> 59 | ...
     | ^^^
  60 |
  61 |   if (minPrice > 0) query = query.gte('price', minPrice)
  62 |   if (maxPrice < 5000000) query = query.lte('price', maxPrice)

Expression expected

Next.js version: 16.1.6 (Turbopack)
