import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './DebugDungeon.css';

function DebugDungeon() {
	const [activeDebugTool, setActiveDebugTool] = useState(null);
	const [bugTrail, setBugTrail] = useState([]);
	const [debugDepth, setDebugDepth] = useState(0);
	const [foundBugs, setFoundBugs] = useState([]);
	const [stackTrace, setStackTrace] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Debug tool handlers
	const activateTool = (tool) => {
		setActiveDebugTool(tool);
		if (tool === 'console') {
			setBugTrail([...bugTrail, 'Console log detected anomaly']);
		} else if (tool === 'devtools') {
			setBugTrail([...bugTrail, 'Component tree inspection revealed issue']);
		} else if (tool === 'network') {
			setBugTrail([...bugTrail, 'Network request failure identified']);
		}
	};

	// Navigate deeper into the dungeon
	const descendDeeper = () => {
		setDebugDepth(debugDepth + 1);
		setBugTrail([...bugTrail, `Descended to level ${debugDepth + 1}`]);
	};

	// Capture bug
	const captureBug = (bug) => {
		setFoundBugs([...foundBugs, bug]);
		generateStackTrace(bug);
	};

	// Generate stack trace
	const generateStackTrace = (bug) => {
		setStackTrace({
			error: bug.type,
			stack: [
				`at ${bug.component} (${bug.file}:${bug.line})`,
				`at ComponentDidUpdate (react-dom.js:11234)`,
				`at commitLifeCycles (react-dom.js:8765)`,
				`at commitLayoutEffects (react-dom.js:7890)`
			]
		});
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Debug Dungeon</h1>
			<p className='lesson-subtitle'>
				Navigate the dark passages where bugs hide in production shadows
			</p>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			{/* Render the current chapter */}
			<Outlet
				context={{
					activeDebugTool,
					activateTool,
					bugTrail,
					debugDepth,
					descendDeeper,
					foundBugs,
					captureBug,
					stackTrace
				}}
			/>

			<div className='chapter-navigation'>
				<button
					onClick={() => goToChapter(currentChapter - 1)}
					disabled={currentChapter === 1}
					className='chapter-nav-button'>
					← Previous Chapter
				</button>
				<span className='chapter-indicator'>
					Chapter {currentChapter} of 3
				</span>
				<button
					onClick={() => goToChapter(currentChapter + 1)}
					disabled={currentChapter === 3}
					className='chapter-nav-button'>
					Next Chapter →
				</button>
			</div>

			<LessonNavigation
				courseId='testing-debugging'
				lessonId='debug-dungeon'
			/>
		</div>
	);
}

export default DebugDungeon;