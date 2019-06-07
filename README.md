# CTFP

## Setup

There is a number of env variables needed in order to deploy or development CTFP. Since this is a monorepo, all env variables are centralised and are accessible anywhere inside the monorepo. The package with name **config** under `packages/config` is responsible for just that.

### ENV variables

Create two `.env` files under `packages/config`. For deployment purposes create a `production.env` file and for development purposes create a `development.env` file.

The following list contains the required env variables that need to be created in order for the platform to function

```bash
PRISMA_ENDPOINT="https://eu1.prisma.sh/ctfp/ctfp/dev"
PRISMA_SECRET=""

FRONTEND_URL="http://localhost:8000"
PLAYGROUND_URL="http://localhost:4444"
LEADERBOARD_URL="http://localhost:4200"

BACKEND_GRAPHQL_ENDPOINT="graphql"
BACKEND_JWT_SECRET="jwtsecret123"
BACKEND_PORT=4444
```

For development purposes you can use the above.

## Docker and production environment

Make sure you have created the `production.env` file using the above template. Also you need to add the following values.

```bash
REDIS_HOST=redis
REDIS_PORT=6379
```

In addition replace the following

```bash

PRISMA_ENDPOINT="http://prisma:4466/ctfp/production"
PRISMA_SECRET="<SOMETHING_SECURE>"
PRISMA_MANAGEMENT_API_SECRET="<SOMETHING_SECURE>"

# IF REMOTE SERVER
FRONTEND_URL="http://<IP OR DOMAIN>:8000"
PLAYGROUND_URL="http://<IP OR DOMAIN>:4444"
LEADERBOARD_URL="http://<IP OR DOMAIN>:4200"
```

Build docker images (run command from root)

```bash
docker build -t be -f be/Dockerfile .
docker build -t ui -f ui/Dockerfile .
docker build -t chronos -f packages/chronos/Dockerfile .
```

#### Enable PRISMA MANAGEMENT API SECRET

Open up `docker-compose.yml` and uncomment where it says `# managementApiSecret: my-secret` under **prisma** service. Replace 'my-secret' with the value in your `.env` file.

#### Fire up the app

Run docker compose to bring up all docker images

```
docker-compose up -d
```

To initialize prisma server, the following command from root folder (will also seed with dummy data the first time)

```
yarn pkg:psm deploy:prod
```

#### Generate prisma access token

To access the prisma playground or prisma admin panel you need to obtain a token first.

Run the following command to get a token

```
yarn pkg:psm token:prod
```

#### Prisma Playground

You can access the **prisma playground** using the following link

```http
http://<IP OR DOMAIN OR LOCALHOST>:4466/ctfp/production/
```

Open where it says headers and input the following:

```json
{
  "Authorization": "Bearer <YOUR TOKEN>"
}
```

#### Prisma Admin Panel

You can access the **prisma admin panel** using the following link

```http
http://<IP OR DOMAIN OR LOCALHOST>:4466/ctfp/production/_admin
```

Click on the "gear" icon and input your token where it says 'secret' and click 'save changes'.

## Development

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

## Setup

1. Pre-requisites

   ```bash
   brew install yarn

   # Alternative
   sudo npm install -g yarn
   ```

2. Requisites

   ```bash
   yarn global add lerna lerna-wizard prisma graphql graphql-cli
   ```

3. Dependencies

   ```bash
   yarn install
   ```

## Useful Commands

### Add a new dependency to specific package

```bash
yarn workspace <name-of-workspace> add <npm package name>
```

### Add a global dependency to the monorepo

```bash
yarn -W add <package-name>
```

**Note** All dev dependencies should be specified to the root `package.json` only.

## Add a global dev dependency to the monorepo

```bash
yarn -W -D add <package-name>
```

### Remove a dependency

Either for global or specific package dependency just use the appropriate command as shown above, just replace `add` with `remove`.

### Hoist dev dependencies of a packages up to the root package.json file

```bash
lerna link convert
```

This will move all dev dependencies from all packages up to the root `package.json` and remove them from the respective child package `package.json` after symlinking as needed.

## Running a specific command for all packages

Say you want to run tests for packages, you can do the following

```bash
lerna run dev --stream
```

The `--stream` flag is used to show the output from the child processes.

## Running a specific command for a specific package

```bash
lerna --scope <package-name> exec -- yarn run <name-of-command>
```

## Interactive way to work with Lerna

If you installed the Lerna Wizard package on your computer, then you can use it to do some common things using a more interactive approach. Run the following command to get started.

```bash
lerna-wizard
```

## FAQ

### Husky pre-commit hook is not working

Most probably you initialized git **after** running `yarn install`. Remove node_modules, yarn.lock and re-run `yarn install`. Also make sure that `cat .git/hooks/pre-commit` exists and has reference to husky.

### Dependencies seem to break after adding a new dependency to a package

After running `yarn workspace <workspace-name> add <package-name>`

Do a `lerna bootstrap` to link everything back together.

### Jest related

> Error: `fsevents` unavailable (this watcher can only be used on Darwin)

Try the following:

```bash
npm uninstall -g watchman # if you have it installed
brew install watchman # To install homebrew first -> https://brew.sh/
```

## Guidelines

### When adding a new package

1. Remember to include a package.json and make sure the version is consistent with the rest of the projects.

2. In package.json make sure the package name starts with the @<namespace>/<name-of-package> for consistency.

   - namespace - refers to the workspace folder

   Example:

   ```bash
   {
       "name": "@packages/react-wordcount
   }
   ```

3. If you have tests using jest, remember to open up `jest.config.js` and add a displayName attribute so that when running tests in CI, it is easy to know for which package they are failing.
