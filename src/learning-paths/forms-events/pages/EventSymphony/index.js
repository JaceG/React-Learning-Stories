import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
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
		mouseMoves: 0,
	});

	const playInstrument = (instrument) => {
		setPlayingInstruments([...playingInstruments, instrument]);
		setTimeout(() => {
			setPlayingInstruments((prev) =>
				prev.filter((i) => i !== instrument)
			);
		}, 500);
	};

	const logEvent = (eventInfo) => {
		const timestamp = new Date().toLocaleTimeString();
		setEventLog((prev) => [...prev.slice(-4), { ...eventInfo, timestamp }]);
	};

	const handleCellCapture = (index) => {
		setCapturedCells((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		);
	};

	const handleCellBubble = (index) => {
		setBubbledCells((prev) =>
			prev.includes(index)
				? prev.filter((i) => i !== index)
				: [...prev, index]
		);
	};

	const updateMetric = (metric) => {
		setPerformanceMetrics((prev) => ({
			...prev,
			[metric]: prev[metric] + 1,
		}));
	};

	return (
		<div className='lesson-container event-symphony-container'>
			<LessonHeader
				title='Event Symphony'
				subtitle='Compose complex event orchestrations with Conductor Eventus'
				opener={`Word of Aria's form alchemy innovations spread quickly through the Western Quarter. As she and Binary made their way through the bustling streets, a messenger in flowing robes intercepted them with an ornate scroll. "From Conductor Eventus of the Event Symphony Hall," the messenger announced. "Your Academy training is urgently needed."`}
				totalChapters={3}
			/>

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
					updateMetric,
				}}
			/>

			<LessonFooter
				courseId='forms-events'
				lessonId='event-symphony'
				totalChapters={3}
			/>
		</div>
	);
}

export default EventSymphony;
