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
