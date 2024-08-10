// lib/fetcher.js

export const fetcher = (url) => fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(`An error occurred: ${res.statusText}`);
    }
    return res.json();
  });
  