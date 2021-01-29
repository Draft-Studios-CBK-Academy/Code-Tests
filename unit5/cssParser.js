//Reads input files line by line
const lineReader = require('line-reader')

//Used to edit the attribute strings to ensure matching formats
function escapeRegExp(stringToGoIntoTheRegex) {
    stringToGoIntoTheRegex = stringToGoIntoTheRegex.replace(/ /g,"")
    stringToGoIntoTheRegex = stringToGoIntoTheRegex.replace(/;/g,"")
    return stringToGoIntoTheRegex.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

//Regular expression used to edit strings to ensure matching formats
var cssOpen = new RegExp('([\\s\\S]*?){', 'gi');//([\\s\\S]*?)}', 'gi');

exports.parse = async (file, tag, attr) => {
    var tagSearched = escapeRegExp(tag + "{" );
    var tagFound = false;
    var attrSearched = escapeRegExp(attr);
    var promise = new Promise((resolve, reject) =>{
        lineReader.eachLine(file, (line, last) =>{
            if(line.includes('{')){
                if(escapeRegExp(line) === tagSearched){
                    tagFound = true;
                }
            }
            //If the tag is found and the attributes match return true
            if(tagFound === true){
                if(attrSearched == escapeRegExp(line)){
                    resolve(true)
                }
            }
            //If the tag is found and the attribute is not return false
            if(tagFound === true && line.includes('}')){
                reject(false)
            }
            //If the tag is not found return false
            if(last){
                reject(false)
            }
        })
    }).then(() => {
        cssValid = true
        return true
    }).catch(() => {
        return false
    })
    var result = await promise;
    return result
}
exports.exists = async (file, tag, attr) => {
    var tagSearched = escapeRegExp(tag + "{" );
    var tagFound = false;
    var attrSearched = escapeRegExp(attr);
    console.log(attrSearched)
    var promise = new Promise((resolve, reject) =>{
        lineReader.eachLine(file, (line, last) =>{
            if(line.includes('{')){
                if(escapeRegExp(line) === tagSearched){
                    tagFound = true;
                }
            }
            //If the tag is found and the attributes match return true
            if(tagFound === true){
                if(attrSearched == escapeRegExp(line)){
                    resolve(true)
                }
            }
            //If the tag is found and the attribute is not return false
            if(tagFound === true && line.includes('}')){
                reject(false)
            }
            //If the tag is not found return false
            if(last){
                reject(false)
            }
        })
    }).then(() => {
        cssValid = true
        return true
    }).catch(() => {
        return false
    })
    var result = await promise;
    console.log("hello")
    return result
}

/* Use Cases
 * The tag is correct and the attribute is correct
 * The tag is correct and the attribute is not
 * There is a correct attribute but not a tag
 * There is no tag
 * There is a tag but no attribute
 */
