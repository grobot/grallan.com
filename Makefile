run:
	make -j 3 _run

_run: start browserify

start:
	supervisor app.js

browserify:
	node ./bin/browserify.js
