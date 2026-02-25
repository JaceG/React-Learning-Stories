import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterTwo = () => {
	const [activeFlow, setActiveFlow] = useState('request');
	const [simulatorScreen, setSimulatorScreen] = useState('home');
	const [cameraActive, setCameraActive] = useState(false);
	const [sensorReadings, setSensorReadings] = useState({
		accelerometer: { x: 0, y: 0, z: 0 },
		gyroscope: { x: 0, y: 0, z: 0 },
		magnetometer: { heading: 0 }
	});
	
	const { 
		permissionStatus,
		requestPermission,
		sanctuaryLevel,
		advanceSanctuary
	} = useOutletContext();

	const permissionFlows = [
		{
			id: 'request',
			title: 'Request Flow',
			icon: '🤝',
			steps: [
				{ phase: 'Check Status', description: 'Verify current permission state' },
				{ phase: 'Request Dialog', description: 'Show system permission prompt' },
				{ phase: 'Handle Response', description: 'Process user decision' },
				{ phase: 'Store Result', description: 'Cache permission for future use' }
			]
		},
		{
			id: 'handle',
			title: 'Handle Denial',
			icon: '🚫',
			steps: [
				{ phase: 'Graceful Degradation', description: 'Provide alternative features' },
				{ phase: 'Educational UI', description: 'Explain why permission needed' },
				{ phase: 'Settings Link', description: 'Guide to app settings' },
				{ phase: 'Retry Strategy', description: 'When to ask again' }
			]
		},
		{
			id: 'best',
			title: 'Best Practices',
			icon: '✨',
			steps: [
				{ phase: 'Context Matters', description: 'Request at point of use' },
				{ phase: 'Clear Purpose', description: 'Explain the benefit' },
				{ phase: 'Progressive Disclosure', description: 'Ask only when needed' },
				{ phase: 'Respect Decision', description: "Don't spam requests" }
			]
		}
	];

	const platformDifferences = [
		{
			feature: 'Permission Timing',
			ios: 'Can only ask once, then settings',
			android: 'Can ask multiple times'
		},
		{
			feature: 'Location Precision',
			ios: 'Approximate vs Precise (iOS 14+)',
			android: 'Coarse vs Fine location'
		},
		{
			feature: 'Photo Access',
			ios: 'Limited selection option',
			android: 'All or nothing'
		},
		{
			feature: 'Background Permissions',
			ios: 'Requires "Always" location',
			android: 'Separate background permission'
		}
	];

	const handleSimulatorAction = (action) => {
		switch(action) {
			case 'camera':
				if (permissionStatus.camera === 'granted') {
					setCameraActive(true);
					setSimulatorScreen('camera');
				} else {
					requestPermission('camera', 'granted');
				}
				break;
			case 'location':
				if (permissionStatus.location !== 'granted') {
					requestPermission('location', 'granted');
				}
				break;
			case 'sensors':
				// Simulate sensor readings
				const interval = setInterval(() => {
					setSensorReadings({
						accelerometer: {
							x: (Math.random() - 0.5) * 2,
							y: (Math.random() - 0.5) * 2,
							z: 9.8 + (Math.random() - 0.5)
						},
						gyroscope: {
							x: (Math.random() - 0.5) * 0.5,
							y: (Math.random() - 0.5) * 0.5,
							z: (Math.random() - 0.5) * 0.5
						},
						magnetometer: {
							heading: Math.random() * 360
						}
					});
				}, 100);
				
				setTimeout(() => clearInterval(interval), 5000);
				break;
			default:
				setSimulatorScreen('home');
		}
		
		// Check for advancement
		const grantedCount = Object.values(permissionStatus).filter(status => status === 'granted').length;
		if (grantedCount >= 4 && sanctuaryLevel !== 'Master') {
			advanceSanctuary('Master');
		}
	};

	const handleCameraCapture = () => {
		setCameraActive(false);
		setSimulatorScreen('home');
	};

	return (
		<div className='chapter native-powers'>
			<ChapterIntro
				chapterNumber={2}
				title={`The Permission Protocols`}
				bridge={`With basic capabilities unlocked, Bridge led Aria and Binary deeper into the sanctuary. "Understanding permissions is one thing," he explained, guiding them to a chamber with glowing device simulators, "but mastering the protocols - the timing, the platform differences, the graceful handling of denials - that's where true power lies."`}
			/>

		<StorySection
			paragraphs={[
				`Bridge led them deeper into the sanctuary. "Permissions are sacred protocols. Each platform has its own rituals and rules."`,
				`They approached a glowing device simulator. "iOS asks once and remembers forever. Android may allow multiple requests. Know your platform!"`,
				`Aria studied the patterns. "It's about trust and timing - asking at the right moment with clear purpose."`,
				`Binary analyzed the flows. "Permission states: granted, denied, blocked, unavailable. Edge cases: 57. Error handling: critical!"`,
				`"Precisely," Bridge confirmed. "Master these protocols, and users will trust your app with their device's power."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Device Simulator</h3>
				
				<InstructionBox character={`Bridge activates the device simulator.`}>
					{`"Test the permission flows here! Click buttons to request capabilities and watch how each platform handles the request differently. Notice how iOS remembers your choice forever, while Android may allow retry."`}
				</InstructionBox>
				
				<div className='device-simulator'>
					<div className='device-screen'>
						<div className='device-notch'></div>
						<div className='device-status-bar'>
							<span>9:41 AM</span>
							<span>100% 🔋</span>
						</div>
						
						<div className='device-content'>
							{simulatorScreen === 'home' && (
								<div style={{ textAlign: 'center', paddingTop: '50px' }}>
									<h3 style={{ color: 'white', marginBottom: '30px' }}>
										Native Powers Demo
									</h3>
									<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
										<button 
											onClick={() => handleSimulatorAction('camera')}
											style={{
												padding: '20px',
												background: permissionStatus.camera === 'granted' ? '#4CAF50' : '#666',
												border: 'none',
												borderRadius: '10px',
												color: 'white',
												cursor: 'pointer'
											}}
										>
											📷 Camera
										</button>
										<button 
											onClick={() => handleSimulatorAction('location')}
											style={{
												padding: '20px',
												background: permissionStatus.location === 'granted' ? '#4CAF50' : '#666',
												border: 'none',
												borderRadius: '10px',
												color: 'white',
												cursor: 'pointer'
											}}
										>
											📍 Location
										</button>
										<button 
											onClick={() => handleSimulatorAction('sensors')}
											style={{
												padding: '20px',
												background: '#666',
												border: 'none',
												borderRadius: '10px',
												color: 'white',
												cursor: 'pointer'
											}}
										>
											📡 Sensors
										</button>
										<button 
											onClick={() => handleSimulatorAction('storage')}
											style={{
												padding: '20px',
												background: '#666',
												border: 'none',
												borderRadius: '10px',
												color: 'white',
												cursor: 'pointer'
											}}
										>
											💾 Storage
										</button>
									</div>
								</div>
							)}
							
							{simulatorScreen === 'camera' && cameraActive && (
								<div className='camera-viewfinder'>
									<div className='camera-frame'>
										<div className='camera-corners tl'></div>
										<div className='camera-corners tr'></div>
										<div className='camera-corners bl'></div>
										<div className='camera-corners br'></div>
									</div>
									<button 
										className='camera-capture'
										onClick={handleCameraCapture}
									></button>
								</div>
							)}
						</div>
					</div>
				</div>

				<div className='sensor-display'>
					<h4 style={{ marginBottom: '20px', color: '#9C27B0' }}>Sensor Readings</h4>
					
					<div className='sensor-reading'>
						<div className='sensor-icon'>📊</div>
						<div className='sensor-data'>
							<div style={{ marginBottom: '5px' }}>Accelerometer</div>
							<div className='sensor-bar'>
								<div 
									className='sensor-fill' 
									style={{ width: `${Math.abs(sensorReadings.accelerometer.x) * 50}%` }}
								/>
								<span className='sensor-value'>
									X: {sensorReadings.accelerometer.x.toFixed(2)}
								</span>
							</div>
						</div>
					</div>

					<div className='sensor-reading'>
						<div className='sensor-icon'>🌀</div>
						<div className='sensor-data'>
							<div style={{ marginBottom: '5px' }}>Gyroscope</div>
							<div className='sensor-bar'>
								<div 
									className='sensor-fill' 
									style={{ width: `${Math.abs(sensorReadings.gyroscope.y) * 100}%` }}
								/>
								<span className='sensor-value'>
									Y: {sensorReadings.gyroscope.y.toFixed(2)}
								</span>
							</div>
						</div>
					</div>

					<div className='sensor-reading'>
						<div className='sensor-icon'>🧭</div>
						<div className='sensor-data'>
							<div style={{ marginBottom: '5px' }}>Magnetometer</div>
							<div className='sensor-bar'>
								<div 
									className='sensor-fill' 
									style={{ width: `${(sensorReadings.magnetometer.heading / 360) * 100}%` }}
								/>
								<span className='sensor-value'>
									{sensorReadings.magnetometer.heading.toFixed(0)}°
								</span>
							</div>
						</div>
					</div>
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Permission Flow Protocols</h3>
				
				<div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
					{permissionFlows.map((flow) => (
						<button
							key={flow.id}
							onClick={() => setActiveFlow(flow.id)}
							style={{
								padding: '10px 20px',
								background: activeFlow === flow.id ? '#9C27B0' : 'rgba(156, 39, 176, 0.2)',
								border: '1px solid #9C27B0',
								borderRadius: '20px',
								color: 'white',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								gap: '8px'
							}}
						>
							<span>{flow.icon}</span>
							<span>{flow.title}</span>
						</button>
					))}
				</div>

				<div className='permission-flow'>
					{permissionFlows.find(f => f.id === activeFlow)?.steps.map((step, index) => (
						<div 
							key={index}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '20px',
								marginBottom: '15px',
								padding: '15px',
								background: 'rgba(156, 39, 176, 0.1)',
								borderRadius: '8px',
								borderLeft: '4px solid #9C27B0'
							}}
						>
							<div style={{
								width: '30px',
								height: '30px',
								background: '#9C27B0',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontWeight: 'bold'
							}}>
								{index + 1}
							</div>
							<div>
								<div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
									{step.phase}
								</div>
								<div style={{ fontSize: '0.9em', color: '#bdc3c7' }}>
									{step.description}
								</div>
							</div>
						</div>
					))}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Platform Differences</h3>
				
				<div style={{ 
					background: 'rgba(0, 0, 0, 0.3)', 
					borderRadius: '12px', 
					padding: '20px',
					overflow: 'auto'
				}}>
					<table style={{ width: '100%', borderCollapse: 'collapse' }}>
						<thead>
							<tr>
								<th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #9C27B0' }}>
									Feature
								</th>
								<th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #9C27B0' }}>
									🍎 iOS
								</th>
								<th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #9C27B0' }}>
									🤖 Android
								</th>
							</tr>
						</thead>
						<tbody>
							{platformDifferences.map((diff, index) => (
								<tr key={index}>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(156, 39, 176, 0.2)' }}>
										{diff.feature}
									</td>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(156, 39, 176, 0.2)' }}>
										{diff.ios}
									</td>
									<td style={{ padding: '10px', borderBottom: '1px solid rgba(156, 39, 176, 0.2)' }}>
										{diff.android}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<CodeExample
				title={`Permission Best Practices`}
				discoveredBy={`Bridge's protocol mastery`}
				code={`# Smart Permission Handling
// Bridge: "Context is everything in permission requests!"

import { useState, useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  Alert,
  Linking
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS
} from 'react-native-permissions';

// Permission Hook
const usePermission = (permission) => {
  const [status, setStatus] = useState(null);
  
  useEffect(() => {
    checkPermission();
  }, []);
  
  const checkPermission = async () => {
    const result = await check(permission);
    setStatus(result);
    return result;
  };
  
  const requestPermission = async () => {
    const currentStatus = await checkPermission();
    
    if (currentStatus === RESULTS.DENIED) {
      const result = await request(permission);
      setStatus(result);
      return result;
    } else if (currentStatus === RESULTS.BLOCKED) {
      // Permission blocked, guide to settings
      showSettingsAlert();
      return RESULTS.BLOCKED;
    }
    
    return currentStatus;
  };
  
  const showSettingsAlert = () => {
    Alert.alert(
      'Permission Required',
      'Please enable this permission in your device settings to use this feature.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: openSettings }
      ]
    );
  };
  
  return { status, checkPermission, requestPermission };
};

// Usage Example
function CameraFeature() {
  const cameraPermission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA
  });
  
  const { status, requestPermission } = usePermission(cameraPermission);
  
  const handleCameraPress = async () => {
    const result = await requestPermission();
    
    if (result === RESULTS.GRANTED) {
      // Launch camera
      openCamera();
    } else {
      // Handle denial gracefully
      showAlternativeOptions();
    }
  };
  
  return (
    <TouchableOpacity onPress={handleCameraPress}>
      <Text>Take Photo</Text>
      {status === RESULTS.BLOCKED && (
        <Text style={{ fontSize: 12, color: 'red' }}>
          Camera access blocked. Tap to open settings.
        </Text>
      )}
    </TouchableOpacity>
  );
}

# Android Runtime Permissions
// Binary: "Android 6.0+ requires runtime permissions!"

const requestAndroidPermissions = async () => {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ];
    
    const results = await PermissionsAndroid.requestMultiple(permissions);
    
    const allGranted = Object.values(results).every(
      result => result === PermissionsAndroid.RESULTS.GRANTED
    );
    
    return allGranted;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

# iOS Permission Strings
// Aria: "Clear descriptions build trust!"

/* Info.plist - Be specific about usage */
<key>NSCameraUsageDescription</key>
<string>$(PRODUCT_NAME) needs camera access to let you capture and share moments with your friends</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>$(PRODUCT_NAME) needs your location to show nearby friends and events</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>$(PRODUCT_NAME) needs permission to save photos to your library</string>

# Progressive Permission Request
// Debuggora: "Don't ask for everything upfront!"

class PermissionManager {
  static async requestLocationWhenNeeded() {
    // Check if already granted
    const status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    if (status === RESULTS.GRANTED) return true;
    
    // Show educational UI first
    const userWantsFeature = await showLocationBenefitsModal();
    if (!userWantsFeature) return false;
    
    // Now request permission
    const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return result === RESULTS.GRANTED;
  }
  
  static async handlePhotoAccess() {
    const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    
    if (status === RESULTS.LIMITED) {
      // iOS 14+ limited photo access
      Alert.alert(
        'Limited Photo Access',
        'You can select more photos or grant full access in Settings',
        [
          { text: 'Keep Limited Access' },
          { text: 'Select More Photos', onPress: openLimitedPhotoLibraryPicker },
          { text: 'Settings', onPress: openSettings }
        ]
      );
    }
  }
}

# Permission State Management
// State tracking for better UX
const PermissionContext = React.createContext();

export const PermissionProvider = ({ children }) => {
  const [permissions, setPermissions] = useState({
    camera: null,
    location: null,
    notifications: null,
    contacts: null
  });
  
  const updatePermission = (type, status) => {
    setPermissions(prev => ({ ...prev, [type]: status }));
  };
  
  const checkAllPermissions = async () => {
    const types = ['camera', 'location', 'notifications', 'contacts'];
    
    for (const type of types) {
      const permission = getPermissionType(type);
      const status = await check(permission);
      updatePermission(type, status);
    }
  };
  
  useEffect(() => {
    checkAllPermissions();
    
    // Re-check when app comes to foreground
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        checkAllPermissions();
      }
    });
    
    return () => subscription.remove();
  }, []);
  
  return (
    <PermissionContext.Provider value={{
      permissions,
      updatePermission,
      checkAllPermissions
    }}>
      {children}
    </PermissionContext.Provider>
  );
};`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Protocol Lesson:`,
					content: `The Permission Protocols reveal that trust is earned through transparency and respect. Each platform has unique rules - iOS's one-time ask versus Android's flexibility. Success comes from requesting permissions in context, explaining benefits clearly, and gracefully handling denials. The protocols teach us that permissions aren't obstacles but opportunities to build user trust through thoughtful design and clear communication.`
				}}
				reflectionQuestions={[
					`How does requesting permissions at the point of use improve user experience?`,
					`Why is handling permission denial gracefully as important as getting approval?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 38 (Afternoon)`,
					content: `The Permission Protocols are a masterclass in trust-building! Bridge taught us the four-step flow: check status, request dialog, handle response, store result. iOS asks once and remembers forever - no second chances. Android allows retries but can still block permanently. The key insight: request at the moment of need with clear purpose. Binary tracked platform differences: iOS has "limited" photo access (iOS 14+), Android separates coarse vs fine location. We built a usePermission hook that handles all states gracefully. Bridge's wisdom: "Don't spam requests - respect the user's decision."`
				}}
			/>
		</div>
	);
};

export default ChapterTwo;