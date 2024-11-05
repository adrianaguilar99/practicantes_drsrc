export interface PropertiesInterface {
    message: string;
    data:    DataProperty[];
    records: number;
}

export interface DataProperty {
    id:   string;
    name: string;
}

export interface PostProperty {
    name?: string;
}
export interface PatchProperty {
    name?: string;
}
