export interface SupervisorInterface {
    message: string;
    data:    Data;
}

export interface Data {
    phone:      string;
    department: Department;
    user:       User;
    id:         string;
}

export interface Department {
    id:   string;
    name: string;
}

export interface User {
    id:                 string;
    firstName:          string;
    lastName:           string;
    email:              string;
    hashedRefreshToken: null;
    userRole:           string;
    createdAt:          Date;
}
