import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './FormAlchemy.css';

function FormAlchemy() {
	const [selectedPotion, setSelectedPotion] = useState(null);
	const [mixedIngredients, setMixedIngredients] = useState([]);
	const [cauldronContents, setCauldronContents] = useState('');
	const [transmutationState, setTransmutationState] =
		useState('uncontrolled');
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
		<div className='lesson-container form-alchemy-container'>
			<div className='lesson-opener'>
				<p>
					The Western Quarter hummed with a different energy than the
					rest of the kingdom. Here, the abstract mastery of hooks and
					patterns transformed into tangible user interfaces. Aria
					paused at the entrance to the Form Alchemy Lab, Binary
					adjusting his sensors for the new environment. After her
					triumphs at the Hooks Academy, she was ready to apply her
					knowledge to the practical art of capturing user input and
					transforming it into application state.
				</p>
			</div>

			<h1 className='lesson-title'>Form Alchemy</h1>
			<p className='lesson-subtitle'>
				Transform user input into React gold with Master Alchemist
				Formeus
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

			<LessonNavigation courseId='forms-events' lessonId='form-alchemy' />
		</div>
	);
}

export default FormAlchemy;
