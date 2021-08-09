let htmlcode = document.querySelectorAll(".html-codeblock");
let jscode = document.querySelectorAll(".js-codeblock");
let csscode = document.querySelectorAll(".css-codeblock");

/*
Using this plugin:
- Codeblocks must be in seperate elements
- Each line ends with a <br/> element
- Contain the following classes:
   - Either "js-codeblock", "html-codeblock" or "css-codeblock"
   - If collapsable, "code-collapse"
   - If collapsable, "start-collapsed" or "start-expanded"

CSS reference is stored in syntax.css
*/

jscode.forEach((block) => {
	let lines = block.innerHTML.split("<br>");
	let finalBlock = "";
	let variables = ["document", "window"];
	let objects = ["Math"];

	lines.forEach((line) => {
		let inProgress = line.trim();

		if (line.includes("//")) {
			inProgress = `<span class="code-comment">${inProgress}</span>`;
		} else {
			if (line.includes("new Roundabout")) {
				inProgress = inProgress.replace(
					new RegExp("new\\sRoundabout([^\\(]*)", "gi"),
					`<span class="code-blue-d">new</span><span class="code-tan"> Roundabout$1</span>`
				);
			}
			if (line.includes('"')) {
				inProgress = inProgress.replace(new RegExp(`"(.*)"`, "gmi"), `<span class="code-orange">"$1"</span>`);
			}
			if (line.includes("const")) {
				let matches = inProgress.match(new RegExp("const\\s(\\S*)", "gi"));
				if (matches) {
					matches.forEach((match) => {
						variables.push(match.split(" ")[1]);
					});
				}
				inProgress = inProgress.replace(
					new RegExp("const\\s(\\S*)", "gi"),
					`<span class="code-blue-d">const</span><span class="code-blue-l"> $1</span>`
				);
			}
			if (line.includes("let")) {
				let matches = inProgress.match(new RegExp("let\\s(\\S*)", "gi"));
				if (matches) {
					matches.forEach((match) => {
						variables.push(match.split(" ")[1]);
					});
				}
				inProgress = inProgress.replace(
					new RegExp("let\\s(\\S*)", "gi"),
					`<span class="code-blue-d">let</span><span class="code-blue-l"> $1</span>`
				);
			}
			if (line.includes("RS")) {
				inProgress = inProgress.replace(new RegExp("RS", "g"), `<span class="code-blue-l">RS</span>`);
			}
			if (line.includes("(") && !line.includes('"(') && !line.includes(')"')) {
				inProgress = inProgress.replaceAll(new RegExp("(\\w*)\\(", "gmi"), `<span class="code-tan">$1</span>(`);
				let matches = inProgress.match(new RegExp("\\((\\w*)\\)", "gmi"));
				if (matches) {
					matches.forEach((match) => {
						variables.push(match.substring(1, match.length - 1));
					});
				}
			}
			if (line.includes("if")) {
				inProgress = inProgress.replace("if", `<span class="code-purple">if</span>`);
			}
			if (line.includes("`")) {
				inProgress = inProgress.replace(new RegExp("`(.*)`", "gmi"), '<span class="code-orange">`$1`</span>');
			}
			if (line.includes(":")) {
				if (line.includes(`"`) || line.includes("`") || line.includes("[") || line.includes("{")) {
					inProgress = inProgress.replace(new RegExp("^\\s*(\\S*):", "gmi"), `<span class="code-blue-l">$1</span>:`);
				} else {
					inProgress = inProgress.replace(
						new RegExp("^\\s*(\\S*):([^,]*)(,?)", "gmi"),
						`<span class="code-blue-l">$1</span>:<span class="code-green">$2</span>$3`
					);
				}
			}
			variables.forEach((v) => {
				if (v != "") {
					let matches = inProgress.match(new RegExp(`${v}\\.([^\\.\\s<>;\\[\\]]*)`, "gmi"));
					// console.log(matches);
					if (matches) {
                  matches.forEach((match) => {
                     if (!variables.includes(match.split(".")[1])) {
                        variables.push(match.split(".")[1]);
                     }
						});
					}
				}
         });
         // console.log(variables);
         variables.forEach((v) => {
            // console.log("checking", v);
				if (v != "") {
					if (line.includes(v)) {
						inProgress = inProgress.replaceAll(new RegExp(v, "gm"), `<span class="code-blue-l">${v}</span>`);
					}
				}
			});
			objects.forEach((o) => {
				if (o != "") {
					if (line.includes(o)) {
						inProgress = inProgress.replaceAll(new RegExp(o, "gm"), `<span class="code-green">${o}</span>`);
					}
				}
			});
		}
		finalBlock += inProgress + "<br>";
	});
	block.innerHTML = finalBlock;
});

