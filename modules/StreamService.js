define([
  "esri/layers/StreamLayer",
  "esri/layers/support/LabelClass"
], function (
  StreamLayer,
  LabelClass
) {

  var verticalOffset = {
    screenLength: 100,
    maxWorldLength: 10,
    minWorldLength: 2
  };

  function getUniqueValueSymbol(name, color) {
    return {
      type: "point-3d", // autocasts as new PointSymbol3D()
      symbolLayers: [{
        type: "icon", // autocasts as new IconSymbol3DLayer()
        resource: {
          href: name
        },
        size: 40,
        outline: {
          color: "white",
          size: 8
        }
      }],

      verticalOffset: verticalOffset,

      // callout: {
      //   type: "line", // autocasts as new LineCallout3D()
      //   color: "white",
      //   size: 3,
      //   border: {
      //     color: color
      //   }
      // }
    };
  }

  var pointsRenderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    field: "Type",
    uniqueValueInfos: [{
      value: 1,
      symbol: getUniqueValueSymbol(
        "data:image/png;base64,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", "black")

    }]

  };

  //---------------------

  function get3DSymbolFor(name) {
    return {
      type: "point-3d",
      visualVariables: [{
        type: "rotation",
        // cars need to have a rotation field so that they are aligned to the street
        field: "Course"
      }], // autocasts as new PointSymbol3D()
      symbolLayers: [{
        type: "object",
        //width: 50000, // width of the symbol in meters
        //height: 20000,// autocasts as new ObjectSymbol3DLayer()
        anchor: "bottom",
        heading: 80,
        resource: {
          href: "https://demo09.geodata.no/geotek/symbol/" + name + ".glb"
        }
      }]
    };
  }

  const mineSymbolerForRendererMaskin = [{
    value: "Transport",
    name: "dumper02_0"
  }, {
    value: "gravemaskin01",
    name: "Gravemaskin_0"
  }, {
    value: "gravemaskin02",
    name: "Gravemaskin_0"
  }, {
    value: "gravemaskin03",
    name: "Gravemaskin_0"
   },  
  {
    value: "Heisekran",
    name: "kran1_0"
  },
  {
    value: "Dumper01",
    name: "dumper01_0"
  }, {
    value: "Inspeksjonsbil",
    name: "PickUp_0"
  },{
    value: "Vals01",
    name: "Valse_0"
  }];

  var defaultSymbolForRendererMaskin = get3DSymbolFor("dumper02_0");

  var rendererMaskin = {
    type: "unique-value",
    field: "event",
    defaultSymbol: defaultSymbolForRendererMaskin,
    uniqueValueInfos: mineSymbolerForRendererMaskin.map(s => {
      return {
        value: s.value,
        symbol: get3DSymbolFor(s.name)
      };
    }),
    visualVariables: [{
      type: "rotation",
      field: "Course"
    }]
  };

  var rendererMaskin2 = {
    type: "unique-value",
    field: "name",
    defaultSymbol: defaultSymbolForRendererMaskin,
    uniqueValueInfos: mineSymbolerForRendererMaskin.map(s => {
      return {
        value: s.value,
        symbol: get3DSymbolFor(s.name)
      };
    }),
    visualVariables: [{
      type: "rotation",
      field: "bearing"
    }]
  };

  var labelClass = new LabelClass({
    symbol: {
      type: "label-3d", // autocasts as new LabelSymbol3D()
      symbolLayers: [
        {
          type: "text", // autocasts as new TextSymbol3DLayer()
          material: {
            color: "white"
          },
          size: 10
        }
      ]
    },
    labelPlacement: "above-center",
    labelExpressionInfo: {
      expression: "Text('Fyllgrad:', $feature.Quantity,)"
    }
  });

  var maskinTracks = new StreamLayer({
    url: "https://demo09.geodata.no/arcgis/rest/services/e16-Stream/StreamServer",
    purgeOptions: {
      displayCount: 10000
    },
    //outFields: ["*"],

    renderer: rendererMaskin,
    elevationInfo: {
      // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
      mode: "relative-to-scene",
      offset: 1
    },
    //labelingInfo: [labelClass],
    maxReconnectionAttempts: 100,
    maxReconnectionInterval: 10
  });

  var maskinTracksFyllgrad = new StreamLayer({
    url: "https://demo09.geodata.no/arcgis/rest/services/e16-Stream/StreamServer",
    purgeOptions: {
      displayCount: 10000
    },
    //outFields: ["*"],

    renderer: pointsRenderer,
    elevationInfo: {
      // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
      mode: "relative-to-scene",
      offset: 1
    },
    labelingInfo: [labelClass],
    maxReconnectionAttempts: 100,
    maxReconnectionInterval: 10
  });

  var maskinTracks2 = new StreamLayer({
    url: "https://demo09.geodata.no/arcgis/rest/services/AMK_Simulator_Stream/StreamServer/",
    purgeOptions: {
      displayCount: 10000
    },
    //outFields: ["*"],

    renderer: rendererMaskin2,
    elevationInfo: {
      // elevation mode that will place points on top of the buildings or other SceneLayer 3D objects
      mode: "relative-to-ground",
      offset: 3
    },
    //labelingInfo: [labelClass],
    maxReconnectionAttempts: 100,
    maxReconnectionInterval: 10
  });

  return {
    addMachineTracks: (webscene) => {
      webscene.add(maskinTracks)
      webscene.add(maskinTracks2)
      webscene.add(maskinTracksFyllgrad)
    },
  }
});