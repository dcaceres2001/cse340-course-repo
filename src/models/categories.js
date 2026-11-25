import db from './db.js'

const getAllCategories = async () => {
  const query = `
        SELECT category_id, name
      FROM public.categories;
    `;

  const result = await db.query(query);

  return result.rows;
}

const getCategoryDetails = async (categoryId) => {
  const query = `
        SELECT category_id, name
      FROM public.categories
      WHERE category_id = $1;
    `;

  const result = await db.query(query, [categoryId]);

  return result.rows[0];
}

const getCategoriesByProjectId = async (projectId) => {
  const query = `
        SELECT c.category_id, c.name
        FROM public.categories c
        JOIN public.project_categories pc ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name;
    `;

  const result = await db.query(query, [projectId]);
  return result.rows;
};


const assignCategoryToProject = async (projectId, categoryId) => {
  const query = `
    INSERT INTO public.project_categories (project_id, category_id)
    VALUES ($1, $2);
  `;

  await db.query(query, [projectId, categoryId]);
};

const updateCategoryAssignments = async (projectId, categoryIds) => {

  // Delete all existing assignments for this project
  const deleteQuery = `
    DELETE FROM public.project_categories
    WHERE project_id = $1;
  `;
  await db.query(deleteQuery, [projectId]);

  // Insert the new assignments for this project
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(projectId, categoryId);
  }
};

const createCategory = async (name) => {
  const query = `
    INSERT INTO public.categories (name)
    VALUES ($1)
    RETURNING category_id
  `;

  const result = await db.query(query, [name]);

  if (result.rows.length === 0) {
    throw new Error('Failed to create category');
  }

  return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
  const query = `
    UPDATE public.categories
    SET name = $1
    WHERE category_id = $2
    RETURNING category_id
  `;

  const result = await db.query(query, [name, categoryId]);

  if (result.rows.length === 0) {
    throw new Error('Category not found');
  }

  return result.rows[0].category_id;
};

export { getAllCategories, getCategoryDetails, getCategoriesByProjectId, updateCategoryAssignments, createCategory, updateCategory };

