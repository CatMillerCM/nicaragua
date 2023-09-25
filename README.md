# Express App Template

This is a basic Express app template that listens on port 8080.

It contains a simple health check endpoint that returns a 200 status code and message.

It is set up with eslint ([airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)) and jest testing.

## To Run

Install the dependencies in the package.json file using `npm i`.

Then run `npm start` and go to `http://localhost:8080/health-check` in the browser. The "Up and running..." message should be displayed.

## To Test

Run `npm test`.

Further test files can be added into the `__tests__` folder.

To run a specific test file, use `npm test --<filename>`.

## To Lint

Run `npm run lint`.

To ignore a specific linting rule across the repository, append a `rules` block onto `eslintconfig` in the package.json and add the required exception.

