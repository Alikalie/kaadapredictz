# Route files

This application uses TanStack Start's file-based routing. Route files live in
this directory and use `createFileRoute` to define page components and route
options.

## Naming

| File | URL |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `predictions.tsx` | `/predictions` |
| `predictions.$category.tsx` | `/predictions/:category` |
| `prediction.$slug.tsx` | `/prediction/:slug` |
| `guides.$slug.tsx` | `/guides/:slug` |

The `$` prefix marks a dynamic path segment. The `_authenticated` directory
groups protected routes under a shared layout without adding that directory
name to their URLs.

## Root and generated files

- `__root.tsx` defines the application shell and must render its child route
  through `<Outlet />`.
- `routeTree.gen.ts` is generated from the route files. Do not edit it by hand.
- Add pages as route files here rather than creating a separate `pages`
  directory.
