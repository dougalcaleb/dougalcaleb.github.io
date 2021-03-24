const main = new Roundabout({
   id: ".projects-slider",
   parent: ".proj-slider",
   pagesToShow: 3,
   pageSpacing: 25,
   swipeThreshold: 150,
   lazyLoad: "hidden",
   interpolate: [
      {
         value: "height",
         between: [
            [0, 80],
            [1, 100]
         ],
         unit: "calc($% - 40px)",
      },
      {
         value: "height",
         between: [
            [1, 100],
            [2, 80]
         ],
         unit: "calc($% - 40px)",
      },
      {
         value: "filter",
         between: [
            [0, 50],
            [1, 100]
         ],
         unit: "brightness($%)",
      },
      {
         value: "filter",
         between: [
            [1, 100],
            [2, 50]
         ],
         unit: "brightness($%)",
      }
   ],
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

let exBtn = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>`;

let skills = {
   angular: `<img src="./images/svgs/angular.svg" class="skill-badge" />`,
   aws: `<img src="./images/svgs/aws.svg" class="skill-badge" />`,
   bootstrap: `<img src="./images/svgs/bootstrap.svg" class="skill-badge" />`,
   csharp: `<img src="./images/svgs/csharp.svg" class="skill-badge" />`,
   css: `<img src="./images/svgs/css.svg" class="skill-badge" />`,
   db: `<img src="./images/svgs/db.svg" class="skill-badge" />`,
   docker: `<img src="./images/svgs/docker.svg" class="skill-badge" />`,
   firebase: `<img src="./images/svgs/firebase.svg" class="skill-badge" />`,
   git: `<img src="./images/svgs/git.svg" class="skill-badge" />`,
   github: `<img src="./images/svgs/github.svg" class="skill-badge size-up" />`,
   html: `<img src="./images/svgs/html.svg" class="skill-badge" />`,
   js: `<img src="./images/svgs/js.svg" class="skill-badge" />`,
   node: `<img src="./images/svgs/node.svg" class="skill-badge" />`,
   pc: `<img src="./images/svgs/pc.svg" class="skill-badge" />`,
   react: `<img src="./images/svgs/react.svg" class="skill-badge" />`,
   ts: `<img src="./images/svgs/ts.svg" class="skill-badge" />`,
   unity: `<img src="./images/svgs/unity.svg" class="skill-badge" />`,
}

const desc = new Roundabout({
   type: "gallery",
   parent: ".proj-desc",
   id: ".projects-desc",
   uiEnabled: false,
   keys: false,
   transition: 200,
   pages: [
      {
         // backgroundImage: "./images/carousel/projects/todo.png",
         // html: "simple to-do"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Simple To-Do App</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/roundabout.png",
         html: `
         <div class="content-wrap">
         <h3 class="desc-title">Roundabout</h3>
         <p class="desc-body">There's some text here!</p>
         <h4 class="desc-skills-title">Skills:</h4>
         <div class="desc-skills">${skills.js + skills.html + skills.css + skills.git + skills.github}</div>
         <a href="https://github.com/dougalcaleb/roundabout" target="_blank"><button class="border-button">Repo ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/react-chat.png",
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">React Chat App</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.react + skills.js + skills.firebase + skills.git}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/tgrad.png",
         // html: "triangle gradient"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Low Poly Gradient Generator</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/gamejam.png",
         // html: "stronger together"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Stronger Together Game</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.csharp + skills.unity}</div>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/scorecard.png",
         // html: "golf scorecard"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Golf Scorecard</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css + skills.git + skills.github}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/ry-paris.png",
         // html: "site clone 1"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Site Clone (RY Paris)</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/mihealth.png",
         // html: "site clone 2"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Site Clone (MiHealth)</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/bubbles.png",
         // html: "bubbles"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Reactive Bubbles</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/stormcenter.png",
         // html: "storm center"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">WHS Storm Center</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/scss-resume.png",
         // html: "resume scss"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">SCSS Resume Speedbuild</h3>
            <p class="desc-body">There's some text here!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.html + skills.css}</div>
            <button class="border-button">View ${exBtn}</button>
         </div>
         `
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