(function() {
	var sections = document.body.getElementsByTagName("section");
	var nSect = sections.length;
	var actSectI = 0;
	var actSectName = sections[0]['id'];
	var windowWidth = window.innerWidth;
	var windowHeight = window.innerHeight;
	var transitions = [];
	var logoTextElement = document.getElementById("logo").getElementsByTagName("text");
	var logoText = {};
	var types = [];
	
	for (var i = 0; i < logoTextElement.length; i++) {
		logoText[logoTextElement[i].dataset.id] = logoTextElement[i];
		types.push(logoTextElement[i].dataset.id);
	}

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
			activateSection(actSectI);
		}
	}, false);

	function getDims() {
		for (var i = 0; i < sections.length; i++) {
			var bound = sections[i].getBoundingClientRect();
			sections[i]['bound'] = {'top': bound['top'] - windowHeight/3, 'bottom': bound['bottom'] - windowHeight/3};
		}
	}

	function activateSection(actSectI) {
		section = sections[actSectI];

		// Blur all then highlight active section.
		for (var i = 0; i < nSect; i++) {
			sections[i].style.opacity = .1;
		}
		section.style.pointerEvents = 'all';
		section.style.transition = "all 0.5s";
		section.style.opacity = 1;

		// Blur all then highlight logo type(s).
		for (var i = 0; i < types.length; i++) {
			var typeText = logoText[types[i]];
			typeText.style.pointerEvents = 'all';
			typeText.style.transition = 'all .5s';
			typeText.style.opacity = .4;
		}
		setTimeout(function(){
			var contType = section.dataset.type.split(/\s+/);
			for (var i = 0; i < contType.length; i++) {
				logoText[contType[i]].style.pointerEvents = 'all';
				logoText[contType[i]].style.transition = "all 1s";
				logoText[contType[i]].style.opacity = 1;
			}
		}, 500);
	}

})();
