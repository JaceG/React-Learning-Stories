import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChapterIntro from '../../../../../components/content/ChapterIntro';
import ChapterSummary from '../../../../../components/content/ChapterSummary';
import InstructionBox from '../../../../../components/content/InstructionBox';
import CodeExample from '../../../../../components/content/CodeExample';
import StorySection from '../../../../../components/content/StorySection';

const ChapterThree = () => {
	const [activeIntegration, setActiveIntegration] = useState(null);
	const [integrationStatus, setIntegrationStatus] = useState({});
	const [masterProject, setMasterProject] = useState({
		features: [],
		powerLevel: 0
	});
	
	const { 
		sanctuaryLevel,
		advanceSanctuary,
		powerUnlocked,
		setPowerUnlocked,
		deviceCapabilities
	} = useOutletContext();

	const integrations = [
		{
			id: 'biometrics',
			name: 'Biometric Auth',
			icon: '🔐',
			description: 'Face ID, Touch ID, Fingerprint',
			modules: ['react-native-biometrics', 'react-native-touch-id'],
			complexity: 'Medium',
			apis: ['LocalAuthentication (iOS)', 'BiometricPrompt (Android)']
		},
		{
			id: 'payments',
			name: 'Payment Systems',
			icon: '💳',
			description: 'Apple Pay, Google Pay, In-App Purchases',
			modules: ['react-native-iap', 'react-native-payments'],
			complexity: 'High',
			apis: ['StoreKit (iOS)', 'Google Play Billing (Android)']
		},
		{
			id: 'maps',
			name: 'Maps & Navigation',
			icon: '🗺️',
			description: 'MapKit, Google Maps, Navigation',
			modules: ['react-native-maps', 'react-native-mapbox-gl'],
			complexity: 'Medium',
			apis: ['MapKit (iOS)', 'Google Maps SDK (Android)']
		},
		{
			id: 'ar',
			name: 'Augmented Reality',
			icon: '🥽',
			description: 'ARKit, ARCore, 3D rendering',
			modules: ['react-native-arkit', 'viro-react'],
			complexity: 'Very High',
			apis: ['ARKit (iOS)', 'ARCore (Android)']
		},
		{
			id: 'ml',
			name: 'Machine Learning',
			icon: '🤖',
			description: 'Core ML, TensorFlow Lite',
			modules: ['react-native-tensorflow-lite', 'react-native-coreml'],
			complexity: 'High',
			apis: ['Core ML (iOS)', 'ML Kit (Android)']
		},
		{
			id: 'bluetooth',
			name: 'Bluetooth & IoT',
			icon: '📡',
			description: 'BLE, Device communication',
			modules: ['react-native-ble-plx', 'react-native-bluetooth-classic'],
			complexity: 'High',
			apis: ['CoreBluetooth (iOS)', 'BluetoothAdapter (Android)']
		}
	];

	const nativeArchitecture = [
		{
			layer: 'JavaScript',
			description: 'Your React Native code',
			color: '#FFC107'
		},
		{
			layer: 'Bridge',
			description: 'Serialized async communication',
			color: '#9C27B0'
		},
		{
			layer: 'Native Modules',
			description: 'Platform-specific implementations',
			color: '#3F51B5'
		},
		{
			layer: 'Platform APIs',
			description: 'iOS/Android system capabilities',
			color: '#4CAF50'
		}
	];

	const handleIntegrationActivate = (integration) => {
		setActiveIntegration(integration);
		setIntegrationStatus(prev => ({
			...prev,
			[integration.id]: 'active'
		}));
		
		// Add to master project
		if (!masterProject.features.find(f => f.id === integration.id)) {
			setMasterProject(prev => ({
				features: [...prev.features, integration],
				powerLevel: prev.powerLevel + 20
			}));
			
			// Check for final advancement
			if (masterProject.features.length >= 3) {
				advanceSanctuary('Grand Master');
				setPowerUnlocked(6);
			}
		}
	};

	const getComplexityColor = (complexity) => {
		switch(complexity) {
			case 'Medium': return '#FFC107';
			case 'High': return '#FF7043';
			case 'Very High': return '#F44336';
			default: return '#4CAF50';
		}
	};

	return (
		<div className='chapter native-powers'>
			<ChapterIntro
				chapterNumber={3}
				title={`The Native Mastery`}
				bridge={`"You've learned to request and handle permissions," Bridge said, leading them to the sanctuary's innermost chamber where six pedestals glowed with advanced power. "Now comes the true test - integrating complex native systems. Biometrics, payments, maps, AR, ML, IoT. Each bridges your JavaScript to deep platform APIs."`}
			/>

		<StorySection
			paragraphs={[
				`At the sanctuary's heart, Bridge revealed the ultimate challenge. "True mastery comes from seamlessly integrating native powers into your React realm."`,
				`Six integration pedestals glowed with advanced capabilities. "Biometrics, payments, maps, AR, ML, IoT - each requires deep understanding of both React and native worlds."`,
				`Aria's eyes widened. "These aren't just permissions - they're entire systems bridging JavaScript to platform APIs!"`,
				`Binary computed rapidly. "Bridge architecture: JavaScript → Serialization → Native Modules → Platform APIs. Latency considerations critical. Performance optimization essential!"`,
				`"Indeed," Bridge smiled. "Master these integrations, and you'll wield the full power of mobile platforms through React Native's bridge."`
			]}
		/>

			<div className='interactive-section'>
				<h3 className='section-title'>Native Integration Showcase</h3>
				
				<InstructionBox character={`Bridge reveals the six integration pedestals.`}>
					{`"Click each integration to add it to your master project. Watch how the power level increases as you combine capabilities. Three or more integrations will unlock Grand Master status!"`}
				</InstructionBox>
				
				<div className='integration-showcase'>
					{integrations.map((integration) => (
						<div 
							key={integration.id}
							className={`integration-item ${integrationStatus[integration.id] === 'active' ? 'active' : ''}`}
							onClick={() => handleIntegrationActivate(integration)}
						>
							<div className='integration-icon'>
								{integration.icon}
							</div>
							<div className='integration-details'>
								<h4>{integration.name}</h4>
								<p style={{ fontSize: '0.9em', color: '#bdc3c7', margin: '5px 0' }}>
									{integration.description}
								</p>
								<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
									<span style={{ 
										fontSize: '0.85em',
										color: getComplexityColor(integration.complexity)
									}}>
										Complexity: {integration.complexity}
									</span>
									<span className={`integration-status ${integrationStatus[integration.id] || 'inactive'}`}>
										{integrationStatus[integration.id] === 'active' ? 'Active' : 'Inactive'}
									</span>
								</div>
							</div>
						</div>
					))}
				</div>

				{activeIntegration && (
					<div style={{
						background: 'rgba(0, 0, 0, 0.5)',
						border: '2px solid #9C27B0',
						borderRadius: '12px',
						padding: '20px',
						margin: '30px 0'
					}}>
						<h3 style={{ color: '#9C27B0', marginBottom: '15px' }}>
							{activeIntegration.name} Details
						</h3>
						<div style={{ marginBottom: '15px' }}>
							<strong>Native Modules:</strong>
							<div style={{ marginTop: '5px' }}>
								{activeIntegration.modules.map((module, index) => (
									<span key={index} style={{
										display: 'inline-block',
										padding: '5px 10px',
										background: 'rgba(156, 39, 176, 0.2)',
										borderRadius: '15px',
										margin: '5px',
										fontSize: '0.9em'
									}}>
										{module}
									</span>
								))}
							</div>
						</div>
						<div>
							<strong>Platform APIs:</strong>
							<div style={{ marginTop: '5px' }}>
								{activeIntegration.apis.map((api, index) => (
									<div key={index} style={{
										padding: '5px 0',
										fontSize: '0.9em',
										color: '#bdc3c7'
									}}>
										• {api}
									</div>
								))}
							</div>
						</div>
					</div>
				)}

				<h3 className='section-title' style={{ marginTop: '40px' }}>React Native Architecture</h3>
				
				<div style={{ 
					display: 'flex', 
					flexDirection: 'column',
					gap: '2px',
					margin: '20px auto',
					maxWidth: '600px'
				}}>
					{nativeArchitecture.map((layer, index) => (
						<div key={index} style={{
							display: 'flex',
							alignItems: 'center',
							gap: '20px',
							padding: '20px',
							background: layer.color,
							color: 'white',
							position: 'relative'
						}}>
							<div style={{ 
								fontWeight: 'bold',
								fontSize: '1.2em',
								minWidth: '150px'
							}}>
								{layer.layer}
							</div>
							<div>{layer.description}</div>
							{index < nativeArchitecture.length - 1 && (
								<div style={{
									position: 'absolute',
									bottom: '-10px',
									left: '50%',
									transform: 'translateX(-50%)',
									fontSize: '1.5em',
									background: '#1a1a1a',
									padding: '0 10px',
									zIndex: 1
								}}>
									↓
								</div>
							)}
						</div>
					))}
				</div>

				<h3 className='section-title' style={{ marginTop: '40px' }}>Master Project Builder</h3>
				
				<div className='power-meter'>
					<div className='power-level'>{masterProject.powerLevel}%</div>
					<div className='power-bar'>
						<div 
							className='power-fill' 
							style={{ width: `${masterProject.powerLevel}%` }}
						/>
					</div>
					<p style={{ textAlign: 'center', marginTop: '10px' }}>
						Sanctuary Status: <strong style={{ color: '#9C27B0' }}>{sanctuaryLevel}</strong>
					</p>
				</div>

				<div style={{
					background: 'rgba(156, 39, 176, 0.1)',
					border: '2px dashed #9C27B0',
					borderRadius: '12px',
					padding: '30px',
					textAlign: 'center',
					marginTop: '30px'
				}}>
					<h4 style={{ marginBottom: '20px' }}>Your Master Project Features</h4>
					{masterProject.features.length > 0 ? (
						<div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
							{masterProject.features.map((feature) => (
								<div key={feature.id} style={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									gap: '10px',
									padding: '15px',
									background: 'rgba(156, 39, 176, 0.2)',
									borderRadius: '10px'
								}}>
									<span style={{ fontSize: '2em' }}>{feature.icon}</span>
									<span style={{ fontSize: '0.9em' }}>{feature.name}</span>
								</div>
							))}
						</div>
					) : (
						<p style={{ color: '#bdc3c7' }}>
							Click on integrations above to add them to your master project
						</p>
					)}
				</div>
			</div>

			<CodeExample
				title={`Advanced Native Integrations`}
				discoveredBy={`Bridge's mastery guide`}
				code={`# Biometric Authentication
// Bridge: "Security through native biometrics!"
npm install react-native-biometrics

import ReactNativeBiometrics from 'react-native-biometrics';

const rnBiometrics = new ReactNativeBiometrics();

// Check biometric availability
const checkBiometrics = async () => {
  const { available, biometryType } = await rnBiometrics.isSensorAvailable();
  
  if (available) {
    console.log('Biometry type:', biometryType); // TouchID, FaceID, Biometrics
    return true;
  }
  return false;
};

// Authenticate user
const authenticateUser = async () => {
  try {
    const { success } = await rnBiometrics.simplePrompt({
      promptMessage: 'Authenticate to access your account',
      cancelButtonText: 'Cancel',
      fallbackPromptMessage: 'Use passcode'
    });
    
    if (success) {
      console.log('Authentication successful');
      // Proceed with secure action
    }
  } catch (error) {
    console.log('Biometric authentication error:', error);
  }
};

// Generate key pair for secure operations
const createBiometricKey = async () => {
  const { publicKey } = await rnBiometrics.createKeys();
  // Send publicKey to server for registration
  return publicKey;
};

# Maps Integration
// Aria: "Native maps with React components!"
npm install react-native-maps

import MapView, { Marker, Polyline, Circle } from 'react-native-maps';

function MapScreen() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  
  return (
    <MapView
      style={{ flex: 1 }}
      region={region}
      onRegionChangeComplete={setRegion}
      showsUserLocation={true}
      showsMyLocationButton={true}
    >
      <Marker
        coordinate={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        title="Marker Title"
        description="Marker Description"
      >
        <View style={styles.customMarker}>
          <Text>📍</Text>
        </View>
      </Marker>
      
      <Circle
        center={{
          latitude: 37.78825,
          longitude: -122.4324,
        }}
        radius={1000}
        fillColor="rgba(156, 39, 176, 0.2)"
        strokeColor="#9C27B0"
        strokeWidth={2}
      />
      
      <Polyline
        coordinates={routeCoordinates}
        strokeColor="#9C27B0"
        strokeWidth={4}
      />
    </MapView>
  );
}

# In-App Purchases
// Binary: "Monetization through native stores!"
npm install react-native-iap

import * as RNIap from 'react-native-iap';

const productIds = Platform.select({
  ios: [
    'com.myapp.premium',
    'com.myapp.coins100'
  ],
  android: [
    'com.myapp.premium',
    'com.myapp.coins100'
  ]
});

// Initialize IAP
useEffect(() => {
  const initIAP = async () => {
    try {
      await RNIap.initConnection();
      const products = await RNIap.getProducts(productIds);
      console.log('Available products:', products);
    } catch (err) {
      console.warn(err);
    }
  };
  
  initIAP();
  
  return () => {
    RNIap.endConnection();
  };
}, []);

// Purchase flow
const purchaseProduct = async (productId) => {
  try {
    const purchase = await RNIap.requestPurchase(productId);
    
    // Verify purchase on your server
    const verified = await verifyPurchase(purchase);
    
    if (verified) {
      // Grant premium features
      await RNIap.finishTransaction(purchase);
    }
  } catch (err) {
    if (err.code === 'E_USER_CANCELLED') {
      console.log('User cancelled purchase');
    } else {
      console.error('Purchase error:', err);
    }
  }
};

# AR Integration
// Debuggora: "Reality augmentation activated!"
npm install @react-native-ar/react-native-arkit

import {
  ARKit,
  ARKitSceneView,
  ARKitNode,
  ARKitBox,
  ARKitSphere,
  ARKitText
} from '@react-native-ar/react-native-arkit';

function ARScreen() {
  return (
    <ARKitSceneView
      style={{ flex: 1 }}
      debug
      planeDetection={ARKit.ARPlaneDetection.Horizontal}
      lightEstimationEnabled
      onPlaneDetected={(anchor) => console.log('Plane detected:', anchor)}
      onPlaneUpdated={(anchor) => console.log('Plane updated:', anchor)}
    >
      <ARKitBox
        position={{ x: 0, y: 0, z: -1 }}
        shape={{ width: 0.1, height: 0.1, length: 0.1 }}
        material={{ color: '#9C27B0' }}
      />
      
      <ARKitText
        text="Hello AR World"
        position={{ x: 0, y: 0.1, z: -1 }}
        font={{ size: 0.05 }}
        material={{ color: '#FFC107' }}
      />
      
      <ARKitSphere
        position={{ x: 0.2, y: 0, z: -1 }}
        shape={{ radius: 0.05 }}
        material={{
          color: '#4CAF50',
          metalness: 0.7,
          roughness: 0.3
        }}
      />
    </ARKitSceneView>
  );
}

# Machine Learning
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

// Load and use model
const loadModel = async () => {
  await tf.ready(); // Wait for TensorFlow.js to initialize
  
  const model = await tf.loadLayersModel('path/to/model.json');
  
  // Make predictions
  const prediction = model.predict(inputTensor);
  const result = await prediction.data();
  
  return result;
};

# Native Module Creation
// Create custom native bridge
// iOS: NativeModule.m
RCT_EXPORT_MODULE(CustomModule);

RCT_EXPORT_METHOD(doNativeOperation:(NSString *)input
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  // Native iOS code here
  dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
    NSString *result = [self processInput:input];
    resolve(result);
  });
}

// JavaScript usage
import { NativeModules } from 'react-native';
const { CustomModule } = NativeModules;

const result = await CustomModule.doNativeOperation('input');`}
			/>

			<ChapterSummary
				lessonInsight={{
					title: `The Mastery Lesson:`,
					content: `Native Mastery reveals the true power of React Native - seamlessly bridging JavaScript to platform capabilities. Through biometrics, payments, maps, AR, ML, and IoT integrations, we transcend web limitations. The bridge architecture shows how our React code communicates with native modules, enabling experiences impossible in browsers. True mastery comes from understanding both worlds and knowing when to leverage native power for optimal user experiences.`
				}}
				reflectionQuestions={[
					`How does React Native's bridge architecture enable native capabilities while maintaining JavaScript development?`,
					`When should you create custom native modules versus using existing solutions?`
				]}
				journalEntry={{
					title: `Aria's Journal - Day 38 (Evening)`,
					content: `I've achieved Grand Master status at the Device Sanctuary! Bridge revealed the six advanced integrations: biometrics (Face ID, Touch ID), payment systems (Apple Pay, Google Pay), maps (MapKit, Google Maps), AR (ARKit, ARCore), ML (Core ML, TensorFlow), and IoT (Bluetooth, device communication). The architecture is elegant: JavaScript → Bridge (serialization) → Native Modules → Platform APIs. Each layer communicates asynchronously. I built a master project combining multiple integrations - the power level is incredible! Bridge's final wisdom: "True mastery comes from understanding both JavaScript and native worlds." Binary's calculation: "100% native power unlocked. Grand Master achieved!"`
				}}
				chapterEnding={[
					`As Aria achieved Grand Master status, Bridge smiled proudly. "You've unlocked the full power of native capabilities. Your React Native apps can now rival any native application."`,
					`Binary processed their achievement. "Six integrations mastered. Bridge architecture understood. Power level: maximum. Aria, we're ready for anything!"`,
					`"Almost anything," Bridge corrected gently. "There's still the Navigation Trails to master - the ancient paths that guide users through your mobile realm. Without proper navigation, even the most powerful app becomes a maze."`,
					`Aria looked toward the horizon where winding trails glowed with promise. "Then that's where we go next. Lead the way, Bridge!"`
				]}
			/>
		</div>
	);
};

export default ChapterThree;