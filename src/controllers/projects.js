import { getAllProjects } from '../models/projects.js';
import { getUpcomingProjects, getProjectDetails } from '../models/projects.js';
import {getCategoriesByProjectId} from '../models/categories.js';



const NUMBER_OF_UPCOMING_PROJECTS = 5;

const showProjectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res, next) => {
    const projectId = req.params.id;
    const project = await getProjectDetails(projectId);

    if (!project) {
        const err = new Error('Project not found');
        err.status = 404;
        return next(err);
    }

    const categories = await getCategoriesByProjectId(projectId);

    const title = project.title;
    res.render('project', { title, project, categories });
};



export { showProjectsPage, showProjectDetailsPage };