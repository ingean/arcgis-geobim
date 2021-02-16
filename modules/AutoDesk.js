define([
  //Add dependent modules
], 
function (
  //Add dependent modules
) 
{
  // Private variables
  const clientId = 'BLazAta6xHwqh29tzC1qmuEFb2gjEa6Q';
  const clientSecret = 'pWYGrMLFECjdtA4x';
  const tokenURL = 'https://developer.api.autodesk.com/authentication/v1/authenticate';

  let token = '';

  //Add private functions

  return {
    getToken: () => {
      let data = new URLSearchParams();
      data.append("client_id", clientId);
      data.append("client_secret", clientSecret);
      data.append("grant_type", "client_credentials");
      data.append("scope", "data:read");

      fetch(tokenURL, {
        "method": 'POST',
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "body": data
      })
      .then((response) => {
        response.json()
        .then(body => {
          token = body["access_token"]; 
          return token;
        })
      })
    }
  }
})