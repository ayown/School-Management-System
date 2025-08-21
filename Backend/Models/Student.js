class Student {
    constructor(id, firstName, lastName, email, phone, dateOfBirth, address, enrollmentDate) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.enrollmentDate = enrollmentDate;
    }
}

module.exports = Student;