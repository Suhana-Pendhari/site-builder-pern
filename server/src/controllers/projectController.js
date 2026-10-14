import pool from '../db/config.js';

export async function createProject(req, res) {
  const client = await pool.connect();
  
  try {
    const { name, prompt, html, css, javascript } = req.body;

    if (!name || !prompt) {
      return res.status(400).json({ error: 'Name and prompt are required' });
    }

    const result = await client.query(
      `INSERT INTO projects (name, original_prompt, html, css, javascript)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, original_prompt, created_at, updated_at`,
      [name, prompt, html || null, css || null, javascript || null]
    );

    res.status(201).json({
      success: true,
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Failed to create project' });
  } finally {
    client.release();
  }
}

export async function getProjects(req, res) {
  const client = await pool.connect();
  
  try {
    const result = await client.query(
      `SELECT id, name, original_prompt, created_at, updated_at
       FROM projects
       ORDER BY updated_at DESC`
    );

    res.json({
      success: true,
      projects: result.rows
    });
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  } finally {
    client.release();
  }
}

export async function getProject(req, res) {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const result = await client.query(
      `SELECT * FROM projects WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  } finally {
    client.release();
  }
}

export async function updateProject(req, res) {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;
    const { name, html, css, javascript } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const result = await client.query(
      `UPDATE projects
       SET name = COALESCE($1, name),
           html = COALESCE($2, html),
           css = COALESCE($3, css),
           javascript = COALESCE($4, javascript),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $5
       RETURNING id, name, original_prompt, created_at, updated_at`,
      [name, html, css, javascript, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      project: result.rows[0]
    });
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Failed to update project' });
  } finally {
    client.release();
  }
}

export async function deleteProject(req, res) {
  const client = await pool.connect();
  
  try {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid project ID' });
    }

    const result = await client.query(
      `DELETE FROM projects WHERE id = $1 RETURNING id`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  } finally {
    client.release();
  }
}
