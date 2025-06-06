import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './EventSymphony.css';

function EventSymphony() {
	const [playingInstruments, setPlayingInstruments] = useState([]);
	const [eventLog, setEventLog] = useState([]);
	const [currentTempo, setCurrentTempo] = useState(120);
	const [capturedCells, setCapturedCells] = useState([]);
	const [bubbledCells, setBubbledCells] = useState([]);
	const [performanceMetrics, setPerformanceMetrics] = useState({
		clicks: 0,
		keyPresses: 0,
		mouseMoves: 0
	});

	const navigate = useNavigate();
	const location = useLocation();

	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	const playInstrument = (instrument) => {
		setPlayingInstruments([...playingInstruments, instrument]);
		setTimeout(() => {
			setPlayingInstruments(prev => prev.filter(i => i !== instrument));
		}, 500);
	};

	const logEvent = (eventInfo) => {
		const timestamp = new Date().toLocaleTimeString();
		setEventLog(prev => [...prev.slice(-4), { ...eventInfo, timestamp }]);
	};

	const handleCellCapture = (index) => {
		setCapturedCells(prev => 
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
		);
	};

	const handleCellBubble = (index) => {
		setBubbledCells(prev => 
			prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
		);
	};

	const updateMetric = (metric) => {
		setPerformanceMetrics(prev => ({
			...prev,
			[metric]: prev[metric] + 1
		}));
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Event Symphony</h1>
			<p className='lesson-subtitle'>
				Orchestrate browser events with React's synthetic event system
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

			<Outlet
				context={{
					playingInstruments,
					playInstrument,
					eventLog,
					logEvent,
					currentTempo,
					setCurrentTempo,
					capturedCells,
					handleCellCapture,
					bubbledCells,
					handleCellBubble,
					performanceMetrics,
					updateMetric
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
				courseId='forms-events'
				lessonId='event-symphony'
			/>
		</div>
	);
}

export default EventSymphony;