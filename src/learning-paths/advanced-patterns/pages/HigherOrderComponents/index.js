import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout';
import '../../../CourseStyles.css';
import './HigherOrderComponents.css';

function HigherOrderComponents() {
	const [forgedComponents, setForgedComponents] = useState([]);
	const [enhancementLayers, setEnhancementLayers] = useState([]);
	const [selectedEnhancement, setSelectedEnhancement] = useState(null);
	const [compositionChain, setCompositionChain] = useState([]);
	const [debuggingDepth, setDebuggingDepth] = useState(0);
	const [forgeTemperature, setForgeTemperature] = useState(0);
	const [evolutionStage, setEvolutionStage] = useState('learning');

	// Forge a new enhanced component
	const forgeComponent = (baseComponent, enhancement) => {
		const forged = {
			id: Date.now(),
			base: baseComponent,
			enhancement: enhancement,
			layers: enhancementLayers.length + 1
		};
		setForgedComponents([...forgedComponents, forged]);
		setForgeTemperature(forgeTemperature + 20);
	};

	// Add enhancement layer
	const addEnhancementLayer = (layer) => {
		setEnhancementLayers([...enhancementLayers, layer]);
		setDebuggingDepth(debuggingDepth + 1);
	};

	// Select enhancement for exploration
	const selectEnhancement = (enhancement) => {
		setSelectedEnhancement(enhancement);
		if (enhancement) {
			setForgeTemperature(forgeTemperature + 10);
		}
	};

	// Build composition chain
	const addToCompositionChain = (hoc) => {
		setCompositionChain([...compositionChain, hoc]);
	};

	// Clear composition chain
	const clearCompositionChain = () => {
		setCompositionChain([]);
	};

	// Update evolution stage
	const evolve = (stage) => {
		setEvolutionStage(stage);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Higher-Order Components`}
				subtitle={`Enhance components with reusable logic through composition`}
				opener={`The Enhancement Forge glowed with transformative energy as Forge Master Enhance welcomed Aria. "Higher-Order Components are component factories," he explained. "They take a component and return an enhanced version - like my custom hooks, but for components instead of logic." The forge blazed brighter as he demonstrated authentication checking, logging, and performance tracking.`}
				totalChapters={3}
			/>

			{/* Render the current chapter */}
			<Outlet
				context={{
					forgedComponents,
					forgeComponent,
					enhancementLayers,
					addEnhancementLayer,
					selectedEnhancement,
					selectEnhancement,
					compositionChain,
					addToCompositionChain,
					clearCompositionChain,
					debuggingDepth,
					forgeTemperature,
					evolutionStage,
					evolve
				}}
			/>

			<LessonFooter
				courseId={`advanced-patterns`}
				lessonId={`higher-order-components`}
				totalChapters={3}
			/>
		</div>
	);
}

export default HigherOrderComponents;