htmlcode.forEach((block) => {
	let tagStarts = ["!", "/"];
	let lines = block.innerHTML.split("<br>");
	let finalBlock = "";

	lines.forEach((line) => {
		let inProgress = line.trim();
		let startTag = "";
		let endTag = "";
		let props = "";
		let tag = "";
		let coloredProps = "";
		let singleTag = false;
		let emptyLine = false;

		if (line.includes("&lt;!--")) {
			// is a comment. No more colors.
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
				inProgress = inProgress.replace(`${tag}`, `<span class="code-blue-d">${tag}</span>`);
			}
			if (endTag) {
				inProgress = inProgress.replace(
					new RegExp(`&lt;/</span>${tag}<span class="code-gray">&gt;</span>$`, "gim"),
					`&lt;/</span><span class="code-blue-d">${tag}</span><span class="code-gray">&gt;</span>`
				);
			}

			// Format properties
			if (props) {
				let pairs = props.trim().split(" ");
				let joins = [];
				let matching = false;
				let joinedParts = [];
				let firstMatch = true;
				// check to see if there are strings with spaces that have been split, then rejoin them appropriately
				pairs.forEach((piece) => {
					let re = new RegExp('"', "gi");
					if (piece.match(re) && piece.match(re).length == 1 && firstMatch) {
						matching = true;
						firstMatch = false;
					} else if (piece.match(re) && piece.match(re).length == 1 && !firstMatch) {
						matching = false;
						firstMatch = true;
					}
					joinedParts.push(piece);
					if (!matching) {
						joins.push(joinedParts);
						joinedParts = [];
					}
				});
				for (let a = 0; a < joins.length; a++) {
					joins[a] = joins[a].join(" ");
				}
				// color the properties and their values
				joins.forEach((pair) => {
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
		finalBlock += inProgress + "<br>";
	});
	block.innerHTML = finalBlock;
});

csscode.forEach((block) => {
	let lines = block.innerHTML.split("<br>");
	let finalBlock = "";
	let nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

	lines.forEach((line) => {
		let inProgress = line.trim();

		if (inProgress.includes("//")) {
			inProgress = `<span class="code-comment">${inProgress}</span>`;
		} else {
			if (inProgress.split("")[0] == "." || inProgress.split("")[0] == "#") {
				inProgress = `<span class="code-tan"> ${inProgress} </span>`;
			}
			if (line.includes("{")) {
				inProgress = inProgress.replace("{", `<span class="code-white">{</span>`);
			}
			if (line.includes(",")) {
				inProgress = inProgress.replace(",", `<span class="code-white">,</span>`);
			}
			if (inProgress.replaceAll("&nbsp;", "").includes(";")) {
				inProgress = inProgress
					.replaceAll("&nbsp;", "REPLACE_SPACE")
					.replace(";", `<span class="code-white">;</span>`)
					.replaceAll("REPLACE_SPACE", "&nbsp;");
			}
			if (line.includes(":")) {
				let parts = inProgress.split(": ");
				parts[0] = `<span class="code-blue-l">${parts[0]}</span>`;
				if (nums.includes(parts[1].split("")[0])) {
					parts[1] = `<span class="code-green">${parts[1]}</span>`;
				} else {
					parts[1] = `<span class="code-orange">${parts[1]}</span>`;
				}

				inProgress = parts.join(": ");
			}
		}

		finalBlock += inProgress + "<br/>";
	});
	block.innerHTML = finalBlock;
});

document.querySelectorAll(".code-collapse").forEach((element) => {
	let type = element.classList.contains("start-collapsed") ? "Collapse" : "Expand";
	let lang;
	if (element.classList.contains("js-codeblock")) lang = "Javascript";
	if (element.classList.contains("html-codeblock")) lang = "HTML";
	if (element.classList.contains("css-codeblock")) lang = "CSS";
	let c = document.createElement("div");
	let svg_c = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>`;
	let svg_o = `<svg viewBox="0 0 24 24"><path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>`;
	c.innerHTML = (type == "Collapse" ? "Expand" : "Collapse") + " " + lang + " code block" + (type == "Collapse" ? svg_c : svg_o);
	element.prepend(c);
	if (type == "Collapse") {
		element.style.height = "0px";
		element.style.paddingBottom = "0px";
	}
	element.children[0].addEventListener("click", () => {
		if (element.style.height == "") {
			element.style.height = "0px";
			element.style.paddingBottom = "0px";
			element.children[0].innerHTML = `Expand ${lang} code block ${svg_c}`;
		} else if (element.style.height == "0px") {
			element.style.height = "";
			element.style.paddingBottom = "15px";
			element.children[0].innerHTML = `Collapse ${lang} code block ${svg_o}`;
		}
	});
});
