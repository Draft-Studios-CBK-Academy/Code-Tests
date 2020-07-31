var fs = require('fs') //For interacting with the file system
var cheerio = require('cheerio') //For actually parsing through the code
var cssParser = require('./cssParser.js')//For parsing css code for errors

//Variable to store errors and to store the path of the files that are going to be tested
var htmlErrors = []
var fileErrors = []
var cssErrors = []
const cssPath = "styles.css"
const htmlPaths = ["about.html","index.html","learn.html","people.html","resources.html"]

//Testing procedures for html go in this for loop
htmlPaths.forEach(htmlPath => {
    //Check that each file exists
    if (!fs.existsSync(htmlPath)){
        fileErrors.push(htmlPath+ " does not exist\n")
    }
    //Loading cheerio and using it to check for relevant tags
    else{
        const $ = cheerio.load(fs.readFileSync(htmlPath), {
            ignoreWhitespace: true,
            xmlMode: true,
            _useHtmlParser2: true,
            withStartIndices: true,
            decodeEntities: true,
            recognizeSelfClosing: false,
        });
        var doctype = ($.root().html());
        doctype = doctype.toLowerCase()
        doctype = doctype.slice(0,15)
        if(doctype != "<!doctype html>"){
            htmlErrors.push(htmlPath+": Doctype not found\n")
        }
        if($("html").length <= 0){
            htmlErrors.push(htmlPath+": No html tag found\n")
        }
        if($("head").length <= 0){
            htmlErrors.push(htmlPath+": No head tag found\n")
        }
        if($("title").length <= 0){
            htmlErrors.push(htmlPath+": No title tag found\n")
        }
        if($("link").length <= 0){
            htmlErrors.push(htmlPath+": No link tag found\n")
        }
        if($("body").length <= 0){
            htmlErrors.push(htmlPath+": No body tag found\n")
        }    
        
    }
})

//Print errors if there are any
if(htmlErrors.length <= 0) {
    console.log("No Errors in html");
}
else{
    htmlErrors.forEach(error => process.stdout.write(error))
}
if(fileErrors.length > 0) {
    fileErrors.forEach(error => process.stdout.write(error))
}

/*Testing procedures for css go in this function
 * Note that each function call has an "await"
 * This is necessary to ensure the code actually
 * returns something and functions properly
*/
var cssParse = async () =>{
    //Search for errors
    /*
    cssErrors[0] = await cssParser.parse(cssPath, "p", "color: blue")
    cssErrors[1] = await cssParser.parse(cssPath, "h1", "color: blue")
    //Return relevant error messages, 'false' means an error was detect, 'true' means the code is good
    if(cssErrors[0] == false){
        process.stdout.write("There is an error in your css causing 'p' not to be blue")
    }
    if(cssErrors[1] == false){
        process.stdout.write("There is an error in your css causing 'h1' not to be blue")
    }
    */
}
cssParse()
