export interface InternInterface {
    message: string;
    data:    Data;
}

export interface Data {
    id:                   string;
    internCode:           string;
    bloodType:            string;
    phone:                string;
    address:              string;
    schoolEnrollment:     string;
    internshipStart:      Date;
    internshipEnd:        Date;
    status:               string;
    career:               Career;
    department:           null;
    internshipDepartment: Career;
    institution:          Institution;
    property:             Career;
    user:                 User;
}

export interface Career {
    id:   string;
    name: string;
}

export interface Institution {
    id:    string;
    name:  string;
    phone: string;
}

export interface User {
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    userRole:  string;
    createdAt: Date;
    isActive:  boolean;
}
