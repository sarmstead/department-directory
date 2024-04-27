# Department Listing Block

A lightweight block for finding departments.

## Local Setup

Install the npm packages.

```bash
npm i
```

Set up the WordPress Docker containers (create the database, servers, etc. that you'll need to develop locally).

```bash
npm run dev
```

Fire up the React server to develop the Department Listing WordPress block.

```bash
npm run start
```

We use `wp-env` behind the scenes to scaffold the Docker containers. `wp-env` creates a default user: username: `admin`, password: `password`. You can sign in using those credentials at [http://localhost:8888/wp-admin](http://localhost:888/wp-admin/).
