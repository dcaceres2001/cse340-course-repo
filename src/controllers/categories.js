import { getAllCategories, getCategoryDetails } from '../models/categories.js';
import { getProjectsByCategoryId } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getCategoriesByProjectId } from '../models/categories.js';




const showCategoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Service Categories';
    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res, next) => {
    const categoryId = req.params.id;
    const category = await getCategoryDetails(categoryId);

    if (!category) {
        const err = new Error('Category not found');
        err.status = 404;
        return next(err);
    }

    const projects = await getProjectsByCategoryId(categoryId);


    const title = category.name;
    res.render('category', { title, category, projects });
}

const showAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
}

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.id;
    const selectedCategoryIds = req.body.categories || [];

    const categoryIds = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIds);

    req.flash('success', 'Categories assigned successfully.');
    res.redirect(`/projects/${projectId}`);
}



export { showCategoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };

