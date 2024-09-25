// Import jsPDF from the CDN already loaded in your HTML
// const { jsPDF } = window.jspdf;

// HTML elements
const resumeForm = document.getElementById("resumeForm");
const resumeOutput = document.getElementById("resumeOutput");
const downloadBtn = document.getElementById("downloadBtn");
const profileImageInput = document.getElementById("profileImage");

let profileImageUrl = "";

// Handle image upload
profileImageInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profileImageUrl = reader.result; // Store the image as base64
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission to generate the resume dynamically
resumeForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // Retrieve values from form inputs
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;

    // Create resume HTML dynamically
    const resumeHTML = `
        <h2>Resume of ${name}</h2>
        ${profileImageUrl ? `<img src="${profileImageUrl}" alt="Profile Image" width="100" height="100">` : ''}
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
    `;

    // Display the generated resume in the `resumeOutput` div
    resumeOutput.innerHTML = resumeHTML;
});

// Handle PDF download
downloadBtn.addEventListener("click", () => {
    const doc = new jsPDF();

    // Get text content from the generated resume output
    const resumeText = resumeOutput.innerText;

    // Add text content to the PDF
    doc.setFontSize(12);
    doc.text(resumeText, 10, 10);

    // If a profile image exists, add it to the PDF
    if (profileImageUrl) {
        doc.addImage(profileImageUrl, 'JPEG', 10, 40, 50, 50); // Position and size of the image in PDF
    }

    // Save the PDF
    doc.save("resume.pdf");
});
