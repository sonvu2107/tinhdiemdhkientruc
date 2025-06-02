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
  const mainForm = document.getElementById("mainForm");
  const gpaForm = document.getElementById("gpaForm");
  const predictGPAForm = document.getElementById("predictGPAForm");
  
  mainForm.style.animation = "fadeIn 0.5s ease-out reverse";
  setTimeout(() => {
    mainForm.style.display = "none";
    predictGPAForm.style.display = "none";
    gpaForm.style.display = "block";
    gpaForm.style.animation = "slideIn 0.5s ease-out";
  }, 500);
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
      <input type="number" id="diem${i}" class="input-field" placeholder="Nhập điểm từ 0 đến 4" step="0.01" min="0" max="4"
        onkeydown="navigateFields(event, '${nextTinChiId}', '${prevTinChiId}', null, null)" />
      <label for="tinchi${i}">Nhập số tín chỉ môn ${i}:</label>
      <input type="number" id="tinchi${i}" class="input-field" placeholder="Nhập số tín chỉ" step="1" min="1"
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
  const mainForm = document.getElementById("mainForm");
  const gpaForm = document.getElementById("gpaForm");
  
  gpaForm.style.animation = "slideIn 0.5s ease-out reverse";
  setTimeout(() => {
    gpaForm.style.display = "none";
    mainForm.style.display = "block";
    mainForm.style.animation = "fadeIn 0.5s ease-out";
  }, 500);
}

function showPredictGPAForm() {
  document.getElementById("predictGPAForm").style.display = "block";
  document.getElementById("mainForm").style.display = "none";
  document.getElementById("gpaForm").style.display = "none";
}

function goBackFromPredict() {
  document.getElementById("predictGPAForm").style.display = "none";
  document.getElementById("mainForm").style.display = "block";
}

function generatePredictFields() {
  const numSubjectsDone = parseInt(document.getElementById("numSubjectsDone").value);
  const numSubjectsLeft = parseInt(document.getElementById("numSubjectsLeft").value);
  const subjectsDoneFields = document.getElementById("subjectsDoneFields");
  const subjectsLeftFields = document.getElementById("subjectsLeftFields");
  subjectsDoneFields.innerHTML = "";
  subjectsLeftFields.innerHTML = "";

  if (isNaN(numSubjectsDone) || numSubjectsDone < 0) {
    alert("Vui lòng nhập số môn đã học hợp lệ.");
    return;
  }
  if (isNaN(numSubjectsLeft) || numSubjectsLeft < 1) {
    alert("Vui lòng nhập số môn còn lại hợp lệ.");
    return;
  }

  if (numSubjectsDone > 0) {
    subjectsDoneFields.classList.add("predict-fields-margin-top");
  } else {
    subjectsDoneFields.classList.remove("predict-fields-margin-top");
  }
  if (numSubjectsLeft > 0) {
    subjectsLeftFields.classList.add("predict-fields-margin-top");
  } else {
    subjectsLeftFields.classList.remove("predict-fields-margin-top");
  }

  const subjectDoneTemplate = document.getElementById("subject-done-template").content;
  const subjectLeftTemplate = document.getElementById("subject-left-template").content;

  for (let i = 1; i <= numSubjectsDone; i++) {
    const inputRow = document.importNode(subjectDoneTemplate, true);
    
    const diemLabelGroup = inputRow.querySelector('.input-row > div:nth-of-type(1)');
    const diemLabel = diemLabelGroup.querySelector('label');
    const diemInput = inputRow.querySelector('.input-row > input:nth-of-type(1)');
    const diemTooltip = diemLabelGroup.querySelector('.tooltip-text');
    
    const tinchiLabelGroup = inputRow.querySelector('.input-row > div:nth-of-type(2)');
    const tinchiLabel = tinchiLabelGroup.querySelector('label');
    const tinchiInput = inputRow.querySelector('.input-row > input:nth-of-type(2)');
    const tinchiTooltip = tinchiLabelGroup.querySelector('.tooltip-text');

    diemLabel.textContent = `Nhập điểm môn ${i}:`;
    diemLabel.htmlFor = `predictDiem${i}`;
    diemInput.id = `predictDiem${i}`;
    diemInput.placeholder = "Nhập điểm từ 0 đến 4";
    diemTooltip.textContent = "Nhập điểm môn đã học (thang 4.0)";

    tinchiLabel.textContent = `Nhập số tín chỉ môn ${i}:`;
    tinchiLabel.htmlFor = `predictTinchi${i}`;
    tinchiInput.id = `predictTinchi${i}`;
    tinchiInput.placeholder = "Nhập số tín chỉ";
    tinchiTooltip.textContent = "Nhập số tín chỉ của môn đã học";

    const nextDiemId = i < numSubjectsDone ? `predictDiem${i + 1}` : null;
    const prevTinChiId = i > 1 ? `predictTinchi${i - 1}` : null;
    diemInput.setAttribute('onkeydown', `navigateFields(event, 'predictTinchi${i}', '${prevTinChiId}', null, null)`);
    tinchiInput.setAttribute('onkeydown', `navigateFields(event, '${nextDiemId}', 'predictDiem${i}', null, null)`);

    subjectsDoneFields.appendChild(inputRow);
  }

  for (let i = 1; i <= numSubjectsLeft; i++) {
      const inputRow = document.importNode(subjectLeftTemplate, true);

      const tinchiLabelGroup = inputRow.querySelector('.input-row > div:nth-of-type(1)');
      const tinchiLabel = tinchiLabelGroup.querySelector('label');
      const tinchiInput = inputRow.querySelector('.input-row > input:nth-of-type(1)');
      const tinchiTooltip = tinchiLabelGroup.querySelector('.tooltip-text');

      tinchiLabel.textContent = `Nhập số tín chỉ môn ${i}:`;
      tinchiLabel.htmlFor = `predictTinchiLeft${i}`;
      tinchiInput.id = `predictTinchiLeft${i}`;
      tinchiInput.placeholder = "Nhập số tín chỉ";
      tinchiTooltip.textContent = "Nhập số tín chỉ của môn còn lại";

      const nextTinChiId = i < numSubjectsLeft ? `predictTinchiLeft${i + 1}` : null;
      tinchiInput.setAttribute('onkeydown', `navigateFields(event, '${nextTinChiId}', null, null, null)`);

      subjectsLeftFields.appendChild(inputRow);
  }

  document.getElementById("predictButtonRow").style.display = "flex";
}

