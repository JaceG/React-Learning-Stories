/**
 * Convert PHASE4 Markdown to Per-Chapter JSON
 *
 * Parses narrative-master-PHASE4.md and outputs individual JSON files
 * for runtime loading by chapter components.
 *
 * Usage: node scripts/convert-phase4-to-json.js [lpNumber]
 *   lpNumber defaults to 1
 *
 * Output: public/narratives/{lpFolder}/{lessonFolder}/chapter{n}.json
 *         public/narratives/{lpFolder}/{lessonFolder}/lesson.json
 */

const fs = require('fs');
const path = require('path');

const PHASE4_PATH = path.join(
	__dirname,
	'../continuity-analysis/narrative/narrative-master-PHASE4.md'
);
const OUTPUT_BASE = path.join(__dirname, '../public/narratives');

const LP_CONFIG = {
	1: {
		folder: 'components-basics',
		heading: '# 1. Components Basics',
		nextHeading: '# 2.',
		lessons: [
			{ id: '1.1', folder: 'ComponentKingdom' },
			{ id: '1.2', folder: 'PropsMessengers' },
			{ id: '1.3', folder: 'JsxMagic' },
			{ id: '1.4', folder: 'LifecycleChronicles' },
		],
	},
};

function convertMarkdownToHtml(text) {
	if (!text) return text;
	let result = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
	result = result.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
	return result;
}

function findSection(content, startMarker, endMarkers) {
	const startIdx = content.indexOf(startMarker);
	if (startIdx === -1) return null;

	const textStart = startIdx + startMarker.length;
	let textEnd = content.length;

	for (const endMarker of endMarkers) {
		const idx = content.indexOf(endMarker, textStart);
		if (idx !== -1 && idx < textEnd) {
			textEnd = idx;
		}
	}

	const result = content.substring(textStart, textEnd).trim();
	return result || null;
}

function splitIntoParagraphs(text) {
	if (!text) return [];
	return text
		.split(/\n\n+/)
		.map((p) => p.replace(/\n/g, ' ').trim())
		.filter((p) => p.length > 0)
		.map(convertMarkdownToHtml);
}

function extractStoryGroups(chapterContent) {
	const groups = [];
	const sgEndMarkers = [
		'**Story Group 2:**',
		'**Story Group 3:**',
		'**New Characters:**',
		"**Hermes's Wisdom:**",
		"**Master Aurelius's Wisdom:**",
		"**Professor Syntaxis's Wisdom:**",
		"**Chronos's Wisdom:**",
		"**Guardian TypeCheck's Wisdom:**",
	];

	for (let i = 1; i <= 3; i++) {
		const marker = `**Story Group ${i}:**`;
		const possibleEnds =
			i < 3
				? [`**Story Group ${i + 1}:**`]
				: sgEndMarkers.filter((m) => !m.startsWith('**Story Group'));

		const raw = findSection(chapterContent, marker, possibleEnds);
		if (raw) {
			groups.push(splitIntoParagraphs(raw));
		}
	}

	return groups;
}

function extractCharacterIntros(chapterContent) {
	const wisdomMarkers = [
		"**Hermes's Wisdom:**",
		"**Master Aurelius's Wisdom:**",
		"**Professor Syntaxis's Wisdom:**",
		"**Chronos's Wisdom:**",
		"**Guardian TypeCheck's Wisdom:**",
	];

	const raw = findSection(chapterContent, '**New Characters:**', wisdomMarkers);
	if (!raw) return [];

	const intros = [];
	const charRegex = /\*\*([^*]+)\*\*\n([\s\S]*?)(?=\n\*\*[^*]|\n$|$)/g;
	let match;

	while ((match = charRegex.exec(raw)) !== null) {
		const name = match[1].trim();
		const description = match[2]
			.replace(/\n/g, ' ')
			.trim();
		if (name && description) {
			intros.push({
				name: convertMarkdownToHtml(name),
				description: convertMarkdownToHtml(description),
			});
		}
	}

	return intros;
}

