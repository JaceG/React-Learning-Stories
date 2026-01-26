import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './InclusiveFoundations.css';

function InclusiveFoundations() {
	const [accessibilityScore, setAccessibilityScore] = useState(0);
	const [barriersDetected, setBarriersDetected] = useState([]);
	const [accessibilityLevel, setAccessibilityLevel] = useState('Beginner');
	const [inclusiveFeatures, setInclusiveFeatures] = useState({
		semanticHTML: false,
		ariaLabels: false,
		keyboardNav: false,
		screenReaderSupport: false,
		colorContrast: false
	});
	const [auditResults, setAuditResults] = useState(null);

	// Barrier detection
	const addBarrier = (barrier) => {
		if (!barriersDetected.find(b => b.id === barrier.id)) {
			setBarriersDetected([...barriersDetected, barrier]);
		}
	};

	const removeBarrier = (barrierId) => {
		setBarriersDetected(barriersDetected.filter(b => b.id !== barrierId));
		updateAccessibilityScore();
	};

	// Feature implementation
	const implementFeature = (feature) => {
		setInclusiveFeatures(prev => ({
			...prev,
			[feature]: true
		}));
		updateAccessibilityScore();
	};

	// Score calculation
	const updateAccessibilityScore = () => {
		const featureCount = Object.values(inclusiveFeatures).filter(f => f).length;
		const barrierPenalty = barriersDetected.length * 10;
		const score = Math.max(0, (featureCount * 20) - barrierPenalty);
		
		setAccessibilityScore(score);
		
		// Update level based on score
		if (score >= 80) {
			setAccessibilityLevel('Champion');
		} else if (score >= 60) {
			setAccessibilityLevel('Advocate');
		} else if (score >= 40) {
			setAccessibilityLevel('Practitioner');
		} else if (score >= 20) {
			setAccessibilityLevel('Learner');
		}
	};

	// Audit function
	const runAccessibilityAudit = (results) => {
		setAuditResults(results);
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Inclusive Foundations`}
				subtitle={`Enter the Inclusive Empire with Empress Inclusiva and discover the philosophy of building for everyone`}
				opener={`At the heart of the digital realm stood the Inclusive Empire - not a separate kingdom, but a philosophy that touched every corner of the React world. Empress Inclusiva welcomed Aria with a gentle smile that seemed to see everything and nothing at once. "You've built powerful applications, optimized them, deployed them globally," she said, her voice carrying through multiple sensory channels. "But can everyone use them?"`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					accessibilityScore,
					barriersDetected,
					addBarrier,
					removeBarrier,
					accessibilityLevel,
					inclusiveFeatures,
					implementFeature,
					auditResults,
					runAccessibilityAudit,
					updateAccessibilityScore
				}}
			/>

			<LessonFooter
				courseId='accessibility'
				lessonId='inclusive-foundations'
			/>
		</div>
	);
}

export default InclusiveFoundations;
