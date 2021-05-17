# triplecheck-example-netlify

![TripleCheck example implementation](readme/triplecheck-example.png)

## TripleCheck broker running on Netlify Functions

This repo demonstrates a working, basic implementation of a [TripleCheck broker](https://github.com/mikaelvesavuori/triplecheck-broker) running on Netlify Functions (really just AWS Lambda) with the database in FaunaDB.

Refer to the documentation on the [broker](https://github.com/mikaelvesavuori/triplecheck-broker) for how to call the API.

Technology choices are:

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org)
- [FaunaDB](https://fauna.com)
- [Netlify CLI](https://cli.netlify.com)

## Pre-requisites

- A Netlify account
- A Fauna account
- Logged in to Netlify
- FaunaDB account and a database that's set up correctly (outlined below)

## Instructions

### Creating the FaunaDB database

- In Fauna, create a database called `triplecheck-broker`.
- Under `Security`, create a key for the database and set the role to `Server`
- Paste the key's value into an `.env` file (go ahead and rename the `env` file provided in the repo) like this: `FAUNA_KEY=some-secret-random-key`
- Create a new collection (call it `triplecheck`)
- Create an index called `Key` and set the term to `data.key`; also enable `Serialized` and `Unique`

### Setting up the Fauna key in Netlify

The easiest way to do this is to go to Netlify's web console, navigate to your project and under `Build & deploy` set a key under `Environment variables` like this: `FAUNA_KEY` with your key as the value.

## Installation

Run `npm install` or `yarn install`.

## Local development

Run `npm start` or `yarn start`.

## Deploy

Run `npm run deploy` or `yarn run deploy`.

## Teardown (remove stack)

You will have to remove your function manually through the Netlify web console.
