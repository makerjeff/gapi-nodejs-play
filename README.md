#GAPI + NodeJS play
Working with Google APIs with Node JS <br>
Including Maps API <br>
Including [Twitter NodeJS module](https://www.npmjs.com/package/twitter)<br>
Added the use of environmental variables for storing access keys.<br>
[Adding CORS](http://enable-cors.org/server_expressjs.html) (cross origin resource sharing) to the TWITTER SPARTAN SERVER.<br>

### Based on these tutorials:
- [Node.JS Quick Start: Drive REST API](https://developers.google.com/drive/v3/web/quickstart/nodejs)
- [Google Maps Examples Jackpot](https://developers.google.com/maps/documentation/javascript/examples/)
- [Google Maps Tutorials](https://developers.google.com/maps/tutorials/)
- [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial)
- [Google Maps Markers](https://developers.google.com/maps/documentation/javascript/markers)
- [Google Maps Drawing Layer Library](https://developers.google.com/maps/documentation/javascript/drawinglayer)
- [Google Maps Info Windows - Simple](https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple)
- [Google Maps Info Windows](https://developers.google.com/maps/documentation/javascript/infowindows)
- [Setting up environmental variables](http://thewebivore.com/super-simple-environment-variables-node-js/)
- [Twitter GET API Reference](https://dev.twitter.com/rest/reference/get/search/tweets)
- [Canvas from Scratch-CodeTuts](http://code.tutsplus.com/series/canvas-from-scratch--net-19650)
- [Exploring Canvas Drawing Techniques](http://perfectionkills.com/exploring-canvas-drawing-techniques/)
- [Response.send() vs Response.json()](http://stackoverflow.com/questions/19041837/difference-between-res-send-and-res-json-in-express-js)
- [Express 4 Body Parser Limits] (http://stackoverflow.com/questions/25332561/node-js-express-large-body-for-bodyparser)
- [WebStorm Code region](https://www.jetbrains.com/webstorm/help/folding-and-expanding-code-blocks.html)
- [NodeJS File System](http://www.tutorialspoint.com/nodejs/nodejs_file_system.htm) **(NEW!)**
- [NodeJS Require Module](http://www.sitepoint.com/making-http-requests-in-node-js/) **(NEW!)**
- [Vimeo Javascript API] (https://css-tricks.com/play-button-youtube-and-vimeo-api/) **(NEW!)**

## Notes

**util.inspect( object );** - used for debugging large objects. returns object in a string representation.<br>
something else

## Workflow Notes
- Geolocation must be enabled during the tweet, and 'share precise location' must be enabled before the **'geo'** and 
**'coordinates'** keys get populated with their respective objects.<br>
- Canvas: explicitly set the *width* and *height* in the tag, as CSS will have scaling issues. Reason being is that 
the canvas tag is really just a container for something called the *2d rendering context*.<br>


## Specific Notes
###CANVAS:
- **context.fillRect(<x:float>, <y:float>, <width:float>, <height:float>);**
    - draw a default black filled square.
- **context.beginPath()** 
    - starts a path.
- **context.arc(centerX, centerY, radius, startAngle, endAngle, counterClockwise);** 
- **context.quadraticCurveTo(cpX, cpY, X, Y);**
- **context.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, x, y);
- **context.drawImage(<element:Image() object>, x, y, resizeWidth, resizeHeight);** 
    - use this inside a 'load' event listener to draw the image.
- **context.drawImage(<element:Image() object>, x, y, cropWidth, cropHeight, displayWidth, displayHeight);** 
    - use this inside a 'load' event listener to draw the image.


