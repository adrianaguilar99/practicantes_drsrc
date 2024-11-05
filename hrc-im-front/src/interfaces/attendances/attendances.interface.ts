export interface AttendancesInterface {
    message: string;
    data:    DataAttendance[];
    records: number;
}

export interface DataAttendance {
    id:                 string;
    attendanceDate:     Date;
    entryTime:          string;
    exitTime:           string;
    attendanceStatuses: string;
    isLate:             boolean;
    worked_hours:       string;
    intern:             Intern;
}

export interface Intern {
    id:                   string;
    externalInternCode:   null | string;
    internalInternCode:   null | string;
    internshipDepartment: InternshipDepartment;
    user:                 User;
}

export interface InternshipDepartment {
    id:        string;
    name:      string;
    createdAt: Date;
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


export interface PostAttendance {
    internCode: string;
  }

export interface PostAttendanceResponse{
  message: string;
  error?: string
  statusCode?: number
}