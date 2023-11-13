# The Celebrity Finder
This project is a simple Celebrity Finder App that allows users to view, search, edit, and delete user information. It features a responsive design and includes functionality to filter users based on search terms, toggle user details, edit user information, and delete users. The project uses local data for demonstration purposes.

## Table of Contents
1. Installation
2. Usage
3. Features
4. Folder Structure

## Installation
1. ContributingClone the repository: git clone https://github.com/your-username/react-user-management-app.git
2. Navigate to the project directory: cd react-user-management-app
3. Install dependencies: npm install
4. Run the application: npm start
5. Open your browser and visit http://localhost:3000

## Usage
- Upon launching the application, list of users are displayed.
- Use the search bar to filter users based on their names.
- Click on a user to expand and view detailed information.
- Edit user details by clicking the "Edit" button (available for adult users only).
- Delete a user by clicking the "Delete" button.

## Features
1. Search Users: Utilize the search bar to filter users based on their names.
2. User Details: Click on a user to expand and view detailed information, including age, gender, country and description.
3. Edit User: Edit user details, including age, gender, country, and description. Editing is restricted to adult users (18 years or older).
4. Delete User: Delete a user by clicking the "Delete" button. A confirmation modal will appear before deletion.
5. Confirm Edit: If the user is edited then submit the changes.
6. Cancel: To cancel the user details changes.

## Folder Structure
1. src/ : Contains the application source code.
2. Styles.css : Styles for the application.
3. Data.js : Mock data for user information.
4. DeleteModal.js : Modal component for user deletion confirmation.
5. App.js : Main application component.

## Dependencies
1. React
2. React Hooks
3. CSS (for styling)

 
