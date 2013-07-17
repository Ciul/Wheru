define(['directives/directives'], function(directives) {
		directives.directive('copyright', function() {
			return  {
				restrict:	'M',
				compile:	function(element) {
					element.text('Copyright 2013 DePanorama.');
					
					console.log(element);
					console.log(new Element(element));
					// console.log(element.text);
				}
			};
		});
	}
);