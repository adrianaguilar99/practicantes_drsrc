export interface CommentsOfInternInterface {
    message: string;
    data:    DataComment[];
}

export interface DataComment {
    id:            string;
    postedComment: string;
    createdAt:     Date;
    updatedAt:     Date;
    user:        User;
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

export interface PostComment {
    postedComment: string,
    internId: string,
  }

  export interface postCommentResponse {
    message: string,
    data: {
      postedComment: string,
      user : User,
      createdAt: string,
      updatedAt: string,
      id: string
    }
  }


  export interface PatchComment {
    postedComment?: string
  } 