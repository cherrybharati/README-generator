// function to generate markdown for README

function renderLicenseBadge(license) {
  if (license !== "none") {
    return `[GitHub license](https://img.shields.io/badge/license-${license}-blue.svg)`;
  }
  else {
    console.log("No license selected")
  }
}

function renderLicenseLink(license) {
  if(license !== "none"){
    return '\n [license](#license)\n'
  }
}
function renderLicenseSection(license) {

}
const fs = require('fs')
const path = require('path')
const TEMP_PATH = path.join(__dirname, 'template.md')

function generateMarkdown(data) {
  let template = fs.readFileSync(TEMP_PATH, 'utf8');

  for (const key in data) {

    if (!Array.isArray(data[key])) {
      // const regex = new RegExp("{{" + key + "}}", "g");
      template = template.replace("{{" + key + "}}", data[key]);
      continue;
    }   
    
    const parsed = data[key].join("\n");
    template = template.replace("{{" + key + "}}", parsed);
  }

  return template;
}

 
// function _generateMarkdown(data) {
//   return `# ${data.project.trim()}

//   [github](https://github.com/${data.github.trim()})

//   ${data.instructions.map(x => x.trim()).join('\n')}
//   ${data.usage.map(x => x.trim()).join('\n')}

//   ${data.problems.trim()}
//   ${data.license.trim()}
// `;
// }

module.exports = generateMarkdown;
