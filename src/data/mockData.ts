import { FamilyMember } from '../types';

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: '1',
    firstName: 'Robert',
    lastName: 'Johnson',
    relation: 'Grandparent',
    phoneNumber: '+1 (555) 123-4567',
    email: 'robert.j@family.com',
    address: '123 Oak Lane, Springfield',
    birthday: '1945-05-12',
    avatarUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b5a6ab1-1f57-4d66-a914-630b4d7c251f/grandpa-profile-475047be-1772524585509.webp',
    isEmergencyContact: true,
    notes: 'Loves fishing and telling stories about the old days.'
  },
  {
    id: '2',
    firstName: 'Martha',
    lastName: 'Johnson',
    relation: 'Grandparent',
    phoneNumber: '+1 (555) 123-4568',
    email: 'martha.j@family.com',
    address: '123 Oak Lane, Springfield',
    birthday: '1948-11-20',
    avatarUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b5a6ab1-1f57-4d66-a914-630b4d7c251f/grandma-profile-ed1022ff-1772524585172.webp',
    isEmergencyContact: false,
    notes: 'Makes the best apple pie.'
  },
  {
    id: '3',
    firstName: 'David',
    lastName: 'Smith',
    relation: 'Parent',
    phoneNumber: '+1 (555) 987-6543',
    email: 'david.smith@workmail.com',
    address: '456 Maple Avenue, Riverdale',
    birthday: '1975-03-15',
    avatarUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b5a6ab1-1f57-4d66-a914-630b4d7c251f/father-profile-f1ab4965-1772524585742.webp',
    isEmergencyContact: true,
    notes: 'Always available for car advice.'
  },
  {
    id: '4',
    firstName: 'Sarah',
    lastName: 'Smith',
    relation: 'Parent',
    phoneNumber: '+1 (555) 987-6544',
    email: 'sarah.smith@home.com',
    address: '456 Maple Avenue, Riverdale',
    birthday: '1978-08-22',
    avatarUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b5a6ab1-1f57-4d66-a914-630b4d7c251f/mother-profile-ef479e49-1772524586268.webp',
    isEmergencyContact: true,
    notes: 'Chief organizer of family gatherings.'
  },
  {
    id: '5',
    firstName: 'James',
    lastName: 'Smith',
    relation: 'Sibling',
    phoneNumber: '+1 (555) 444-3333',
    email: 'james.smith@college.edu',
    address: '789 University Way, Campus',
    birthday: '2001-01-10',
    avatarUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b5a6ab1-1f57-4d66-a914-630b4d7c251f/brother-profile-778bff72-1772524588105.webp',
    isEmergencyContact: false,
    notes: 'Studying Architecture.'
  },
  {
    id: '6',
    firstName: 'Emily',
    lastName: 'Smith',
    relation: 'Sibling',
    phoneNumber: '+1 (555) 222-1111',
    email: 'emily.s@highschool.com',
    address: '456 Maple Avenue, Riverdale',
    birthday: '2005-09-30',
    avatarUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/2b5a6ab1-1f57-4d66-a914-630b4d7c251f/sister-profile-67975b8f-1772524584904.webp',
    isEmergencyContact: false,
    notes: 'Captain of the debate team.'
  }
];