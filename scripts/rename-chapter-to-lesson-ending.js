const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script to rename "Chapter Ending" to "Lesson Ending" throughout the codebase
 * - Updates React component prop name: chapterEnding → lessonEnding
 * - Updates markdown headings: **Chapter Ending:** → **Lesson Ending:**
 * - Updates comments and documentation
 * - Keeps CSS class names unchanged to preserve styling
 */

function findFiles(pattern) {
	try {
		const result = execSync(
			`rg -l "${pattern}" --type-add 'src:*.{js,jsx,md}' -t src`,
			{
				encoding: 'utf-8',
				cwd: path.join(__dirname, '..'),
			}
		);
		return result.trim().split('\n').filter(Boolean);
	} catch (error) {
		// If no matches, rg returns exit code 1
		if (error.status === 1) {
			return [];
		}
		throw error;
	}
}

function replaceInFile(filePath, replacements) {
	let content = fs.readFileSync(filePath, 'utf-8');
	let changed = false;

	replacements.forEach(({ pattern, replacement }) => {
		const regex = new RegExp(pattern, 'g');
		if (regex.test(content)) {
			content = content.replace(regex, replacement);
			changed = true;
		}
	});

	if (changed) {
		fs.writeFileSync(filePath, content);
		return true;
	}
	return false;
}

function main() {
	console.log('🔄 Renaming "Chapter Ending" to "Lesson Ending"\n');
	console.log('='.repeat(80) + '\n');

	const stats = {
		jsFiles: 0,
		mdFiles: 0,
		totalChanges: 0,
	};

	// Find all files with relevant patterns
	console.log('1️⃣  Finding files...\n');

	const chapterEndingFiles = new Set([
		...findFiles('chapterEnding'),
		...findFiles('Chapter [Ee]nding'),
	]);

	console.log(`Found ${chapterEndingFiles.size} files to process\n`);

	// Define replacements
	const jsReplacements = [
		// Prop name in component usage
		{ pattern: 'chapterEnding=\\{', replacement: 'lessonEnding={' },
		// Prop destructuring
		{ pattern: 'chapterEnding,', replacement: 'lessonEnding,' },
		{ pattern: 'chapterEnding\\s*\\}', replacement: 'lessonEnding }' },
		// Comments
		{ pattern: 'Chapter Ending - ', replacement: 'Lesson Ending - ' },
		{ pattern: '\\* - Chapter Ending', replacement: '* - Lesson Ending' },
		// JSDoc examples (but not CSS class names)
		{ pattern: 'chapterEnding=\\[', replacement: 'lessonEnding=[' },
	];

	const mdReplacements = [
		// Markdown headings
		{
			pattern: '\\*\\*Chapter Ending:\\*\\*',
			replacement: '**Lesson Ending:**',
		},
		{
			pattern: '\\*\\*Chapter Endings:\\*\\*',
			replacement: '**Lesson Ending:**',
		},
		{
			pattern: '\\*\\*Chapter ending:\\*\\*',
			replacement: '**Lesson ending:**',
		},
	];

	// Process each file
	console.log('2️⃣  Processing files...\n');

	chapterEndingFiles.forEach((filePath) => {
		const fullPath = path.join(__dirname, '..', filePath);
		const ext = path.extname(filePath);

		let changed = false;

		if (ext === '.js' || ext === '.jsx') {
			changed = replaceInFile(fullPath, jsReplacements);
			if (changed) {
				stats.jsFiles++;
				console.log(`  ✓ ${filePath}`);
			}
		} else if (ext === '.md') {
			changed = replaceInFile(fullPath, mdReplacements);
			if (changed) {
				stats.mdFiles++;
				console.log(`  ✓ ${filePath}`);
			}
		}

		if (changed) {
			stats.totalChanges++;
		}
	});

	console.log('\n3️⃣  Updating ChapterSummary component...\n');

	const componentPath = path.join(
		__dirname,
		'../src/components/content/ChapterSummary.js'
	);
	const componentChanged = replaceInFile(componentPath, [
		...jsReplacements,
		// Additional component-specific replacements
		{
			pattern: '@param \\{.*\\} chapterEnding',
			replacement: '@param {*} lessonEnding',
		},
	]);

	if (componentChanged) {
		console.log('  ✓ Updated ChapterSummary.js');
		stats.totalChanges++;
	}

	console.log('\n✅ Renaming complete!\n');
	console.log('📊 Summary:');
	console.log(`  - ${stats.jsFiles} JavaScript files updated`);
	console.log(`  - ${stats.mdFiles} Markdown files updated`);
	console.log(`  - ${stats.totalChanges} total files changed`);
	console.log(
		'\n💡 Note: CSS class names were preserved (lesson-ending) to maintain styling'
	);
	console.log('\n🔍 Run: git diff to review all changes');
}

try {
	main();
} catch (error) {
	console.error('❌ Error:', error.message);
	process.exit(1);
}
