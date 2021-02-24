
// Private variables
const clientId = 'yvANRrDF1Omdkgd8HXHdJwME2DWxNX9u';
const clientSecret = 'TL8xzPUfzxOqGOHk';
const tokenURL = 'https://developer.api.autodesk.com/authentication/v1/authenticate';
//const documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z2VvdGVrXzIwMjEvZi1icnVfSzA5LVMlQzMlQjh0YmFra2RhbGVuLW92ZXJnYW5nc2JydS5ydnQ';
const documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z2VvdGVrXzIwMjEvZi1icnVfSzA1LU1vc2VsdmEtYnJ1MDEucnZ0';

let accessToken = '';
let timeInSeconds = 0;
let viewer;
let props = {};

function getForgeToken(callback) {
  let data = new URLSearchParams();
  data.append("client_id", clientId);
  data.append("client_secret", clientSecret);
  data.append("grant_type", "client_credentials");
  data.append("scope", "code:all data:write data:read bucket:create bucket:delete bucket:read");

  fetch(tokenURL, {
    "method": 'POST',
    "headers": {
      "content-type": "application/x-www-form-urlencoded",
    },
    "body": data
  })
  .then(res => {
    res.json().then(data => {
      accessToken = data.access_token;
      callback(data.access_token, data.expires_in);
    });
  });
}

//Add private functions
function initViewer() {
  let options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2',  // for models uploaded to EMEA change this option to 'derivativeV2_EU'
    getAccessToken: getForgeToken
  };

  Autodesk.Viewing.Initializer(options, function() {
    let htmlDiv = document.getElementById('BIMViewer');
    viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
    let startedCode = viewer.start();
    if (startedCode > 0) {
        console.error('Failed to create a Viewer: WebGL not supported.');
        return;
    }

    console.log("Adding model loaded event listeners...");
    //Listen for model completely loaded event
    viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, x => { 
      getProperties();
    })

    console.log('Initialization complete, loading a model next...');
    viewer.setLightPreset(2);
    viewer.setEnvMapBackground(false);
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  })
}

function onDocumentLoadSuccess(viewerDocument) {
  console.log('Model manifest document loaded successfully!')
  let defaultModel = viewerDocument.getRoot().getDefaultGeometry();
  viewer.loadDocumentNode(viewerDocument, defaultModel);
}

function onDocumentLoadFailure(errCode, errMsg) {
  console.error('Failed to load manifest [' + errCode + '] ' + errMsg);
}

function getProperties() {
  viewer.model.getPropertyDb().executeUserFunction(userFunction)
  .then(data => {
    if (!data) {
      console.log("Model doesn't contain property 'Fremdrift === 1'.");
      return;
    }

    props = data;
    //viewer.isolate(dbIds);
    viewer.fitToView(data[1]);
    startDashboard(data);
  })
  .catch(err => {
    console.log("Failed to get properties from model!")
    console.log(err);
  });
}


//Runs in worker thread not able to debug with Chrome
function userFunction(pdb) {
  console.log('Hit');
  let attrIdProgress = -1;
  pdb.enumAttributes((i, attrDef, attrRaw) => { //Find index for property 'Fremdrift'
    if (attrDef.name === 'Fremdrift') {
      attrIdProgress = i;
      return true; 
    }
  });

  if (attrIdProgress === -1) // No property found
    return null;

  let data = {};

  pdb.enumObjects(dbId => {
    pdb.enumObjectProperties(dbId, (attrId, valId) => {
      if (attrId === attrIdProgress) { // Only process 'Fremdrift' property.
        
        let value = pdb.getAttrValue(attrId, valId);
        if(data.hasOwnProperty(value)) {
          data[value].push(dbId); 
        } else {
          data[value] = [dbId];
        }
 
        return true;
      }
    });
  });

  return data;
}

async function loadBIMViewer() {
  initViewer();
};

function highlightPhase(){
  let range = document.querySelector('.range input');
  let ids = [];
  
  for (var i = 1; i <= range.value; i++) {
    ids = ids.concat(props[i])
  }

  //dbIds = props[range.value]; 
  //viewer.isolate(dbIds);
  viewer.isolate(ids);
  //viewer.fitToView(dbIds);
}

