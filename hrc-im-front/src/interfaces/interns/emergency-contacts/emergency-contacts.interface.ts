export interface EmergencyContactInterface {
  message: string;
  data: DataEmergencyContact;
}

export interface DataEmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  positionContact: string;
  internId?: string;
  id?: string;
}

export interface PostEmergencyContact {
  name: string;
  phone: string;
  relationship: string;
  positionContact: string;
  internId: string;
}

export interface PatchEmergencyContact {
  name?: string;
  phone?: string;
  relationship?: string;
  positionContact?: string;
  internId?: string;
}
