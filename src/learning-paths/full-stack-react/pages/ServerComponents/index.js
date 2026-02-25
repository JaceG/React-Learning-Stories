import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LessonHeader from '../../../../components/layout/LessonHeader';
import LessonFooter from '../../../../components/layout/LessonFooter';
import '../../../CourseStyles.css';
import './ServerComponents.css';

function NativePowers() {
	const [deviceCapabilities, setDeviceCapabilities] = useState([]);
	const [permissionStatus, setPermissionStatus] = useState({});
	const [sanctuaryLevel, setSanctuaryLevel] = useState('Visitor');
	const [powerUnlocked, setPowerUnlocked] = useState(0);
	const [activeDevice, setActiveDevice] = useState(null);

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
			<LessonHeader
				title={`Native Powers`}
				subtitle={`Access device capabilities at the Device Sanctuary with Sanctuary Keeper Bridge`}
				opener={`The Device Sanctuary pulsed with raw potential. Sanctuary Keeper Bridge welcomed Aria and Binary to the heart of native power. "Here, web knowledge transforms into native capabilities," Bridge explained, gesturing to six glowing orbs orbiting above them. "Each represents a device power - camera, location, storage, sensors. But with great access comes great responsibility."`}
				totalChapters={3}
			/>

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

			<LessonFooter
				courseId={`react-native`}
				lessonId={`native-powers`}
				totalChapters={3}
			/>
		</div>
	);
}

export default NativePowers;