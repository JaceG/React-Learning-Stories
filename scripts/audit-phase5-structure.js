const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '..', 'continuity-analysis', 'narrative', 'narrative-master-PHASE5.md');
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');

const EXPECTED_LPS = [8, 9, 10, 11, 12, 13, 14, 15];
const EXPECTED_LESSONS_PER_LP = 4;
const EXPECTED_CHAPTERS_PER_LESSON = 3;
const EXPECTED_STORY_GROUPS_PER_CHAPTER = 3;

const structure = {};
let currentLP = null;
let currentLesson = null;
let currentChapter = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const lineNum = i + 1;

  const lpMatch = line.match(/^# (\d+)\. (.+)$/);
  if (lpMatch) {
    currentLP = parseInt(lpMatch[1]);
    structure[currentLP] = { title: lpMatch[2], line: lineNum, lessons: {} };
    currentLesson = null;
    currentChapter = null;
    continue;
  }

  const lessonMatch = line.match(/^## (\d+)\.(\d+) (.+)$/);
  if (lessonMatch && currentLP) {
    const lpNum = parseInt(lessonMatch[1]);
    const lessonNum = parseInt(lessonMatch[2]);
    const lessonKey = `${lpNum}.${lessonNum}`;
    if (!structure[lpNum]) {
      structure[lpNum] = { title: `(LP${lpNum} header missing)`, line: 0, lessons: {} };
    }
    structure[lpNum].lessons[lessonNum] = {
      title: lessonMatch[3],
      line: lineNum,
      chapters: {}
    };
    currentLP = lpNum;
    currentLesson = lessonNum;
    currentChapter = null;
    continue;
  }

  const chapterMatch = line.match(/^### Chapter (\d+): (.+)$/);
  if (chapterMatch && currentLP && currentLesson) {
    const chapNum = parseInt(chapterMatch[1]);
    structure[currentLP].lessons[currentLesson].chapters[chapNum] = {
      title: chapterMatch[2],
      line: lineNum,
      storyGroups: 0
    };
    currentChapter = chapNum;
    continue;
  }

  if (line.match(/^\*\*Story Group \d+/) && currentLP && currentLesson && currentChapter) {
    structure[currentLP].lessons[currentLesson].chapters[currentChapter].storyGroups++;
  }
}

// Report
console.log('='.repeat(70));
console.log('PHASE 5 STRUCTURAL AUDIT — narrative-master-PHASE5.md');
console.log('='.repeat(70));
console.log();

const issues = [];

for (const lp of EXPECTED_LPS) {
  if (!structure[lp]) {
    issues.push(`MISSING LP${lp} entirely`);
    console.log(`\n❌ LP${lp}: MISSING ENTIRELY`);
    continue;
  }

  const lpData = structure[lp];
  const lessonKeys = Object.keys(lpData.lessons).map(Number).sort((a, b) => a - b);
  const lessonCount = lessonKeys.length;
  const lpStatus = lessonCount === EXPECTED_LESSONS_PER_LP ? '✅' : '❌';
  console.log(`\n${lpStatus} LP${lp}: ${lpData.title} (line ${lpData.line}) — ${lessonCount}/${EXPECTED_LESSONS_PER_LP} lessons`);

  if (lessonCount !== EXPECTED_LESSONS_PER_LP) {
    const missing = [];
    for (let l = 1; l <= EXPECTED_LESSONS_PER_LP; l++) {
      if (!lpData.lessons[l]) missing.push(`${lp}.${l}`);
    }
    if (missing.length) {
      issues.push(`LP${lp}: missing lessons ${missing.join(', ')}`);
      console.log(`   ⚠️  Missing lessons: ${missing.join(', ')}`);
    }
  }

  for (const lessonNum of lessonKeys) {
    const lesson = lpData.lessons[lessonNum];
    const chapKeys = Object.keys(lesson.chapters).map(Number).sort((a, b) => a - b);
    const chapCount = chapKeys.length;
    const lessonStatus = chapCount === EXPECTED_CHAPTERS_PER_LESSON ? '✅' : '❌';
    console.log(`   ${lessonStatus} ${lp}.${lessonNum} ${lesson.title} (line ${lesson.line}) — ${chapCount}/${EXPECTED_CHAPTERS_PER_LESSON} chapters`);

    if (chapCount !== EXPECTED_CHAPTERS_PER_LESSON) {
      const missing = [];
      for (let c = 1; c <= EXPECTED_CHAPTERS_PER_LESSON; c++) {
        if (!lesson.chapters[c]) missing.push(c);
      }
      if (missing.length) {
        issues.push(`${lp}.${lessonNum}: missing chapters ${missing.join(', ')}`);
        console.log(`      ⚠️  Missing chapters: ${missing.join(', ')}`);
      }
    }

    for (const chapNum of chapKeys) {
      const chap = lesson.chapters[chapNum];
      const sgCount = chap.storyGroups;
      const sgStatus = sgCount === EXPECTED_STORY_GROUPS_PER_CHAPTER ? '✅' : '❌';
      console.log(`      ${sgStatus} Ch${chapNum}: ${chap.title} (line ${chap.line}) — ${sgCount}/${EXPECTED_STORY_GROUPS_PER_CHAPTER} story groups`);

      if (sgCount !== EXPECTED_STORY_GROUPS_PER_CHAPTER) {
        issues.push(`${lp}.${lessonNum} Ch${chapNum} "${chap.title}": ${sgCount}/${EXPECTED_STORY_GROUPS_PER_CHAPTER} story groups`);
      }
    }
  }
}

console.log('\n' + '='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));

if (issues.length === 0) {
  console.log('\n✅ ALL CHECKS PASSED — 8 LPs × 4 lessons × 3 chapters × 3 story groups');
} else {
  console.log(`\n❌ ${issues.length} ISSUE(S) FOUND:\n`);
  issues.forEach((issue, i) => console.log(`  ${i + 1}. ${issue}`));
}

console.log();
