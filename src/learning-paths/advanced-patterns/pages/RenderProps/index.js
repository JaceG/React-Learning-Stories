import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './RenderProps.css';

function RenderProps() {
	const [renderDelegations, setRenderDelegations] = useState([]);
	const [selectedPattern, setSelectedPattern] = useState(null);
	const [logicProviders, setLogicProviders] = useState([]);
	const [presentationConsumers, setPresentationConsumers] = useState([]);
	const [flexibilityLevel, setFlexibilityLevel] = useState(0);
	const [tradeoffBalance, setTradeoffBalance] = useState({ flexibility: 50, simplicity: 50 });

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Add render delegation
	const addDelegation = (delegation) => {
		setRenderDelegations([...renderDelegations, delegation]);
		setFlexibilityLevel(flexibilityLevel + 15);
	};

	// Add logic provider
	const addLogicProvider = (provider) => {
		if (!logicProviders.find(p => p.id === provider.id)) {
			setLogicProviders([...logicProviders, provider]);
		}
	};

	// Add presentation consumer
	const addPresentationConsumer = (consumer) => {
		if (!presentationConsumers.find(c => c.id === consumer.id)) {
			setPresentationConsumers([...presentationConsumers, consumer]);
			setFlexibilityLevel(flexibilityLevel + 10);
		}
	};

	// Select pattern for exploration
	const selectPattern = (pattern) => {
		setSelectedPattern(pattern);
		// Update tradeoff balance based on pattern
		if (pattern === 'children-function') {
			setTradeoffBalance({ flexibility: 70, simplicity: 30 });
		} else if (pattern === 'prop-getters') {
			setTradeoffBalance({ flexibility: 50, simplicity: 50 });
		} else if (pattern === 'state-reducer') {
			setTradeoffBalance({ flexibility: 90, simplicity: 10 });
		}
	};

	// Reset pattern exploration
	const resetPatterns = () => {
		setSelectedPattern(null);
		setTradeoffBalance({ flexibility: 50, simplicity: 50 });
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Render Props</h1>
			<p className='lesson-subtitle'>
				Share behavior while delegating presentation control
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
					renderDelegations,
					addDelegation,
					selectedPattern,
					selectPattern,
					resetPatterns,
					logicProviders,
					addLogicProvider,
					presentationConsumers,
					addPresentationConsumer,
					flexibilityLevel,
					tradeoffBalance,
					setTradeoffBalance
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
				courseId='advanced-patterns'
				lessonId='render-props'
			/>
		</div>
	);
}

export default RenderProps;