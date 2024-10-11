This is a [Next.js](https://nextjs.org) project about an ecommerce website.

This project use :

- Shadcn/ui as Component library (by downloading components)
- Radix-ui for accessibility
- Redux toolkit for use a store

## Getting Started

### Setup

use node version > 20.

### Environment variable

Copy and paste file named `.env.example` and rename it `.env`.

Add value to this variable.

**Spoiler** It's : https://fakestoreapi.com

### Development

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application alive.

### Production

First, build the app :

```bash
npm run build
```

Then, run the Next.js server :

```bash
npm run start
```

## Way to improve

### Session Persistance

This application use `@redux/toolkit` and `localStorage` for persist user session and his cart.
In an ideal world, we can prefer store the session into a database, for know which articles user added to his cart, and
make marketing communication on it, for example. The easier way is to use Postgresql (provide by vercel), use Prisma as
ORM, and use server actions for manage interaction between peristance management and user interaction.

### Improve API

In the API classes for consume API, we must add methods to filter products fetching, and this is an API responsibility.
We have also a problem about categories. We can fetch by category and the API don't expose `id` for apply logic on this
property (filter, translation, add a category page).

### Product cache

Product page and listing are always cache. Any cache stategy is defined here. It's going to be a problem when the
product data changed.
We can make a cache revalidation with a webhook from the api and an endpoint in this Next.js project.

### Rehydration problem in cart page when user reload the page

The Redux toolkit usage create a problem of rehydration when the user reload the `/cart` page, with products in his
cart, because the page generated from server doesn't have products from localStorage, and i don't find solutions to
solve it in the delay.

### Improve cart integrity

In this application we can add all product we want, also unexisting product. For improve card integrity we can improve
the assessors to check if product exist into the API, and add it only of exist.