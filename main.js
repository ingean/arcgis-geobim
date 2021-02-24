require([
  "esri/intl",
  "esri/portal/Portal",
  "esri/identity/OAuthInfo",
  "esri/identity/IdentityManager",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/webscene/Slide"
], function (intl, Portal, OAuthInfo, esriId, WebScene, SceneView, Slide) {

  // Set app locale to Norwegian
  //intl.setLocale('nb');

  let webscene;
  let view;
  /****************************************************************************
   *  Oauth2 Autorization
   ***************************************************************************/
  let loggedIn = false;
  
  let info = new OAuthInfo({
    appId: 'rZtoqZKEsZwK5bLD',
    popup: false
  });
  esriId.registerOAuthInfos([info]);

  esriId
    .checkSignInStatus(info.portalUrl + '/sharing')
    .then(() => {
      startGISViewer();
      loggedIn = true;
      document.getElementById('login-btn').innerText = 'Logg ut';
    })
    .catch(() => {// User not logged in
      esriId.getCredential(info.portalUrl + '/sharing');
    });

  document.getElementById('login-btn').addEventListener('click', () => {
    if (loggedIn) {
      esriId.destroyCredentials();
      window.location.reload();
    } else {
      esriId.getCredential(info.portalUrl + '/sharing');
      startGISViewer();
      document.getElementById('login-btn').innerText = 'Logg ut';
      loggedIn = true;
    }
  });

  /****************************************************************************
   *  Create Web Scene and View
   ***************************************************************************/
  function startGISViewer() {
    webscene = new WebScene({
      portalItem: {
        id: '6633c8f8fe0643d0a23e46447bc5339b'
      }
    });
  
    view = new SceneView({
      container: 'GISViewer',
      qualityProfile: 'high',
      environment: {
        atmosphere: {
          quality: 'high'
        },
        lighting: {
          date: new Date(),
          directShadowsEnabled: true
        }
      },
      map: webscene
    });

    view.when(function () {
      // Execute code when view has loaded
      let progBar = document.querySelector('.range input');
      progBar.addEventListener('input', e => {
        let slides = webscene.presentation.slides;
        let phase = Number(progBar.value);
  
        if (phase >= 2 && phase < 4) {
          let phaseSlide = webscene.presentation.slides.getItemAt(5);
          phaseSlide.applyTo(view)
        }

        if (phase >= 4 && phase < 7) {
          let phaseSlide = webscene.presentation.slides.getItemAt(6);
          phaseSlide.applyTo(view)
        }

        if (phase >= 7) {
          let phaseSlide = webscene.presentation.slides.getItemAt(7);
          phaseSlide.applyTo(view)
        }
      })
    });
   }

   loadBIMViewer();
});