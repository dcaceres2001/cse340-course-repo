import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showTestError } from './controllers/errors.js';
import { showOrganizationDetailsPage } from './controllers/organizations.js';
import { showProjectDetailsPage } from './controllers/projects.js';
import { showCategoryDetailsPage } from './controllers/categories.js';
import { showNewOrganizationForm } from './controllers/organizations.js';
import { processNewOrganizationForm } from './controllers/organizations.js';

const router = express.Router();

// Route for the home page

router.get('/', showHomePage);

// Route for the projects page
router.get('/projects', showProjectsPage);

// Route for the categories page
router.get('/categories', showCategoriesPage);

// Route for the organizations page
router.get('/organizations', showOrganizationsPage);

// Route for testing error handling
router.get('/test-error', showTestError);

// Route for the organization details page
router.get('/organization/:id', showOrganizationDetailsPage);

// Route for the project details page
router.get('/project/:id', showProjectDetailsPage);

// Route for the category details page
router.get('/category/:id', showCategoryDetailsPage);

// Route for new organization page
router.get('/new-organization', showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', processNewOrganizationForm);




export default router;