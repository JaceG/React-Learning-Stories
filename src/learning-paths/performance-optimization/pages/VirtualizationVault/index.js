import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './VirtualizationVault.css';

function VirtualizationVault() {
	const [visibleItems, setVisibleItems] = useState([]);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [renderCount, setRenderCount] = useState(0);
	const [virtualizationEnabled, setVirtualizationEnabled] = useState(false);
	const [windowSize, setWindowSize] = useState(10);
	const [bufferSize, setBufferSize] = useState(3);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Update visible items based on scroll
	const updateVisibleItems = (scrollTop, totalItems) => {
		const itemHeight = 50;
		const startIndex = Math.floor(scrollTop / itemHeight);
		const endIndex = Math.min(
			startIndex + windowSize + bufferSize * 2,
			totalItems
		);
		
		const visible = [];
		for (let i = Math.max(0, startIndex - bufferSize); i < endIndex; i++) {
			visible.push(i);
		}
		
		setVisibleItems(visible);
		setRenderCount(renderCount + 1);
	};

	// Handle scroll events
	const handleScroll = (scrollTop, totalItems) => {
		setScrollPosition(scrollTop);
		if (virtualizationEnabled) {
			updateVisibleItems(scrollTop, totalItems);
		}
	};

	// Toggle virtualization
	const toggleVirtualization = () => {
		setVirtualizationEnabled(!virtualizationEnabled);
		if (!virtualizationEnabled) {
			updateVisibleItems(scrollPosition, 10000);
		}
	};

	// Performance metrics
	const calculatePerformance = () => {
		const baseRenderTime = 5000; // ms for 10000 items
		const virtualizedRenderTime = 50; // ms for visible items
		const improvement = ((baseRenderTime - virtualizedRenderTime) / baseRenderTime * 100).toFixed(1);
		
		return {
			withoutVirtual: baseRenderTime,
			withVirtual: virtualizedRenderTime,
			improvement,
			memoryUsage: virtualizationEnabled ? '50MB' : '500MB'
		};
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Virtualization Vault</h1>
			<p className='lesson-subtitle'>
				Master the art of rendering infinite lists with finite resources
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
					visibleItems,
					scrollPosition,
					renderCount,
					virtualizationEnabled,
					windowSize,
					bufferSize,
					handleScroll,
					toggleVirtualization,
					setWindowSize,
					setBufferSize,
					calculatePerformance,
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
				courseId='performance-optimization'
				lessonId='virtualization-vault'
			/>
		</div>
	);
}

export default VirtualizationVault;