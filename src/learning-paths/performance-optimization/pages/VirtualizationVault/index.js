import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './VirtualizationVault.css';

function VirtualizationVault() {
	const [visibleItems, setVisibleItems] = useState([]);
	const [scrollPosition, setScrollPosition] = useState(0);
	const [renderCount, setRenderCount] = useState(0);
	const [virtualizationEnabled, setVirtualizationEnabled] = useState(false);
	const [windowSize, setWindowSize] = useState(10);
	const [bufferSize, setBufferSize] = useState(3);

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
			<LessonHeader
				title='Virtualization Vault'
				subtitle='Master the art of rendering infinite lists with finite resources'
				opener={`Keeper Chronos had revealed the secrets of lazy loading, but warned of one final challenge. "Deep beneath the kingdom lies the Virtualization Vault, where infinite data threatens to overwhelm even the most optimized applications. Guardian Zephyr awaits - master his techniques, and no amount of data will slow your creations." Aria descended into the depths, ready to conquer the final performance frontier.`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='performance-optimization'
				lessonId='virtualization-vault'
				totalChapters={3}
			/>
		</div>
	);
}

export default VirtualizationVault;