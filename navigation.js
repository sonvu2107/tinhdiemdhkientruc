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