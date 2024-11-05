export interface AuditsInterface {
    translatedAction: string;
    id:             string;
    responsible:    Responsible;
    action:         string;
    entityAffected: EntityAffected;
    status:         string;
    errorMessage:   null | string;
    auditDate:      Date;
}

export interface EntityAffected {
    id:   null | string;
    data: string;
}

export interface Responsible {
    id:       string;
    fullName: string;
    role:     string;
}


