import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
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

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<h1 className='lesson-title'>Higher-Order Components</h1>
			<p className='lesson-subtitle'>
				Enhance components with reusable logic through composition
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
				lessonId='higher-order-components'
			/>
		</div>
	);
}

export default HigherOrderComponents;