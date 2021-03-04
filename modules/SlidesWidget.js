define([
  "esri/widgets/Expand",
  "esri/views/SceneView",
  "esri/WebScene",
  "esri/webscene/Slide"
],
function(Expand, SceneView, WebScene, Slide) {

  function createSlides(view, scene) {
    let slidesDiv = document.getElementById('slidesDiv');

    let expand = new Expand({
      view: view,
      content: slidesDiv,
      collapseIconClass: 'icon-ui-collection',
      expandIconClass: 'icon-ui-collection'
    })

    view.ui.add(expand, 'top-right');
    
    let slides = scene.presentation.slides;

    slides.forEach(slide => {
      
      let slideElement = document.createElement("div");
      slideElement.id = slide.id;
      slideElement.classList.add("slide");

      let title = document.createElement("div");
      title.innerText = slide.title.text;
      slideElement.appendChild(title);

      let img = new Image();
      img.src = slide.thumbnail.url;
      img.title = slide.title.text;
      slideElement.appendChild(img);
  
      slidesDiv.appendChild(slideElement);
      
      slideElement.addEventListener("click", () => {
        var slides = document.querySelectorAll(".slide");
        Array.from(slides).forEach(node => {
          node.classList.remove("active");
        });

        slideElement.classList.add("active");
        slide.applyTo(view);
      });
    });

    slidesDiv.style.visibility = 'visible';
  }

  return {
    addWidget: (view, webscene) => {
      createSlides(view, webscene);
    }
  }
})