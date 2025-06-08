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
		<div className='lesson-container event-symphony-container'>
			<div className='lesson-opener'>
				<p>Word of Aria's form alchemy innovations spread quickly through the Western Quarter. 
				As she and Binary made their way through the bustling streets, a messenger in flowing 
				robes intercepted them with an ornate scroll. "From Conductor Eventus of the Event 
				Symphony Hall," the messenger announced. "Your expertise is urgently requested."</p>
			</div>
			
			<h1 className='lesson-title'>Event Symphony</h1>
			<p className='lesson-subtitle'>
				Compose complex event orchestrations with Conductor Eventus
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