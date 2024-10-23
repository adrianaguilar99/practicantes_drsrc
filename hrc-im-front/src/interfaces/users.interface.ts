export interface UserInterface {
    message: string;
    data:    DataUser[];
}
export interface UserPostResponse {
    message: string;
    data:    DataUser;
}

export interface DataUser {
    firstName: string;
    lastName:  string;
    email:     string;
    userRole:  string;
    createdAt: Date;
    id:        string;
    isActive:  boolean;
}


export interface PostUser {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    userRole: string
  }

  export interface PatchUser {
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string,
    userRole?: string
  }






