document.addEventListener("DOMContentLoaded", () => {
  const inputVideo = document.getElementById("input-video");
  const videoInput = document.getElementById("video-input");
  const outputVideo = document.getElementById("output-video");

  // Click to upload
  inputVideo.addEventListener("click", () => {
    videoInput.click();
  });

  // File input change handler
  videoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      handleVideoUpload(file);
    }
  });

  // Drag and Drop handlers
  ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    inputVideo.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
  });

  ["dragenter", "dragover"].forEach((eventName) => {
    inputVideo.addEventListener(eventName, highlight, false);
  });

  ["dragleave", "drop"].forEach((eventName) => {
    inputVideo.addEventListener(eventName, unhighlight, false);
  });

  inputVideo.addEventListener("drop", handleDrop, false);

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  function highlight(e) {
    inputVideo.classList.add("dragover");
  }

  function unhighlight(e) {
    inputVideo.classList.remove("dragover");
  }

  function handleDrop(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleVideoUpload(file);
  }

  function handleVideoUpload(file) {
    if (file.type.startsWith("video/")) {
      console.log("Video file uploaded:", file.name);
      // Here you would typically:
      // 1. Show a preview of the video in the input box
      // 2. Send the video to your backend for processing
      // 3. Update the UI to show loading state
      // 4. Show the filtered video in the output box when ready
    } else {
      alert("Please upload a video file");
    }
  }
});

let inputVideo = document.getElementById("inputVideo");
let outputVideo = document.getElementById("outputVideo");
let videoInput = document.getElementById("videoInput");

videoInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const videoUrl = URL.createObjectURL(file);
    inputVideo.src = videoUrl;
    inputVideo.play();

    // Show loading state on upload button
    const uploadBtn = document.querySelector(".upload-btn");
    uploadBtn.classList.add("processing");

    // Remove loading state after 2 seconds (simulate upload)
    setTimeout(() => {
      uploadBtn.classList.remove("processing");
    }, 2000);
  }
});

async function processVideo() {
  if (!inputVideo.src) {
    alert("Please upload a video first");
    return;
  }

  const filterBtn = document.querySelector(".filter-btn");
  filterBtn.classList.add("processing");

  try {
    // Here you would implement your actual video processing logic
    // This is a placeholder that simulates processing time
    await simulateVideoProcessing();

    // For demonstration, we're just copying the input video to output
    outputVideo.src = inputVideo.src;

    // In reality, you would:
    // 1. Send the video to your backend server
    // 2. Process it to detect and mute abusive language
    // 3. Return the filtered video
    // 4. Display the filtered video in outputVideo
  } catch (error) {
    console.error("Error processing video:", error);
    alert("Error processing video");
  } finally {
    filterBtn.classList.remove("processing");
  }
}

function simulateVideoProcessing() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}

// Optional: Add drag and drop functionality
document.querySelector(".video-box").addEventListener("dragover", (e) => {
  e.preventDefault();
  e.currentTarget.style.border = "2px dashed #00a2ff";
});

document.querySelector(".video-box").addEventListener("dragleave", (e) => {
  e.currentTarget.style.border = "none";
});

document.querySelector(".video-box").addEventListener("drop", (e) => {
  e.preventDefault();
  e.currentTarget.style.border = "none";
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith("video/")) {
    videoInput.files = e.dataTransfer.files;
    const event = new Event("change");
    videoInput.dispatchEvent(event);
  }
});

// Contact Form Handler
document
  .querySelector(".contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Add loading state to submit button
    const submitBtn = this.querySelector(".submit-btn");
    submitBtn.style.opacity = "0.7";
    submitBtn.textContent = "SENDING...";

    // Simulate form submission (replace with actual form submission logic)
    setTimeout(() => {
      submitBtn.style.opacity = "1";
      submitBtn.textContent = "SUBMIT";

      // Clear form
      this.reset();

      // Show success message (you can customize this)
      alert("Message sent successfully!");
    }, 2000);
  });

// Smooth scrolling function
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      // Add offset for fixed header
      const headerOffset = 100; // Adjust this value based on your header height
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

// For Login button - Show modal
document
  .querySelector('a[href="#login"]')
  .addEventListener("click", function (e) {
    e.preventDefault();
    showLoginModal();
  });

// Login Modal functionality
function showLoginModal() {
  // Create modal if it doesn't exist
  if (!document.getElementById("loginModal")) {
    const modalHTML = `
            <div id="loginModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>LOGIN</h2>
                    <form id="loginForm">
                        <div class="form-group">
                            <input type="text" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <input type="password" placeholder="Password" required>
                        </div>
                        <button type="submit" class="login-btn">LOGIN</button>
                    </form>
                </div>
            </div>
        `;
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add event listeners for modal
    const modal = document.getElementById("loginModal");
    const closeBtn = modal.querySelector(".close");

    closeBtn.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    // Handle login form submission
    document
      .getElementById("loginForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        // Add your login logic here
        console.log("Login attempted");
        modal.style.display = "none";
      });
  }

  // Show modal
  document.getElementById("loginModal").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the scroll section and nav links
  const scrollSection = document.querySelector(".scroll-section");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Add click event to each nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Scroll to the scroll section
      scrollSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });
});
