export interface CareersInterface {
    message: string;
    data:    DataCareer[];
    records: number;
}

export interface DataCareer {
    id:             string;
    name:           string;
    submissionDate: Date;
    status:         string;
    submittedBy:    CareerSubmittedBy;
}

export interface CareerSubmittedBy {
    id:                 string;
    firstName:          string;
    lastName:           string;
    email:              string;
    hashedRefreshToken: string;
    userRole:           string;
    createdAt:          Date;
    isActive:           boolean;
}

export interface PostCareer {
    name:           string;
    status:         string;
}

export interface PatchCareer {
    name?:           string;
    status?:         string;
}
