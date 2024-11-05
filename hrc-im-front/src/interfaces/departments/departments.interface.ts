export interface DepartmentsInterface {
    message: string;
    data:    DataDepartment[];
    records: number;
}

export interface DataDepartment {
    id:   string;
    name: string;
}

export interface PostDepartment {
    name: string;
}

export interface PatchDepartment {
    name?: string;
}
