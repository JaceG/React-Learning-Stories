const fs = require('fs');
const path = require('path');

// Read the markdown file
const mdPath = path.join(__dirname, 'narrative-master-EDITED.md');
const markdown = fs.readFileSync(mdPath, 'utf-8');

// Helper function to create valid HTML IDs
function createId(text) {
	return text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// Convert markdown to HTML with special handling for diff markers
function convertToHTML(md) {
	let html = md;

	// Convert headers with proper IDs
	html = html.replace(/^# (.*?)$/gm, (match, title) => {
		const id = createId(title);
		return `<h1 id="${id}">${title}</h1>`;
	});
	html = html.replace(/^## (.*?)$/gm, (match, title) => {
		const id = createId(title);
		return `<h2 id="${id}">${title}</h2>`;
	});
	html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
	html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');

	// Convert inline code FIRST (before bold/italic to avoid conflicts)
	html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

	// Convert diff markers with special styling
	// Red strikethrough for deletions
	html = html.replace(/🔴 ~~(.*?)~~/g, '<span class="deleted">$1</span>');

	// Green bold for additions
	html = html.replace(/🟢 \*\*(.*?)\*\*/g, '<span class="added">$1</span>');

	// Edit notes with special styling
	html = html.replace(
		/💡 \*\*EDIT NOTE:\*\* (.*?)$/gm,
		'<div class="edit-note">💡 <strong>EDIT NOTE:</strong> $1</div>'
	);

	// Regular bold and italic (after code conversion)
	html = html.replace(
		/\*\*\*\*(.*?)\*\*\*\*/g,
		'<strong><em>$1</em></strong>'
	);
	html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
	html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
	html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

	// Convert lists
	html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
	html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

	// Convert horizontal rules
	html = html.replace(/^---$/gm, '<hr>');

	// Convert paragraphs - group consecutive non-empty lines together
	const lines = html.split('\n');
	const paragraphs = [];
	let currentParagraph = [];
	
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		const trimmed = line.trim();
		
		// If empty line, close current paragraph
		if (trimmed === '') {
			if (currentParagraph.length > 0) {
				const joined = currentParagraph.join(' ').trim();
				// Check if it's already a block element
				if (joined.match(/^<(h\d|div|ul|ol|hr|li|blockquote|strong|em)/)) {
					paragraphs.push(joined);
				} else {
					paragraphs.push(`<p>${joined}</p>`);
				}
				currentParagraph = [];
			}
			paragraphs.push('');
			continue;
		}
		
		// If it's a block-level element, close current paragraph and add it
		if (trimmed.match(/^<(h\d|div|ul|hr|blockquote)/)) {
			if (currentParagraph.length > 0) {
				const joined = currentParagraph.join(' ').trim();
				paragraphs.push(`<p>${joined}</p>`);
				currentParagraph = [];
			}
			paragraphs.push(line);
			continue;
		}
		
		// Otherwise, add to current paragraph
		currentParagraph.push(line);
	}
	
	// Don't forget the last paragraph
	if (currentParagraph.length > 0) {
		const joined = currentParagraph.join(' ').trim();
		if (joined.match(/^<(h\d|div|ul|hr|blockquote)/)) {
			paragraphs.push(joined);
		} else {
			paragraphs.push(`<p>${joined}</p>`);
		}
	}
	
	html = paragraphs.join('\n');

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
      scroll-margin-top: 100px;
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
    
    code {
      background-color: #f4f4f4;
      border: 1px solid #ddd;
      border-radius: 3px;
      padding: 2px 6px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 0.9em;
      color: #c7254e;
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
    
    /* Table of contents styling - Compact top bar */
    #toc {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      margin: 0 0 30px 0;
      border-radius: 0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    
    #toc h2 {
      margin: 0 0 10px 0;
      border: none;
      color: white;
      font-size: 1.2em;
      display: inline-block;
      margin-right: 20px;
    }
    
    #toc ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }
    
    #toc li {
      margin: 0;
      display: inline-block;
    }
    
    #toc a {
      color: white;
      text-decoration: none;
      padding: 6px 12px;
      display: inline-block;
      border-radius: 20px;
      background: rgba(255,255,255,0.2);
      font-size: 0.9em;
      transition: all 0.2s;
      border: 1px solid rgba(255,255,255,0.3);
    }
    
    #toc a:hover {
      background: rgba(255,255,255,0.3);
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    
    /* Print styles */
    @media print {
      body {
        background: white;
        max-width: none;
      }
      
      #toc {
        background: white;
        color: black;
        border: 2px solid #333;
        page-break-after: always;
        padding: 20px;
      }
      
      #toc h2 {
        color: black;
      }
      
      #toc a {
        color: #333;
        background: #f0f0f0;
        border-color: #333;
      }
      
      #toc ul {
        flex-direction: column;
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
      
      #toc ul {
        flex-direction: column;
      }
      
      #toc a {
        display: block;
        text-align: center;
      }
    }
  </style>
</head>
<body>
  <div id="toc">
    <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 15px;">
      <h2>📚 Navigation:</h2>
      <ul>
        <li><a href="#1-components-basics">1. Components</a></li>
        <li><a href="#2-state-management">2. State</a></li>
        <li><a href="#3-props-data-flow">3. Props</a></li>
        <li><a href="#4-hooks-in-action">4. Hooks</a></li>
        <li><a href="#5-forms-events">5. Forms</a></li>
        <li><a href="#6-routing-navigation">6. Routing</a></li>
        <li><a href="#7-performance-optimization">7. Performance</a></li>
        <li><a href="#8-testing-debugging">8. Testing</a></li>
        <li><a href="#9-advanced-patterns">9. Advanced</a></li>
        <li><a href="#10-react-ecosystem">10. Ecosystem</a></li>
        <li><a href="#11-server-data">11. Server</a></li>
        <li><a href="#12-typescript-react">12. TypeScript</a></li>
        <li><a href="#13-build-deploy">13. Build</a></li>
        <li><a href="#14-react-native">14. Native</a></li>
        <li><a href="#15-accessibility">15. A11y</a></li>
      </ul>
    </div>
  </div>

  ${htmlContent}
  
  <script>
    // No JavaScript needed - browser handles anchor links natively!
    // The scroll-margin-top CSS property handles the offset automatically
  </script>
</body>
</html>`;

// Write HTML file
const htmlPath = path.join(__dirname, 'narrative-master-EDITED.html');
fs.writeFileSync(htmlPath, fullHTML, 'utf-8');

console.log('✅ HTML file created successfully!');
console.log(`📁 Location: ${htmlPath}`);
console.log('📄 You can now open this file in your browser and export as PDF');
