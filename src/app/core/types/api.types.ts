export interface MySchoolDto {
  schoolId: string;
  name: string;
  roles: string[];
}

export interface SchoolMemberDto {
  userId: string;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  roles: string[];
}

export interface InvitationPreview {
  invitationId?: string;
  token?: string;
  schoolId?: string;
  schoolName?: string;
  email?: string;
  role?: string;
  invitedBy?: string;
  expiresAt?: string;
  userExists: boolean;
}