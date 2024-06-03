# hasura-k6-test

This repo contains reference on script and related doc for performing load test on Hasura GraphQL API using Grafana k6

Pre-requisites:

- Install K6 (Installation doc [ref](https://grafana.com/docs/k6/latest/set-up/install-k6/))
- Make sure you've installed NPM and node. (Installation doc [ref](https://nodejs.org/en/download/package-manager))

## K6

We are going to use Grafana K6 as load testing tool. You can read more about k6 [here](https://k6.io/).

Once you've completed K6 installtion (as per pre-requisites), we can devise a JavaScript file inside our local project which would make HTTP/WS requests to certain Hasura GraphQL API.

## Setting up project with NPM

First up, you'll need to setup npm based project. For those aren't familiar, npm is popular node package manager, which is a package registry platform where people hosts the software which can be used inside your javascript/typescript projects.

Perform following steps in order:

```
mkdir hasura-load-test
cd hasura-load-test
```

Once you've installed npm and node (as per pre-requisites), you'll need to initialize a npm project by running `npm init`.

This CLI will prompt your input to create project. You can just press "enter" for every prompt.

Once project is created, it will have folder with `package.json` inside it. Then we create index.js file

```
touch index.js
```

The ideal `index.js` file would look like

```js
import http from "k6/http";
import { sleep } from "k6";

/** 
  
  Please edit the following variables according to your
  project's needs such as request headers , URL and GraphQL query 
  
  **/

export const options = {
  // startTime: '0s',
  // gracefulStop: '300s',
  duration: "10s",
  // iterations: 1,
  vus: 20,
};

export default function () {
  /** 
  
  Please edit the following variables according to your
  project's needs such as request headers , URL and GraphQL query 
  
  **/
  let headers = {
    // Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
    "x-hasura-admin-secret": "your_secret",
    "x-hasura-role": "admin",
  };

  let url = "http://localhost:8080/v1/graphql";

  let query = `
  query getAlbum {
    Album {
      AlbumId
      ArtistId
      Title
      Tracks {
        AlbumId
        Bytes
        Composer
      }
    }
  }

  `;

  let res = http.post(url, JSON.stringify({ query: query }), {
    headers: headers,
  });
}
```

I've added the comments in the code where you can replace the K6 options and the URL, query and request headers as needed.