function extractWisdom(chapterContent) {
	const wisdomRegex = /\*\*([^*]+'s Wisdom):\*\*/;
	const wisdomMatch = chapterContent.match(wisdomRegex);
	if (!wisdomMatch) return null;

	const marker = `**${wisdomMatch[1]}:**`;
	const raw = findSection(chapterContent, marker, [
		'**Reflection Questions:**',
	]);

	if (!raw) return null;

	return {
		title: `${wisdomMatch[1]}:`,
		content: convertMarkdownToHtml(raw.replace(/\n/g, ' ').trim()),
	};
}

function extractReflectionQuestions(chapterContent) {
	const raw = findSection(chapterContent, '**Reflection Questions:**', [
		"**Aria's Journal",
	]);
	if (!raw) return [];

	return raw
		.split('\n')
		.map((line) => line.replace(/^[-*]\s*/, '').trim())
		.filter((line) => line.length > 0)
		.map(convertMarkdownToHtml);
}

function extractJournalEntry(chapterContent) {
	const titleMatch = chapterContent.match(
		/\*\*(Aria's Journal - Day (\d+))\*\*/
	);
	if (!titleMatch) return null;

	const title = titleMatch[1];
	const day = parseInt(titleMatch[2]);
	const marker = `**${title}**`;

	const raw = findSection(chapterContent, marker, [
		'**Lesson Ending:**',
		'\n---',
	]);
	if (!raw) return null;

	let content = raw.replace(/\n/g, ' ').trim();
	content = content.replace(/^\*\s*/, '').replace(/\s*\*$/, '');

	return { title, day, content };
}

function extractLessonEnding(chapterContent) {
	const raw = findSection(chapterContent, '**Lesson Ending:**', ['\n---']);
	if (!raw) return null;
	return splitIntoParagraphs(raw);
}

function extractBridge(chapterContent) {
	const raw = findSection(chapterContent, '**Bridge:**', [
		'**Narrative:**',
		'**Story Group 1:**',
	]);
	return raw ? convertMarkdownToHtml(raw.replace(/\n/g, ' ').trim()) : null;
}

function extractChapterTitle(chapterHeader) {
	const match = chapterHeader.match(/### Chapter \d+: (.+)/);
	return match ? match[1].trim() : null;
}

function processLP(lpNumber) {
	const config = LP_CONFIG[lpNumber];
	if (!config) {
		console.error(`No config for LP${lpNumber}`);
		process.exit(1);
	}

	const fullContent = fs.readFileSync(PHASE4_PATH, 'utf8');

	const lpStartIdx = fullContent.indexOf(config.heading);
	if (lpStartIdx === -1) {
		console.error(`Could not find LP${lpNumber} heading: ${config.heading}`);
		process.exit(1);
	}

	const lpEndIdx = fullContent.indexOf(config.nextHeading, lpStartIdx + 1);
	const lpContent = fullContent.substring(
		lpStartIdx,
		lpEndIdx !== -1 ? lpEndIdx : undefined
	);

	console.log(
		`Processing LP${lpNumber}: ${config.folder} (${lpContent.length} chars)\n`
	);

	for (const lesson of config.lessons) {
		const lessonHeadingRegex = new RegExp(
			`## ${lesson.id.replace('.', '\\.')} ${lesson.folder}`
		);
		const lessonStart = lpContent.search(lessonHeadingRegex);
		if (lessonStart === -1) {
			console.error(`  Could not find lesson ${lesson.id} ${lesson.folder}`);
			continue;
		}

		const nextLessonIdx = lesson.id.endsWith('.4')
			? lpContent.length
			: (() => {
					const parts = lesson.id.split('.');
					const nextId = `${parts[0]}.${parseInt(parts[1]) + 1}`;
					const nextRegex = new RegExp(`## ${nextId.replace('.', '\\.')} `);
					const idx = lpContent.search(nextRegex);
					return idx !== -1 ? idx : lpContent.length;
				})();

		const lessonContent = lpContent.substring(lessonStart, nextLessonIdx);

		const openerMatch = lessonContent.match(
			/### 📖 Lesson Opener\n\n([\s\S]*?)(?=\n### Chapter)/
		);
		const opener = openerMatch
			? convertMarkdownToHtml(openerMatch[1].trim())
			: null;

		const lessonOutputDir = path.join(
			OUTPUT_BASE,
			config.folder,
			lesson.folder
		);
		fs.mkdirSync(lessonOutputDir, { recursive: true });

		fs.writeFileSync(
			path.join(lessonOutputDir, 'lesson.json'),
			JSON.stringify({ opener }, null, 2)
		);
		console.log(`  ${lesson.id} ${lesson.folder}: opener extracted`);

		const chapterHeaders = [
			...lessonContent.matchAll(/### Chapter (\d+): ([^\n]+)/g),
		];

		for (let ci = 0; ci < chapterHeaders.length; ci++) {
			const chMatch = chapterHeaders[ci];
			const chNum = parseInt(chMatch[1]);
			const chTitle = chMatch[2].trim();
			const chStart = chMatch.index + chMatch[0].length;
			const chEnd =
				ci < chapterHeaders.length - 1
					? chapterHeaders[ci + 1].index
					: lessonContent.length;
			const chapterContent = lessonContent.substring(chStart, chEnd);

			const bridge = extractBridge(chapterContent);
			const storySections = extractStoryGroups(chapterContent);
			const characterIntros = extractCharacterIntros(chapterContent);
			const lessonInsight = extractWisdom(chapterContent);
			const reflectionQuestions = extractReflectionQuestions(chapterContent);
			const journalEntry = extractJournalEntry(chapterContent);
			const lessonEnding = extractLessonEnding(chapterContent);

			const chapterJson = {
				title: chTitle,
				bridge,
				storySections,
				characterIntros: characterIntros.length > 0 ? characterIntros : undefined,
				lessonInsight,
				reflectionQuestions,
				journalEntry,
				lessonEnding: lessonEnding || undefined,
			};

			Object.keys(chapterJson).forEach((k) => {
				if (chapterJson[k] === undefined) delete chapterJson[k];
			});

			const outPath = path.join(lessonOutputDir, `chapter${chNum}.json`);
			fs.writeFileSync(outPath, JSON.stringify(chapterJson, null, 2));

			const sgCounts = storySections.map((sg) => sg.length).join(', ');
			console.log(
				`    Chapter ${chNum}: "${chTitle}" — ${storySections.length} SGs [${sgCounts} paragraphs]` +
					(bridge ? ' +bridge' : '') +
					(characterIntros.length > 0
						? ` +${characterIntros.length} chars`
						: '') +
					(lessonEnding ? ' +ending' : '')
			);
		}
	}

	console.log('\nDone!');
}

const lpNumber = parseInt(process.argv[2]) || 1;
processLP(lpNumber);
