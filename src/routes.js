import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showProjectsPage } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showOrganizationsPage } from './controllers/organizations.js';
import { showTestError } from './controllers/errors.js';

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

export default router;