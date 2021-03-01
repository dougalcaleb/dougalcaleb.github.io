let htmlcode = document.querySelectorAll(".html-codeblock");
let jscode = document.querySelectorAll(".js-codeblock");

//! NEXTHTML HAS AN HTML PARSE PROBLEM (PROPS)

jscode.forEach(block => {
   let lines = block.innerHTML.split("<br>");
   let finalBlock = "";

   lines.forEach(line => {
      let inProgress = line.trim();

      if (line.includes("//")) {
         inProgress = `<span class="code-comment">${inProgress}</span>`;
      } else {
         if (line.includes("new")) {
            inProgress = inProgress.replace(new RegExp("new Roundabout", "gi"), `<span class="code-blue-d">new</span><span class="code-tan"> Roundabout</span>`)
         }
         if (line.includes('"')) {
            inProgress = inProgress.replace(new RegExp(`"(.*)"`, "gmi"), `<span class="code-orange">"$1"</span>`);
         }
         if (line.includes("`")) {
            inProgress = inProgress.replace(new RegExp("`(.*)`", "gmi"), '<span class="code-orange">`$1`</span>');
         }
         if (line.includes(":")) {
            if (line.includes(`"`) || line.includes("`") || line.includes("[") || line.includes("{")) {
               inProgress = inProgress.replace(new RegExp("^\\s*(\\S*):", "gmi"), `<span class="code-blue-l">$1</span>:`);
            } else {
               inProgress = inProgress.replace(new RegExp("^\\s*(\\S*):([^,]*)(,?)", "gmi"), `<span class="code-blue-l">$1</span>:<span class="code-green">$2</span>$3`);
            }
         }
      }
      finalBlock += inProgress+"<br>"
   });
	block.innerHTML = finalBlock;
});

htmlcode.forEach(block => {

   let tagStarts = ["!", "/"];
   let lines = block.innerHTML.split("<br>");
   let finalBlock = "";

   lines.forEach(line => {
      let inProgress = line.trim(); 
      let startTag = "";
      let endTag = "";
      let props = "";
      let tag = "";
      let coloredProps = "";
      let singleTag = false;
      let emptyLine = false;

      if (line.includes("&lt;!--")) { // is a comment. No more colors.
         inProgress = `<span class="code-comment">${inProgress}</span>`;
      } else {
         // Grab element start and end tag
         let tags = inProgress.match(new RegExp("&lt;.+?&gt;", "gim"));
         if (tags == null || tags.length == 0) {
            emptyLine = true;
         } else if (tags.length == 1) {
            startTag = tags[0];
            endTag == null;
         } else if (tags.length == 2) {
            startTag = tags[0];
            endTag = tags[1];
         }

         // Check if element is single-line, single-tag
         let t = startTag.trim().split("");
         if (t[t.length - 5] == "/") {
            singleTag = true;
         }

         // Grab properties
         if (startTag.includes(" ") && singleTag) {
            props = startTag.substring(startTag.indexOf(" "), startTag.indexOf("/&gt;"));
         } else if (startTag.includes(" ") && !singleTag) {
            props = startTag.substring(startTag.indexOf(" "), startTag.indexOf("&gt;"));
         }

         // Grab tag name
         if (startTag && props != "") {
            tag = inProgress.substring(inProgress.indexOf("&lt;") + 4, inProgress.indexOf(" "));
         } else if (startTag && props == "") {
            tag = inProgress.substring(inProgress.indexOf("&lt;") + 4, inProgress.indexOf("&gt;"));
         }
         if (tagStarts.includes(tag.split("")[0])) {
            tag = tag.substring(1);
         }

         // Format brackets
         inProgress = inProgress.replaceAll(new RegExp("&lt;/?!?", "gi"), (match) => {
            if (match == "&lt;") {
               return `<span class="code-gray">&lt;</span>`;
            } else if (match == "&lt;/") {
               return `<span class="code-gray">&lt;/</span>`;
            } else if (match == "&lt;!") {
               return `<span class="code-gray">&lt;!</span>`;
            } else {
               console.warn("Problem match.", match);
            }
         });
         inProgress = inProgress.replaceAll(new RegExp("/?&gt;", "gi"), (match) => {
            if (match == "&gt;") {
               return `<span class="code-gray">&gt;</span>`;
            } else if (match == "/&gt;") {
               return `<span class="code-gray">/&gt;</span>`;
            } else {
               console.warn("Problem match.", match);
            }
         });

         // Format tag name
         if (startTag) {
            inProgress = inProgress.replace(`${tag}`, `<span class="code-blue-d">${tag}</span>`)
         }
         if (endTag) {
            inProgress = inProgress.replace(new RegExp(`&lt;/</span>${tag}<span class="code-gray">&gt;</span>$`, "gim"), `&lt;/</span><span class="code-blue-d">${tag}</span><span class="code-gray">&gt;</span>`)
         }

         // Format properties
         if (props) {
            let pairs = props.trim().split(" ");
            pairs.forEach(pair => {
               let parts = pair.split("=");
               if (parts.length == 2) {
                  coloredProps += ` <span class="code-blue-l">${parts[0]}</span>=<span class="code-orange">${parts[1]}</span>`;
               } else {
                  coloredProps += ` <span class="code-blue-l">${parts[0]}</span>`;
               }
            });
         }
         inProgress = inProgress.replace(props, coloredProps);


         // console.log("Start tag:", startTag);
         // console.log("End tag:", endTag);
         // console.log("Tag:", tag);
         // console.log("Props:",props);
         // console.log("Colored props:",coloredProps);
         // console.log("----------");
      }
      finalBlock += inProgress+"<br>"
   });
	block.innerHTML = finalBlock;
});