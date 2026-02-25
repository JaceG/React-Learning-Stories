import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './PatternEvolution.css';

function RenderProps() {
	const [renderDelegations, setRenderDelegations] = useState([]);
	const [selectedPattern, setSelectedPattern] = useState(null);
	const [logicProviders, setLogicProviders] = useState([]);
	const [presentationConsumers, setPresentationConsumers] = useState([]);
	const [flexibilityLevel, setFlexibilityLevel] = useState(0);
	const [tradeoffBalance, setTradeoffBalance] = useState({ flexibility: 50, simplicity: 50 });

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
			<LessonHeader
				title={`Render Props`}
				subtitle={`Share behavior while delegating presentation control`}
				opener={`Pattern Master Renderius welcomed Aria to a chamber filled with floating paintbrushes and blank canvases. "Compound components share state implicitly. Render props share behavior explicitly," he explained. "It's like giving someone else your paintbrush but guiding their hand - the logic provider says 'here's what's happening,' and the presentation consumer says 'here's how to show it.'"`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`advanced-patterns`}
				lessonId={`render-props`}
				totalChapters={3}
			/>
		</div>
	);
}

export default RenderProps;