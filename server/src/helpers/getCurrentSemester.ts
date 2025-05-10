export default function getCurrentSemester(studyStartDate: Date): number {
  const now = new Date();
  const startYear = studyStartDate.getFullYear();

  let yearsPassed = now.getFullYear() - startYear;

  if (now.getMonth() < 8) {
    yearsPassed -= 1;
  }

  const academicYearStart = new Date(studyStartDate);
  academicYearStart.setFullYear(startYear + yearsPassed);
  academicYearStart.setMonth(8); // сентябрь
  academicYearStart.setDate(1);

  const semesterStart1 = new Date(academicYearStart);
  const semesterEnd1 = new Date(academicYearStart);
  semesterEnd1.setFullYear(academicYearStart.getFullYear() + 1);
  semesterEnd1.setMonth(0); // январь
  semesterEnd1.setDate(31);

  const semesterStart2 = new Date(academicYearStart);
  semesterStart2.setFullYear(academicYearStart.getFullYear() + 1);
  semesterStart2.setMonth(1); // февраль
  semesterStart2.setDate(1);

  const semesterEnd2 = new Date(academicYearStart);
  semesterEnd2.setFullYear(academicYearStart.getFullYear() + 1);
  semesterEnd2.setMonth(5); // июнь
  semesterEnd2.setDate(30);

  if (now >= semesterStart1 && now <= semesterEnd1) {
    return yearsPassed * 2 + 1;
  } else if (now >= semesterStart2 && now <= semesterEnd2) {
    return yearsPassed * 2 + 2;
  } else {
    return yearsPassed * 2 + 2; // лето
  }
}
