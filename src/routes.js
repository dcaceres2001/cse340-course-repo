import express from 'express';

import { showHomePage } from './controllers/index.js';
import { showProjectsPage, projectValidation } from './controllers/projects.js';
import { showCategoriesPage } from './controllers/categories.js';
import { showOrganizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, showEditOrganizationForm, processEditOrganizationForm, organizationValidation } from './controllers/organizations.js';
import { showTestError } from './controllers/errors.js';
import { showProjectDetailsPage, showNewProjectForm, processNewProjectForm } from './controllers/projects.js';
import { showCategoryDetailsPage, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { processNewOrganizationForm } from './controllers/organizations.js';
import { showAssignCategoriesForm, processAssignCategoriesForm } from './controllers/categories.js';
import { showEditProjectForm, processEditProjectForm } from './controllers/projects.js'
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsersPage } from './controllers/users.js';





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
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);

// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), processNewOrganizationForm);

// Route for editing an organization (GET request to show the edit form)
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);

// route to handle edit organization form submission (POST request)
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), showNewProjectForm);

// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

// Route for assigning categories to a project (GET request to show the form)
router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);

// Route to handle assigning categories to a project (POST request)
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);

// Route to handle edit project form
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);

router.post('/edit-project/:id', requireRole('admin'), processEditProjectForm);

// Route for new category page)

router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

// Route for editing a category (GET request to show the edit form)
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login and logout routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Protected users page route
router.get('/users', requireLogin, requireRole('admin'), showUsersPage);

export default router;