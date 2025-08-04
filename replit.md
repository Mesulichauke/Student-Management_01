# Overview

This is a Student Management System built as a web application that provides authentication and dashboard functionality for educational institutions. The system supports multiple user roles including students, teachers, administrators, parents, principals, and SGB members, with role-based access control and comprehensive dashboard features including leadership ratings, budget management, and reporting capabilities.

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
- **Route Protection**: Client-side authentication state checking with automatic redirects to role-specific dashboards
- **Document Verification**: Required document uploads for student registration (ID copy, birth certificate, clinic card)
- **Leadership Management**: Principal and SGB roles can rate and manage other leadership positions

## User Interface Design
- **Responsive Design**: Mobile-first approach with viewport meta tags
- **Visual Feedback**: Loading indicators, error messages, and success notifications
- **Navigation**: Role-based dashboard navigation with logout functionality
- **Notifications**: Real-time notification system with badge indicators for performance monitoring
- **Charts and Analytics**: Performance and attendance tracking with Chart.js visualizations
- **Leadership Dashboards**: Comprehensive Principal and SGB dashboards with budget management, reporting, and leadership rating systems
- **Dropdown Interfaces**: Collapsible sections for organized content presentation

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

# Recent Updates (January 2025)

## New Principal and SGB Profile Pages
- **principal-profile.html**: Complete Principal dashboard with KPI overview, leadership rating system, report submission, and budget allocation features
- **sgb-profile.html**: Comprehensive SGB dashboard with school monitoring, attendance tracking, budget management, leadership ratings, and notification system
- **Enhanced Firebase Integration**: Both profiles fully integrated with Firestore for data persistence of ratings, reports, budgets, and attendance records
- **Role-based Authentication**: Updated routing system to properly direct Principal and SGB users to their respective dashboards
- **Real-time Data**: Live performance monitoring with notification systems for identifying irregularities in student and teacher performance

## Key Features Added
- Leadership rating system for cross-role evaluation
- Budget allocation and tracking with historical records
- Report submission system with categorization (weekly, monthly, term)
- Attendance management with status tracking
- Performance monitoring with automated alerts
- Responsive design consistent with existing system architecture