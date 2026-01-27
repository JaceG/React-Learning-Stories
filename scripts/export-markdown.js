/**
 * Export Narrative to Markdown
 * 
 * Converts the narrative-master.json into a beautifully formatted markdown file
 * that's easy to read, edit, and share.
 * 
 * Usage: node scripts/export-markdown.js
 * Output: scripts/narrative-master.md
 */

const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, 'narrative-master.json');
const OUTPUT_FILE = path.join(__dirname, 'narrative-master.md');
const STORY_ORDER_FILE = path.join(__dirname, 'story-order.json');

/**
 * Convert HTML tags to markdown
 */
function htmlToMarkdown(text) {
	if (!text) return '';
	
	return text
		.replace(/<strong>(.*?)<\/strong>/g, '**$1**')
		.replace(/<em>(.*?)<\/em>/g, '*$1*')
		.replace(/\{' '\}/g, ' ')
		.replace(/\\'/g, "'")
		.replace(/\\"/g, '"');
}

/**
 * Format a story section group
 */
function formatStorySection(sections, groupIndex) {
	if (!sections || sections.length === 0) return '';
	
	let output = '';
	
	sections.forEach((group, idx) => {
		if (Array.isArray(group)) {
			output += `**Story Group ${idx + 1}:**\n\n`;
			group.forEach(paragraph => {
				output += htmlToMarkdown(paragraph) + '\n\n';
			});
		}
	});
	
	return output;
}

/**
 * Format an array of items as a list
 */
function formatList(items, prefix = '-') {
	if (!items || items.length === 0) return '';
	
	return items.map(item => `${prefix} ${htmlToMarkdown(item)}`).join('\n') + '\n\n';
}

/**
 * Format character intros
 */
function formatCharacterIntros(intros) {
	if (!intros || intros.length === 0) return '';
	
	let output = '';
	intros.forEach(intro => {
		output += `**${intro.name}**\n${htmlToMarkdown(intro.description)}\n\n`;
	});
	return output;
}

/**
 * Generate markdown for entire narrative
 */
function generateMarkdown() {
	const narrativeData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
	const storyOrder = JSON.parse(fs.readFileSync(STORY_ORDER_FILE, 'utf8'));
	
	let markdown = `# React Learning Stories - Narrative Master Document\n\n`;
	markdown += `*Generated on ${new Date().toLocaleDateString('en-US', { 
		year: 'numeric', 
		month: 'long', 
		day: 'numeric' 
	})}*\n\n`;
	markdown += `---\n\n`;
	
	// Process learning paths in order
	storyOrder.learningPaths.forEach((pathConfig, pathIndex) => {
		const learningPathId = pathConfig.id;
		const pathData = narrativeData[learningPathId];
		
		if (!pathData) return;
		
		// Learning Path Header
		const pathTitle = learningPathId
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		
		markdown += `# ${pathIndex + 1}. ${pathTitle}\n\n`;
		
		// Process lessons in order
		pathConfig.lessons.forEach((lessonConfig, lessonIndex) => {
			const lessonName = lessonConfig.id;
			const lessonData = pathData[lessonName];
			
			if (!lessonData) return;
			
			// Lesson Header
			markdown += `## ${pathIndex + 1}.${lessonIndex + 1} ${lessonName}\n\n`;
			
			// Lesson Opener
			if (lessonData.opener) {
				markdown += `### 📖 Lesson Opener\n\n`;
				markdown += htmlToMarkdown(lessonData.opener) + '\n\n';
			}
			
			// Process each chapter
			for (let i = 1; i <= 3; i++) {
				const chapterKey = `chapter${i}`;
				const chapterData = lessonData[chapterKey];
				
				if (!chapterData) continue;
				
				markdown += `### Chapter ${i}\n\n`;
				
				// Bridge
				if (chapterData.bridge) {
					markdown += `**Bridge:**\n${htmlToMarkdown(chapterData.bridge)}\n\n`;
				}
				
				// Story Sections
				if (chapterData.storySections) {
					markdown += `**Narrative:**\n\n`;
					markdown += formatStorySection(chapterData.storySections);
				}
				
				// Character Intros
				if (chapterData.characterIntros) {
					markdown += `**New Characters:**\n\n`;
					markdown += formatCharacterIntros(chapterData.characterIntros);
				}
				
				// Lesson Insight
				if (chapterData.lessonInsight && chapterData.lessonInsight.content) {
					markdown += `**${chapterData.lessonInsight.title}**\n`;
					markdown += htmlToMarkdown(chapterData.lessonInsight.content) + '\n\n';
				}
				
				// Reflection Questions
				if (chapterData.reflectionQuestions) {
					markdown += `**Reflection Questions:**\n\n`;
					markdown += formatList(chapterData.reflectionQuestions);
				}
				
				// Journal Entry
				if (chapterData.journalEntry && chapterData.journalEntry.content) {
					markdown += `**${chapterData.journalEntry.title}**\n`;
					markdown += `*${htmlToMarkdown(chapterData.journalEntry.content)}*\n\n`;
				}
				
				// Chapter Ending
				if (chapterData.chapterEnding) {
					markdown += `**Chapter Ending:**\n\n`;
					chapterData.chapterEnding.forEach(para => {
						markdown += htmlToMarkdown(para) + '\n\n';
					});
				}
				
				markdown += `---\n\n`;
			}
		});
		
		markdown += `\n`;
	});
	
	return markdown;
}

// Run export
console.log('📝 Exporting narrative to markdown...\n');

try {
	const markdown = generateMarkdown();
	
	fs.writeFileSync(OUTPUT_FILE, markdown, 'utf8');
	
	console.log('✅ Export complete!');
	console.log(`📄 Output file: ${OUTPUT_FILE}`);
	
	const stats = fs.statSync(OUTPUT_FILE);
	const sizeKB = (stats.size / 1024).toFixed(2);
	console.log(`📊 File size: ${sizeKB} KB`);
	
} catch (error) {
	console.error('❌ Error during export:', error.message);
	process.exit(1);
}
