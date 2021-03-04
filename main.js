require([
  "esri/intl",
  "esri/portal/Portal",
  "esri/identity/OAuthInfo",
  "esri/identity/IdentityManager",
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/webscene/Slide",
  "modules/Config.js",
  "modules/Panels.js",
  "modules/Forge.js",
  "modules/StreamService.js",
  "modules/LayerList.js",
  "modules/SliceWidget.js",
  "modules/Vehicles.js",
  "modules/StageBar.js",
  "modules/SegmentBar.js",
  "modules/SlidesWidget.js"
], function (esriIntl, Portal, OAuthInfo, esriId, WebScene, SceneView, Slide, Config, Panels, Forge, StreamService, LayerList, SliceWidget, Vehicles, StageBar, SegmentBar, SlidesWidget) {
  // Set app locale to Norwegian
  esriIntl.setLocale('nb');
  Panels.init();
  const config = Config.settings();

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
      LayerList.addWidget(view);
      SlidesWidget.addWidget(view, webscene);
      SliceWidget.addWidget(view, webscene);


      // Navigate to corresponding webscene slide when changing phase
      let stageBar = document.querySelector('.range input');
      stageBar.addEventListener('input', e => {

        let activeSegment = document.querySelector('.db-pbar-text.active');
        let segment = activeSegment.parentNode.getAttribute('data-segment');
        if (Number(segment) === 5) {
          let stage = Number(stageBar.value);
          let slide = config.stages[stage].slide;
          if (slide) zoomToSlide(slide);
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
          let seg = Number(el.getAttribute('data-segment'));
          let slide = config.segments[seg].slide;
          if (slide) zoomToSlide(slide);
        });
      });
 
      StreamService.addMachineTracks(webscene);
    });
   }

   StageBar.init();
   SegmentBar.start();
   Vehicles.updateList();
   Forge.startViewer(); 
});