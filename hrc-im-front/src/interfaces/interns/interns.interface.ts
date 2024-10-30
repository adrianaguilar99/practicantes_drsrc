import { Department } from "../supervisors/supervisor.interface";
import { DataInternFiles } from "./intern-files/intern-files.interface";

export interface InternsInterface {
    message: string;
    data:    DataIntern[];
    records: number;
}

export interface DataIntern {
    id:                   string;
    bloodType:            string;
    externalInternCode:   string;
    internalInternCode:   string;
    phone:                string;
    address:              string;
    schoolEnrollment:     string;
    internshipStart:      Date;
    internshipEnd:        Date;
    internshipDuration: string;
    entryTime: string,
    exitTime: string,
    status:               string;
    career:               Career;
    department:           null;
    internshipDepartment: InternshipDepartment;
    institution:          Institution;
    property:             Career;
    user:                 UserIntern;
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

export interface InternshipDepartment {
    id:          string;
    name:        string;
    supervisors: any[];
}

export interface UserIntern {
    id:        string;
    firstName: string;
    lastName:  string;
    email:     string;
    userRole:  string;
    createdAt: Date;
    isActive:  boolean;
}





export interface PostIntern{
    bloodType: string,
    phone: string,
    address: string,
    schoolEnrollment?: string,
    internshipStart: string,
    internalInternCode?: string,
    internshipEnd: string,
    entryTime: string,
    exitTime: string,
    internshipDuration: string,
    status: "ACTIVE",
    careerId?: string,
    departmentId?: string,
    internshipDepartmentId: string,
    institutionId?: string,
    propertyId: string,
    userId?: string
    data?: any
  }





  export interface GetByIDInternInterface {
    message: string;
    data:    GetByIDDataInter;
}

export interface GetByIDDataInter {
    id:                   string;
    bloodType:            string;
    phone:                string;
    address:              string;
    externalInternCode :  string;
    internalInternCode:   string;
    schoolEnrollment:     string;
    internshipStart:      Date;
    internshipEnd:        Date;
    internshipDuration :   internshipDuration;
    entryTime:            string;
    exitTime:             string;
    status:               string;
    career:               Career;
    department:           Department;
    internshipDepartment: Career;
    institution:          Career;
    property:             Career;
    internFiles?:          DataInternFiles
    emergencyContacts:    EmergencyContact[];
    user:                 User;
}

export interface internshipDuration{
    hours: string,
}

export interface Career {
    id:           string;
    name:         string;
    createdAt:    Date;
    phone?:       string;
    supervisors?: any[];
}

export interface EmergencyContact {
    id:              string;
    name:            string;
    phone:           string;
    relationship:    string;
    positionContact: string;
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
