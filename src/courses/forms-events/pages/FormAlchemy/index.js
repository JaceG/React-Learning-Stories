import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './FormAlchemy.css';

function FormAlchemy() {
	const [selectedPotion, setSelectedPotion] = useState(null);
	const [mixedIngredients, setMixedIngredients] = useState([]);
	const [cauldronContents, setCauldronContents] = useState('');
	const [transmutationState, setTransmutationState] = useState('uncontrolled');
	const [validationRunes, setValidationRunes] = useState({});
	const [portalActive, setPortalActive] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	const handlePotionSelect = (potion) => {
		setSelectedPotion(potion);
		setCauldronContents(`Brewing ${potion} potion...`);
	};

	const handleIngredientAdd = (ingredient) => {
		if (!mixedIngredients.includes(ingredient)) {
			setMixedIngredients([...mixedIngredients, ingredient]);
		}
	};

	const handleTransmutation = (state) => {
		setTransmutationState(state);
	};

	const activateValidationRune = (rune) => {
		setValidationRunes({ ...validationRunes, [rune]: true });
	};

	const openPortal = () => {
		setPortalActive(true);
		setTimeout(() => setPortalActive(false), 3000);
	};

	return (
		<div className='lesson-container'>
			<h1 className='lesson-title'>Form Alchemy</h1>
			<p className='lesson-subtitle'>
				Master the ancient art of transforming user input into React gold
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
					selectedPotion,
					handlePotionSelect,
					mixedIngredients,
					handleIngredientAdd,
					cauldronContents,
					setCauldronContents,
					transmutationState,
					handleTransmutation,
					validationRunes,
					activateValidationRune,
					portalActive,
					openPortal,
					setMixedIngredients,
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
				lessonId='form-alchemy'
			/>
		</div>
	);
}

export default FormAlchemy;