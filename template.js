var fs = require('fs') //For interacting with the file system
var cheerio = require('cheerio') //For actually parsing through the code
var cssParser = require('./cssParser.js')//For parsing css code for errors

//Variable to store errors and to store the path of the files that are going to be tested
var htmlErrors = []
var cssErrors = []
const cssPath = "styles.css"
const htmlPath = "test.html"

//Testing procedures for html go in this for loop
if (!fs.existsSync(htmlPath)){
    htmlErrors.push(path + " does not exist")
}
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

    if($("body").length <= 0){
        htmlErrors.push(htmlPath+": No body tag found\n")
    }    
    
}

if(htmlErrors.length <= 0) {
    console.log("No Errors in html");
}
else{
    htmlErrors.forEach(error => process.stdout.write(error))
}

/*Testing procedures for css go in this function
 * Note that each function call has an "await"
 * This is necessary to ensure the code actually
 * returns something and functions properly
*/
var cssParse = async () =>{
    //Search for errors
    cssErrors[0] = await cssParser.parse(cssPath, "p", "color: blue")
    cssErrors[1] = await cssParser.parse(cssPath, "h1", "color: blue")
    //Return relevant error messages, 'false' means an error was detect, 'true' means the code is good
    if(cssErrors[0] == false){
        process.stdout.write("There is an error in your css causing 'p' not to be blue")
    }
    if(cssErrors[1] == false){
        process.stdout.write("There is an error in your css causing 'h1' not to be blue")
    }
}
cssParse()
