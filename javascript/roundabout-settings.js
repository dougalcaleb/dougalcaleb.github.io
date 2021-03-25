const main = new Roundabout({
   id: ".projects-slider",
   parent: ".proj-slider",
   pagesToShow: 3,
   pageSpacing: 25,
   swipeThreshold: 150,
   lazyLoad: "lazy-hidden",
   breakpoints: [
      {
         width: 500,
         swipeThreshold: 100,
         swipeSpeed: 500
      }
   ],
   interpolate: [
      {
         value: "height",
         between: [
            [0, 80],
            [1, 100],
         ],
         unit: "calc($% - 40px)",
      },
      { 
         value: "height",
         between: [
            [1, 100],
            [2, 80],
         ],
         unit: "calc($% - 40px)",
      },
      {
         value: "filter",
         between: [
            [0, 50],
            [1, 100],
         ],
         unit: "brightness($%)",
      },
      {
         value: "filter",
         between: [
            [1, 100],
            [2, 50],
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
         backgroundImage: "./images/carousel/projects/timesheet.png",
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
         backgroundImage: "./images/carousel/projects/bubbles.png",
         // html: "bubbles"
      },
      {
         backgroundImage: "./images/carousel/projects/ry-paris.png",
         // html: "site clone 1"
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

let exBtn = `<svg viewBox="0 0 24 24" class="desc-ext"><path fill="currentColor" d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" /></svg>`;

let skills = {
   angular: `<img src="./images/svgs/angular.svg" class="skill-badge" title="Angular" />`,
   aws: `<img src="./images/svgs/aws.svg" class="skill-badge" title="Amazon Web Services" />`,
   bootstrap: `<img src="./images/svgs/bootstrap.svg" class="skill-badge" title="Bootstrap" />`,
   collaboration: `<img src="./images/svgs/collaboration.svg" class="skill-badge size-up" title="Group Collaboration" />`,
   csharp: `<img src="./images/svgs/csharp.svg" class="skill-badge" title="C#" />`,
   css: `<img src="./images/svgs/css.svg" class="skill-badge" title="CSS3" />`,
   db: `<img src="./images/svgs/db.svg" class="skill-badge size-up" title="Database Technologies" />`,
   docker: `<img src="./images/svgs/docker.svg" class="skill-badge" title="Docker" />`,
   firebase: `<img src="./images/svgs/firebase.svg" class="skill-badge" title="Google Firebase" />`,
   git: `<img src="./images/svgs/git.svg" class="skill-badge" title="Git" />`,
   github: `<img src="./images/svgs/github.svg" class="skill-badge size-up" title="Github" />`,
   html: `<img src="./images/svgs/html.svg" class="skill-badge" title="HTML5" />`,
   js: `<img src="./images/svgs/js.svg" class="skill-badge" title="JavaScript" />`,
   node: `<img src="./images/svgs/node.svg" class="skill-badge" />`,
   pc: `<img src="./images/svgs/pc.svg" class="skill-badge" title="Computer Hardware" />`,
   react: `<img src="./images/svgs/react.svg" class="skill-badge" title="React.js" />`,
   ts: `<img src="./images/svgs/ts.svg" class="skill-badge" title="TypeScript" />`,
   unity: `<img src="./images/svgs/unity.svg" class="skill-badge" title="Unity Game Engine" />`,
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
            <p class="desc-body">Featuring note groups, persistent browser storage, and both text and checklist items, this to-do app is a simple way to keep track of things.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <a href="https://dougalcaleb.github.io/portfolio/todo-app" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/roundabout.png",
         html: `
         <div class="content-wrap">
         <h3 class="desc-title">Roundabout</h3>
         <p class="desc-body">An easy to use, extremely configurable, and responsive carousel plugin for websites.<br/>This carousel was made with Roundabout!</p>
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
            <p class="desc-body">Using React and Firebase, this simple chat app features login capabilities for identifying users, persistent and low-latency cloud storage, and seperate message channels.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.react + skills.js + skills.firebase + skills.db + skills.git + skills.github + skills.collaboration}</div>
            
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/react-chat.png",
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Angular Timesheet App</h3>
            <p class="desc-body">Built with Angular and a touch of Firebase, this app keeps track of work hours for multiple employees across multiple departments, and features analytics about pay at a glance.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.angular + skills.ts + skills.firebase + skills.db}</div>
            
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/tgrad.png",
         // html: "triangle gradient"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Low Poly Gradient Generator</h3>
            <p class="desc-body">An easy to use tool to whip up attractive loy-poly gradients, downloadable in PNG format. The background of the landing page on this site uses this!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <a href="https://dougalcaleb.github.io/portfolio/poly-gradient/" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/gamejam.png",
         // html: "stronger together"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">'Stronger Together' Game</h3>
            <p class="desc-body">Built over the course of a week for Brackeys Game Jam 2021.1 along with two friends, this game has a unique take on the wave fighting genre, where you must prevent an army of enemies from amassing enough allies to defeat you.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.csharp + skills.unity + skills.collaboration}</div>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/scorecard.png",
         // html: "golf scorecard"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Golf Scorecard</h3>
            <p class="desc-body">This app was built with mobile devices in mind, providing a dynamic scorecard for golf games with up to four players. It utilizes AJAX and a third-party API to grab nearby course data and display it to the user.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css + skills.git + skills.github}</div>
            <a href="https://dougalcaleb.github.io/portfolio/golf-card/" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/bubbles.png",
         // html: "bubbles"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Reactive Bubbles</h3>
            <p class="desc-body">Lots of fun to play with, this field of bubbles will react to your mouse movements as you swipe through it. This has been modified and used on the landing page of this site!</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css}</div>
            <a href="https://dougalcaleb.github.io/portfolio/bubbles/" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/ry-paris.png",
         // html: "site clone 1"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">Site Clone (RY Paris)</h3>
            <p class="desc-body">A simple clone of a website that helped me hone my skills on SCSS and CSS.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.html + skills.css}</div>
            <a href="https://dougalcaleb.github.io/portfolio/ry-paris/" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/stormcenter.png",
         // html: "storm center"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">WHS Storm Center</h3>
            <p class="desc-body">Built for Westlake High School, the products page shows off all of the merchandise available from the school's spirit store.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.js + skills.html + skills.css + skills.collaboration}</div>
            <a href="http://whsstormcenter.com/store.html" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
      {
         // backgroundImage: "./images/carousel/projects/scss-resume.png",
         // html: "resume scss"
         html: `
         <div class="content-wrap">
            <h3 class="desc-title">SCSS Resume Speedbuild</h3>
            <p class="desc-body">A simple speedbuild of an (irrelevant) resume to hone my SCSS skills.</p>
            <h4 class="desc-skills-title">Skills:</h4>
            <div class="desc-skills">${skills.html + skills.css}</div>
            <a href="https://dougalcaleb.github.io/portfolio/scss-resume/" target="_blank"><button class="border-button">View ${exBtn}</button></a>
         </div>
         `
      },
   ]
});

const rs = new RoundaboutScripter();

// rs.onScrollNext(main, () => {
//    rs.scrollNext(desc);
// });

// rs.onScrollPrevious(main, () => {
//    rs.scrollPrevious(desc);
// });

rs.onScroll(main, (dist) => {
   rs.scroll(desc, dist);
});

rs.scrollNext(desc, 1, false);