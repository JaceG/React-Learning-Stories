#!/usr/bin/env node

/**
 * Extract Story Groups from narrative-master.md
 *
 * This script extracts only the Story Group narrative content from the
 * narrative master document, excluding Bridges, Questions, Journals,
 * Lesson Openers, Chapter Endings, and New Characters sections.
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '../scripts/narrative-master.md');
const OUTPUT_FILE = path.join(__dirname, 'story-groups-only.md');

function extractStoryGroups() {
	const content = fs.readFileSync(INPUT_FILE, 'utf-8');
	const lines = content.split('\n');

	let output = [];
	let currentLearningPath = '';
	let currentLesson = '';
	let currentChapter = '';
	let inStoryGroup = false;
	let inNarrative = false;
	let skipSection = false;

	output.push('# React Learning Stories - Story Groups Only\n');
	output.push(
		'*Extracted on ' +
			new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}) +
			'*\n'
	);
	output.push('---\n\n');

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		// Track Learning Path (# 1. Components Basics)
		if (line.match(/^# \d+\. /)) {
			currentLearningPath = line;
			currentLesson = '';
			currentChapter = '';
			inStoryGroup = false;
			inNarrative = false;
			skipSection = false;
			output.push('\n' + line + '\n');
			continue;
		}

		// Track Lesson (## 1.1 ComponentKingdom)
		if (line.match(/^## \d+\.\d+ /)) {
			currentLesson = line;
			currentChapter = '';
			inStoryGroup = false;
			inNarrative = false;
			skipSection = false;
			output.push('\n' + line + '\n');
			continue;
		}

		// Track Chapter (### Chapter 1: ...)
		if (line.match(/^### Chapter \d+:/)) {
			currentChapter = line;
			inStoryGroup = false;
			inNarrative = false;
			skipSection = false;
			output.push('\n' + line + '\n');
			continue;
		}

		// Detect sections to skip
		if (line.match(/^\*\*Bridge:\*\*/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		if (line.match(/^\*\*New Characters:\*\*/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		if (line.match(/^\*\*.*'s Wisdom:\*\*/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		if (line.match(/^\*\*Reflection Questions:\*\*/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		if (line.match(/^\*\*.*'s Journal.*\*\*/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		if (line.match(/^\*\*Chapter Ending:\*\*/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		if (line.match(/^### 📖 Lesson Opener/)) {
			skipSection = true;
			inNarrative = false;
			inStoryGroup = false;
			continue;
		}

		// Detect Narrative section
		if (line.match(/^\*\*Narrative:\*\*/)) {
			inNarrative = true;
			skipSection = false;
			output.push('\n**Narrative:**\n');
			continue;
		}

		// Detect Story Group
		if (line.match(/^\*\*Story Group \d+:\*\*/)) {
			inStoryGroup = true;
			skipSection = false;
			output.push('\n' + line + '\n');
			continue;
		}

		// Reset skip section on horizontal rule or new section
		if (line.match(/^---$/)) {
			skipSection = false;
			inNarrative = false;
			inStoryGroup = false;
			output.push('\n---\n');
			continue;
		}

		// Add lines if in Story Group and not in skip section
		if (inStoryGroup && !skipSection) {
			output.push(line + '\n');
		}
	}

	fs.writeFileSync(OUTPUT_FILE, output.join(''));
	console.log(`✓ Story Groups extracted to: ${OUTPUT_FILE}`);
	console.log(
		`✓ Original: ${lines.length} lines → Extracted: ${output.length} lines`
	);
}

// Run the extraction
try {
	extractStoryGroups();
} catch (error) {
	console.error('Error extracting story groups:', error);
	process.exit(1);
}
