export interface FamilyMember {
  id: string;
  firstName: string;
  lastName: string;
  relation: string;
  phoneNumber: string;
  email: string;
  address?: string;
  birthday?: string;
  avatarUrl?: string;
  isEmergencyContact: boolean;
  notes?: string;
}

export type RelationType = 
  | 'Parent' 
  | 'Sibling' 
  | 'Grandparent' 
  | 'Child' 
  | 'Spouse' 
  | 'Uncle/Aunt' 
  | 'Cousin' 
  | 'In-law' 
  | 'Other';