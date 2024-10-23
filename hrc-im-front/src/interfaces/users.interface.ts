
export interface UserPostResponse {
    message: string;
    data:    Data;
}

export interface Data {
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