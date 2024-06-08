<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
 
</head>
<body>

<h1>Spam Detection API</h1>

<p>This project is a REST API designed for a mobile app that identifies spam phone numbers and allows users to search for contacts by name or phone number. The API is built using Node.js with Express and SQLite for data storage. Below you'll find instructions on how to set up, run, and test the API, along with details about the project's structure and functionality.</p>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#setup">Setup</a></li>
  <li><a href="#running-the-api">Running the API</a></li>
  <li><a href="#testing-the-api">Testing the API</a></li>
  <li><a href="#project-structure">Project Structure</a></li>
  <li><a href="#api-endpoints">API Endpoints</a></li>
  <li><a href="#technology-stack">Technology Stack</a></li>
  <li><a href="#functionality">Functionality</a></li>
</ul>

<h2 id="setup">Setup</h2>
<ol>
  <li>Clone the repository to your local machine:</li>
  <pre><code>git clone &lt;repository_url&gt;</code></pre>
  <li>Navigate to the project directory:</li>
  <pre><code>cd spam_detection_api</code></pre>
  <li>Install the required dependencies:</li>
  <pre><code>npm install</code></pre>
  <li>Ensure SQLite is installed on your system. If not, download and install it from <a href="https://www.sqlite.org/download.html">SQLite Downloads</a>.</li>
  <li>Run the script to populate the database with sample data:</li>
  <pre><code>node populateDB.js</code></pre>
</ol>

<h2 id="running-the-api">Running the API</h2>
<ol>
  <li>Start the API server:</li>
  <pre><code>npm start</code></pre>
  <li>The server will be running on <a href="http://localhost:3000">http://localhost:3000</a></li>
</ol>

<h2 id="testing-the-api">Testing the API</h2>
<ol>
  <li>To run tests, make sure you have Mocha installed. If not, install it:</li>
  <pre><code>npm install --save-dev mocha chai chai-http</code></pre>
  <li>Run the tests:</li>
  <pre><code>npm test</code></pre>
</ol>

<h2 id="project-structure">Project Structure</h2>
<p>The project is structured as follows:</p>
<pre><code>.
├── controllers
│   ├── authController.js
│   ├── contactsController.js
│   ├── searchController.js
├── middleware
│   ├── authMiddleware.js
├── models
│   ├── user.js
├── routes
│   ├── auth.js
│   ├── contacts.js
│   ├── search.js
├── tests
│   ├── auth.test.js
│   ├── contacts.test.js
│   ├── search.test.js
├── populateDB.js
├── index.js
├── package.json
├── README.html
└── spam_detection.db
</code></pre>

<h2 id="api-endpoints">API Endpoints</h2>
<p>The following endpoints are available in the API:</p>
<ul>
  <li><strong>POST /api/auth/register</strong>: Register a new user.</li>
  <li><strong>POST /api/auth/login</strong>: Log in a user and receive a token.</li>
  <li><strong>GET /api/search/name</strong>: Search for a user by name.</li>
  <li><strong>GET /api/search/phone</strong>: Search for a user by phone number.</li>
  <li><strong>POST /api/contacts/mark-spam</strong>: Mark a phone number as spam.</li>
</ul>

<h2 id="technology-stack">Technology Stack</h2>
<p>The following technologies are used in this project:</p>
<ul>
  <li><strong>Node.js</strong>: JavaScript runtime environment.</li>
  <li><strong>Express</strong>: Web framework for Node.js.</li>
  <li><strong>SQLite</strong>: Relational database management system.</li>
  <li><strong>Mocha</strong>: Test framework for Node.js.</li>
  <li><strong>Chai</strong>: Assertion library for Node.js.</li>
</ul>

<h2 id="functionality">Functionality</h2>
<p>The API provides the following core functionalities:</p>
<ul>
  <li><strong>User Registration and Authentication</strong>: Users can register with a name, phone number, and password. They can log in to receive a token for authenticated actions.</li>
  <li><strong>Contact Management</strong>: Users can manage their contacts, marking numbers as spam if necessary.</li>
  <li><strong>Search</strong>: Users can search for contacts by name or phone number. The search results include information about the spam likelihood.</li>
  <li><strong>Security</strong>: JWT (JSON Web Token) is used for securing the endpoints. Middleware is implemented to verify the token for protected routes.</li>
</ul>

</body>
</html>
