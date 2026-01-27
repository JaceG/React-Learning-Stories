/**
 * Extract Narrative Content Script
 * 
 * Extracts all narrative content from React component files into a single JSON file.
 * This makes it easy to review, edit, and check continuity across all learning paths.
 * 
 * Usage: node scripts/extract-narrative.js
 * Output: scripts/narrative-master.json
 */

const fs = require('fs');
const path = require('path');

const LEARNING_PATHS_DIR = path.join(__dirname, '../src/learning-paths');
const OUTPUT_FILE = path.join(__dirname, 'narrative-master.json');
const STORY_ORDER_FILE = path.join(__dirname, 'story-order.json');

/**
 * Extracts content from a prop string in the format: propName={`content`} or propName="content"
 */
function extractPropContent(fileContent, propName) {
	// Try template literal format first: propName={`...`}
	const templateRegex = new RegExp(`${propName}=\\{\`([\\s\\S]*?)\`\\}`, 'm');
	const templateMatch = fileContent.match(templateRegex);
	if (templateMatch) {
		return templateMatch[1].trim();
	}

	// Try string format: propName="..."
	const stringRegex = new RegExp(`${propName}="([^"]*)"`, 'm');
	const stringMatch = fileContent.match(stringRegex);
	if (stringMatch) {
		return stringMatch[1].trim();
	}

	return null;
}

/**
 * Extracts object prop content like lessonInsight={{ title: "...", content: "..." }}
 */
function extractObjectProp(fileContent, propName) {
	// Match the entire prop including nested braces
	const regex = new RegExp(`${propName}=\\{\\{([\\s\\S]*?)\\}\\}(?=\\s*[,/>])`, 'm');
	const match = fileContent.match(regex);
	if (!match) return null;

	const objectContent = match[1];
	
	// Extract title - handle quotes, backticks, and apostrophes
	const titleMatch = objectContent.match(/title:\s*['"`]([^'"`]*?)['"`]/s);
	const title = titleMatch ? titleMatch[1] : null;

	// Extract content - handle multi-line strings with proper quote matching
	// Match content: followed by a quote/backtick, then everything until the matching closing quote
	let content = null;
	
	// Try backticks first (most common for multi-line)
	const backtickMatch = objectContent.match(/content:\s*`([^`]*)`/s);
	if (backtickMatch) {
		content = backtickMatch[1].trim();
	} else {
		// Try single quotes
		const singleQuoteMatch = objectContent.match(/content:\s*'((?:[^'\\]|\\.)*)'/s);
		if (singleQuoteMatch) {
			content = singleQuoteMatch[1].trim();
		} else {
			// Try double quotes
			const doubleQuoteMatch = objectContent.match(/content:\s*"((?:[^"\\]|\\.)*)"/s);
			if (doubleQuoteMatch) {
				content = doubleQuoteMatch[1].trim();
			}
		}
	}

	return { title, content };
}

/**
 * Extracts array prop content like reflectionQuestions={["...", "..."]}
 */
