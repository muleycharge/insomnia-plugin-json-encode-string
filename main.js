// For help writing plugins, visit the documentation to get started:
//   https://support.insomnia.rest/article/26-plugins
const fs = require('fs');


module.exports.templateTags = [{
    name: "encodeFileToField",
    displayName: "JSON Encode Text File",
    description: "Encode file contents for JSON field",
    args:[
        {
            displayName: "path",
            description: "Raw text input from a file",
            type: "file",
        }
    ],
    async run(context, path){
        console.log("encodeFileToField running for path:", path);
        try{
            if(typeof(path) !== "string" || path.trim().length === 0){
                return "";
            }
            if(!fs.existsSync(path)){
                return "FILE NOT FOUND";
            }
            let contents = fs.readFileSync(path, 'utf8');
            console.log("encodeFileToField read contents. length:", contents.length);
            return trim(JSON.stringify(contents), '"');
        }catch(e){
            console.log("encodeFileToField error", e);
        }
    }
}];


function trim(input, trimChar){
    let start = 0;
    let end = input.length;
    if(input.startsWith(trimChar)){
        start++;
    }
    if(input.endsWith(trimChar)){
        end--
    }

    return input.substring(start, end);
}