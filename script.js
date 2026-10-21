const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation menu");
      menuButton.textContent = "☰";
    });
  });
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const admissionForm = document.getElementById("admissionForm");

if (admissionForm) {
  admissionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const studentName = document.getElementById("studentName").value.trim();
    const fatherName = document.getElementById("fatherName").value.trim();
    const fatherOccupation = document.getElementById("fatherOccupation").value.trim();
    const motherName = document.getElementById("motherName").value.trim();
    const motherOccupation = document.getElementById("motherOccupation").value.trim();
    const studentClass = document.getElementById("studentClass").value;
    const school = document.getElementById("school").value.trim();
    const address = document.getElementById("address").value.trim();
    const previousInstitute = document.getElementById("previousInstitute").value.trim() || "Not provided";
    const phoneNumber = document.getElementById("phoneNumber").value.trim();

    const message = [
      "NEWTON CLASSES - ADMISSION FORM",
      "Learn Today. Lead Tomorrow.",
      "",
      "Name of Student: " + studentName,
      "Father's Name: " + fatherName,
      "Father's Occupation: " + fatherOccupation,
      "Mother's Name: " + motherName,
      "Mother's Occupation: " + motherOccupation,
      "Class: " + studentClass,
      "School: " + school,
      "Address: " + address,
      "Previous Institute/Coaching Centre: " + previousInstitute,
      "Phone Number: " + phoneNumber
    ].join("\n");

    const whatsappURL =
      "https://wa.me/918877546941?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
  });
}

const admissionPopup = document.getElementById("admissionPopup");
const openAdmissionFormButton = document.getElementById("openAdmissionForm");
const ignoreAdmissionPopupButton = document.getElementById("ignoreAdmissionPopup");
const admissionFormSection = document.getElementById("admission");

if (admissionPopup) {
  admissionPopup.hidden = false;
}

if (ignoreAdmissionPopupButton && admissionPopup) {
  ignoreAdmissionPopupButton.addEventListener("click", () => {
    admissionPopup.hidden = true;
  });
}

if (openAdmissionFormButton && admissionPopup) {
  openAdmissionFormButton.addEventListener("click", () => {
    admissionPopup.hidden = true;

    if (admissionFormSection) {
      admissionFormSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      const firstField = admissionFormSection.querySelector("input");
      if (firstField) {
        setTimeout(() => firstField.focus({ preventScroll: true }), 500);
      }
    }
  });
}
