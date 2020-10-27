const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateMarkdown = require("./utils/generateMarkdown");


const questions = {
    main: [{
        type: "input",
        name: "github",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "project",
        message: "What does your app do?"
    }, {
        type: "input",
        name: "problems",
        message: "To whom and how should a user report any issues?"
    },
    {
        type: "list",
        name: "license",
        message: "What license are you using to license this repo?",
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "none"]
    }],
    continue: {
        type: "list",
        choices: [{ name: "yes", value: true }, { name: "no", value: false }],
        message: "Continue?",
        name: "next"
    },
    multipleResponse: (message) => ({
        type: "input",
        message,
        name: "response"
    })
}

async function init() {
    try {
        const main = await inquirer.prompt(questions.main);

        console.log("Please enter installation steps!")
        const instructions = await inquireMult("Step");

        console.log("How do you use the program?")
        const usage = await inquireMult("Usage");

        const data = { ...main, instructions, usage };

        const html = generateMarkdown(data);

        writeToFile("output/README.md", html);

    } catch (error) {
        console.log(error)
    }
}

function inquireMult(type) {
    return new Promise(async (resolve, reject) => {
        try {
            const myArr = [];
            let count = 1;
            let resume = true;

            do {
                const { response } = await inquirer.prompt(questions.multipleResponse(type + " " + count + ":"));
                myArr.push(count + ". " + response);

                const { next } = await inquirer.prompt(questions.continue);
                resume = next;
                count++;
            } while (resume);

            resolve(myArr);
        } catch (error) {
            reject(error);
        }
    })
}


function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data)
}


/* function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            console.log("creating README");
            writeToFile("output/README.md", generateMarkdown({ ...answers }))
        })
} */

// function call to initialize program
init();
