export interface InstitutionsInterface {
    message: string;
    data:    DataInstitution[];
    records: number;
}

export interface DataInstitution {
    id:             string;
    name:           string;
    phone:          string;
    submissionDate: Date;
    status:         string;
    submittedBy:    InstitutionSubmittedBy;
}

export interface InstitutionSubmittedBy {
    id:                 string;
    firstName:          string;
    lastName:           string;
    email:              string;
    hashedRefreshToken: string;
    userRole:           string;
    createdAt:          Date;
    isActive:           boolean;
}

export interface PostInstitution {
    name:           string;
    phone:          string;
    status?:        string;
}

export interface PatchInstitution {
    name?:           string;
    phone?:          string;
    status?:         string;
}
