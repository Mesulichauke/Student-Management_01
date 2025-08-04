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

## Multi-Level Performance Measurement System (January 4, 2025)
- **Hierarchical Performance Tracking**: Implemented comprehensive multi-level performance measurement where student scores measure teacher performance, parent feedback measures teachers, teacher performance measures principals, and principal performance measures SGB
- **Teacher Performance Dashboard**: Enhanced teacher-profile.html with detailed student achievement metrics, parent satisfaction ratings, professional engagement tracking, and overall performance scoring
- **Principal Performance Monitoring**: Added teacher performance management dashboard to principal-profile.html showing individual teacher metrics, overall school statistics, and principal performance scoring
- **SGB Commitment Tracking**: Enhanced sgb-profile.html with principal performance monitoring, SGB commitment metrics, goal progress tracking, and comprehensive performance dashboards
- **Performance Metrics CSS**: Added extensive styling for performance cards, rating displays, progress bars, feedback sections, and responsive performance tables
- **Firebase Configuration Update**: Standardized all profiles to use Firebase 10.13.2 and consistent configuration across the system

## Complete Profile System Implementation
- **principal-profile.html**: Complete Principal dashboard with KPI overview, leadership rating system, report submission, budget allocation, and teacher performance management features
- **sgb-profile.html**: Comprehensive SGB dashboard with school monitoring, attendance tracking, budget management, leadership ratings, principal performance monitoring, and SGB commitment tracking
- **teacher-profile.html**: Full Teacher dashboard with attendance management, grade recording, student feedback system, class scheduling, performance analytics, parent feedback tracking, and professional engagement metrics
- **parent-profile.html**: Parent portal with child's academic performance tracking, attendance monitoring, teacher communication, and event scheduling
- **admin-profile.html**: System administrator dashboard with user management, system reports, database management, security settings, and audit logs
- **teacher-assistant-profile.html**: TA interface with task management, class support activities, schedule tracking, and performance monitoring
- **Enhanced Firebase Integration**: All profiles fully integrated with Firestore for data persistence across all user roles
- **Role-based Authentication**: Complete routing system directing all user roles to their appropriate specialized dashboards

## Complete Feature Set
- **Multi-Level Performance Hierarchy**: Student achievements → Teacher performance → Principal performance → SGB performance with detailed scoring and feedback systems
- **Performance Analytics**: Comprehensive performance tracking with visual dashboards, trend analysis, and actionable insights across all roles
- **Leadership Management**: Cross-role rating system for evaluating SGB, HOD, and Teacher performance with weighted scoring algorithms
- **Budget Management**: Comprehensive budget allocation, tracking, and historical reporting across Principal and SGB roles
- **Attendance Systems**: Multi-level attendance tracking for students, teachers, and staff with status monitoring
- **Grade Management**: Teacher grade recording system with student performance analytics
- **Communication Platform**: Parent-teacher messaging system with subject categorization and feedback tracking
- **Task Management**: Teacher Assistant task assignment and completion tracking
- **System Administration**: Complete user management, security controls, and system monitoring
- **Document Management**: File upload system for student registration documents
- **Notification Systems**: Real-time alerts and performance monitoring across all roles
- **Responsive Design**: Mobile-first approach consistent across all profile pages with performance-optimized layouts
- **Firebase Integration**: Complete cloud-based data persistence and authentication with standardized configuration