const fs = require('fs');
const path = require('path');

const PHASE4_PATH = path.join(__dirname, '..', 'continuity-analysis', 'narrative', 'narrative-master-PHASE4.md');
const PHASE5_PATH = path.join(__dirname, '..', 'continuity-analysis', 'narrative', 'narrative-master-PHASE5.md');

const PHASE4_LESSONS = {
	'6.2': 'Solara',
	'6.3': 'Aldric',
	'6.4': 'Lyss',
	'7.1': 'Memor',
	'7.2': 'Libris',
	'7.3': 'Zephyr',
	'7.4': 'Velocity',
};

const PHASE5_LESSONS = {
	'8.1': 'Jasmine',
	'8.2': 'Cypress',
	'8.3': 'Logsworth',
	'8.4': 'Safiya',
	'9.1': 'Architectus',
	'9.2': 'Renderius',
	'9.3': 'Sable',
	'9.4': 'Escapius',
	'10.1': 'Dispatcher',
	'10.2': 'Stylus',
	'10.3': 'Chancellor',
	'10.4': 'Motia',
	'11.1': 'Axios',
	'11.2': 'WebSocket',
	'11.3': 'Redux',
	'11.4': 'Apollo',
	'12.1': 'Typus',
	'12.2': 'Typhos',
	'12.3': 'Guardia',
	'12.4': 'Typewright',
	'13.1': 'Vex',
	'13.2': 'Pipeline',
	'13.3': 'Vercel',
	'13.4': 'Deployment',
	'14.1': 'Nexus',
	'14.2': 'Datum',
	'14.3': 'Tempus',
	'14.4': 'Unitas',
	'15.1': 'Inclusiva',
	'15.2': 'Keynav',
	'15.3': 'Spectrum',
	'15.4': 'Validator',
};

function findLessonForLine(lines, lineIdx) {
	for (let i = lineIdx; i >= 0; i--) {
		const match = lines[i].match(/^## (\d+\.\d+) /);
		if (match) return match[1];
	}
	return null;
}

function findChapterForLine(lines, lineIdx) {
	for (let i = lineIdx; i >= 0; i--) {
		const match = lines[i].match(/^### Chapter (\d+)/);
		if (match) return parseInt(match[1]);
	}
	return null;
}

function processFile(filePath, lessonMap, dryRun) {
	let content = fs.readFileSync(filePath, 'utf-8');
	const lines = content.split('\n');
	const fileName = path.basename(filePath);

	let masteryRenames = 0;
	let wisdomDeletes = 0;

	const masteryRegex = /^\*\*([A-Z][^*]+?) Mastery:\*\*$/;
	const renamedMasteries = [];

	for (let i = 0; i < lines.length; i++) {
		const masteryMatch = lines[i].match(masteryRegex);
		if (!masteryMatch) continue;

		const topic = masteryMatch[1];
		const lessonId = findLessonForLine(lines, i);
		if (!lessonId || !lessonMap[lessonId]) continue;

		const masterName = lessonMap[lessonId];
		const newHeader = `**${masterName}'s ${topic} Wisdom:**`;

		console.log(`  [RENAME] Line ${i + 1}: "${lines[i]}" → "${newHeader}" (LP${lessonId})`);
		lines[i] = newHeader;
		masteryRenames++;

		renamedMasteries.push({
			line: i,
			lessonId,
			masterName,
			topic,
		});
	}

	const wisdomRegex = /^\*\*([A-Z][^*]+?)'s Wisdom:\*\*$/;
	const linesToDelete = new Set();

	for (let i = 0; i < lines.length; i++) {
		const wisdomMatch = lines[i].match(wisdomRegex);
		if (!wisdomMatch) continue;

		const lessonId = findLessonForLine(lines, i);
		if (!lessonId || !lessonMap[lessonId]) continue;

		const chapterNum = findChapterForLine(lines, i);
		const hasMasteryInSameChapter = renamedMasteries.some(
			(rm) => rm.lessonId === lessonId && findChapterForLine(lines, rm.line) === chapterNum
		);

		if (!hasMasteryInSameChapter) continue;

		console.log(`  [DELETE] Line ${i + 1}: "${lines[i]}" (LP${lessonId} Ch${chapterNum} — has topic-wisdom, removing plain wisdom)`);

		let end = i;
		for (let j = i + 1; j < lines.length; j++) {
			if (lines[j].match(/^\*\*(?:Reflection|Aria's Journal|New Characters|Lesson Ending|[A-Z].*Wisdom:)/) || lines[j].match(/^###? /)) {
				end = j;
				break;
			}
			end = j + 1;
		}

		for (let j = i; j < end; j++) {
			linesToDelete.add(j);
		}
		if (i > 0 && lines[i - 1].trim() === '') linesToDelete.add(i - 1);

		wisdomDeletes++;
	}

	if (linesToDelete.size > 0) {
		const filtered = lines.filter((_, idx) => !linesToDelete.has(idx));
		content = filtered.join('\n');
	} else {
		content = lines.join('\n');
	}

	console.log(`\n  ${fileName}: ${masteryRenames} mastery→wisdom renames, ${wisdomDeletes} plain wisdom deletions\n`);

	if (!dryRun) {
		fs.writeFileSync(filePath, content, 'utf-8');
		console.log(`  Written: ${filePath}\n`);
	}

	return { masteryRenames, wisdomDeletes };
}

const dryRun = process.argv.includes('--dry-run');
const phase4Only = process.argv.includes('--phase4');
const phase5Only = process.argv.includes('--phase5');

if (dryRun) console.log('=== DRY RUN MODE ===\n');

if (!phase5Only) {
	console.log('--- Processing PHASE4 (LP6.2-7.4) ---');
	processFile(PHASE4_PATH, PHASE4_LESSONS, dryRun);
}

if (!phase4Only) {
	console.log('--- Processing PHASE5 (LP8-15) ---');
	processFile(PHASE5_PATH, PHASE5_LESSONS, dryRun);
}

console.log(dryRun ? 'Dry run complete. Use without --dry-run to apply.' : 'Done.');
