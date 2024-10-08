const app_Framework = require("express");
const file = app_Framework();
const server_PORT = 3000;
file.use(app_Framework.json());

file.listen(server_PORT, () => {
  console.log(`Server is running on http://localhost:${server_PORT}`);
});

let courses = [
  {
    id: 1,
    title: "JavaScript Basics",
    description: "Learn the basics of JavaScript",
    duration: "2 months",
  },
  {
    id: 2,
    title: "Node.js for Beginners",
    description: "Introduction to Node.js",
    duration: "6 months",
  },
];

file.get("/courses", (req, res) => {
  res.json(courses);
});

file.get("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const course = courses.find((c) => c.id === courseId);
  if (!course) {
    return res.status(404).json({
      message: "Course not found",
      details: "The course with the specified ID does not exist.",
    });
  }
  res.json(course);
});

file.post("/courses", (req, res) => {
  const { title, description, duration } = req.body;
  const newCourse = {
    id: courses.length + 1,
    title,
    description,
    duration,
  };
  courses.push(newCourse);
  res.status(201).json(newCourse);
});

file.put("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const { title, description, duration } = req.body;
  const courseIndex = courses.findIndex((c) => c.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).json({
      message: "Course not found",
      details: "The course you are trying to update does not exist.",
    });
  }

  courses[courseIndex] = { id: courseId, title, description, duration };
  res.json(courses[courseIndex]);
});

file.delete("/courses/:id", (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex((c) => c.id === courseId);

  if (courseIndex === -1) {
    return res.status(404).json({
      message: "Course not found",
      details: "The course you are trying to delete does not exist.",
    });
  }

  courses.splice(courseIndex, 1);
  res.status(204).send();
});
