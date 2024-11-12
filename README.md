**_*Google Drive Integration Application*_******

This Angular application allows users to interact with their Google Drive accounts to view, upload, download, and delete files through Google OAuth. Styled with Tailwind CSS, it provides a responsive and user-friendly experience.

Table of Contents
Overview
Features
Setup and Installation
Running the Application
Assumptions and Design Decisions
Overview

This application provides seamless integration with Google Drive using the Google Drive API and Angular standalone components. Users can authenticate using Google OAuth and manage their Google Drive files directly through the application.

**_Features_**
OAuth 2.0 Authentication: Securely log in with Google to access Google Drive files.
File Management: View, upload, download, and delete files.
Responsive UI: Tailwind CSS styling for a clean, accessible layout.
Setup and Installation
Prerequisites
Node.js: Version 14 or higher.
Google Cloud Project: Enable Google Drive API and create OAuth credentials.
Installation Steps
Clone the Repository:


git clone <repository-url>
cd google-drive-integration
Install Dependencies:_


_npm install_

**Configure OAuth:**__

Open src/app/services/google-drive.service.ts.

Replace 'YOUR_GOOGLE_CLIENT_ID' with your Google OAuth Client ID.

Ensure your Redirect URI is set in Google Cloud Console (e.g., http://localhost:4200 for local development).
Set Up Environment Variables (Optional):

ng serve

Visit the app at _http://localhost:4200._

**Run Unit Tests:**__


ng test


**Assumptions and Design Decisions**__

Google Authentication: Google OAuth 2.0 is implemented to securely authenticate users.

Error Handling:

The app logs errors to the console for easy debugging.
A 403 error response (e.g., missing API key) prompts users to check authentication.
Browser Environment Check: The window object is accessed only in the browser environment using Angular’s isPlatformBrowser, which is helpful for server-side rendering or test environments.

Styling: Tailwind CSS is used for responsive styling with accessibility in mind.

Standalone Components: Angular 18 standalone components simplify the app structure and reduce dependency on traditional modules.

Testing Framework: Cypress is chosen over Protractor for end-to-end testing due to its modern feature set and ease of integration.

