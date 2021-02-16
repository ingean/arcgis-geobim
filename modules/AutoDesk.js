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

  //Add private functions

  return {
    getToken: () => {
      //Add code
      let token = fetch(tokenURL, {
        "method": 'POST',
        "headers": {
          "content-type": "application/x-www-form-urlencoded",
        },
        "body": JSON.stringify({
          "client_id": clientId,
          "client_secret": clientSecret,
          "grant_type": "client_credentials",
          "scope": "data:read"
        })
      })

      token.then((response) => {
        token = JSON.parse(response);
      })
    }
  }
})