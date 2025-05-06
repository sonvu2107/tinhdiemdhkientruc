function calculateGrade() {
  const diemquatrinh = parseFloat(document.getElementById("diemquatrinh").value);
  const diemthi = parseFloat(document.getElementById("diemthi").value);
  const k = parseFloat(document.getElementById("k").value);

  if (isNaN(diemquatrinh) || isNaN(diemthi) || isNaN(k)) {
    alert("Vui lòng nhập đầy đủ các giá trị.");
    return;
  }

  if (k < 0.2 || k > 0.4) {
    alert("Hệ số k phải nằm trong khoảng 0.2 đến 0.4.");
    return;
  }

  const DiemKT = k * diemquatrinh + (1 - k) * diemthi;
  const DiemChu = quyDoiDiemChu(DiemKT);

  document.getElementById("result").innerText = `Điểm kết thúc môn: ${DiemKT.toFixed(2)}, Điểm chữ: ${DiemChu}`;
}

function quyDoiDiemChu(diem) {
  if (diem < 4.0) return "F";
  if (diem < 5.5) return "D";
  if (diem < 7.0) return "C";
  if (diem < 8.5) return "B";
  return "A";
}

function generateSubjectFields() {
  const numSubjects = parseInt(document.getElementById("numSubjects").value);
  const subjectFields = document.getElementById("subjectFields");
  subjectFields.innerHTML = "";

  if (isNaN(numSubjects) || numSubjects < 1) {
    alert("Vui lòng nhập số lượng môn hợp lệ.");
    return;
  }

  for (let i = 1; i <= numSubjects; i++) {
    const inputRow = document.createElement("div");
    inputRow.className = "input-row";
    inputRow.innerHTML = `
      <label for="diem${i}">Nhập điểm môn ${i}:</label>
      <input type="number" id="diem${i}" class="input-field" placeholder="0 - 4"/>
      <label for="tinchi${i}">Nhập số tín chỉ môn ${i}:</label>
      <input type="number" id="tinchi${i}" class="input-field" placeholder="Tín chỉ"/>
    `;
    subjectFields.appendChild(inputRow);
  }

  document.getElementById("calculateButtonRow").style.display = "flex";
}

function calculateGPA() {
  const numSubjects = parseInt(document.getElementById("numSubjects").value);
  let totalPoints = 0, totalCredits = 0;

  for (let i = 1; i <= numSubjects; i++) {
    const diem = parseFloat(document.getElementById(`diem${i}`).value);
    const tinchi = parseInt(document.getElementById(`tinchi${i}`).value);

    if (isNaN(diem) || isNaN(tinchi)) {
      alert("Nhập đầy đủ điểm và tín chỉ hợp lệ.");
      return;
    }

    totalPoints += diem * tinchi;
    totalCredits += tinchi;
  }

  const gpa = totalPoints / totalCredits;
  document.getElementById("gpaResult").innerText = `GPA của bạn là: ${gpa.toFixed(2)}`;
}