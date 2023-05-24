This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Initial Setup

First, install dependencies and create `husky` hooks:

```bash
yarn
yarn setup
```

Now you have `.env` file in working directory
Fill missing values according to the comments before running the project

Add some global packages to be able to use migrations

```bash
npm i -g sequelize-cli pg
```

Now you can apply migrations

```bash
yarn migration:up
```

## After pulling new changes

Don't forget to run

```bash
yarn
yarn migration:up
```

to keep packages installed and migrations updated.

Also track changes in the `example.env` to keep it synced with your local `.env`

## Getting Started

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.


## Redux with SSR

You can use redux on server side to pass preloaded state.
To do it you will need to call `initializeStore` in `getServerSideProps` method of the page and preform necessary state updates. When this is done you need to pass state of created store to `internal.initialReduxState` property.


```typescript
import { initializeStore } from '@/client/redux/store';
import { withPageSettings } from '@/client/utils';

export const getServerSideProps = withPageSettings(
  { ... },
  async () => {
    const reduxStore = initializeStore();
    const { dispatch } = reduxStore;
    await dispatch(loadItems({ page: 0, limit: 20 })).unwrap();

    const initialReduxState = reduxStore.getState();
    return {
      props: {
        internal: {
          initialReduxState,
        },
      },
    };
  },
);
```

## Sending Emails

By default server is using Mailhog email testing tool.
To implement production mailing service, look at `src/server/services/email.service.ts`.
There is a `TODO` that says you need to implement a new email service that is using `ISendEmail` interface signature.
`ISendEmail` interface can be found in `src/server/types/email.ts`

## Patched packages
`next-auth` package was patched using `patch-package` [utility](https://www.npmjs.com/package/patch-package) to support sessions with credential authentication.

## Database

### Updating schema of auth-related tables

Migrations should not be placed into the NextJS app. Handle migrations in a separate backend app.
But you will still need to update models in `src/server/database/models` folder to use new columns in a sign in/sign up flow.

### Using Microsoft SQL Server

According to the [Sequelize installation guide](https://sequelize.org/v6/manual/getting-started.html)
you will need to manually install driver for chosen database. 
```bash
# One of the following:
yarn add pg # Postgres
yarn add mysql2
yarn add mariadb
yarn add sqlite3
yarn add tedious # Microsoft SQL Server
```

PostgreSQL driver is installed and used by default in this starter. To switch to Microsoft SQL Server you will need to change the driver
```bash
yarn remove pg pg-hstore
yarn add tedious
```

Set `DATABASE_DIALECT` env variable to mssql and update other connection settings in `.env` file if needed.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
