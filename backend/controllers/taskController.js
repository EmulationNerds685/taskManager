import Task from "../models/Task.js";

// CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user
    });

    res.status(201).json({
      success: true,
      task
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET TASKS (pagination + search + filter)
export const getTasks = async (req, res) => {
  try {

    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, search } = req.query;

    const query = { user: req.user };

    if (status) query.status = status;
    if (search) query.title  = { $regex: search, $options: "i" };

    const tasks = await Task.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Task.countDocuments(query);

    res.status(200).json({
      success: true,
      page,
      total,
      tasks
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE TASK
export const updateTask = async (req, res) => {
  try {

    const task = await Task.findOne({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const { title, description, status } = req.body;

    task.title       = title       || task.title;
    task.description = description || task.description;
    task.status      = status      || task.status;

    await task.save();

    res.status(200).json({
      success: true,
      task
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE TASK
export const deleteTask = async (req, res) => {
  try {

    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user });

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task deleted"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};