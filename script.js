// PTI Result Checker — front-end demonstration only.
// Replace this sample object with your lecturer-approved test records.
// For a real system, store records securely in a server-side database.
const sampleStudent = {
  matricNumber: "CSIT/ICE/ND/2023/7297",
  fullName: "Obanyedo Ovie Joseph",
  department: "Computer Science",
  level: "ND 2",
  courses: [
    { code: "MEE 101", title: "Engineering Mathematics", unit: 3, score: 78, grade: "B+", point: 3.5 },
    { code: "MEE 103", title: "Mechanics of Solids", unit: 3, score: 82, grade: "A-", point: 3.7 },
    { code: "MEE 105", title: "Thermodynamics", unit: 3, score: 76, grade: "B+", point: 3.5 },
    { code: "MEE 107", title: "Fluid Mechanics", unit: 3, score: 68, grade: "B", point: 3.0 },
    { code: "GNS 101", title: "Communication Skills", unit: 2, score: 70, grade: "B", point: 3.0 }
  ]
};

function getSelectedSemester() {
  return document.querySelector('input[name="semester"]:checked')?.value || "First Semester";
}

function saveLookup(matric, session, semester) {
  sessionStorage.setItem("ptiLookup", JSON.stringify({ matric, session, semester }));
}

function getLookup() {
  try { return JSON.parse(sessionStorage.getItem("ptiLookup") || "{}"); }
  catch { return {}; }
}

function makeCourseRows(targetId, courses) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = courses.map((course, index) => `
    <tr>
      <td>${index + 1}</td><td>${course.code}</td><td>${course.title}</td>
      <td>${course.unit}</td><td>${course.score}</td><td>${course.grade}</td><td>${course.point.toFixed(1)}</td>
    </tr>`).join("");
}

function showResultData() {
  const lookup = getLookup();
  const matric = lookup.matric || sampleStudent.matricNumber;
  const session = lookup.session || "2025/2026";
  const semester = lookup.semester || "First Semester";

  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };

  setText("outMatric", matric);
  setText("outName", sampleStudent.fullName);
  setText("outDepartment", sampleStudent.department);
  setText("outLevel", sampleStudent.level);
  setText("outSession", session);
  setText("outSemester", semester);
  setText("resultTitle", `${semester} Result (${session})`);
  setText("totalUnits", sampleStudent.courses.reduce((sum, course) => sum + course.unit, 0));
  makeCourseRows("courseRows", sampleStudent.courses);

  setText("slipMatric", matric);
  setText("slipName", sampleStudent.fullName);
  setText("slipDepartment", sampleStudent.department);
  makeCourseRows("slipRows", sampleStudent.courses);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resultForm");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const matric = document.getElementById("matricNumber").value.trim().toUpperCase();
      const session = document.getElementById("session").value;
      const semester = getSelectedSemester();
      const message = document.getElementById("formMessage");

      if (matric !== sampleStudent.matricNumber) {
        message.textContent = "No demonstration record found. Try PTI/ND/2023/001.";
        message.className = "form-message error";
        return;
      }
      saveLookup(matric, session, semester);
      window.location.href = "result.html";
    });
  }

  showResultData();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }
});