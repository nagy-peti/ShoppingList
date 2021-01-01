const express = require('express');
const app = express();
const path = require('path');

// HTTP -> HTTPS átirányítás, amennyiben szükséges:

const foreceSSL = function() {
	return function(req, res, next) {
		if (req.headers['x-forwarded-proto'] !== 'https') {
			return res.redirect(
				['https://', req.get('Host'), req.url].join('')
			);
		}
		next();
	}
}

// Statikus állományok elérésének definiálása:

app.use(express.static('Angular/static-ui/dist/static-ui'));

// PathLocationStrategy kezelése, azaz minden URI áritányítás index.html-re, ahol a továbbiakban az Angular Routing kezeli:

app.get('/*', function(req, res) {
	res.sendFile(path.join('Angular/static-ui/dist/static-ui/index.html'));
});

// Express figyeljen a 8080-as porton:

app.listen(process.env.PORT || 4200);