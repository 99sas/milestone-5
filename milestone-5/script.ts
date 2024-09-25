import { jsPDF } from "jspdf";

// HTML elements
const resumeForm = document.getElementById("resumeForm") as HTMLFormElement;
const resumeOutput = document.getElementById("resumeOutput") as HTMLElement;
const downloadBtn = document.getElementById("downloadBtn") as HTMLButtonElement;
const profileImageInput = document.getElementById("profileImage") as HTMLInputElement;

let profileImageUrl: string = "";

// Handle image upload
profileImageInput.addEventListener("change", (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            profileImageUrl = reader.result as string;
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission to generate the resume dynamically
resumeForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    // Retrieve values from form inputs
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const education = (document.getElementById("education") as HTMLTextAreaElement).value;
    const experience = (document.getElementById("experience") as HTMLTextAreaElement).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement).value;

    // Create resume HTML
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

    // Display the generated resume
    resumeOutput.innerHTML = resumeHTML;
});

// Handle PDF download
downloadBtn.addEventListener("click", () => {
    const doc = new jsPDF();

    // Get text content from the resume output
    const resumeText = resumeOutput.innerText;

    // Add text content to the PDF
    doc.setFontSize(12);
    doc.text(resumeText, 10, 10);

    // If a profile image exists, add it to the PDF
    if (profileImageUrl) {
        doc.addImage(profileImageUrl, 'JPEG', 10, 40, 50, 50);
    }

    // Save the PDF
    doc.save("resume.pdf");
});
