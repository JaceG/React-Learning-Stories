import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LessonHeader, LessonFooter } from '../../../../components/layout/';
import '../../../CourseStyles.css';
import './VisualAccessibility.css';

function VisualAccessibility() {
	const [colorMode, setColorMode] = useState('normal');
	const [contrastLevel, setContrastLevel] = useState('AA');
	const [colorBlindMode, setColorBlindMode] = useState('none');
	const [contrastErrors, setContrastErrors] = useState([]);
	const [motionPreference, setMotionPreference] = useState('full');
	const [textSize, setTextSize] = useState('medium');
	const [colorCombinations, setColorCombinations] = useState({
		text: '#000000',
		background: '#FFFFFF'
	});
	const [nonColorIndicators, setNonColorIndicators] = useState({
		icons: false,
		patterns: false,
		labels: false,
		shapes: false
	});
	const [darkModeSupport, setDarkModeSupport] = useState(false);
	const [highContrastMode, setHighContrastMode] = useState(false);
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
	const [motionSettings, setMotionSettings] = useState({
		preference: 'auto',
		animationSpeed: 1,
		pauseAll: false
	});
	const [animationControls, setAnimationControls] = useState({
		play: true,
		pause: false,
		stop: false
	});

	// Calculate contrast ratio
	const calculateContrastRatio = (color1, color2) => {
		// Simplified calculation for demo
		const getLuminance = (hex) => {
			const rgb = parseInt(hex.slice(1), 16);
			const r = (rgb >> 16) & 0xff;
			const g = (rgb >> 8) & 0xff;
			const b = rgb & 0xff;
			return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
		};
		
		const l1 = getLuminance(color1);
		const l2 = getLuminance(color2);
		const contrast = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
		
		return contrast.toFixed(2);
	};

	// Check contrast compliance
	const checkContrastCompliance = (ratio, textSize) => {
		const ratioNum = parseFloat(ratio);
		if (textSize === 'large') {
			return ratioNum >= 3.0 ? (ratioNum >= 4.5 ? 'AAA' : 'AA') : 'Fail';
		} else {
			return ratioNum >= 4.5 ? (ratioNum >= 7.0 ? 'AAA' : 'AA') : 'Fail';
		}
	};

	// Add non-color indicator
	const addNonColorIndicator = (type) => {
		setNonColorIndicators(prev => ({
			...prev,
			[type]: true
		}));
	};

	// Simulate color blindness
	const applyColorBlindFilter = (mode) => {
		setColorBlindMode(mode);
		// In real implementation, this would apply CSS filters
	};

	// Set motion preference
	const updateMotionPreference = (preference) => {
		setMotionPreference(preference);
		// In real app, this would toggle animations
	};

	return (
		<div className='lesson-container'>
			<LessonHeader
				title={`Visual Accessibility`}
				subtitle={`Explore color, contrast, and motion considerations in the Color Conservatory`}
				opener={`The Color Conservatory shimmered with every hue imaginable, its crystalline walls refracting light into rainbows that danced across the floor. Guardian Spectrum stepped forward, their robes shifting through the entire visible spectrum. "Welcome, young developer. Here you will learn that color is both powerful and perilous. Eight percent of men see differently than you might expect." They gestured to a display where red and green indicators flashed. "Never let color be your only voice."`}
				totalChapters={3}
			/>

			<Outlet
				context={{
					colorMode,
					setColorMode,
					contrastLevel,
					setContrastLevel,
					colorBlindMode,
					setColorBlindMode,
					contrastErrors,
					setContrastErrors,
					motionPreference,
					setMotionPreference,
					textSize,
					setTextSize,
					colorCombinations,
					setColorCombinations,
					calculateContrastRatio,
					checkContrastCompliance,
					nonColorIndicators,
					addNonColorIndicator,
					darkModeSupport,
					setDarkModeSupport,
					highContrastMode,
					setHighContrastMode,
					applyColorBlindFilter,
					updateMotionPreference,
					prefersReducedMotion,
					setPrefersReducedMotion,
					motionSettings,
					setMotionSettings,
					animationControls,
					setAnimationControls
				}}
			/>

			<LessonFooter
				courseId={`accessibility`}
				lessonId={`visual-accessibility`}
				totalChapters={3}
			/>
		</div>
	);
}

export default VisualAccessibility;