import axios from 'axios';

export function getOAuthTokenFromTwitch() {
  return new Promise<string>((resolve, reject) => {
    const twitchOAuthPath = 'https://id.twitch.tv/oauth2/token';

    axios
      .post(twitchOAuthPath, null, {
        params: {
          client_id: String(process.env.TWITCH_CLIENT_ID),
          client_secret: String(process.env.TWITCH_SECRET_ID),
          grant_type: 'client_credentials',
        },
      })
      .then(response => {
        resolve(response.data.access_token);
      })
      .catch(error => {
        reject(error);
      });
  });
}
