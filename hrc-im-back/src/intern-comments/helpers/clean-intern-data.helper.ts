export const cleanInternData = (intern) => {
  const {
    address,
    bloodType,
    career,
    department,
    emergencyContacts,
    entryTime,
    exitTime,
    institution,
    internCode,
    internComents,
    internFiles,
    internshipDepartment,
    internshipDuration,
    internshipEnd,
    internshipStart,
    phone,
    property,
    schoolEnrollment,
    status,
    ...cleanIntern
  } = intern;
  return cleanIntern;
};
