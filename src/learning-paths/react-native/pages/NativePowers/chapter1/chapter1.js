import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';

const ChapterOne = () => {
	const [sanctuaryActive, setSanctuaryActive] = useState(false);
	const [selectedCapability, setSelectedCapability] = useState(null);
	const [permissionModal, setPermissionModal] = useState(null);
	const { 
		deviceCapabilities,
		unlockCapability,
		permissionStatus,
		requestPermission,
		sanctuaryLevel,
		advanceSanctuary,
		powerUnlocked,
		setPowerUnlocked
	} = useOutletContext();

	const capabilities = [
		{ id: 'camera', icon: '📷', name: 'Camera', angle: 0, description: 'Access device camera for photos and video' },
		{ id: 'location', icon: '📍', name: 'Location', angle: 60, description: 'Get current GPS coordinates and track movement' },
		{ id: 'contacts', icon: '📱', name: 'Contacts', angle: 120, description: 'Read and write device contacts' },
		{ id: 'storage', icon: '💾', name: 'Storage', angle: 180, description: 'Access file system and photos' },
		{ id: 'notifications', icon: '🔔', name: 'Notifications', angle: 240, description: 'Send push notifications' },
		{ id: 'sensors', icon: '📡', name: 'Sensors', angle: 300, description: 'Access gyroscope, accelerometer, magnetometer' }
	];

	const handleCapabilityClick = (capability) => {
		if (!deviceCapabilities.includes(capability.id)) {
			setSelectedCapability(capability);
			setPermissionModal(capability);
		}
	};

	const handlePermissionResponse = (allowed) => {
		if (selectedCapability && allowed) {
			unlockCapability(selectedCapability.id);
			requestPermission(selectedCapability.id, 'granted');
			
			// Check for sanctuary advancement
			if (deviceCapabilities.length + 1 >= 3 && sanctuaryLevel === 'Visitor') {
				advanceSanctuary('Apprentice');
			} else if (deviceCapabilities.length + 1 >= 6) {
				advanceSanctuary('Master');
			}
		} else if (selectedCapability) {
			requestPermission(selectedCapability.id, 'denied');
		}
		setPermissionModal(null);
		setSelectedCapability(null);
	};

	const handleSanctuaryActivation = () => {
		setSanctuaryActive(!sanctuaryActive);
	};

	// Calculate position for capabilities in orbit
	const getCapabilityPosition = (angle) => {
		const radius = 180;
		const angleRad = (angle * Math.PI) / 180;
		const x = Math.cos(angleRad) * radius;
		const y = Math.sin(angleRad) * radius;
		return { 
			left: `calc(50% + ${x}px - 40px)`, 
			top: `calc(50% + ${y}px - 40px)` 
		};
	};

	return (
		<div className='chapter native-powers'>
			<ChapterIntro
				chapterNumber={1}
				title={`The Device Sanctuary`}
			/>

			<div className='story-section'>
				<p className='story-paragraph'>
					<strong>Sanctuary Keeper Bridge</strong> welcomed them to the Device Sanctuary. 
					"Here, web knowledge transforms into native power. Each capability requires 
					trust and permission."
				</p>
				
				<p className='story-paragraph'>
					The sanctuary glowed with potential. Six orbs floated in orbit, each 
					representing a device capability. "Touch an orb to request its power," 
					Bridge explained.
				</p>

				<p className='story-paragraph'>
					Aria marveled at the setup. "It's like my web APIs, but with deeper 
					system access!"
				</p>

				<p className='story-paragraph'>
					Binary calculated permissions. "Camera: privacy critical. Location: 
					sensitivity high. Storage: security paramount. Permission flow essential!"
				</p>

				<p className='story-paragraph'>
					"Exactly," Bridge nodded. "Native apps bridge JavaScript to device hardware. 
					But with great power comes great responsibility - and permission requests."
				</p>
			</div>

			<div className='interactive-section'>
				<h3 className='section-title'>The Device Sanctuary</h3>
				
				<InstructionBox character={`Bridge gestures to the orbiting capability orbs.`}>
					{`"Each orb represents a device power. Click on one to request its capability - but remember, users must grant permission. Watch how permissions flow!"`}
				</InstructionBox>
				
				<div className='device-sanctuary'>
					<div 
						className={`sanctuary-core ${sanctuaryActive ? 'active' : ''}`}
						onClick={handleSanctuaryActivation}
					>
						🏛️
					</div>

					{capabilities.map((capability) => {
						const position = getCapabilityPosition(capability.angle);
						const isUnlocked = deviceCapabilities.includes(capability.id);
						
						return (
							<div
								key={capability.id}
								className={`device-capability ${isUnlocked ? 'unlocked' : ''}`}
								style={position}
								onClick={() => handleCapabilityClick(capability)}
								title={capability.description}
							>
								<span>{capability.icon}</span>
								<span className='capability-label'>{capability.name}</span>
							</div>
						);
					})}
				</div>

				{permissionModal && (
					<div className='permission-flow'>
						<div className='permission-modal'>
							<div className='permission-icon'>{permissionModal.icon}</div>
							<h3 className='permission-title'>
								Allow Access to {permissionModal.name}?
							</h3>
							<p className='permission-description'>
								{permissionModal.description}
							</p>
							<div className='permission-buttons'>
								<button 
									className='permission-btn deny'
									onClick={() => handlePermissionResponse(false)}
								>
									Deny
								</button>
								<button 
									className='permission-btn allow'
									onClick={() => handlePermissionResponse(true)}
								>
									Allow
								</button>
							</div>
						</div>
					</div>
				)}

				<div className='power-meter'>
					<div className='power-level'>{powerUnlocked}/6</div>
					<div className='power-bar'>
						<div 
							className='power-fill' 
							style={{ width: `${(powerUnlocked / 6) * 100}%` }}
						/>
					</div>
					<p style={{ textAlign: 'center', marginTop: '10px', color: '#bdc3c7' }}>
						Sanctuary Level: <strong style={{ color: '#9C27B0' }}>{sanctuaryLevel}</strong>
					</p>
				</div>

				<div className='permission-grid'>
					{capabilities.map((capability) => {
						const status = permissionStatus[capability.id];
						return (
							<div 
								key={capability.id} 
								className={`permission-card ${status || 'pending'}`}
							>
								<div style={{ fontSize: '2em', marginBottom: '10px' }}>
									{capability.icon}
								</div>
								<div style={{ fontWeight: 'bold' }}>
									{capability.name}
								</div>
								<div style={{ fontSize: '0.85em', marginTop: '5px', color: '#bdc3c7' }}>
									{status === 'granted' ? '✓ Granted' : 
									 status === 'denied' ? '✗ Denied' : 
									 '○ Not Requested'}
								</div>
							</div>
						);
					})}
				</div>
			</div>

			<CodeExample
				title={`Native Module Bridge`}
				discoveredBy={`Sanctuary Keeper's permission guide`}
				code={`# React Native Permissions
// Bridge: "Always request permissions before accessing device features!"

npm install react-native-permissions

# iOS Setup (Info.plist)
<key>NSCameraUsageDescription</key>
<string>This app needs access to camera to take photos</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to show nearby places</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs photo library access to save images</string>
<key>NSContactsUsageDescription</key>
<string>This app needs contacts access to share with friends</string>

# Android Setup (AndroidManifest.xml)
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_CONTACTS" />

# Permission Implementation
import {
  check,
  request,
  PERMISSIONS,
  RESULTS
} from 'react-native-permissions';

// Check permission status
const checkCameraPermission = async () => {
  const result = await check(
    Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.CAMERA 
      : PERMISSIONS.ANDROID.CAMERA
  );
  
  switch (result) {
    case RESULTS.UNAVAILABLE:
      console.log('Feature not available on this device');
      break;
    case RESULTS.DENIED:
      console.log('Permission denied but requestable');
      break;
    case RESULTS.LIMITED:
      console.log('Permission limited (iOS 14+)');
      break;
    case RESULTS.GRANTED:
      console.log('Permission granted');
      break;
    case RESULTS.BLOCKED:
      console.log('Permission denied and not requestable');
      break;
  }
};

// Request permission
const requestCameraPermission = async () => {
  const result = await request(
    Platform.OS === 'ios' 
      ? PERMISSIONS.IOS.CAMERA 
      : PERMISSIONS.ANDROID.CAMERA
  );
  
  if (result === RESULTS.GRANTED) {
    // Permission granted, can use camera
    launchCamera();
  }
};

# Camera Implementation
// Binary: "react-native-image-picker for camera access!"
npm install react-native-image-picker

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const openCamera = () => {
  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 2000,
  };
  
  launchCamera(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.error) {
      console.log('Camera Error: ', response.error);
    } else {
      const imageUri = response.assets[0].uri;
      // Use the image
    }
  });
};

# Location Services
// Aria: "Geolocation is powerful on mobile!"
npm install @react-native-community/geolocation

import Geolocation from '@react-native-community/geolocation';

// Get current position
Geolocation.getCurrentPosition(
  (position) => {
    const {latitude, longitude} = position.coords;
    console.log(\`Location: \${latitude}, \${longitude}\`);
  },
  (error) => {
    console.log(error.code, error.message);
  },
  {
    enableHighAccuracy: true,
    timeout: 15000,
    maximumAge: 10000
  }
);

// Watch position changes
const watchId = Geolocation.watchPosition(
  (position) => {
    updateUserLocation(position.coords);
  },
  (error) => console.log(error),
  {
    enableHighAccuracy: true,
    distanceFilter: 10, // Update every 10 meters
  }
);

// Clean up
Geolocation.clearWatch(watchId);

# Device Storage
// Debuggora: "AsyncStorage for simple key-value!"
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data
const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Failed to save data');
  }
};

// Retrieve data
const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? JSON.parse(value) : null;
  } catch (e) {
    console.error('Failed to fetch data');
  }
};

# Push Notifications
npm install @react-native-firebase/messaging

import messaging from '@react-native-firebase/messaging';

// Request permission (iOS)
const requestNotificationPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

// Get FCM token
const getFCMToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log('FCM Token:', fcmToken);
    // Send token to your server
  }
};

// Handle notifications
messaging().onMessage(async remoteMessage => {
  console.log('Notification received in foreground', remoteMessage);
});

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Notification received in background', remoteMessage);
});`}
			/>

			<ChapterSummary
				characterIntros={[
					{
						name: `Sanctuary Keeper Bridge`,
						description: `Guardian of the Device Sanctuary and master of native integrations. Bridge serves as the connection between the JavaScript realm and native device capabilities. His philosophy: "With great access comes great responsibility - and permission requests."`
					}
				]}
				lessonInsight={{
					title: `The Sanctuary Lesson:`,
					content: `The Device Sanctuary teaches that native capabilities are powerful gifts requiring trust. Unlike web APIs with limited access, React Native bridges JavaScript to device hardware through native modules. Each capability - camera, location, storage, sensors - requires explicit permission. The sanctuary reminds us that with access to personal data comes the responsibility to request permissions thoughtfully and use them wisely.`
				}}
				reflectionQuestions={[
					`Why do mobile apps require explicit permissions while web apps often don't?`,
					`How does the permission model protect user privacy while enabling powerful features?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 38 (Morning)`,
					content: `The Device Sanctuary is incredible! Sanctuary Keeper Bridge introduced us to the six core capabilities: camera, location, contacts, storage, notifications, and sensors. Unlike my web work, mobile apps bridge JavaScript directly to device hardware. Each power requires explicit user permission - no shortcuts. Binary calculated 57 edge cases for permission handling alone! Bridge's wisdom: "With great access comes great responsibility." I unlocked camera and location powers first. The permission flow feels respectful - explaining why access is needed before asking. Trust is earned, not assumed.`
				}}
			/>
		</div>
	);
};

export default ChapterOne;