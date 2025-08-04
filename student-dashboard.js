// Student Dashboard functionality
import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js';
import { doc, getDoc, addDoc, collection } from 'https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js';

// Global variables
let currentUser = null;
let performanceChart = null;
let attendanceChart = null;

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
});

// Authentication state observer
onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUser = user;
        loadUserData();
    } else {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
    }
});

// Initialize dashboard functionality
function initializeDashboard() {
    initializeCharts();
    initializeFeedbackForm();
    
    // Check if user data is available in sessionStorage
    const userData = sessionStorage.getItem('currentUser');
    if (userData) {
        const user = JSON.parse(userData);
        updateUIWithUserData(user);
    }
}

// Load user data from Firestore
async function loadUserData() {
    try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            updateUIWithUserData(userData);
        } else {
            console.error('User document not found');
            alert('User profile not found. Please contact support.');
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        alert('Error loading profile data. Please try again.');
    }
}

// Update UI with user data
function updateUIWithUserData(userData) {
    // Update profile header
    document.getElementById('student-name').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('student-email').textContent = userData.email;
    
    if (userData.studentId) {
        document.getElementById('student-info').textContent = `Student ID: ${userData.studentId} | Grade: 10`;
    }
    
    // Update personal information
    document.getElementById('display-name').textContent = `${userData.firstName} ${userData.lastName}`;
    document.getElementById('display-address').textContent = userData.address || 'Not provided';
    document.getElementById('display-phone').textContent = userData.phone || 'Not provided';
    document.getElementById('display-identity').textContent = userData.identity || 'Not provided';
    
    // Pre-fill feedback form
    document.getElementById('feedback-name').value = `${userData.firstName} ${userData.lastName}`;
}

// Initialize charts
function initializeCharts() {
    // Performance Chart
    const performanceCtx = document.getElementById('performance-chart');
    if (performanceCtx) {
        performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Math', 'Science', 'English', 'History', 'Art', 'PE'],
                datasets: [{
                    label: 'Performance %',
                    data: [92, 88, 65, 60, 85, 90],
                    borderColor: '#007bff',
                    backgroundColor: 'rgba(0, 123, 255, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Attendance Chart
    const attendanceCtx = document.getElementById('attendance-chart');
    if (attendanceCtx) {
        attendanceChart = new Chart(attendanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Present', 'Absent', 'Late'],
                datasets: [{
                    data: [90, 7, 3],
                    backgroundColor: ['#28a745', '#dc3545', '#ffc107'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

// Initialize feedback form
function initializeFeedbackForm() {
    const feedbackForm = document.getElementById('feedback-form');
    
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const feedbackData = {
            studentName: document.getElementById('feedback-name').value,
            teacherName: document.getElementById('teacher-name').value,
            message: document.getElementById('feedback-message').value,
            behaviorRating: document.getElementById('behavior-rating').value,
            performanceRating: document.getElementById('performance-rating').value,
            studentId: currentUser.uid,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString()
        };
        
        try {
            await addDoc(collection(db, 'feedback'), feedbackData);
            
            alert('Feedback submitted successfully!');
            feedbackForm.reset();
            
            // Add feedback to the list
            addFeedbackToList(feedbackData);
            
        } catch (error) {
            console.error('Error submitting feedback:', error);
            alert('Error submitting feedback. Please try again.');
        }
    });
}

// Add feedback to the list
function addFeedbackToList(feedbackData) {
    const feedbackList = document.getElementById('feedback-list');
    const feedbackItem = document.createElement('div');
    feedbackItem.className = 'feedback-item';
    
    feedbackItem.innerHTML = `
        <strong>To: ${feedbackData.teacherName}</strong>
        <p>${feedbackData.message}</p>
        <p><strong>Behavior:</strong> ${feedbackData.behaviorRating} | <strong>Performance:</strong> ${feedbackData.performanceRating}</p>
        <span class="feedback-date">${feedbackData.date}</span>
    `;
    
    feedbackList.appendChild(feedbackItem);
}

// Toggle section visibility
window.toggleSection = function(sectionId) {
    const section = document.getElementById(sectionId);
    const isHidden = section.classList.contains('hidden');
    
    // Close all other sections first
    document.querySelectorAll('.card-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Reset all toggle icons
    document.querySelectorAll('.toggle-icon').forEach(icon => {
        icon.textContent = '+';
    });
    
    if (isHidden) {
        section.classList.remove('hidden');
        // Find the toggle icon for this section
        const button = section.previousElementSibling;
        const icon = button.querySelector('.toggle-icon');
        if (icon) icon.textContent = '-';
    }
};

// Show analytics tab
window.showAnalytics = function(period) {
    // Hide all analytics content
    document.querySelectorAll('.analytics-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.analytics-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected content and activate tab
    document.getElementById(period + '-analytics').classList.add('active');
    event.target.classList.add('active');
};

// Generate report
window.generateReport = function() {
    const reportSection = document.getElementById('report-section');
    const reportContent = document.getElementById('report-content');
    
    const userData = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    const studentName = userData.firstName && userData.lastName ? 
        `${userData.firstName} ${userData.lastName}` : 'Student';
    
    const report = `
        <div class="report-summary">
            <h4>Summary Report for ${studentName}</h4>
            <p><strong>Student ID:</strong> ${userData.studentId || 'N/A'}</p>
            <p><strong>Overall Performance:</strong> 85% (Above Average)</p>
            <p><strong>Attendance Rate:</strong> 90% (Excellent)</p>
            <p><strong>Behavior Rating:</strong> Good</p>
            
            <h5>Subject Performance:</h5>
            <ul>
                <li>Mathematics: 92% (Excellent)</li>
                <li>Science: 88% (Good)</li>
                <li>Physical Education: 90% (Excellent)</li>
                <li>Art: 85% (Good)</li>
                <li>English: 65% (Needs Improvement)</li>
                <li>History: 60% (Needs Improvement)</li>
            </ul>
            
            <h5>Recommendations:</h5>
            <ul>
                <li>Focus on improving English and History grades</li>
                <li>Continue excellent work in Mathematics and Science</li>
                <li>Maintain good attendance record</li>
                <li>Consider additional study sessions for weaker subjects</li>
            </ul>
            
            <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
        </div>
    `;
    
    reportContent.innerHTML = report;
    reportSection.classList.remove('hidden');
    
    // Scroll to report section
    reportSection.scrollIntoView({ behavior: 'smooth' });
};

// Download report as PDF (simplified implementation)
window.downloadReport = function() {
    const reportContent = document.getElementById('report-content').innerText;
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student-report.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// Notification functions
window.toggleNotifications = function() {
    const panel = document.getElementById('notification-panel');
    panel.classList.toggle('hidden');
    
    // Hide notification badge
    document.getElementById('notification-badge').classList.add('hidden');
};

window.closeNotifications = function() {
    document.getElementById('notification-panel').classList.add('hidden');
};

// Close notifications when clicking outside
document.addEventListener('click', (e) => {
    const panel = document.getElementById('notification-panel');
    const button = document.getElementById('notification-btn');
    
    if (!panel.contains(e.target) && !button.contains(e.target)) {
        panel.classList.add('hidden');
    }
});

// Logout function
window.logout = async function() {
    try {
        await signOut(auth);
        alert('Logged out successfully');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error logging out:', error);
        alert('Error logging out. Please try again.');
    }
};

console.log('Student dashboard initialized');
