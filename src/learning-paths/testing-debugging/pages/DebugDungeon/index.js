import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './DebugDungeon.css';

function DebugDungeon() {
	const [activeDebugTool, setActiveDebugTool] = useState(null);
	const [bugTrail, setBugTrail] = useState([]);
	const [debugDepth, setDebugDepth] = useState(0);
	const [foundBugs, setFoundBugs] = useState([]);
	const [stackTrace, setStackTrace] = useState(null);

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
			<LessonHeader
				title={`Debug Dungeon`}
				subtitle={`Navigate the dark passages where bugs hide in production shadows`}
				opener={`Below the Testing Tower lay the Debug Dungeon, where the most elusive bugs hid. These weren't ordinary bugs - they were production bugs, shape-shifters that behaved differently than in development. Dungeon Keeper Logsworth met Aria at the entrance, his beard grey from years of debugging. "Even with tests, some bugs slip through. Here, we hunt them in production."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`testing-debugging`}
				lessonId={`debug-dungeon`}
				totalChapters={3}
			/>
		</div>
	);
}

export default DebugDungeon;