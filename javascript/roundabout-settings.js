const main = new Roundabout({
   id: ".projects-slider",
   parent: ".proj-slider",
   pagesToShow: 3,
   pageSpacing: 25,
   swipeThreshold: 150,
   pages: [
      {
         backgroundImage: "./images/carousel/projects/todo.png",
         // html: "simple to-do"
      },
      {
         backgroundImage: "./images/carousel/projects/roundabout.png",
         // html: "roundabout"
      },
      {
         backgroundImage: "./images/carousel/projects/react-chat.png",
         // html: "react chat"
      },
      {
         backgroundImage: "./images/carousel/projects/tgrad.png",
         // html: "triangle gradient"
      },
      {
         backgroundImage: "./images/carousel/projects/gamejam.png",
         // html: "stronger together"
      },
      {
         backgroundImage: "./images/carousel/projects/scorecard.png",
         // html: "golf scorecard"
      },
      {
         backgroundImage: "./images/carousel/projects/ry-paris.png",
         // html: "site clone 1"
      },
      {
         backgroundImage: "./images/carousel/projects/mihealth.png",
         // html: "site clone 2"
      },
      {
         backgroundImage: "./images/carousel/projects/bubbles.png",
         // html: "bubbles"
      },
      {
         backgroundImage: "./images/carousel/projects/stormcenter.png",
         // html: "storm center"
      },
      {
         backgroundImage: "./images/carousel/projects/scss-resume.png",
         // html: "resume scss"
      },
   ]
});

const desc = new Roundabout({
   type: "gallery",
   parent: ".proj-desc",
   id: ".projects-desc",
   uiEnabled: false,
   keys: false,
   pages: [
      {
         // backgroundImage: "./images/carousel/projects/todo.png",
         // html: "simple to-do"
      },
      {
         // backgroundImage: "./images/carousel/projects/roundabout.png",
         html: `
         <h3 class="desc-title">Roundabout</h3>
         <p class="desc-body">There's some text here!</p>
         <h4 class="desc-skills-title">Skills:</h4>
         <div class="desc-skills"></div>
         <div class="border-button">View -&gt;</div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/react-chat.png",
         // html: "react chat"
      },
      {
         // backgroundImage: "./images/carousel/projects/tgrad.png",
         // html: "triangle gradient"
      },
      {
         // backgroundImage: "./images/carousel/projects/gamejam.png",
         // html: "stronger together"
      },
      {
         // backgroundImage: "./images/carousel/projects/scorecard.png",
         // html: "golf scorecard"
      },
      {
         // backgroundImage: "./images/carousel/projects/ry-paris.png",
         // html: "site clone 1"
      },
      {
         // backgroundImage: "./images/carousel/projects/mihealth.png",
         // html: "site clone 2"
      },
      {
         // backgroundImage: "./images/carousel/projects/bubbles.png",
         // html: "bubbles"
      },
      {
         // backgroundImage: "./images/carousel/projects/stormcenter.png",
         // html: "storm center"
      },
      {
         // backgroundImage: "./images/carousel/projects/scss-resume.png",
         // html: "resume scss"
      },
   ]
});

const rs = new RoundaboutScripter();

rs.onScrollNext(main, () => {
   rs.scrollNext(desc);
});

rs.onScrollPrevious(main, () => {
   rs.scrollPrevious(desc);
});

rs.scrollNext(desc, 1, false);