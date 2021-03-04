require([
  "esri/intl",
  "esri/portal/Portal",
  "esri/identity/OAuthInfo",
  "esri/identity/IdentityManager",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/webscene/Slide",
  "modules/Panels.js",
  "modules/Forge.js",
  "modules/StreamService.js",
  "modules/LayerList.js",
  "modules/SliceWidget.js",
  "modules/Vehicles.js",
  "modules/StageBar.js",
  "modules/SegmentBar.js"
], function (esriIntl, Portal, OAuthInfo, esriId, WebScene, SceneView, Slide, Panels, Forge, StreamService, LayerList, SliceWidget, Vehicles, StageBar, SegmentBar) {
  // Set app locale to Norwegian
  esriIntl.setLocale('nb');
  Panels.init();


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
      whenLoggedIn(esriId.credentials[0].userId);
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
      //whenLoggedIn(esriId.credentials[0].userId);
    }
  });

  function whenLoggedIn(userId) {
    startGISViewer();
    document.getElementById('login-btn').innerText = userId;
    loggedIn = true;
  }

  /****************************************************************************
   *  Create Web Scene and View
   ***************************************************************************/
  function zoomToSlide(slidenr) {
    let slide = webscene.presentation.slides.getItemAt(slidenr);
    slide.applyTo(view)
  }
  
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
      //SliceWidget.addWidget(view, webscene);
      LayerList.addWidget(view);


      // Navigate to corresponding webscene slide when changing phase
      let progBar = document.querySelector('.range input');
      progBar.addEventListener('input', e => {
        let phase = Number(progBar.value);
  
        if (phase >= 2 && phase < 4) {
          zoomToSlide(5);
        }
        if (phase >= 4 && phase < 7) {
          zoomToSlide(6);
        }
        if (phase >= 7) {
          zoomToSlide(7);
        }
      })

      //Navigate to vehicle position when selecting in list
      document
      .querySelectorAll('.db-list-item').forEach(item => {
        item.addEventListener('click', e => {
          let active = document.querySelector('.db-list-item.active');
          if (active) {
            active.className = active.className.replace(' active', '');
          }
          
          let i = e.currentTarget;
          i.className += ' active';
          let x = i.getAttribute('data-xcoord');
          let y = i.getAttribute('data-ycoord');
          
          let point = {
            type: 'point',
            x: x,
            y: y,
            spatialReference: {wkid: 25833}
          }
          view.center = point;
        });   
      });

      //Navigate to corresponding webscene slide when changing parsell
      document.querySelectorAll('.db-pbar-item').forEach(item => {
        item.addEventListener('click', e => {
          let el = e.currentTarget;
          let pnr = Number(el.getAttribute('data-pnr'));

          switch (pnr) {
            case 3:
              zoomToSlide(3);
              break;
            case 5:
              zoomToSlide(5);
              break;
            case 9:
              zoomToSlide(9);
              break;
          }
        });
      });
 
      //StreamService.addStream(webscene);
    });
   }

   StageBar.init();
   SegmentBar.start(21);
   Vehicles.updateList();
   Forge.startViewer(); 
});