const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());

let port = 3004;

app.get("/", (req,res) => {
    res.send("Server is running");
});

app.post("/submit", async (req, res) => {
    try {
        const newStudent = new Student(req.body);
        await newStudent.save();

        console.log("Saved:", req.body);

        res.send("Data saved to database");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving data");
    }
});

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
    name: String,
    degree: String,
    department: String,
    year: String,
    enrollment: String,
    mobile: String
});

const Student = mongoose.model("Student", studentSchema);


app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).send("Error fetching data");
    }
});

app.delete("/student/:id", async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.send("Deleted successfully ✅");
    } catch (err) {
        res.status(500).send("Error deleting data");
    }
});

app.listen(port, () => {
    console.log(`app listing on port ${port}`);
});