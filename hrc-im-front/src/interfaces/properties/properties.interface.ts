export interface PropertieInterface {
    message: string;
    data:    DataProperty[];
    records: number;
}

export interface DataProperty {
    id:   string;
    name: string;
}
