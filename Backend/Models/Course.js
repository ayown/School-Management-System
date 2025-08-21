class Course {
    constructor(id, courseName, courseCode, description, credits, teacherId) {
        this.id = id;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.description = description;
        this.credits = credits;
        this.teacherId = teacherId;
    }
}

module.exports = Course;