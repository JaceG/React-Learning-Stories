import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
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
			<LessonHeader
				title='Form Alchemy'
				subtitle='Transform user input into React gold with Master Alchemist Formeus'
				opener='The Western Quarter hummed with a different energy than the rest of the kingdom. Here, the abstract mastery of hooks and patterns transformed into tangible user interfaces. Aria paused at the entrance to the Form Alchemy Lab, Binary adjusting his sensors for the new environment. After her triumphs at the Hooks Academy, she was ready to apply her knowledge to the practical art of capturing user input and transforming it into application state.'
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId='forms-events'
				lessonId='form-alchemy'
				totalChapters={3}
			/>
		</div>
	);
}

export default FormAlchemy;
