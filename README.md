# BunkaLog
Bunk manager application with notifications enabled.


## Build with
* ReactJS
* reactstrap
* Axios
* React Google Login
* JSCookie

#### Dev Dependencies
* gh-pages
* ESLint


## Development

1. Clone the repository and change directory
```bash
git clone <repo>
cd bunkalog
```

2. Create env file and set the URL for the development API server
(refer `.env.example`)

3. Install npm dependencies
```bash
npm install
```

4. Start the npm server
```bash
npm start
```


## Deployment

1. Change homepage in `package.json`
2. Create env file and set the URL for the production API server
(refer `.env.example`)
3. Run `npm install` if you haven't
4. Run `npm run deploy` and the project would be deployed using `gh-pages`


## Style Guide

Google Javascript Style Guide is followed.
The project uses ESLint to enforce the style.
Configuration details can be found in `.eslintrc.json` file.
