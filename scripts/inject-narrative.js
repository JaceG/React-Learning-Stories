/**
 * Inject Narrative Content Script
 *
 * Takes edited narrative content from narrative-master.json and injects it back
 * into the React component files, preserving code structure and formatting.
 *
 * Usage: node scripts/inject-narrative.js
 * Input: scripts/narrative-master.json
 */

const fs = require('fs');
const path = require('path');

const LEARNING_PATHS_DIR = path.join(__dirname, '../src/learning-paths');
const INPUT_FILE = path.join(__dirname, 'narrative-master.json');

/**
 * Replaces a simple prop value (string or template literal)
 */
function replacePropContent(fileContent, propName, newValue) {
	if (!newValue) return fileContent;

	// Try template literal format first: propName={`...`}
	const templateRegex = new RegExp(
		`(${propName}=\\{\`)([\\s\\S]*?)(\`\\})`,
		'm'
	);
	if (templateRegex.test(fileContent)) {
		return fileContent.replace(templateRegex, `$1${newValue}$3`);
	}

	// Try double quote format: propName="..."
	const stringRegex = new RegExp(`(${propName}=")([^"]*)(")`);
	if (stringRegex.test(fileContent)) {
		return fileContent.replace(stringRegex, `$1${newValue}$3`);
	}

	// Try single quote format: propName='...'
	const singleQuoteRegex = new RegExp(`(${propName}=')([^']*)(')`);
	if (singleQuoteRegex.test(fileContent)) {
		return fileContent.replace(singleQuoteRegex, `$1${newValue}$3`);
	}

	return fileContent;
}

/**
 * Replaces object prop content like lessonInsight={{ title: "...", content: "..." }}
 */
function replaceObjectProp(fileContent, propName, newValue) {
	if (!newValue || !newValue.title || !newValue.content) return fileContent;

	// Use lookahead to ensure proper matching
	const regex = new RegExp(
		`${propName}=\\{\\{([\\s\\S]*?)\\}\\}(?=\\s*[,/>])`,
		'm'
	);
	const match = fileContent.match(regex);
	if (!match) return fileContent;

	// Use backticks to avoid escaping issues with quotes/apostrophes
	const newObjectContent = `${propName}={{
					title: \`${newValue.title}\`,
					content:
						\`${newValue.content}\`,
				}}`;

	return fileContent.replace(regex, newObjectContent);
}

/**
 * Replaces array prop content like reflectionQuestions={["...", "..."]}
 */
function replaceArrayProp(fileContent, propName, newValue) {
	if (!newValue || !Array.isArray(newValue) || newValue.length === 0)
		return fileContent;

	const regex = new RegExp(`${propName}=\\{\\[([\\s\\S]*?)\\]\\}`, 'm');
	const match = fileContent.match(regex);
	if (!match) return fileContent;

	// Escape single quotes in the content by using backticks instead
	const formattedItems = newValue
		.map((item) => {
			// Use backticks to avoid escaping issues with quotes/apostrophes
			return `\`${item}\``;
		})
		.join(',\n					');

	const newArrayContent = `${propName}={[
					${formattedItems},
				]}`;

	return fileContent.replace(regex, newArrayContent);
}

/**
 * Replaces StorySection paragraphs
 */
function replaceStorySections(fileContent, newSections) {
	if (!newSections || newSections.length === 0) return fileContent;

	let updatedContent = fileContent;
	const regex = /<StorySection\s+paragraphs=\{(\[[^\]]*\])\}\s*\/>/g;
	const matches = [...fileContent.matchAll(regex)];

	// Replace in reverse order to maintain correct positions
	for (let i = matches.length - 1; i >= 0; i--) {
		if (i >= newSections.length) continue;

		const match = matches[i];
		const sectionIndex = i;
		const paragraphs = newSections[sectionIndex];

		// Format paragraphs (detect if JSX or plain string)
		const formattedParagraphs = paragraphs
			.map((p) => {
				// If contains HTML tags, wrap in <>...</>
				if (
					p.includes('<strong>') ||
					p.includes('<em>') ||
					p.includes('{')
				) {
					return `<>${p}</>`;
				}
				// Otherwise, use backtick string
				return `\`${p}\``;
			})
			.join(',\n\t\t\t\t');

		const newStorySection = `<StorySection
			paragraphs={[
				${formattedParagraphs}
			]}
		/>`;

		updatedContent =
			updatedContent.substring(0, match.index) +
			newStorySection +
			updatedContent.substring(match.index + match[0].length);
	}

	return updatedContent;
}

/**
 * Replaces character intros array
 */