function calculatePredictGPA() {
  const targetGPA = parseFloat(document.getElementById("targetGPA").value);
  const numSubjectsDone = parseInt(document.getElementById("numSubjectsDone").value);
  const numSubjectsLeft = parseInt(document.getElementById("numSubjectsLeft").value);

  if (subjectsDoneFields.innerHTML === "" && subjectsLeftFields.innerHTML === "") {
      alert("Vui lòng tạo ô nhập điểm trước khi tính toán.");
      return;
  }

  if (isNaN(targetGPA) || targetGPA < 0 || targetGPA > 4) {
    alert("Vui lòng nhập GPA mục tiêu hợp lệ (0 - 4.0)");
    return;
  }
  if (isNaN(numSubjectsDone) || numSubjectsDone < 0 || isNaN(numSubjectsLeft) || numSubjectsLeft < 1) {
    alert("Vui lòng nhập số môn hợp lệ.");
    return;
  }

  let totalCreditsDone = 0;
  let totalPointsDone = 0;
  for (let i = 1; i <= numSubjectsDone; i++) {
    const diem = parseFloat(document.getElementById(`predictDiem${i}`).value);
    const tinchi = parseInt(document.getElementById(`predictTinchi${i}`).value);
    if (isNaN(diem) || diem < 0 || diem > 4 || isNaN(tinchi) || tinchi < 1) {
      alert(`Vui lòng nhập điểm (0-4) và tín chỉ hợp lệ cho môn đã học thứ ${i}`);
      return;
    }
    totalPointsDone += diem * tinchi;
    totalCreditsDone += tinchi;
  }

  let totalCreditsLeft = 0;
  for (let i = 1; i <= numSubjectsLeft; i++) {
    const tinchi = parseInt(document.getElementById(`predictTinchiLeft${i}`).value);
    if (isNaN(tinchi) || tinchi < 1) {
      alert(`Vui lòng nhập số tín chỉ hợp lệ cho môn còn lại thứ ${i}`);
      return;
    }
    totalCreditsLeft += tinchi;
  }

  const totalCredits = totalCreditsDone + totalCreditsLeft;
  const totalPointsNeeded = targetGPA * totalCredits;
  const pointsLeftNeeded = totalPointsNeeded - totalPointsDone;
  const minAvgLeft = pointsLeftNeeded / totalCreditsLeft;

  let result = "";
  if (minAvgLeft > 4) {
    result = `Không thể đạt GPA mục tiêu với số môn còn lại này (cần điểm trung bình mỗi môn còn lại là ${minAvgLeft.toFixed(2)} > 4.0).`;
  } else if (minAvgLeft < 0) {
    result = `Bạn đã vượt GPA mục tiêu!`;
  } else {
    result = `Bạn cần đạt trung bình tối thiểu <b>${minAvgLeft.toFixed(2)}</b> (thang 4.0) cho các môn còn lại để đạt GPA mục tiêu.`;
  }
  document.getElementById("predictGPAResult").innerHTML = result;
}

function resetPredictGPAFields() {
  document.getElementById("targetGPA").value = "";
  document.getElementById("numSubjectsDone").value = "";
  document.getElementById("numSubjectsLeft").value = "";
  document.getElementById("subjectsDoneFields").innerHTML = "";
  document.getElementById("subjectsLeftFields").innerHTML = "";
  document.getElementById("predictGPAResult").innerText = "Kết quả dự đoán sẽ hiện tại đây.";
  document.getElementById("predictButtonRow").classList.remove("show-buttons");
  document.getElementById("predictButtonRow").style.display = "none";
}
