export interface ProfileInterface {
    message: string;
    data:    ProfileData;
}

export interface ProfileData {
    id:                 string;
    firstName:          string;
    lastName:           string;
    email:              string;
    hashedRefreshToken: string;
    userRole:           string;
    createdAt:          Date;
    isActive:           boolean;
}
