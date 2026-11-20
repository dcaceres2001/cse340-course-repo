import db from './db.js'

const getAllProjects = async () => {
  const query = `
    SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name AS organization_name
    FROM public.projects p
    JOIN public.organization o ON p.organization_id = o.organization_id;
  `;

  const result = await db.query(query);
  return result.rows;
};

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
    SELECT
      project_id,
      organization_id,
      title,
      description,
      location,
      date
    FROM public.projects
    WHERE organization_id = $1
    ORDER BY date;
  `;

  const result = await db.query(query, [organizationId]);
  return result.rows;
};

const getUpcomingProjects = async (numberOfProjects) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.projects p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.date >= CURRENT_DATE
    ORDER BY p.date ASC
    LIMIT $1;
  `;

  const result = await db.query(query, [numberOfProjects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      p.project_id,
      p.title,
      p.description,
      p.date,
      p.location,
      p.organization_id,
      o.name AS organization_name
    FROM public.projects p
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE p.project_id = $1;
  `;

  const result = await db.query(query, [id]);
  return result.rows[0]; // undefined if not found
};

const getProjectsByCategoryId = async (categoryId) => {
  const query = `
    SELECT p.project_id, p.organization_id, p.title, p.description, p.location, p.date, o.name AS organization_name
    FROM public.projects p
    JOIN public.project_categories pc ON p.project_id = pc.project_id
    JOIN public.organization o ON p.organization_id = o.organization_id
    WHERE pc.category_id = $1
    ORDER BY p.date;
  `;

const result = await db.query(query, [categoryId]);
  return result.rows;
}


const createProject = async (title, description, location, date, organizationId) => {
  const query = `
      INSERT INTO public.projects (title, description, location, date, organization_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING project_id
    `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to create project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Created new project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
}


const updateProject = async (projectId, title, description, location, date) => {
  const query = `
    UPDATE public.projects
    SET title = $2, description = $3, location = $4, date = $5
    WHERE project_id = $1
    RETURNING project_id
  `;

  
  const queryParams = [projectId, title, description, location, date];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
    throw new Error('Failed to update project');
  }

  if (process.env.ENABLE_SQL_LOGGING === 'true') {
    console.log('Updated project with ID:', result.rows[0].project_id);
  }

  return result.rows[0].project_id;
};



export {
  getAllProjects,
  getProjectsByOrganizationId,
  getUpcomingProjects,
  getProjectDetails,
  getProjectsByCategoryId, 
  createProject, 
  updateProject
};
  
  
