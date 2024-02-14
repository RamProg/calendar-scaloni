# Calendar Scaloni

This project is part of an interview process.

It's a simple monthly calendar. Find more in the [Architecture Document](ARCHITECTURE.md)

## Pre-requisites

Prior to running the application you will need to install MongoDB locally: https://www.mongodb.com/docs/manual/installation/

For mac this can be done via brew:

```
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

For windows follow this guide: https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/

## Getting Started

Run `git clone https://github.com/RamProg/calendar-scaloni`

## Installation

From the root directory, run `npm run setup` to install all packages for both client and server.

## Running

Run server and client concurrently: `npm run dev`
The client app will run on `http://localhost:5173/` and the server on `http://localhost:8000/`

## Linting

Running `npm run checks` from the root directory will run typechecks, linting and prettier across all files.

## Tests

All tests can be run from the root directory with `npm run test`

This will run the server test first and then the client tests.

To see more about test coverage you can run `npm run test:coverage`

## Server docs

These can be found at http://localhost:8000/docs when run locally

## Next features

- startTime and endTime in events.
- Dynamic calendar cells to display a number of events based on available space.
- Dark mode.
- Weekly and Daily Views.