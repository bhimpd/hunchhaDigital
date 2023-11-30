const pool = require("../db/postgresdb");  
  
exports.createTask = async (req, res) => {
    const { title, status } = req.body;
    if (!title || !status) {
        return res.status(400).json({ message: "Title and status are required fields." });
    }
    try {
      const result = await pool.query('INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *', [title, status]);
      return res.status(201).json({ message: "Task created successfully", task: result.rows[0] });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
};


exports.getAllTasks = async (req,res)=>{
    try {
        const result = await pool.query('SELECT * from tasks');
        return res.status(201).json({message :"All tasks...", tasks:result.rows})
    } catch (error) {
        return res.status(500).json({ message: "Server error" });

    }
}

exports.getSingleTask = async (req, res) => {
    const { id } = req.params;

    try {
        const query = await pool.query('SELECT * FROM tasks WHERE taskid = $1', [id]);

        if (!query.rows || query.rows.length === 0) {
            return res.status(404).json({ message: `Task with id ${id} not found. Enter a correct id.` });
        }

        const task = query.rows[0];
        return res.status(200).json({ message: `Task details for id ${id}.`, task });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;

    try {
        const query = await pool.query('SELECT * FROM tasks WHERE taskid = $1', [id]);

        if (!query.rows || query.rows.length === 0) {
            return res.status(404).json({ message: `Task with id ${id} not found. Enter a correct id.` });
        }

        if (!title || !status) {
            return res.status(400).json({ message: "Title and status are required fields." });
        }

        const result = await pool.query('UPDATE tasks SET title = $1, status = $2 WHERE taskid = $3 RETURNING *', [title, status, id]);

        return res.status(200).json({ message: `Task with id ${id} updated successfully.`, updatedTask: result.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


exports.deleteTask = async(req,res)=>{
    const {id}= req.params;
    try {
        const query = await pool.query('SELECT * from tasks where taskid =$1',[id]);
        if (!query.rows || query.rows.length === 0) {
            return res.status(404).json({ message: `Task with id ${id} not found. Enter a correct id.` });
        }
         await pool.query('DELETE from tasks where taskid=$1',[id])
        return res.status(200).json({ message: `Task with id ${id} deleted successfully..`});

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
}