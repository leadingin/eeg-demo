const path = require('path');

module.exports = {
    PATHS: {
        appFile:    path.join(__dirname, 'src', 'app', 'app.js'),
        sassFile:   path.join(__dirname, 'src', 'sass', 'base.scss'),
        srcFolder:  path.join(__dirname, 'src'),
        appFolder:  path.join(__dirname, 'src', 'app'),
        sassFolder: path.join(__dirname, 'src', 'sass'),
        outputJS:   path.join(__dirname, 'static', 'js'),
        outputCSS:  path.join(__dirname, 'static', 'css'),
    }
}
