import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import LessonNavigation from '../../../../components/layout/LessonNavigation';
import '../../../CourseStyles.css';
import './NativePowers.css';

function NativePowers() {
	const [deviceCapabilities, setDeviceCapabilities] = useState([]);
	const [permissionStatus, setPermissionStatus] = useState({});
	const [sanctuaryLevel, setSanctuaryLevel] = useState('Visitor');
	const [powerUnlocked, setPowerUnlocked] = useState(0);
	const [activeDevice, setActiveDevice] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	// Determine current chapter from URL
	const chapterMatch = location.pathname.match(/chapter(\d)/);
	const currentChapter = chapterMatch ? Number(chapterMatch[1]) : 1;

	const goToChapter = (chapter) => {
		navigate(`chapter${chapter}`);
	};

	// Device capability management
	const unlockCapability = (capability) => {
		if (!deviceCapabilities.includes(capability)) {
			setDeviceCapabilities([...deviceCapabilities, capability]);
			setPowerUnlocked(prev => prev + 1);
		}
	};

	// Permission handling
	const requestPermission = (feature, status) => {
		setPermissionStatus(prev => ({
			...prev,
			[feature]: status
		}));
	};

	// Sanctuary advancement
	const advanceSanctuary = (level) => {
		setSanctuaryLevel(level);
	};

	// Device activation
	const activateDevice = (device) => {
		setActiveDevice(device);
	};

	return (
		<div className='lesson-container'>
			<div className='lesson-header'>
				<h1>Native Powers</h1>
				<p className='lesson-subtitle'>
					Access device capabilities at the Device Sanctuary with Sanctuary Keeper Bridge
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
					deviceCapabilities,
					unlockCapability,
					permissionStatus,
					requestPermission,
					sanctuaryLevel,
					advanceSanctuary,
					powerUnlocked,
					setPowerUnlocked,
					activeDevice,
					activateDevice
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
				courseId='react-native'
				lessonId='native-powers'
			/>
		</div>
	);
}

export default NativePowers;