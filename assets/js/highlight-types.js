(function() {
	var sections = document.body.getElementsByTagName("section");
	var nSect = sections.length;
	var actSectI = 0;
	var actSectName = sections[0]['id'];
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var transitions = [];
	var logoText = {};
	var types = [];

	if (document.getElementById("logo").getElementsByTagName("span").length == 0) {
		var logoTextElement = document.getElementById("logo").getElementsByTagName("text");
	}
	else {
		var logoTextElement = document.getElementById("logo").getElementsByTagName("span");
	}

	for (var i = 0; i < logoTextElement.length; i++) {
		logoText[logoTextElement[i].dataset.id] = logoTextElement[i];
		types.push(logoTextElement[i].dataset.id);
	}

	highlightLogo(document.getElementById("logo").getAttribute("class").split(" "));

	 // Expand first/last sections so they can be highlighted.
	if (document.getElementById("intro-page")) {
		if (sections[0].offsetHeight < windowHeight/3) {
			sections[0].style.height =  windowHeight/3 + 'px';
		}
		if (sections[nSect - 1].offsetHeight < windowHeight*(2/3)) {
			sections[nSect - 1].style.height = (windowHeight*(2/3)) + 'px';
		}

		activateSection(0);

		getDims();

		window.addEventListener('scroll', function(event) {
			var currSectI = actSectI;
			getDims();
			for (var i = 0; i < nSect; i++) {
				if (sections[i]['bound']['top'] < 0 && sections[i]['bound']['bottom'] > 0) {
					currSectI = i;
					break;
				}
			}

			if (currSectI != actSectI) {
				actSectI = currSectI;
				actSectName = sections[i]['id'];
				section = sections[actSectI];
				activateSection(actSectI);
				highlightLogo(section.dataset.type.split(/\s+/));
			}
		}, false);
	}

	function getDims() {
		for (var i = 0; i < sections.length; i++) {
			var bound = sections[i].getBoundingClientRect();
			sections[i]['bound'] = {'top': bound['top'] - windowHeight/3, 'bottom': bound['bottom'] - windowHeight/3};
		}
	}

	// Blur all then highlight active section.
	function activateSection(actSectI) {
		section = sections[actSectI];

		for (var i = 0; i < nSect; i++) {
			sections[i].style.opacity = .1;
		}

		setTimeout(function(){
			section.style.pointerEvents = 'all';
			section.style.transition = "all 0.5s";
			section.style.opacity = 1;
		}, 500);
	}

	// Blur all then highlight logo type(s).
	function highlightLogo(contTypes) {
		for (var i = 0; i < types.length; i++) {
			var typeText = logoText[types[i]];
			if (typeText) {
				typeText.style.pointerEvents = 'all';
				typeText.style.transition = 'all .5s';
				typeText.style.opacity = .2;
			}
		}

		setTimeout(function(){
			for (var i = 0; i < contTypes.length; i++) {
				if (contTypes[i]) {
					logoText[contTypes[i]].style.pointerEvents = 'all';
					logoText[contTypes[i]].style.transition = "all 1s";
					logoText[contTypes[i]].style.opacity = 1;
				}
			}
		}, 500);
	}

})();