function replaceCharacterIntros(fileContent, newIntros) {
	if (!newIntros || newIntros.length === 0) return fileContent;

	// Match characterIntros={[ ... ]} more robustly
	// We need to handle nested braces and brackets properly
	const startMatch = fileContent.match(/characterIntros=\{\[/);
	if (!startMatch) return fileContent;

	const startIndex = startMatch.index;
	const propStart = startIndex + 'characterIntros={'.length;
	let depth = 0;
	let endIndex = propStart;

	// Find the matching closing bracket and brace
	for (let i = propStart; i < fileContent.length; i++) {
		const char = fileContent[i];
		if (char === '[' || char === '{') {
			depth++;
		} else if (char === ']' || char === '}') {
			depth--;
			if (depth === 0 && char === ']') {
				// Check if next non-whitespace char is }
				let j = i + 1;
				while (j < fileContent.length && /\s/.test(fileContent[j])) {
					j++;
				}
				if (fileContent[j] === '}') {
					endIndex = j + 1; // Include the closing }
					break;
				}
			}
		}
	}

	if (endIndex === propStart) return fileContent;

	// Format the new character intros
	const formattedIntros = newIntros
		.map((intro) => {
			return `{
						name: \`${intro.name}\`,
						description: \`${intro.description}\`,
					}`;
		})
		.join(',\n					');

	const newCharacterIntros = `characterIntros={[
					${formattedIntros},
				]}`;

	// Replace the old content with new content
	return (
		fileContent.substring(0, startIndex) +
		newCharacterIntros +
		fileContent.substring(endIndex)
	);
}

/**
 * Inject narrative into a chapter file
 */
function injectChapterFile(filePath, chapterData) {
	let fileContent = fs.readFileSync(filePath, 'utf8');

	// Replace each narrative element
	if (chapterData.bridge) {
		fileContent = replacePropContent(
			fileContent,
			'bridge',
			chapterData.bridge
		);
	}

	if (chapterData.storySections) {
		fileContent = replaceStorySections(
			fileContent,
			chapterData.storySections
		);
	}

	if (chapterData.lessonInsight) {
		fileContent = replaceObjectProp(
			fileContent,
			'lessonInsight',
			chapterData.lessonInsight
		);
	}

	if (chapterData.reflectionQuestions) {
		fileContent = replaceArrayProp(
			fileContent,
			'reflectionQuestions',
			chapterData.reflectionQuestions
		);
	}

	if (chapterData.journalEntry) {
		fileContent = replaceObjectProp(
			fileContent,
			'journalEntry',
			chapterData.journalEntry
		);
	}

	if (chapterData.chapterEnding) {
		fileContent = replaceArrayProp(
			fileContent,
			'chapterEnding',
			chapterData.chapterEnding
		);
	}

	if (chapterData.characterIntros) {
		fileContent = replaceCharacterIntros(
			fileContent,
			chapterData.characterIntros
		);
	}

	fs.writeFileSync(filePath, fileContent, 'utf8');
}

/**
 * Inject narrative into a lesson index file
 */
function injectLessonIndex(filePath, lessonData) {
	let fileContent = fs.readFileSync(filePath, 'utf8');

	if (lessonData.opener) {
		fileContent = replacePropContent(
			fileContent,
			'opener',
			lessonData.opener
		);
	}

	fs.writeFileSync(filePath, fileContent, 'utf8');
}

/**
 * Main injection function
 */
function injectAllNarrative() {
	// Read the narrative data
	const narrativeData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));

	let filesUpdated = 0;

	for (const [learningPath, lessons] of Object.entries(narrativeData)) {
		for (const [lesson, lessonData] of Object.entries(lessons)) {
			const lessonDir = path.join(
				LEARNING_PATHS_DIR,
				learningPath,
				'pages',
				lesson
			);

			// Inject lesson opener
			const indexPath = path.join(lessonDir, 'index.js');
			if (fs.existsSync(indexPath) && lessonData.opener) {
				injectLessonIndex(indexPath, lessonData);
				filesUpdated++;
			}

			// Inject each chapter
			for (let i = 1; i <= 3; i++) {
				const chapterKey = `chapter${i}`;
				if (!lessonData[chapterKey]) continue;

				const chapterFile = path.join(
					lessonDir,
					chapterKey,
					`${chapterKey}.js`
				);
				if (fs.existsSync(chapterFile)) {
					injectChapterFile(chapterFile, lessonData[chapterKey]);
					filesUpdated++;
				}
			}
		}
	}

	return filesUpdated;
}

// Run injection
console.log('💉 Injecting narrative content into component files...\n');

try {
	if (!fs.existsSync(INPUT_FILE)) {
		console.error(`❌ Error: ${INPUT_FILE} not found.`);
		console.error('   Run extract-narrative.js first to create the file.');
		process.exit(1);
	}

	const filesUpdated = injectAllNarrative();

	console.log('✅ Injection complete!');
	console.log(`📝 Updated ${filesUpdated} files`);
	console.log('\n⚠️  Remember to review the changes and test the app!');
} catch (error) {
	console.error('❌ Error during injection:', error.message);
	console.error(error.stack);
	process.exit(1);
}
