//@/lib/spotify.js

const getAccessToken = async () => {
    const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64")}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }),
    });

    return response.json();
};

// Modify recentlyPlayed to accept a limit parameter
export const recentlyPlayed = async (limit = 20) => {
    const { access_token } = await getAccessToken();

    // Include the limit parameter in the URL
    const url = new URL("https://api.spotify.com/v1/me/player/recently-played");
    url.searchParams.append("limit", limit);

    return fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    });
};
