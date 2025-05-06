function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function navigateFields(event, nextId, prevId, leftId, rightId) {
  const key = event.key;

  if (key === "ArrowDown" && nextId) {
    event.preventDefault();
    document.getElementById(nextId).focus();
  } else if (key === "ArrowUp" && prevId) {
    event.preventDefault();
    document.getElementById(prevId).focus();
  } else if (key === "ArrowLeft" && leftId) {
    event.preventDefault();
    document.getElementById(leftId).focus();
  } else if (key === "ArrowRight" && rightId) {
    event.preventDefault();
    document.getElementById(rightId).focus();
  } else if (key === "Enter" && nextId) {
    event.preventDefault();
    document.getElementById(nextId).focus();
  }
}

function calculateGrade() {
  const diemquatrinh = parseFloat(
    document.getElementById("diemquatrinh").value
  );
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

  const DiemKT = tinhDiemKetThuc(diemquatrinh, diemthi, k);
  const DiemChu = quyDoiDiemChu(DiemKT);

  document.getElementById(
    "result"
  ).innerText = `Điểm kết thúc môn: ${DiemKT.toFixed(2)}, Điểm chữ: ${DiemChu}`;
}

function tinhDiemKetThuc(diemquatrinh, diemthi, k) {
  return k * diemquatrinh + (1 - k) * diemthi;
}

function quyDoiDiemChu(DiemKT) {
  if (DiemKT < 4.0) return "F";
  if (DiemKT < 5.5) return "D";
  if (DiemKT < 7.0) return "C";
  if (DiemKT < 8.5) return "B";
  return "A";
}

function resetFields() {
  document.getElementById("diemquatrinh").value = "";
  document.getElementById("diemthi").value = "";
  document.getElementById("k").value = "";
  document.getElementById("result").innerText = "Kết quả sẽ hiện tại đây.";
}

function showGPAForm() {
  document.getElementById("gpaForm").style.display = "block";
  document.getElementById("mainForm").style.display = "none";
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
    const nextDiemId = i < numSubjects ? `diem${i + 1}` : null; 
    const nextTinChiId = `tinchi${i}`; 
    const prevDiemId = i > 1 ? `diem${i - 1}` : null; 
    const prevTinChiId = i > 1 ? `tinchi${i - 1}` : null; 

    const inputRow = document.createElement("div");
    inputRow.className = "input-row";
    inputRow.innerHTML = `
      <label for="diem${i}">Nhập điểm môn ${i}:</label>
      <input type="number" id="diem${i}" class="input-field" placeholder="Nhập điểm từ 0 đến 4" 
        onkeydown="navigateFields(event, '${nextTinChiId}', '${prevTinChiId}', null, null)" />
      <label for="tinchi${i}">Nhập số tín chỉ môn ${i}:</label>
      <input type="number" id="tinchi${i}" class="input-field" placeholder="Nhập số tín chỉ" 
        onkeydown="navigateFields(event, '${nextDiemId}', '${prevDiemId}', null, null)" />
    `;
    subjectFields.appendChild(inputRow);
  }

  document.getElementById("calculateButtonRow").style.display = "flex";
}

function navigateGPAFields(event, currentIndex, totalSubjects) {
  const key = event.key;
  if (key === "Enter") {
    event.preventDefault();
    if (currentIndex < totalSubjects) {
      document.getElementById(`diem${currentIndex + 1}`).focus();
    } else {
      calculateGPA();
    }
  }
}

function calculateGPA() {
  const numSubjects = parseInt(document.getElementById("numSubjects").value);
  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 1; i <= numSubjects; i++) {
    const diem = parseFloat(document.getElementById(`diem${i}`).value);
    const tinchi = parseInt(document.getElementById(`tinchi${i}`).value);

    if (isNaN(diem) || diem < 0 || diem > 4 || isNaN(tinchi) || tinchi < 1) {
      alert("Vui lòng nhập điểm hợp lệ từ 0 đến 4 và số tín chỉ hợp lệ.");
      return;
    }

    totalPoints += diem * tinchi;
    totalCredits += tinchi;
  }

  const gpa = totalPoints / totalCredits;
  document.getElementById(
    "gpaResult"
  ).innerText = `GPA của bạn là: ${gpa.toFixed(2)}`;
}

function resetGPAFields() {
  document.getElementById("numSubjects").value = "";
  document.getElementById("subjectFields").innerHTML = "";
  document.getElementById("gpaResult").innerText =
    "Kết quả GPA sẽ hiện tại đây.";
  document.getElementById("calculateButtonRow").style.display = "none";
}

function goBack() {
  document.getElementById("gpaForm").style.display = "none";
  document.getElementById("mainForm").style.display = "block";
}
