# Overview

This is a Student Management System built as a web application that provides authentication and dashboard functionality for educational institutions. The system supports multiple user roles including students, teachers, administrators, and parents, with role-based access control and document management capabilities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Technology Stack**: Vanilla HTML, CSS, and JavaScript with ES6 modules
- **UI Framework**: Custom CSS with modern design patterns including gradients, shadows, and responsive layouts
- **Authentication UI**: Tab-based login/registration system with real-time form validation
- **Dashboard System**: Role-based dashboards with interactive charts using Chart.js library
- **File Upload**: Native HTML5 file input with support for PDF and image formats

## Backend Architecture
- **Authentication Service**: Firebase Authentication v10 with email/password authentication
- **Database**: Firebase Firestore (NoSQL document database) for user profiles and application data
- **File Storage**: Firebase Storage for document uploads (ID copies, birth certificates, clinic cards)
- **Real-time Updates**: Firebase's real-time listeners for live data synchronization

## Data Storage Solutions
- **User Profiles**: Stored in Firestore with role-based data structure
- **Document Storage**: Firebase Storage with organized folder structure by user ID
- **Session Management**: Browser sessionStorage for temporary user data caching
- **Authentication State**: Firebase Auth state persistence across browser sessions

## Authentication and Authorization
- **Authentication Method**: Email/password authentication via Firebase Auth
- **Role-based Access Control**: Seven distinct user roles (Student, Teacher, Teacher Assistant, Parent, Principal, Admin, SGB)
- **Route Protection**: Client-side authentication state checking with automatic redirects
- **Document Verification**: Required document uploads for student registration (ID copy, birth certificate, clinic card)

## User Interface Design
- **Responsive Design**: Mobile-first approach with viewport meta tags
- **Visual Feedback**: Loading indicators, error messages, and success notifications
- **Navigation**: Role-based dashboard navigation with logout functionality
- **Notifications**: Real-time notification system with badge indicators
- **Charts and Analytics**: Performance and attendance tracking with Chart.js visualizations

# External Dependencies

## Firebase Services
- **Firebase Authentication v10**: User registration, login, and session management
- **Firebase Firestore v10**: NoSQL database for storing user profiles and application data
- **Firebase Storage v10**: Cloud storage for document uploads and file management
- **Firebase App v10**: Core Firebase SDK for service initialization

## Third-party Libraries
- **Chart.js**: JavaScript charting library for performance analytics and data visualization
- **Firebase CDN**: All Firebase services loaded via Google's CDN for reliability and performance

## Browser APIs
- **File API**: For handling document uploads (ID copies, certificates)
- **Local Storage**: For client-side data persistence and caching
- **Fetch API**: For making HTTP requests (implicit in Firebase SDK usage)

## Configuration Requirements
- **Firebase Project**: Requires Firebase project setup with API keys and service configuration
- **Domain Configuration**: Firebase Auth domain and storage bucket configuration needed
- **File Upload Limits**: Configured through Firebase Storage rules and quotas