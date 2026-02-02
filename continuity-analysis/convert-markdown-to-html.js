const fs = require('fs');
const path = require('path');

// Read the markdown file
const mdPath = path.join(__dirname, 'narrative-master-EDITED.md');
const markdown = fs.readFileSync(mdPath, 'utf-8');

// Convert markdown to HTML with special handling for diff markers
function convertToHTML(md) {
  let html = md;
  
  // Convert headers
  html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
  html = html.replace(/^## (.*?)$/gm, '<h2 id="$1">$1</h2>');
  html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
  html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');
  
  // Convert diff markers with special styling
  // Red strikethrough for deletions
  html = html.replace(/🔴 ~~(.*?)~~/g, '<span class="deleted">$1</span>');
  
  // Green bold for additions
  html = html.replace(/🟢 \*\*(.*?)\*\*/g, '<span class="added">$1</span>');
  
  // Edit notes with special styling
  html = html.replace(/💡 \*\*EDIT NOTE:\*\* (.*?)$/gm, '<div class="edit-note">💡 <strong>EDIT NOTE:</strong> $1</div>');
  
  // Regular bold and italic
  html = html.replace(/\*\*\*\*(.*?)\*\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Convert lists
  html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');
  
  // Convert horizontal rules
  html = html.replace(/^---$/gm, '<hr>');
  
  // Convert paragraphs (lines that aren't already HTML)
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    // Skip if already HTML or empty
    if (line.trim() === '' || line.match(/^<[^>]+>/)) {
      return line;
    }
    // If it's regular text, wrap in paragraph
    if (!line.match(/^#|^<|^-|^\*/)) {
      return `<p>${line}</p>`;
    }
    return line;
  });
  
  html = processedLines.join('\n');
  
  return html;
}

// Create HTML with styling
const htmlContent = convertToHTML(markdown);

const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Learning Stories - Narrative (Edited)</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: #f5f5f5;
    }
    
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
      margin: 40px 0 20px 0;
      font-size: 2.5em;
    }
    
    h2 {
      color: #34495e;
      border-bottom: 2px solid #95a5a6;
      padding-bottom: 8px;
      margin: 35px 0 15px 0;
      font-size: 2em;
      scroll-margin-top: 20px;
    }
    
    h3 {
      color: #555;
      margin: 25px 0 12px 0;
      font-size: 1.5em;
    }
    
    h4 {
      color: #666;
      margin: 20px 0 10px 0;
      font-size: 1.2em;
    }
    
    p {
      margin: 12px 0;
      text-align: justify;
    }
    
    ul {
      margin: 15px 0;
      padding-left: 30px;
    }
    
    li {
      margin: 8px 0;
    }
    
    hr {
      border: none;
      border-top: 2px solid #ddd;
      margin: 30px 0;
    }
    
    /* Diff marker styling */
    .deleted {
      background-color: #ffebee;
      color: #c62828;
      text-decoration: line-through;
      padding: 2px 4px;
      border-radius: 3px;
      font-weight: 500;
    }
    
    .added {
      background-color: #e8f5e9;
      color: #2e7d32;
      font-weight: bold;
      padding: 2px 4px;
      border-radius: 3px;
    }
    
    .edit-note {
      background-color: #fff3e0;
      border-left: 4px solid #ff9800;
      padding: 12px 15px;
      margin: 15px 0;
      border-radius: 4px;
      font-size: 0.95em;
      color: #e65100;
    }
    
    .edit-note strong {
      color: #bf360c;
    }
    
    /* Table of contents styling */
    #toc {
      background: white;
      border: 2px solid #3498db;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0 40px 0;
      position: sticky;
      top: 20px;
      z-index: 100;
    }
    
    #toc h2 {
      margin-top: 0;
      border: none;
      color: #3498db;
    }
    
    #toc ul {
      list-style: none;
      padding: 0;
    }
    
    #toc li {
      margin: 8px 0;
    }
    
    #toc a {
      color: #3498db;
      text-decoration: none;
      padding: 5px 10px;
      display: block;
      border-radius: 4px;
      transition: background 0.2s;
    }
    
    #toc a:hover {
      background: #e3f2fd;
    }
    
    /* Print styles */
    @media print {
      body {
        background: white;
        max-width: none;
      }
      
      #toc {
        position: static;
        page-break-after: always;
      }
      
      h1, h2, h3 {
        page-break-after: avoid;
      }
      
      .edit-note {
        page-break-inside: avoid;
      }
    }
    
    /* Mobile styles */
    @media (max-width: 768px) {
      body {
        padding: 15px;
      }
      
      h1 {
        font-size: 2em;
      }
      
      h2 {
        font-size: 1.6em;
      }
      
      #toc {
        position: static;
      }
    }
  </style>
</head>
<body>
  <div id="toc">
    <h2>📚 Table of Contents</h2>
    <ul>
      <li><a href="#1. Components Basics">1. Components Basics</a></li>
      <li><a href="#2. State Management">2. State Management</a></li>
      <li><a href="#3. Props Data Flow">3. Props Data Flow</a></li>
      <li><a href="#4. Hooks In Action">4. Hooks In Action</a></li>
      <li><a href="#5. Forms Events">5. Forms & Events</a></li>
      <li><a href="#6. Routing Navigation">6. Routing Navigation</a></li>
      <li><a href="#7. Performance Optimization">7. Performance Optimization</a></li>
      <li><a href="#8. Testing Debugging">8. Testing & Debugging</a></li>
      <li><a href="#9. Advanced Patterns">9. Advanced Patterns</a></li>
      <li><a href="#10. React Ecosystem">10. React Ecosystem</a></li>
      <li><a href="#11. Server Data">11. Server Data</a></li>
      <li><a href="#12. Typescript React">12. TypeScript React</a></li>
      <li><a href="#13. Build Deploy">13. Build & Deploy</a></li>
      <li><a href="#14. React Native">14. React Native</a></li>
      <li><a href="#15. Accessibility">15. Accessibility</a></li>
    </ul>
  </div>

  ${htmlContent}
  
  <script>
    // Smooth scrolling for TOC links
    document.querySelectorAll('#toc a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  </script>
</body>
</html>`;

// Write HTML file
const htmlPath = path.join(__dirname, 'narrative-master-EDITED.html');
fs.writeFileSync(htmlPath, fullHTML, 'utf-8');

console.log('✅ HTML file created successfully!');
console.log(`📁 Location: ${htmlPath}`);
console.log('📄 You can now open this file in your browser and export as PDF');
