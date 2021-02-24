define([
  "esri/widgets/Slider"
],
function(Slider){
  return {
    add: () => {
      const slider = new Slider({
        container: "progress-slider",
        min: 1,
        max: 8,
        values: [ 2 ],
        snapOnClickEnabled: false,
        visibleElements: {
          labels: true,
          rangeLabels: true
        }
      });
    }
  }
})