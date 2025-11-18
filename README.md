**<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>SmartLink — URL Shortener (README)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; color: #222; background: #f6f8ff; padding: 32px; }
    .card { background: #fff; border-radius: 12px; padding: 28px; max-width: 900px; margin: 0 auto; box-shadow: 0 6px 20px rgba(45,55,80,0.08); }
    h1 { color: royalblue; margin-bottom: 6px; }
    h2 { color: #333; margin-top: 24px; }
    p.lead { color: #444; margin-top: 0; }
    pre { background: #0b1220; color: #e6eef8; padding: 14px; border-radius: 8px; overflow: auto; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", monospace; font-size: 0.95rem; }
    ul { line-height: 1.6; }
    .note { background: #eef6ff; padding: 10px 12px; border-radius: 8px; color: #1a3b8a; margin: 14px 0; }
    .small { font-size: 0.9rem; color: #666; }
  </style>
</head>
<body>
  <div class="card">
    <h1>SmartLink — URL Shortener with Click Tracking</h1>
    <p class="lead">A minimal full-stack project that shortens long URLs and redirects users to the original target. Built with <strong>React.js</strong> (frontend), <strong>Spring Boot</strong> (backend), and <strong>MySQL</strong> (database).</p>

    <h2>Features</h2>
    <ul>
      <li>Shorten long URLs into compact short codes (example: <code>http://yourdomain.com/abc123</code>).</li>
      <li>Persistent storage of URL mappings in MySQL.</li>
      <li>Server-side redirect from short code → original URL.</li>
      <li>Simple UI with copy-to-clipboard and loading indicator.</li>
      <li>(Optional) Click tracking to count visits per short link.</li>
    </ul>

    <h2>Tech Stack</h2>
    <ul>
      <li>Frontend: React.js (+ Axios)</li>
      <li>Backend: Spring Boot (Java)</li>
      <li>Database: MySQL</li>
      <li>Dev tools: Postman (for API testing), Vite or Create React App (frontend)</li>
    </ul>

    <h2>Repository Structure (suggested)</h2>
    <ul>
      <li><code>/frontend</code> — React app (Home, About, ShortenForm components)</li>
      <li><code>/backend</code> — Spring Boot app (controllers, services, repository, entity)</li>
      <li><code>/README.html</code> — this file</li>
    </ul>

    <h2>Quick Setup</h2>
    <h3>1. Database (MySQL)</h3>
    <p class="small">Create a database for the app (example: <code>urlshortener</code>).</p>
    <pre><code># MySQL console
CREATE DATABASE urlshortener CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
</code></pre>

    <h3>2. Backend — Spring Boot</h3>
    <p class="small">Configure <code>application.properties</code> (or <code>application.yml</code>) in your Spring Boot project:</p>
    <pre><code>spring.datasource.url=jdbc:mysql://localhost:3306/urlshortener
spring.datasource.username=YOUR_DB_USER
spring.datasource.password=YOUR_DB_PASSWORD
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
</code></pre>

    <p class="small">Basic Entity (URL mapping):</p>
    <pre><code>public class UrlMapping {
  private Long id;
  private String longUrl;
  private String shortCode;
  private Integer clickCount; // optional
  // getters / setters / JPA annotations
}</code></pre>

    <p class="small">Start backend:</p>
    <pre><code># Using Maven
mvn spring-boot:run

# or run from your IDE
</code></pre>

    <h3>3. Frontend — React</h3>
    <p class="small">From the <code>/frontend</code> folder (Vite or CRA):</p>
    <pre><code>npm install
npm run dev   # Vite (default 5173)

# or
npm start     # Create React App
</code></pre>

    <div class="note">
      <strong>Important:</strong> If your Spring controller is annotated with a prefix like <code>@RequestMapping("/api")</code>,
      your client must call <code>/api/shorten</code> (not <code>/shorten</code>). Also enable CORS in Spring or use a global CORS configuration:
      <pre><code>@CrossOrigin(origins = "http://localhost:5173")</code></pre>
    </div>

    <h2>API Reference</h2>
    <h3>POST /shorten (or /api/shorten)</h3>
    <p>Request body (JSON):</p>
    <pre><code>{
  "longUrl": "https://example.com/some/long/path"
}
</code></pre>
    <p>Success response example (HTTP 200):</p>
    <pre><code>{
  "shortUrl": "http://localhost:8080/0ff272"
}</code></pre>

    <h3>GET /{shortCode}</h3>
    <p>Visiting the short URL performs an HTTP redirect (302 or 307) to the original <code>longUrl</code>. If the code is not found, a 404 or fallback redirect is returned depending on implementation.</p>

    <h2>Postman Testing</h2>
    <ol>
      <li>POST to <code>http://localhost:8080/shorten</code> with the JSON body above — you should get a <code>shortUrl</code> in response.</li>
      <li>Open the returned <code>shortUrl</code> in a browser — it should redirect to the original long URL.</li>
    </ol>

    <h2>Optional: Click Tracking</h2>
    <p class="small">To enable click counts:</p>
    <ol>
      <li>Add a <code>clickCount</code> (INT) column to the entity and DB table.</li>
      <li>In the redirect handler, increment <code>clickCount</code> and save the entity before returning the redirect response.</li>
    </ol>
    <pre><code>@GetMapping("/{code}")
public RedirectView redirect(@PathVariable String code) {
  var opt = repository.findByShortCode(code);
  if (opt.isPresent()) {
    var m = opt.get();
    m.setClickCount(m.getClickCount() + 1);
    repository.save(m);
    return new RedirectView(m.getLongUrl());
  }
  return new RedirectView("https://example.com/not-found");
}</code></pre>

    <h2>Deployment Notes</h2>
    <ul>
      <li><strong>Backend:</strong> Render, Railway, or Heroku-style platforms (jar deployment). Set production DB (PlanetScale, Railway MySQL, or an RDS instance).</li>
      <li><strong>Frontend:</strong> Vercel, Netlify, or GitHub Pages. Configure the frontend to call the deployed backend URL (not localhost).</li>
      <li><strong>Domain:</strong> If you want short-links like <code>https://smartlink.me/abc123</code>, buy a domain and point to your backend service.</li>
    </ul>

    <h2>Troubleshooting</h2>
    <ul>
      <li><strong>404 on short URL:</strong> Check your redirect @GetMapping path and any controller-level @RequestMapping prefix (like <code>/api</code>).</li>
      <li><strong>Frontend CORS errors:</strong> Ensure <code>@CrossOrigin</code> or a global CORS config allows your frontend origin.</li>
      <li><strong>Short URL shows duplicate prefix:</strong> Use the exact field your backend returns (e.g. <code>shortUrl</code>), don't prepend domain twice.</li>
    </ul>

    <h2>Contributing</h2>
    <p class="small">PRs welcome! If you want to add features (custom alias, auth, dashboard, analytics), fork the repo, implement your change, and open a pull request with a short description of intent and testing steps.</p>

    <h2>License</h2>
    <p class="small">MIT — feel free to use, modify, and learn from this project.</p>

    <hr/>
    <p class="small">Built with ❤️ — React + Spring Boot. For help, screenshot issues and paste console/backend logs when requesting debugging.</p>
  </div>
</body>
</html>
**
