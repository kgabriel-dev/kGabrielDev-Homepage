"use strict";

const projectList = [];
let template;

createProjectList();

async function createProjectList() {
    await parseProjects();
    await readTemplate();
    buildProjects();
}

async function parseProjects() {
    const url = window.location.href + "/projects.json";

    await fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(project => {
                let title, description, technologies, website, github;

                if(project.title) title = project.title; else title = 'No title';
                if(project.description) description = project.description; else description = 'No description';
                if(project.technologies) technologies = project.technologies; else technologies = 'No technologies listed';
                if(project.website) website = project.website; else website = 'No link';
                if(project.github) github = project.github; else github = 'No link';

                projectList.push({ title, description, technologies, website, github });
            });
        });
}

async function readTemplate() {
    const url = window.location.href + '/homepage/templates/project.txt';

    await fetch(url)
        .then(response => response.text())
        .then(data => {
            template = data;
        });
}

function buildProjects() {
    projectList.forEach(project => {
        let projectHTML = template;

        if(project.title) projectHTML = projectHTML.replaceAll('{{title}}', project.title);
        if(project.description) projectHTML = projectHTML.replaceAll('{{description}}', project.description);
        if(project.technologies) 
            if(Array.isArray(project.technologies)) projectHTML = projectHTML.replaceAll('{{technologies}}', project.technologies.join(', '));
            else projectHTML = projectHTML.replaceAll('{{technologies}}', project.technologies);
        if(project.website) projectHTML = projectHTML.replaceAll('{{website}}', project.website);
        if(project.github) projectHTML = projectHTML.replaceAll('{{github}}', project.github);

        document.getElementById('directory').innerHTML += projectHTML;
    });
}