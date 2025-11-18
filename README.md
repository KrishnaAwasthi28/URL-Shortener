<h1>SmartLink - URL Shortener</h1>

<p>
  SmartLink is a simple and efficient URL Shortener application built using 
  <strong>React.js</strong> for the frontend and 
  <strong>Spring Boot + MySQL</strong> for the backend.
  It allows users to convert long URLs into short, shareable links that redirect instantly.
</p>

<h2>🚀 Features</h2>
<ul>
  <li>Shorten long URLs instantly</li>
  <li>Store URL mappings in MySQL database</li>
  <li>Automatic redirection using short codes</li>
  <li>Clean and responsive frontend UI</li>
  <li>Copy short URL to clipboard</li>
  <li>Loading state & error handling</li>
</ul>

<h2>🛠️ Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React.js, Axios</li>
  <li><strong>Backend:</strong> Spring Boot, Java</li>
  <li><strong>Database:</strong> MySQL</li>
</ul>

<h2>📌 API Endpoints</h2>

<h3>1. POST /shorten</h3>
<p><strong>Request Body:</strong></p>
<pre>
{
  "longUrl": "https://example.com/my/very/long/url"
}
</pre>

<p><strong>Response:</strong></p>
<pre>
{
  "shortUrl": "http://localhost:8080/abc123"
}
</pre>

<h3>2. GET /{shortCode}</h3>
<p>
  Visiting the short URL redirects the user to the original URL.
</p>

<h2>🗄️ Database Structure</h2>
<pre>
Table: url_mapping
---------------------------------------
id (PRIMARY KEY)
long_url (TEXT)
short_code (VARCHAR)
</pre>

<h2>🧪 How to Run the Project</h2>

<h3>Backend (Spring Boot)</h3>
<ul>
  <li>Configure MySQL credentials in <code>application.properties</code></li>
  <li>Run the Spring Boot project</li>
  <li>Backend runs on <strong>http://localhost:8080</strong></li>
</ul>

<h3>Frontend (React.js)</h3>
<ul>
  <li>Install dependencies: <code>npm install</code></li>
  <li>Start the app: <code>npm run dev</code></li>
  <li>Frontend runs on <strong>http://localhost:5173</strong></li>
</ul>

<h2>📸 Screenshots</h2>
<p>You can add screenshots here:</p>
<ul>
  <li>Home Page UI</li>
  <li>Working Short URL</li>
  <li>Database Row Example</li>
</ul>

<h2>📈 Future Enhancements</h2>
<ul>
  <li>Click Tracking (count how many times a link is opened)</li>
  <li>QR Code generation for each short URL</li>
  <li>User accounts & link management dashboard</li>
  <li>Custom aliases for short links</li>
</ul>

<h2>💛 Author</h2>
<p>Developed by <strong>Krishna Awasthi</strong></p>
