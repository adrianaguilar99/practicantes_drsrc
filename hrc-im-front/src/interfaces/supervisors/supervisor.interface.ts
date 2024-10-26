export interface SupervisorInterface {
    message: string;
    data:    DataSupervisor[];  
    records: number;         
}


export interface DataSupervisor {
    phone:      string;
    department: Department;
    user:       User;
    id:         string;
}

export interface Department {
    id:   string;
    name: string;
    createdAt?: string;
    supervisors?: any[]
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


export interface PostSupervisor {
    phone?: string,
    departmentId?: string,
    userId?: string,
    
}

export interface PatchSupervisor {
    phone?: string,
    departmentId?: string,
    userId?: string,
}
