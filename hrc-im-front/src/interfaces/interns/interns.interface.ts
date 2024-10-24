export interface InternsInterface {
    message: string;
    data:    DataIntern[];
    records: number;
}

export interface DataIntern {
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
    internshipEnd: string,
    status: "ACTIVE",
    careerId?: string,
    departmentId?: string,
    internshipDepartmentId: string,
    institutionId?: string,
    propertyId: string,
    userId?: string
  }

