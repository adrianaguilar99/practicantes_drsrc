export interface ScheduleInterface {
    message: string;
    data:    DataSchedule;
}

export interface DataSchedule {
    id?:           string;
    mondayIn:     string;
    mondayOut:    string;
    tuesdayIn:    string;
    tuesdayOut:   string;
    wednesdayIn:  string;
    wednesdayOut: string;
    thursdayIn:   string;
    thursdayOut:  string;
    fridayIn:     string;
    fridayOut:    string;
    saturdayIn:   string;
    saturdayOut:  string;
    sundayIn:     string;
    sundayOut:    string;
    internId:     string;
}

export interface PostSchedule {
    mondayIn?:     string;
    mondayOut?:    string;
    tuesdayIn?:    string;
    tuesdayOut?:   string;
    wednesdayIn?:  string;
    wednesdayOut?: string;
    thursdayIn?:   string;
    thursdayOut?:  string;
    fridayIn?:     string;
    fridayOut?:    string;
    saturdayIn?:   string;
    saturdayOut?:  string;
    sundayIn?:     string;
    sundayOut?:    string;
    internId: string;
}
