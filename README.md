My Chart App
This is a React.js application that utilizes Recharts to display interactive line charts based on timestamped data provided in JSON format. The application allows users to dynamically switch between daily, weekly, and monthly views of the data.

Features
Dynamic Timeframe Selection: Switch between daily, weekly, and monthly views of the data using buttons.
Interactive Charts: Click on data points in the chart to view detailed information.
Export as PNG: Export the displayed chart as a PNG image for external use.
Getting Started
To run this application locally:

Clone the repository.
Install dependencies using npm install.
Start the development server with npm start.
Open http://localhost:3000 to view the app in your browser.
Dependencies
React.js
Recharts
html-to-image
Data Format
Ensure your data follows this JSON format:

json
Copy code
[
  {"timestamp": "YYYY-MM-DDTHH:mm:ssZ", "value": number},
  {"timestamp": "YYYY-MM-DDTHH:mm:ssZ", "value": number},
  ...
]


hosted site link
