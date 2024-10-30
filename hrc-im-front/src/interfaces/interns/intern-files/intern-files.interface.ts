export interface InternFilesInterface {
    message: string;
    data:    DataInternFiles[];
    records: number;
}

export interface DataInternFiles {
    id?:                string;
    photo:             string;
    compiledDocuments: string;
}




export interface PostInternFilesInterface {
    photo: File,  
    compiledDocuments: File
  }