#!/usr/bin/env node

const express = require("express");
const app = express();

const screenshotr = require("./screenshotr");
const pdfr = require("./pdfr");
const healthcheck = require("./healthcheck");

app.get('/probe', function( req, res ){
    res.send("<html><head></head><body>Probe OK</body></html>");
});

app.get('/healthcheck', healthcheck);

/**
 * HTTP Parameters :
 * url - url of the page to screenshot
 * vp_width - opt. set the viewport width in pixel (default: 1024px)
 * vp_height - opt. set the viewport height in pixel (default: 768px)
 * o_width - opt. set the width of the returned image (default: same as viewport width)
 * o_height - opt. set the height of the returned image (default: same as viewport height)
 * o_format - opt. set image format fot the output (png or jpg) (default: png)
 * dom_element_selector - opt. the CSS selector of the element you want to screenshot, if you don't want the entire body
 * fullpage - opt. parameter must be present if you want a fullpage screenshot (not only the visible viewport part)
 */
app.get("/screenshot", screenshotr);


/**
 * HTTP Parameters :
 * url - url of the page to convert
 * scale - opt. Scale of the webpage rendering. Defaults to 1. Scale amount must be between 0.1 and 2.
 * printBackground - opt. Print background graphics. Defaults to false.
 * landscape - Paper orientation. Defaults to false.
 * format - opt. Paper format. Defaults to 'A4'.
 * delay - opt. Wait some time (in milliseconds) before converting. Defaults to 0.
 * pageRanges - Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
 */
app.get("/pdf", pdfr);

app.listen(3000);
