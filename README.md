        
# School Management System

A comprehensive web-based school management system built with a custom tech stack that provides functionality for managing students, teachers, courses, enrollments, grades, and attendance.

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework for Node.js
- **MySQL** - Relational database management system
- **mysql2** - MySQL client for Node.js with Promise support

### Frontend
- **Vanilla HTML** - Markup language for web pages
- **CSS** - Styling and layout
- **Vanilla JavaScript** - Client-side scripting (no framework)

### Additional Libraries & Tools
- **CORS** - Cross-Origin Resource Sharing middleware
- **dotenv** - Environment variable management
- **bcryptjs** - Password hashing library
- **jsonwebtoken** - JWT token implementation
- **nodemon** - Development tool for auto-restarting server

## 🔄 How This Differs from MERN Stack

| Component | MERN Stack | This Project |
|-----------|------------|-------------|
| **Frontend Framework** | React.js | Vanilla JavaScript |
| **Database** | MongoDB (NoSQL) | MySQL (SQL/Relational) |
| **Backend** | Express.js + Node.js | Express.js + Node.js |
| **State Management** | React State/Redux | DOM Manipulation |
| **Data Structure** | Document-based (JSON) | Table-based (Relational) |
| **Query Language** | MongoDB Query Language | SQL |
| **Component Architecture** | Component-based (JSX) | Traditional HTML/CSS/JS |

### Key Differences Explained:

#### 1. **Frontend Architecture**
- **MERN**: Uses React.js with component-based architecture, JSX, and virtual DOM
- **This Project**: Uses vanilla JavaScript with traditional DOM manipulation and event handling

#### 2. **Database Choice**
- **MERN**: MongoDB (NoSQL) - Document-oriented, flexible schema
- **This Project**: MySQL (SQL) - Relational database with structured schema, ACID compliance

#### 3. **Data Relationships**
- **MERN**: Typically uses embedded documents or references
- **This Project**: Uses foreign keys and JOIN operations for data relationships

#### 4. **Development Complexity**
- **MERN**: Higher learning curve, requires understanding of React concepts
- **This Project**: Lower barrier to entry, uses fundamental web technologies

#### 5. **Scalability Approach**
- **MERN**: Horizontal scaling with MongoDB, component reusability
- **This Project**: Vertical scaling with MySQL, traditional server-side architecture

## 📁 Project Structure

```
SchoolManagementSystem/
├── Backend/
│   ├── Controllers/          # API route handlers
│   │   ├── StudentsController.js
│   │   ├── TeachersController.js
│   │   ├── CoursesController.js
│   │   ├── EnrollmentsController.js
│   │   ├── GradesController.js
│   │   └── AttendanceController.js
│   ├── Models/              # Database models
│   │   ├── Student.js
│   │   ├── Teacher.js
│   │   └── Course.js
│   ├── config/
│   │   └── database.js      # MySQL connection configuration
│   ├── app.js              # Express server setup
│   ├── package.json        # Backend dependencies
│   └── database_schema.sql # Database schema
├── Frontend/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Styling
│   └── app.js              # Frontend JavaScript logic
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

### Backend Setup
1. Navigate to the Backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your database configuration:
   ```env
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=school_management
   PORT=3000
   ```

4. Set up the database:
   - Create a MySQL database
   - Run the SQL schema from `database_schema.sql`

5. Start the server:
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Open `index.html` in a web browser or serve it using a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

## 🌟 Features

- **Student Management**: Add, edit, delete, and search students
- **Teacher Management**: Manage teacher information and departments
- **Course Management**: Create and manage courses
- **Enrollment System**: Handle student course enrollments
- **Grade Management**: Record and track student grades
- **Attendance Tracking**: Monitor student attendance
- **RESTful API**: Clean API endpoints for all operations
- **Responsive Design**: Works on desktop and mobile devices

## 🎯 Why This Tech Stack?

### Advantages:
1. **Simplicity**: Easier to understand and maintain
2. **Performance**: Direct DOM manipulation can be faster for simple operations
3. **Learning**: Great for understanding fundamental web technologies
4. **Database Integrity**: MySQL ensures data consistency and relationships
5. **SQL Knowledge**: Valuable skill in enterprise environments

### Use Cases:
- Educational projects
- Small to medium-scale applications
- Projects requiring strict data relationships
- Teams familiar with SQL databases
- Applications with complex reporting requirements

## 📝 API Endpoints

- `GET/POST /api/students` - Student operations
- `GET/POST /api/teachers` - Teacher operations
- `GET/POST /api/courses` - Course operations
- `GET/POST /api/enrollments` - Enrollment operations
- `GET/POST /api/grades` - Grade operations
- `GET/POST /api/attendance` - Attendance operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Note**: While MERN stack offers modern development practices and scalability, this traditional approach provides excellent learning opportunities and is perfectly suitable for many real-world applications, especially in educational and enterprise environments where SQL databases are preferred.
        