function extractArrayProp(fileContent, propName) {
	const regex = new RegExp(`${propName}=\\{\\[([\\s\\S]*?)\\]\\}`, 'm');
	const match = fileContent.match(regex);
	if (!match) return null;

	const arrayContent = match[1];
	
	// Extract individual items - handle strings with apostrophes and quotes
	const items = [];
	
	// Use a single regex that matches any quoted string (backtick, single, or double quote)
	// This prevents overlapping matches
	const stringRegex = /(['"`])((?:(?!\1)[^\\]|\\.)*?)\1/g;
	let itemMatch;
	
	while ((itemMatch = stringRegex.exec(arrayContent)) !== null) {
		// itemMatch[2] contains the string content (without quotes)
		items.push(itemMatch[2]);
	}

	return items.length > 0 ? items : null;
}

/**
 * Extracts StorySection paragraphs array
 */
function extractStorySection(fileContent) {
	const sections = [];
	const regex = /<StorySection\s+paragraphs=\{(\[[^\]]*\])\}\s*\/>/g;
	let match;

	while ((match = regex.exec(fileContent)) !== null) {
		const arrayContent = match[1];
		const paragraphs = [];
		
		// Extract JSX content or strings
		// Handle both: `string` and <>JSX content</>
		const jsxRegex = /<>([\s\S]*?)<\/>/g;
		const stringRegex = /`([^`]*)`/g;
		
		let jsxMatch;
		while ((jsxMatch = jsxRegex.exec(arrayContent)) !== null) {
			paragraphs.push(jsxMatch[1].trim());
		}
		
		let stringMatch;
		while ((stringMatch = stringRegex.exec(arrayContent)) !== null) {
			paragraphs.push(stringMatch[1].trim());
		}

		if (paragraphs.length > 0) {
			sections.push(paragraphs);
		}
	}

	return sections.length > 0 ? sections : null;
}

/**
 * Extracts character intros array
 */
function extractCharacterIntros(fileContent) {
	const regex = /characterIntros=\{(\[[^\]]*\])\}/s;
	const match = fileContent.match(regex);
	if (!match) return null;

	const arrayContent = match[1];
	const intros = [];
	
	// Extract each character intro object
	const introRegex = /\{\s*name:\s*`([^`]*)`\s*,\s*description:\s*`([^`]*)`\s*\}/g;
	let introMatch;
	while ((introMatch = introRegex.exec(arrayContent)) !== null) {
		intros.push({
			name: introMatch[1],
			description: introMatch[2]
		});
	}

	return intros.length > 0 ? intros : null;
}

/**
 * Process a single chapter file
 */
function processChapterFile(filePath) {
	const fileContent = fs.readFileSync(filePath, 'utf8');
	
	const narrative = {
		bridge: extractPropContent(fileContent, 'bridge'),
		storySections: extractStorySection(fileContent),
		lessonInsight: extractObjectProp(fileContent, 'lessonInsight'),
		reflectionQuestions: extractArrayProp(fileContent, 'reflectionQuestions'),
		journalEntry: extractObjectProp(fileContent, 'journalEntry'),
		chapterEnding: extractArrayProp(fileContent, 'chapterEnding'),
		characterIntros: extractCharacterIntros(fileContent)
	};

	// Remove null values
	Object.keys(narrative).forEach(key => {
		if (narrative[key] === null) {
			delete narrative[key];
		}
	});

	return narrative;
}

/**
 * Process a lesson's index.js file for opener from LessonHeader
 */
function processLessonIndex(filePath) {
	const fileContent = fs.readFileSync(filePath, 'utf8');
	
	// Extract opener from LessonHeader component
	// Match the entire LessonHeader block first
	const lessonHeaderRegex = /<LessonHeader[\s\S]*?\/>/;
	const headerMatch = fileContent.match(lessonHeaderRegex);
	
	if (!headerMatch) {
		return { opener: null };
	}
	
	const headerContent = headerMatch[0];
	
	// Now extract the opener prop value, handling multi-line strings
	// Match opener=" or opener=' or opener={` and capture until the matching closing quote
	let opener = null;
	
	// Try double quotes
	const doubleQuoteMatch = headerContent.match(/opener="((?:[^"\\]|\\.)*)"/s);
	if (doubleQuoteMatch) {
		opener = doubleQuoteMatch[1];
	} else {
		// Try single quotes
		const singleQuoteMatch = headerContent.match(/opener='((?:[^'\\]|\\.)*)'/s);
		if (singleQuoteMatch) {
			opener = singleQuoteMatch[1];
		} else {
			// Try backticks
			const backtickMatch = headerContent.match(/opener=\{`([^`]*)`\}/s);
			if (backtickMatch) {
				opener = backtickMatch[1];
			}
		}
	}
	
	return {
		opener: opener ? opener.trim() : null
	};
}

/**
 * Main extraction function - uses story-order.json to maintain correct order
 */
function extractAllNarrative() {
	const narrativeData = {};

	// Load story order configuration
	const storyOrder = JSON.parse(fs.readFileSync(STORY_ORDER_FILE, 'utf8'));

	// Process learning paths in the correct order
	for (const pathConfig of storyOrder.learningPaths) {
		const learningPathId = pathConfig.id;
		const learningPathDir = path.join(LEARNING_PATHS_DIR, learningPathId, 'pages');
		
		if (!fs.existsSync(learningPathDir)) continue;

		narrativeData[learningPathId] = {};

		// Process lessons in the correct order
		for (const lessonConfig of pathConfig.lessons) {
			const lessonFolder = lessonConfig.folder;
			const lessonName = lessonConfig.id;
			const lessonDir = path.join(learningPathDir, lessonFolder);

			if (!fs.existsSync(lessonDir)) continue;

			narrativeData[learningPathId][lessonName] = {};

			// Extract lesson opener from index.js
			const indexPath = path.join(lessonDir, 'index.js');
			if (fs.existsSync(indexPath)) {
				const lessonData = processLessonIndex(indexPath);
				narrativeData[learningPathId][lessonName] = lessonData;
			}

			// Process each chapter (always 3 chapters)
			for (let i = 1; i <= 3; i++) {
				const chapterDir = path.join(lessonDir, `chapter${i}`);
				const chapterFile = path.join(chapterDir, `chapter${i}.js`);

				if (fs.existsSync(chapterFile)) {
					const chapterData = processChapterFile(chapterFile);
					narrativeData[learningPathId][lessonName][`chapter${i}`] = chapterData;
				}
			}
		}
	}

	return narrativeData;
}

// Run extraction
console.log('🔍 Extracting narrative content from all learning paths...\n');

try {
	const narrativeData = extractAllNarrative();
	
	// Write to JSON file
	fs.writeFileSync(OUTPUT_FILE, JSON.stringify(narrativeData, null, 2), 'utf8');
	
	console.log('✅ Extraction complete!');
	console.log(`📄 Output file: ${OUTPUT_FILE}`);
	
	// Print summary
	const pathCount = Object.keys(narrativeData).length;
	let lessonCount = 0;
	let chapterCount = 0;
	
	Object.values(narrativeData).forEach(path => {
		lessonCount += Object.keys(path).length;
		Object.values(path).forEach(lesson => {
			chapterCount += Object.keys(lesson).filter(k => k.startsWith('chapter')).length;
		});
	});
	
	console.log(`\n📊 Summary:`);
	console.log(`   - ${pathCount} learning paths`);
	console.log(`   - ${lessonCount} lessons`);
	console.log(`   - ${chapterCount} chapters`);
	
} catch (error) {
	console.error('❌ Error during extraction:', error.message);
	process.exit(1);
}
