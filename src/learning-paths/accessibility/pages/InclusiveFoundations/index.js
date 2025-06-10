import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
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

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

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
			<div className='lesson-header'>
				<h1>Inclusive Foundations</h1>
				<p className='lesson-subtitle'>
					Enter the Inclusive Empire with Empress Inclusiva and discover the philosophy of building for everyone
				</p>
			</div>

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
				courseId='accessibility'
				lessonId='inclusive-foundations'
			/>
		</div>
	);
}

export default InclusiveFoundations;