window.addEventListener("message", (event) => {
   if (event.source.location.pathname == "/roundabout/helper.html") {
      // console.log("rejecting message");
      return;
   }
   if (event.data) {
      if (event.data.sortOrder) {
         // console.log("Got a sortOrder overwrite");
         localStorage.setItem("sortOrder", event.data.sortOrder);
      }
      if (event.data.sameTab) {
         // console.log("Got a sameTab overwrite");
         localStorage.setItem("sameTab", event.data.sameTab);
      }
   }
   // console.log("Recieved message", event);
   if (!localStorage.getItem("sortOrder")) {
      localStorage.setItem("sortOrder", "c");
   }
   if (!localStorage.getItem("sameTab")) {
      localStorage.setItem("sameTab", JSON.stringify(true));
   }
   event.source.postMessage({
      sortOrder: localStorage.getItem("sortOrder"),
      sameTab: localStorage.getItem("sameTab")
   }, event.source.location.href);
   // console.log("sent response");
}, false);