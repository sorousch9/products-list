# Products List

This is a React app that displays a list of products. It uses Redux for state management and Axios for making API requests.

## Installation

To install this project, follow the steps below:

1. Clone the repository to your local machine using the following command:

<pre><code>git clone https://github.com/sorousch9/products-list.git</code></pre>

2. Navigate to the project directory using the following command:

<pre><code>cd products-list</code></pre>

3. Install the project dependencies by running the following command:
<pre><code>npm install</code></pre>

4. Install json-server globally by running the following command:
<pre><code>npm install -g json-server</code></pre>

5. Open a new terminal window and start the json-server by running the following command:
<pre><code>json-server --watch db.json --port 3004</code></pre>

6. If you encounter the error "json-server cannot be loaded because running scripts is disabled on this system", open your PowerShell as an administrator or normal and set its execution policy with the following command:
<pre><code>Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser</code></pre>

## Usage

To start the app, run the following command:

`npm start`

The app will be available at http://localhost:3000.

## Dependencies

This project has the following dependencies:

```bash
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- @reduxjs/toolkit
- axios
- immer
- react
- react-dom
- react-redux
- react-router-dom
- redux-persist
- web-vitals

All dependencies are listed in the `package.json` file.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
```
