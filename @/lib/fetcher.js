// @/lib/fetcher.js

export const fetcher = (url) => fetch(url).then((res) => res.json());