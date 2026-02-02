const fs = require('fs');
const path = require('path');

// Read the markdown file
const inputFile = path.join(__dirname, 'narrative-master-EDITED.md');
const outputFile = path.join(__dirname, 'narrative-master-EDITED.html');

console.log('Reading markdown file...');
const markdown = fs.readFileSync(inputFile, 'utf8');

console.log('Converting to HTML...');

// HTML header with comprehensive styling
const htmlHeader = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Learning Stories - Narrative Master (EDITED)</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.8;
            color: #2c3e50;
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f8f9fa;
        }
        
        .container {
            background: white;
            padding: 60px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        
        /* Headers */
        h1 {
            color: #2c3e50;
            font-size: 2.2em;
            margin: 40px 0 20px 0;
            padding-bottom: 15px;
            border-bottom: 3px solid #3498db;
        }
        
        h1:first-child {
            margin-top: 0;
        }
        
        h2 {
            color: #34495e;
            font-size: 1.7em;
            margin: 35px 0 15px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid #ecf0f1;
        }
        
        h3 {
            color: #2980b9;
            font-size: 1.4em;
            margin: 30px 0 12px 0;
        }
        
        h4 {
            color: #16a085;
            font-size: 1.2em;
            margin: 25px 0 10px 0;
        }
        
        /* Paragraphs and text */
        p {
            margin: 12px 0;
            line-height: 1.8;
        }
        
        /* Lists */
        ul, ol {
            margin: 15px 0 15px 30px;
        }
        
        li {
            margin: 8px 0;
            line-height: 1.7;
        }
        
        /* Bold and italic */
        strong {
            color: #2c3e50;
            font-weight: 600;
        }
        
        em {
            font-style: italic;
            color: #555;
        }
        
        /* Change tracking styles */
        .deletion {
            text-decoration: line-through;
            color: #e74c3c;
            background: #ffebee;
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        .addition {
            background: #e8f5e9;
            color: #27ae60;
            font-weight: 600;
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        .edit-note {
            background: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 12px 15px;
            margin: 15px 0;
            border-radius: 4px;
            font-style: italic;
            color: #856404;
        }
        
        .edit-note::before {
            content: "💡 ";
            font-style: normal;
        }
        
        /* Status boxes */
        .status-box {
            background: #e8f5e9;
            border: 2px solid #27ae60;
            padding: 20px;
            margin: 25px 0;
            border-radius: 8px;
        }
        
        .issue-box {
            background: #e3f2fd;
            border-left: 4px solid #2196f3;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        
        /* Separators */
        hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 40px 0;
        }
        
        /* Code blocks */
        code {
            background: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Monaco', 'Courier New', monospace;
            font-size: 0.9em;
            color: #c7254e;
        }
        
        /* Story content specific styles */
        .story-group {
            margin: 20px 0;
            padding: 15px;
            background: #f8f9fa;
            border-left: 4px solid #3498db;
            border-radius: 4px;
        }
        
        .journal-entry {
            background: #fff8dc;
            border: 2px solid #daa520;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            font-style: italic;
        }
        
        .character-box {
            background: #e8f4f8;
            border: 2px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            border-radius: 6px;
        }
        
        .wisdom-box {
            background: #f0f8ff;
            border-left: 5px solid #4169e1;
            padding: 15px;
            margin: 15px 0;
            border-radius: 4px;
        }
        
        /* Navigation */
        .toc {
            background: #f8f9fa;
            border: 2px solid #dee2e6;
            padding: 25px;
            margin: 30px 0;
            border-radius: 8px;
        }
        
        .toc h2 {
            margin-top: 0;
            border: none;
        }
        
        .toc ul {
            list-style: none;
            margin-left: 0;
        }
        
        .toc li {
            margin: 8px 0;
        }
        
        .toc a {
            color: #3498db;
            text-decoration: none;
            transition: color 0.2s;
        }
        
        .toc a:hover {
            color: #2980b9;
            text-decoration: underline;
        }
        
        /* Emojis */
        .emoji {
            font-style: normal;
        }
        
        /* Print styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .container {
                box-shadow: none;
                padding: 20px;
            }
            
            .deletion {
                background: none;
                color: #666;
            }
            
            .addition {
                background: none;
                color: #000;
                font-weight: bold;
            }
            
            .edit-note {
                background: #f8f8f8;
                page-break-inside: avoid;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
            }
            
            .story-group, .journal-entry, .character-box {
                page-break-inside: avoid;
            }
        }
        
        /* Scrollbar styling */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
    </style>
</head>
<body>
    <div class="container">
`;

const htmlFooter = `
    </div>
</body>
</html>`;

// Convert markdown to HTML
function convertMarkdownToHtml(md) {
	let html = md;

	// STEP 1: Join consecutive lines into paragraphs (BEFORE any markdown conversion)
	// This must be done first so we join lines before they become HTML
	const lines = html.split('\n');
	const processedLines = [];
	let currentParagraph = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();

		// Empty line - end current paragraph
		if (line === '') {
			if (currentParagraph.length > 0) {
				const paragraphText = currentParagraph.join(' ');
				// Check if it's already HTML or should be wrapped
				if (
					paragraphText.startsWith('<') ||
					paragraphText.match(/^(https?:\/\/|#{1,4}\s)/)
				) {
					processedLines.push(paragraphText);
				} else {
					processedLines.push('<p>' + paragraphText + '</p>');
				}
				currentParagraph = [];
			}
			processedLines.push('');
			continue;
		}

		// Check if line is already HTML or special formatting
		if (line.startsWith('<') || line.match(/^(https?:\/\/|#{1,4}\s)/)) {
			// Flush current paragraph first
			if (currentParagraph.length > 0) {
				const paragraphText = currentParagraph.join(' ');
				processedLines.push('<p>' + paragraphText + '</p>');
				currentParagraph = [];
			}
			processedLines.push(line);
			continue;
		}

		// Regular text line - add to current paragraph
		currentParagraph.push(line);
	}

	// Flush any remaining paragraph
	if (currentParagraph.length > 0) {
		const paragraphText = currentParagraph.join(' ');
		if (
			paragraphText.startsWith('<') ||
			paragraphText.match(/^(https?:\/\/|#{1,4}\s)/)
		) {
			processedLines.push(paragraphText);
		} else {
			processedLines.push('<p>' + paragraphText + '</p>');
		}
	}

	html = processedLines.join('\n');

	// STEP 2: Now convert markdown syntax to HTML
	// Convert headers
	html = html.replace(/^# (.*?)$/gm, '<h1>$1</h1>');
	html = html.replace(/^## (.*?)$/gm, '<h2>$1</h2>');
	html = html.replace(/^### (.*?)$/gm, '<h3>$1</h3>');
	html = html.replace(/^#### (.*?)$/gm, '<h4>$1</h4>');

	// Convert horizontal rules
	html = html.replace(/^---$/gm, '<hr>');

	// Convert change tracking elements
	// Deletions: ~~text~~ -> <span class="deletion">text</span>
	html = html.replace(/~~(.*?)~~/g, '<span class="deletion">$1</span>');

	// Additions: **[ADDED: text]** -> <span class="addition">text</span>
	html = html.replace(
		/\*\*\[ADDED:\s*(.*?)\]\*\*/g,
		'<span class="addition">$1</span>'
	);

	// Edit notes: 💡 **EDIT NOTE:** text -> <div class="edit-note">text</div>
	html = html.replace(
		/💡\s*\*\*EDIT NOTE[:\s]*\*\*\s*(.*?)(?=\n\n|\n(?=[A-Z#*])|$)/gs,
		'<div class="edit-note">$1</div>'
	);

	// Convert bold (must be after ADDED pattern)
	html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

	// Convert italic
	html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

	// Convert bullet lists
	html = html.replace(/^- (.*?)$/gm, '<li>$1</li>');
	html = html.replace(/(<li>.*?<\/li>\n)+/gs, function (match) {
		return '<ul>\n' + match + '</ul>\n';
	});

	// Clean up excessive newlines
	html = html.replace(/\n{3,}/g, '\n\n');

	return html;
}

const htmlContent = convertMarkdownToHtml(markdown);
const fullHtml = htmlHeader + htmlContent + htmlFooter;

console.log('Writing HTML file...');
fs.writeFileSync(outputFile, fullHtml, 'utf8');

console.log('✅ Conversion complete!');
console.log(`Input: ${inputFile}`);
console.log(`Output: ${outputFile}`);
console.log(`File size: ${(fullHtml.length / 1024).toFixed(2)} KB`);
console.log(`Lines: ${fullHtml.split('\n').length}`);
