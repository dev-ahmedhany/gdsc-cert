const path =require('path');
const {installFontsFromDir} = require('install-custom-font');

const installFonts = async () =>{
    const result = await installFontsFromDir(path.resolve("Fonts/"))
    console.log(result) // { result: "already_added", ... }
    console.log("done");
}

installFonts()
