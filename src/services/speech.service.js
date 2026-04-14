// Enhanced polyfills for Azure Speech SDK in Node.js environment
if (typeof window === 'undefined') {
  global.window = {
    navigator: {
      userAgent: 'Node.js',
      platform: 'node',
      mediaDevices: {
        getUserMedia: () => Promise.resolve({
          getAudioTracks: () => [],
          getTracks: () => [],
          stop: () => {}
        }),
        getSupportedConstraints: () => ({
          audio: true,
          video: false,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: true,
          sampleSize: true,
          channelCount: true
        }),
        enumerateDevices: () => Promise.resolve([
          {
            deviceId: 'default',
            kind: 'audioinput',
            label: 'Default - Microphone',
            groupId: 'default'
          }
        ])
      }
    },
    document: {
      createElement: (tagName) => {
        const element = {
          addEventListener: () => {},
          removeEventListener: () => {},
          setAttribute: () => {},
          getAttribute: () => null,
          style: {},
          tagName: tagName.toUpperCase(),
          nodeType: 1,
          nodeName: tagName.toUpperCase(),
          appendChild: () => {},
          removeChild: () => {},
          insertBefore: () => {},
          cloneNode: () => element,
          hasAttribute: () => false,
          removeAttribute: () => {},
          click: () => {},
          focus: () => {},
          blur: () => {}
        };

        if (tagName.toLowerCase() === 'audio') {
          Object.assign(element, {
            play: () => Promise.resolve(),
            pause: () => {},
            load: () => {},
            canPlayType: () => 'probably',
            volume: 1,
            muted: false,
            paused: true,
            ended: false,
            currentTime: 0,
            duration: 0,
            playbackRate: 1,
            defaultPlaybackRate: 1,
            readyState: 4,
            networkState: 1,
            autoplay: false,
            loop: false,
            controls: false,
            crossOrigin: null,
            preload: 'metadata',
            src: '',
            currentSrc: ''
          });
        }

        return element;
      },
      getElementById: () => null,
      getElementsByTagName: () => [],
      getElementsByClassName: () => [],
      querySelector: () => null,
      querySelectorAll: () => [],
      body: {
        appendChild: () => {},
        removeChild: () => {},
        insertBefore: () => {},
        style: {}
      },
      head: {
        appendChild: () => {},
        removeChild: () => {},
        insertBefore: () => {},
        style: {}
      }
    },
    location: {
      href: 'file:///',
      protocol: 'file:',
      host: '',
      hostname: '',
      port: '',
      pathname: '/',
      search: '',
      hash: '',
      origin: 'file://'
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    setTimeout: global.setTimeout,
    clearTimeout: global.clearTimeout,
    setInterval: global.setInterval,
    clearInterval: global.clearInterval,
    requestAnimationFrame: (callback) => global.setTimeout(callback, 16),
    cancelAnimationFrame: global.clearTimeout,
    console: global.console || {
      log: () => {},
      error: () => {},
      warn: () => {},
      info: () => {},
      debug: () => {}
    },
    AudioContext: class AudioContext {
      constructor() {
        this.state = 'running';
        this.sampleRate = 16000;
        this.currentTime = 0;
        this.listener = {
          setPosition: () => {},
          setOrientation: () => {}
        };
        this.destination = {
          connect: () => {},
          disconnect: () => {},
          channelCount: 2,
          channelCountMode: 'explicit',
          channelInterpretation: 'speakers'
        };
      }
      createMediaStreamSource(stream) {
        return {
          connect: () => {},
          disconnect: () => {},
          mediaStream: stream
        };
      }
      createGain() {
        return {
          connect: () => {},
          disconnect: () => {},
          gain: {
            value: 1,
            setValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {}
          }
        };
      }
      createScriptProcessor(bufferSize = 4096, inputChannels = 1, outputChannels = 1) {
        return {
          connect: () => {},
          disconnect: () => {},
          onaudioprocess: null,
          bufferSize,
          numberOfInputs: inputChannels,
          numberOfOutputs: outputChannels
        };
      }
      createAnalyser() {
        return {
          connect: () => {},
          disconnect: () => {},
          fftSize: 2048,
          frequencyBinCount: 1024,
          minDecibels: -100,
          maxDecibels: -30,
          smoothingTimeConstant: 0.8,
          getByteFrequencyData: () => {},
          getByteTimeDomainData: () => {},
          getFloatFrequencyData: () => {},
          getFloatTimeDomainData: () => {}
        };
      }
      decodeAudioData() {
        return Promise.resolve({
          length: 44100,
          sampleRate: 44100,
          numberOfChannels: 1,
          duration: 1,
          getChannelData: () => new Float32Array(44100)
        });
      }
      suspend() {
        this.state = 'suspended';
        return Promise.resolve();
      }
      resume() {
        this.state = 'running';
        return Promise.resolve();
      }
      close() {
        this.state = 'closed';
        return Promise.resolve();
      }
    },
    webkitAudioContext: class webkitAudioContext {
      constructor() {
        this.state = 'running';
        this.sampleRate = 16000;
        this.currentTime = 0;
        this.listener = {
          setPosition: () => {},
          setOrientation: () => {}
        };
        this.destination = {
          connect: () => {},
          disconnect: () => {},
          channelCount: 2,
          channelCountMode: 'explicit',
          channelInterpretation: 'speakers'
        };
      }
      createMediaStreamSource(stream) {
        return {
          connect: () => {},
          disconnect: () => {},
          mediaStream: stream
        };
      }
      createGain() {
        return {
          connect: () => {},
          disconnect: () => {},
          gain: {
            value: 1,
            setValueAtTime: () => {},
            linearRampToValueAtTime: () => {},
            exponentialRampToValueAtTime: () => {}
          }
        };
      }
      createScriptProcessor(bufferSize = 4096, inputChannels = 1, outputChannels = 1) {
        return {
          connect: () => {},
          disconnect: () => {},
          onaudioprocess: null,
          bufferSize,
          numberOfInputs: inputChannels,
          numberOfOutputs: outputChannels
        };
      }
      createAnalyser() {
        return {
          connect: () => {},
          disconnect: () => {},
          fftSize: 2048,
          frequencyBinCount: 1024,
          minDecibels: -100,
          maxDecibels: -30,
          smoothingTimeConstant: 0.8,
          getByteFrequencyData: () => {},
          getByteTimeDomainData: () => {},
          getFloatFrequencyData: () => {},
          getFloatTimeDomainData: () => {}
        };
      }
      decodeAudioData() {
        return Promise.resolve({
          length: 44100,
          sampleRate: 44100,
          numberOfChannels: 1,
          duration: 1,
          getChannelData: () => new Float32Array(44100)
        });
      }
      suspend() {
        this.state = 'suspended';
        return Promise.resolve();
      }
      resume() {
        this.state = 'running';
        return Promise.resolve();
      }
      close() {
        this.state = 'closed';
        return Promise.resolve();
      }
    },
    URL: class URL {
      constructor(url) {
        this.href = url;
        this.protocol = 'https:';
        this.host = 'localhost';
        this.hostname = 'localhost';
        this.port = '';
        this.pathname = '/';
        this.search = '';
        this.hash = '';
        this.origin = 'https://localhost';
      }
      toString() {
        return this.href;
      }
    },
    Blob: class Blob {
      constructor(parts = [], options = {}) {
        this.size = 0;
        this.type = options.type || '';
        this.parts = parts;
      }
      slice() {
        return new Blob();
      }
      stream() {
        return new ReadableStream();
      }
      text() {
        return Promise.resolve('');
      }
      arrayBuffer() {
        return Promise.resolve(new ArrayBuffer(0));
      }
    },
    File: class File {
      constructor(parts, name, options = {}) {
        this.name = name;
        this.size = 0;
        this.type = options.type || '';
        this.lastModified = Date.now();
        this.parts = parts;
      }
      slice() {
        return new File([], this.name);
      }
      stream() {
        return new ReadableStream();
      }
      text() {
        return Promise.resolve('');
      }
      arrayBuffer() {
        return Promise.resolve(new ArrayBuffer(0));
      }
    }
  };
  global.document = global.window.document;
  global.navigator = global.window.navigator;
  global.AudioContext = global.window.AudioContext;
  global.webkitAudioContext = global.window.webkitAudioContext;
  global.URL = global.window.URL;
  global.Blob = global.window.Blob;
  global.File = global.window.File;

  if (!global.performance) {
    global.performance = {
      now: () => Date.now(),
      mark: () => {},
      measure: () => {},
      clearMarks: () => {},
      clearMeasures: () => {},
      getEntriesByName: () => [],
      getEntriesByType: () => []
    };
  }

  if (!global.crypto) {
    global.crypto = {
      getRandomValues: (arr) => {
        for (let i = 0; i < arr.length; i++) {
          arr[i] = Math.floor(Math.random() * 256);
        }
        return arr;
      }
    };
  }
}

const fs = require('fs');
const os = require('os');
const path = require('path');
const https = require('https');
const { spawn, spawnSync } = require('child_process');
const { EventEmitter } = require('events');
const logger = require('../core/logger').createServiceLogger('SPEECH');
const config = require('../core/config');

let sdk = null;
try {
  sdk = require('microsoft-cognitiveservices-speech-sdk');
} catch (error) {
  logger.warn('Azure Speech SDK unavailable', { error: error.message });
}

let recorder = null;
try {
  recorder = require('node-record-lpcm16');
} catch (error) {
  logger.warn('Local audio recorder dependency unavailable', { error: error.message });
}

class SpeechService extends EventEmitter {
  constructor() {
    super();
    this.recognizer = null;
    this.isRecording = false;
    this.audioConfig = null;
    this.speechConfig = null;
    this.sessionStartTime = null;
    this.retryCount = 0;
    this.maxRetries = 3;
    this.pushStream = null;
    this.recording = null;
    this.available = false;
    this.provider = 'disabled';
    this.runtimeSettings = {};
    this.segmentBuffers = [];
    this.segmentBytes = 0;
    this.segmentTimer = null;
    this.transcriptionInFlight = false;
    this.pendingFlush = false;
    this.audioProgram = null;
    this.whisperCommand = null;
    this._cachedMonitorSource = undefined; // undefined = not probed, null = probed/not found
    this._audioChunkCount = 0;
    this._restartCount = 0;

    this.initializeClient();
  }

  initializeClient() {
    this._cleanup();
    this.provider = 'disabled';
    this.available = false;
    this.speechConfig = null;
    this.whisperCommand = null;

    const provider = this._getConfiguredProvider();
    this.provider = provider;

    if (provider === 'azure') {
      this._initializeAzureClient();
      return;
    }

    if (provider === 'whisper') {
      this._initializeWhisperClient();
      return;
    }

    if (provider === 'groq' || provider === 'openai-stt') {
      this._initializeOpenAISttClient();
      return;
    }

    const reason = 'Speech recognition disabled. Configure SPEECH_PROVIDER (azure, whisper, groq, openai-stt).';
    logger.warn(reason);
    this.emit('status', reason);
  }

  _initializeAzureClient() {
    try {
      if (!sdk) {
        throw new Error('Azure Speech SDK dependency is not installed');
      }

      if (!recorder || typeof recorder.record !== 'function') {
        throw new Error('Local microphone recorder dependency is not installed');
      }

      const subscriptionKey = this._getSetting('azureKey') || process.env.AZURE_SPEECH_KEY;
      const region = this._getSetting('azureRegion') || process.env.AZURE_SPEECH_REGION;

      if (!subscriptionKey || !region) {
        const reason = 'Azure Speech credentials not found. Speech recognition disabled.';
        logger.warn('Speech service disabled (missing Azure credentials)');
        this.emit('status', reason);
        return;
      }

      this.speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, region);

      const azureConfig = config.get('speech.azure') || {};
      this.speechConfig.speechRecognitionLanguage = azureConfig.language || 'en-US';
      this.speechConfig.outputFormat = sdk.OutputFormat.Detailed;
      this.speechConfig.setProperty(sdk.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, '5000');
      this.speechConfig.setProperty(sdk.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, '2000');
      this.speechConfig.setProperty(sdk.PropertyId.Speech_SegmentationSilenceTimeoutMs, '2000');

      if (azureConfig.enableDictation) {
        this.speechConfig.enableDictation();
      }

      if (azureConfig.enableAudioLogging) {
        this.speechConfig.enableAudioLogging();
      }

      this.available = true;
      logger.info('Azure Speech service initialized successfully', {
        region,
        language: azureConfig.language || 'en-US'
      });
      this.emit('status', 'Azure Speech Services ready');
    } catch (error) {
      logger.error('Failed to initialize Azure Speech client', {
        error: error.message,
        stack: error.stack
      });
      this.available = false;
      this.emit('status', 'Azure speech unavailable');
    }
  }

  _initializeWhisperClient() {
    try {
      if (!recorder || typeof recorder.record !== 'function') {
        throw new Error('Local microphone recorder dependency is not installed');
      }

      this.whisperCommand = this._resolveWhisperCommand();
      if (!this.whisperCommand) {
        const reason = 'Local Whisper unavailable. Install the Whisper CLI or set WHISPER_COMMAND.';
        logger.warn(reason);
        this.emit('status', reason);
        return;
      }

      this.available = true;
      logger.info('Local Whisper service initialized successfully', {
        command: [this.whisperCommand.command, ...this.whisperCommand.baseArgs].join(' '),
        model: this._getWhisperModel(),
        language: this._getWhisperLanguage()
      });
      this.emit('status', 'Local Whisper ready');
    } catch (error) {
      logger.error('Failed to initialize local Whisper client', {
        error: error.message,
        stack: error.stack
      });
      this.available = false;
      this.emit('status', 'Local Whisper unavailable');
    }
  }

  _initializeOpenAISttClient() {
    try {
      if (!recorder || typeof recorder.record !== 'function') {
        throw new Error('Local microphone recorder dependency is not installed');
      }

      const isGroq = this.provider === 'groq';
      const apiKey = isGroq
        ? (process.env.GROQ_API_KEY || this._getSetting('groqApiKey'))
        : (process.env.STT_API_KEY || this._getSetting('sttApiKey'));

      if (!apiKey) {
        const reason = isGroq
          ? 'GROQ_API_KEY not configured.'
          : 'STT_API_KEY not configured.';
        logger.warn(reason);
        this.emit('status', reason);
        return;
      }

      this.sttApiKey = apiKey;
      this.sttApiBaseUrl = isGroq
        ? 'https://api.groq.com/openai/v1'
        : (process.env.STT_API_BASE_URL || 'https://api.openai.com/v1');
      this.sttModel = process.env.STT_MODEL || (isGroq ? 'whisper-large-v3-turbo' : 'whisper-1');

      this.available = true;
      logger.info('OpenAI-compatible STT service initialized', {
        provider: this.provider,
        baseUrl: this.sttApiBaseUrl,
        model: this.sttModel
      });
      this.emit('status', `${isGroq ? 'Groq' : 'OpenAI-compatible'} STT ready`);
    } catch (error) {
      logger.error('Failed to initialize OpenAI-compatible STT client', { error: error.message });
      this.available = false;
      this.emit('status', 'STT API unavailable');
    }
  }

  async _transcribeWithSttApi(audioFilePath) {
    const fileBuffer = fs.readFileSync(audioFilePath);
    const boundary = `----OpenCluely${Date.now().toString(36)}`;
    const language = this._getWhisperLanguage() || 'en';

    const buildPart = (name, value) =>
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="${name}"\r\n\r\n${value}\r\n`);

    const filePart = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="audio.wav"\r\nContent-Type: audio/wav\r\n\r\n`),
      fileBuffer,
      Buffer.from('\r\n')
    ]);

    const body = Buffer.concat([
      filePart,
      buildPart('model', this.sttModel),
      buildPart('response_format', 'json'),
      buildPart('language', language),
      Buffer.from(`--${boundary}--\r\n`)
    ]);

    const url = new URL(`${this.sttApiBaseUrl}/audio/transcriptions`);

    return new Promise((resolve, reject) => {
      const req = https.request({
        hostname: url.hostname,
        port: url.port || 443,
        path: url.pathname + (url.search || ''),
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.sttApiKey}`,
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          'Content-Length': body.length
        }
      }, (res) => {
        let raw = '';
        res.on('data', chunk => { raw += chunk; });
        res.on('end', () => {
          if (res.statusCode !== 200) {
            reject(new Error(`STT API ${res.statusCode}: ${raw}`));
            return;
          }
          try {
            resolve((JSON.parse(raw).text || '').trim());
          } catch (e) {
            reject(new Error(`Invalid STT response: ${raw}`));
          }
        });
      });

      req.setTimeout(15000, () => {
        req.destroy(new Error('STT API request timed out after 15s'));
      });
      req.on('error', reject);
      req.write(body);
      req.end();
    });
  }

  startRecording() {
    try {
      if (!this.available) {
        const errorMsg = `Speech provider "${this.provider}" is not available`;
        logger.error(errorMsg);
        this.emit('error', errorMsg);
        return;
      }

      if (this.isRecording) {
        logger.warn('Recording already in progress');
        return;
      }

      this.sessionStartTime = Date.now();
      this.retryCount = 0;
      this._restartCount = 0;

      if (this.provider === 'azure') {
        this._startAzureRecording();
        return;
      }

      if (this.provider === 'whisper' || this.provider === 'groq' || this.provider === 'openai-stt') {
        this._startWhisperRecording();
        return;
      }

      throw new Error(`Unsupported speech provider: ${this.provider}`);
    } catch (error) {
      logger.error('Critical error in startRecording', { error: error.message, stack: error.stack });
      this.emit('error', `Speech recognition failed to start: ${error.message}`);
      this.isRecording = false;
    }
  }

  _startAzureRecording() {
    if (!this.speechConfig) {
      throw new Error('Azure Speech client not initialized');
    }

    this.isRecording = true;
    this.emit('recording-started');
    this.emit('status', 'Azure recording started');
    this._cleanup();

    try {
      this.pushStream = sdk.AudioInputStream.createPushStream();
      this.audioConfig = sdk.AudioConfig.fromStreamInput(this.pushStream);
      this._startMicrophoneCapture();
      this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig);
    } catch (error) {
      logger.error('Failed to start Azure recording session', { error: error.message });
      this.emit('error', `Audio configuration failed: ${error.message}`);
      this.isRecording = false;
      return;
    }

    this.recognizer.recognizing = (s, e) => {
      try {
        if (e.result.reason === sdk.ResultReason.RecognizingSpeech) {
          this.emit('interim-transcription', e.result.text);
        }
      } catch (error) {
        logger.error('Error in recognizing handler', { error: error.message });
      }
    };

    this.recognizer.recognized = (s, e) => {
      try {
        if (e.result.reason === sdk.ResultReason.RecognizedSpeech && e.result.text && e.result.text.trim()) {
          this.emit('transcription', e.result.text);
        }
      } catch (error) {
        logger.error('Error in recognized handler', { error: error.message });
      }
    };

    this.recognizer.canceled = (s, e) => {
      logger.warn('Recognition session canceled', {
        reason: e.reason,
        errorCode: e.errorCode,
        errorDetails: e.errorDetails
      });

      if (e.reason === sdk.CancellationReason.Error) {
        const details = e.errorDetails || '';
        if (details.includes('1006')) {
          this.emit('error', 'Network connection failed. Please check your internet connection.');
        } else if (details.includes('InvalidServiceCredentials')) {
          this.emit('error', 'Invalid Azure Speech credentials. Please check AZURE_SPEECH_KEY and AZURE_SPEECH_REGION.');
        } else if (details.includes('Forbidden')) {
          this.emit('error', 'Access denied. Please check your Azure Speech service subscription and region.');
        } else if (details.includes('AudioInputMicrophone_InitializationFailure')) {
          this.emit('error', 'Microphone initialization failed. Please check microphone permissions and availability.');
        } else {
          this.emit('error', `Recognition error: ${details}`);
        }
      }

      this.stopRecording();
    };

    this.recognizer.sessionStarted = (s, e) => {
      logger.info('Recognition session started', { sessionId: e.sessionId });
    };

    this.recognizer.sessionStopped = () => {
      this.stopRecording();
    };

    const startTimeout = setTimeout(() => {
      logger.error('Recognition start timeout');
      this.emit('error', 'Speech recognition start timeout. Please try again.');
      this.stopRecording();
    }, 10000);

    this.recognizer.startContinuousRecognitionAsync(
      () => {
        clearTimeout(startTimeout);
        logger.info('Continuous Azure speech recognition started successfully');
        if (global.windowManager) {
          global.windowManager.handleRecordingStarted();
        }
      },
      (error) => {
        clearTimeout(startTimeout);
        logger.error('Failed to start continuous recognition', { error: error.toString() });
        this.emit('error', `Recognition startup failed: ${error}`);
        this.isRecording = false;
        this._cleanup();
      }
    );
  }

  _startWhisperRecording() {
    this._cleanup();
    this.isRecording = true;
    this.segmentBuffers = [];
    this.segmentBytes = 0;
    this.transcriptionInFlight = false;
    this.pendingFlush = false;
    this.emit('recording-started');
    this.emit('status', 'Local Whisper recording started');
    this._startMicrophoneCapture();

    const segmentMs = this._getWhisperSegmentMs();
    this.segmentTimer = setInterval(() => {
      this._flushWhisperSegment({ final: false }).catch((error) => {
        logger.error('Whisper segment transcription failed', { error: error.message });
      });
    }, segmentMs);

    if (global.windowManager) {
      global.windowManager.handleRecordingStarted();
    }
  }

  stopRecording() {
    if (!this.isRecording) {
      return;
    }

    this.isRecording = false;
    const sessionDuration = this.sessionStartTime ? Date.now() - this.sessionStartTime : 0;
    logger.info('Stopping speech recognition session', {
      provider: this.provider,
      sessionDuration: `${sessionDuration}ms`
    });

    if (this.provider === 'azure' && this.recognizer) {
      try {
        this.recognizer.stopContinuousRecognitionAsync(
          () => {
            this._finalizeStop('Recording stopped');
          },
          (error) => {
            logger.error('Error during recognition stop', { error: error.toString() });
            this._finalizeStop('Recording stopped');
          }
        );
      } catch (error) {
        logger.error('Error stopping recognizer', { error: error.message });
        this._finalizeStop('Recording stopped');
      }
      return;
    }

    if (this.provider === 'whisper') {
      this._finalizeWhisperStop();
      return;
    }

    this._finalizeStop('Recording stopped');
  }

  async _finalizeWhisperStop() {
    if (this.segmentTimer) {
      clearInterval(this.segmentTimer);
      this.segmentTimer = null;
    }

    if (this.recording) {
      try {
        this.recording.stop();
      } catch (error) {
        logger.error('Error stopping audio recording', { error: error.message });
      }
      this.recording = null;
    }

    try {
      await this._flushWhisperSegment({ final: true });
    } catch (error) {
      logger.error('Final Whisper transcription failed', { error: error.message });
      this.emit('error', `Whisper transcription failed: ${error.message}`);
    } finally {
      this._finalizeStop('Recording stopped');
    }
  }

  _finalizeStop(statusMessage) {
    this._cleanup();
    this.emit('recording-stopped');
    this.emit('status', statusMessage);
    if (global.windowManager) {
      global.windowManager.handleRecordingStopped();
    }
  }

  _cleanup() {
    if (this.segmentTimer) {
      clearInterval(this.segmentTimer);
      this.segmentTimer = null;
    }

    if (this.recognizer) {
      try {
        this.recognizer.close();
      } catch (error) {
        logger.error('Error closing recognizer', { error: error.message });
      }
      this.recognizer = null;
    }

    if (this.audioConfig) {
      try {
        if (typeof this.audioConfig.close === 'function') {
          this.audioConfig.close();
        }
      } catch (error) {
        logger.error('Error closing audio config', { error: error.message });
      }
      this.audioConfig = null;
    }

    if (this.recording) {
      try {
        this.recording.stop();
      } catch (error) {
        logger.error('Error stopping audio recording', { error: error.message });
      }
      this.recording = null;
    }

    if (this.pushStream) {
      try {
        if (typeof this.pushStream.close === 'function') {
          this.pushStream.close();
        }
      } catch (error) {
        logger.error('Error closing push stream', { error: error.message });
      }
      this.pushStream = null;
    }

    this.segmentBuffers = [];
    this.segmentBytes = 0;
    this.transcriptionInFlight = false;
    this.pendingFlush = false;
    this._audioChunkCount = 0;
    this._restartCount = 0;
  }

  async recognizeFromFile(audioFilePath) {
    if (this.provider === 'azure') {
      if (!this.speechConfig) {
        throw new Error('Speech service not initialized');
      }

      if (!fs.existsSync(audioFilePath)) {
        throw new Error(`Audio file not found: ${audioFilePath}`);
      }

      const audioConfig = sdk.AudioConfig.fromWavFileInput(audioFilePath);
      const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);

      return await new Promise((resolve, reject) => {
        recognizer.recognizeOnceAsync(
          (result) => {
            resolve(result.reason === sdk.ResultReason.RecognizedSpeech ? result.text : '');
            recognizer.close();
            audioConfig.close();
          },
          (error) => {
            reject(new Error(`File recognition error: ${error}`));
            recognizer.close();
            audioConfig.close();
          }
        );
      });
    }

    if (this.provider === 'whisper') {
      return this._transcribeWhisperFile(audioFilePath);
    }

    if (this.provider === 'groq' || this.provider === 'openai-stt') {
      return this._transcribeWithSttApi(audioFilePath);
    }

    throw new Error('Speech service not initialized');
  }

  async testConnection() {
    if (this.provider === 'azure') {
      if (!this.speechConfig) {
        throw new Error('Speech service not initialized');
      }

      try {
        const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new sdk.SpeechRecognizer(this.speechConfig, audioConfig);
        recognizer.close();
        audioConfig.close();
        return { success: true, message: 'Azure connection test successful' };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }

    if (this.provider === 'whisper') {
      return {
        success: !!this.whisperCommand,
        message: this.whisperCommand ? 'Local Whisper CLI detected' : 'Local Whisper CLI not found'
      };
    }

    return { success: false, message: 'Speech service not initialized' };
  }

  getStatus() {
    return {
      provider: this.provider,
      isRecording: this.isRecording,
      isInitialized: this.provider === 'azure' ? !!this.speechConfig : !!this.whisperCommand,
      sessionDuration: this.sessionStartTime ? Date.now() - this.sessionStartTime : 0,
      retryCount: this.retryCount,
      effectiveSettings: {
        speechProvider: this.provider,
        azureKey: this._getSetting('azureKey') || '',
        azureRegion: this._getSetting('azureRegion') || process.env.AZURE_SPEECH_REGION || '',
        whisperCommand: this._getSetting('whisperCommand') || process.env.WHISPER_COMMAND || '',
        whisperModelDir: this._getWhisperModelDir(),
        whisperModel: this._getWhisperModel(),
        whisperLanguage: this._getWhisperLanguage(),
        whisperSegmentMs: String(this._getWhisperSegmentMs())
      },
      config: {
        azure: config.get('speech.azure') || {},
        whisper: config.get('speech.whisper') || {},
        selectedProvider: this.provider
      }
    };
  }

  isAvailable() {
    if (this.provider === 'azure') {
      return !!this.speechConfig && !!this.available;
    }

    if (this.provider === 'whisper') {
      return !!this.whisperCommand && !!this.available;
    }

    if (this.provider === 'groq' || this.provider === 'openai-stt') {
      return !!this.sttApiKey && !!this.available;
    }

    return false;
  }

  updateSettings(settings = {}) {
    const speechKeys = ['speechProvider', 'azureKey', 'azureRegion', 'whisperCommand', 'whisperModelDir', 'whisperModel', 'whisperLanguage', 'whisperSegmentMs'];
    let changed = false;

    for (const key of speechKeys) {
      if (Object.prototype.hasOwnProperty.call(settings, key)) {
        this.runtimeSettings[key] = settings[key];
        changed = true;
      }
    }

    if (changed) {
      this.initializeClient();
    }

    return this.getStatus();
  }

  _getConfiguredProvider() {
    const provider = String(this._getSetting('speechProvider') || process.env.SPEECH_PROVIDER || '').trim().toLowerCase();

    if (provider === 'azure' || provider === 'whisper' || provider === 'groq' || provider === 'openai-stt') {
      return provider;
    }

    const hasAzure = !!((this._getSetting('azureKey') || process.env.AZURE_SPEECH_KEY) &&
      (this._getSetting('azureRegion') || process.env.AZURE_SPEECH_REGION));

    if (hasAzure) {
      return 'azure';
    }

    return 'whisper';
  }

  _getWhisperModel() {
    return this._getSetting('whisperModel') || process.env.WHISPER_MODEL || config.get('speech.whisper.model') || 'base';
  }

  _getWhisperModelDir() {
    return this._getSetting('whisperModelDir') || process.env.WHISPER_MODEL_DIR || '';
  }

  _getWhisperLanguage() {
    return this._getSetting('whisperLanguage') || process.env.WHISPER_LANGUAGE || config.get('speech.whisper.language') || 'en';
  }

  _getWhisperSegmentMs() {
    const rawValue = this._getSetting('whisperSegmentMs') || process.env.WHISPER_SEGMENT_MS || config.get('speech.whisper.segmentMs') || 4000;
    const parsed = Number(rawValue);
    return Number.isFinite(parsed) ? Math.max(2000, parsed) : 4000;
  }

  _getSetting(key) {
    const value = this.runtimeSettings[key];
    return value === '' ? null : value;
  }

  _resolveWhisperCommand() {
    const configured = this._getSetting('whisperCommand') || process.env.WHISPER_COMMAND;
    const candidates = [];

    if (configured) {
      candidates.push(...this._expandConfiguredWhisperCandidates(configured));
    }

    candidates.push({ command: 'whisper', baseArgs: [] });
    candidates.push({ command: 'whisper.exe', baseArgs: [] });
    candidates.push({ command: 'py', baseArgs: ['-3', '-m', 'whisper'] });
    candidates.push({ command: 'python3', baseArgs: ['-m', 'whisper'] });
    candidates.push({ command: 'python', baseArgs: ['-m', 'whisper'] });

    for (const candidate of candidates) {
      if (!candidate || !candidate.command) {
        continue;
      }

      const probe = spawnSync(candidate.command, [...candidate.baseArgs, '--help'], {
        encoding: 'utf8',
        timeout: 5000
      });

      const output = `${probe.stdout || ''}\n${probe.stderr || ''}`;
      if (!probe.error && probe.status === 0 && !output.includes('No module named whisper')) {
        return candidate;
      }
    }

    return null;
  }

  _expandConfiguredWhisperCandidates(rawCommand) {
    const parsed = this._parseCommand(rawCommand);
    if (!parsed) {
      return [];
    }

    const candidates = [parsed];
    const resolvedPath = path.resolve(parsed.command);

    if (resolvedPath !== parsed.command) {
      candidates.push({ command: resolvedPath, baseArgs: parsed.baseArgs });
    }

    if (process.platform === 'win32') {
      if (!/\.(exe|cmd|bat)$/i.test(parsed.command)) {
        candidates.push({ command: `${parsed.command}.exe`, baseArgs: parsed.baseArgs });
        candidates.push({ command: `${parsed.command}.cmd`, baseArgs: parsed.baseArgs });
        candidates.push({ command: `${resolvedPath}.exe`, baseArgs: parsed.baseArgs });
        candidates.push({ command: `${resolvedPath}.cmd`, baseArgs: parsed.baseArgs });
      }
    }

    return candidates;
  }

  _parseCommand(rawCommand) {
    const parts = String(rawCommand || '').trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) {
      return null;
    }

    return {
      command: parts[0],
      baseArgs: parts.slice(1)
    };
  }

  _startMicrophoneCapture() {
    if (!recorder || typeof recorder.record !== 'function') {
      this.emit('error', 'Local microphone capture dependency is missing. Run npm install to restore speech recording support.');
      return;
    }

    this._startMicrophoneCaptureWithFallback(['arecord', 'sox', 'rec']);
  }

  _getSystemAudioMonitor() {
    if (this._cachedMonitorSource !== undefined) {
      return this._cachedMonitorSource;
    }

    try {
      const { execSync } = require('child_process');
      const defaultSink = execSync(
        'pactl info 2>/dev/null | grep "Default Sink:" | awk \'{print $3}\'',
        { encoding: 'utf8', timeout: 3000 }
      ).trim();
      if (defaultSink) {
        this._cachedMonitorSource = `${defaultSink}.monitor`;
        return this._cachedMonitorSource;
      }
    } catch (e) {
      logger.debug('pactl monitor detection failed, trying pw-cli', { error: e.message });
    }

    try {
      const { execSync } = require('child_process');
      const pwOutput = execSync('pw-cli info 0 2>/dev/null', { encoding: 'utf8', timeout: 3000 });
      const match = pwOutput.match(/default\.audio\.sink\s*=\s*"([^"]+)"/);
      if (match && match[1]) {
        this._cachedMonitorSource = `${match[1]}.monitor`;
        return this._cachedMonitorSource;
      }
    } catch (e) {
      logger.debug('pw-cli monitor detection failed', { error: e.message });
    }

    logger.warn('Could not detect system audio monitor; falling back to default mic input');
    this._cachedMonitorSource = null;
    return null;
  }

  _startMicrophoneCaptureWithFallback(programs) {
    const queue = [...programs];
    const monitorSource = this._getSystemAudioMonitor();
    if (monitorSource) {
      logger.info('System audio monitor detected, capturing interviewer audio', { device: monitorSource });
    }

    const tryNextProgram = () => {
      const program = queue.shift();
      if (!program) {
        this.emit('error', 'Could not start microphone capture with any audio program');
        return;
      }

      try {
        const recordOptions = {
          sampleRateHertz: 16000,
          channels: 1,
          threshold: 0,
          verbose: false,
          recordProgram: program,
          silence: '0'
        };

        if (monitorSource && program === 'arecord') {
          recordOptions.device = monitorSource;
        }

        this.recording = recorder.record(recordOptions);

        const stream = this.recording.stream();
        this.audioProgram = program;

        stream.on('error', (error) => {
          logger.error('Audio recording stream error', { error: error.message, program });
          if (this.recording) {
            try { this.recording.stop(); } catch (e) {}
            this.recording = null;
          }
          if (this.isRecording) tryNextProgram();
        });

        stream.on('end', () => {
          if (!this.isRecording) return;
          logger.warn('Audio stream ended unexpectedly, attempting restart', { program });
          this._cachedMonitorSource = undefined; // re-probe on next start
          if (this.recording) {
            try { this.recording.stop(); } catch (e) {}
            this.recording = null;
          }
          if (this._restartCount >= 3) {
            logger.error('Audio restart limit reached', { restarts: this._restartCount });
            this.emit('error', `Audio stream died repeatedly after ${this._restartCount} restarts`);
            return;
          }
          this._restartCount += 1;
          logger.info('Restarting audio capture', { attempt: this._restartCount });
          this._startMicrophoneCapture();
        });

        stream.on('data', (chunk) => {
          this._handleAudioChunk(chunk);
        });
      } catch (error) {
        logger.error('Failed to start microphone capture program', { program, error: error.message });
        tryNextProgram();
      }
    };

    tryNextProgram();
  }

  _handleAudioChunk(chunk) {
    if (!chunk || !chunk.length || !this.isRecording) {
      return;
    }

    this._audioChunkCount += 1;
    if (this._audioChunkCount === 1) {
      logger.debug('First audio chunk received — pipeline flowing', { program: this.audioProgram, bytes: chunk.length });
    } else if (this._audioChunkCount % 10 === 0) {
      logger.debug('Audio flowing', { chunks: this._audioChunkCount, bytes: chunk.length, segmentBytes: this.segmentBytes });
    }

    if (this.provider === 'azure' && this.pushStream) {
      try {
        this.pushStream.write(chunk);
      } catch (error) {
        logger.error('Error writing audio data to Azure push stream', { error: error.message });
      }
      return;
    }

    if (this.provider === 'whisper' || this.provider === 'groq' || this.provider === 'openai-stt') {
      this.segmentBuffers.push(Buffer.from(chunk));
      this.segmentBytes += chunk.length;
    }
  }

  async _flushWhisperSegment({ final }) {
    if (this.transcriptionInFlight) {
      this.pendingFlush = this.pendingFlush || final;
      return;
    }

    if (!this.segmentBytes) {
      return;
    }

    const audioBuffer = Buffer.concat(this.segmentBuffers, this.segmentBytes);
    this.segmentBuffers = [];
    this.segmentBytes = 0;

    this.transcriptionInFlight = true;

    try {
      const transcript = await this._transcribeWhisperBuffer(audioBuffer);
      if (transcript && transcript.trim()) {
        this.emit('transcription', transcript.trim());
      }
    } catch (error) {
      logger.error('Transcription failed persistently', { error: error.message });
      this.emit('error', `Transcription failed: ${error.message}`);
    } finally {
      this.transcriptionInFlight = false;

      if (this.pendingFlush) {
        const shouldRunFinal = this.pendingFlush;
        this.pendingFlush = false;
        await this._flushWhisperSegment({ final: shouldRunFinal });
      }
    }
  }

  async _transcribeWhisperBuffer(audioBuffer) {
    if (audioBuffer.length < 8192) {
      return ''; // skip near-silent segments
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'opencluely-whisper-'));
    const audioFilePath = path.join(tempDir, 'segment.wav');

    try {
      fs.writeFileSync(audioFilePath, this._createWavBuffer(audioBuffer));

      if (this.provider === 'groq' || this.provider === 'openai-stt') {
        let lastError;
        for (let attempt = 0; attempt <= 2; attempt++) {
          try {
            return await this._transcribeWithSttApi(audioFilePath);
          } catch (err) {
            lastError = err;
            logger.warn('STT API attempt failed', { attempt: attempt + 1, error: err.message });
            if (attempt < 2) await new Promise(r => setTimeout(r, 500));
          }
        }
        if (this.whisperCommand) {
          logger.warn('STT API failed, falling back to local Whisper', { error: lastError.message });
          return await this._transcribeWhisperFile(audioFilePath);
        }
        throw lastError;
      }

      return await this._transcribeWhisperFile(audioFilePath);
    } finally {
      this._removeTempDir(tempDir);
    }
  }

  async _transcribeWhisperFile(audioFilePath) {
    if (!this.whisperCommand) {
      throw new Error('Local Whisper CLI not configured');
    }

    const outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'opencluely-whisper-out-'));
    const args = [
      ...this.whisperCommand.baseArgs,
      audioFilePath,
      '--model', this._getWhisperModel(),
      '--language', this._getWhisperLanguage(),
      '--task', 'transcribe',
      '--output_format', 'txt',
      '--output_dir', outputDir,
      '--verbose', 'False',
      '--fp16', 'False'
    ];

    if (this._getWhisperModelDir()) {
      args.push('--model_dir', this._getWhisperModelDir());
    }

    try {
      await new Promise((resolve, reject) => {
        const child = spawn(this.whisperCommand.command, args, {
          stdio: ['ignore', 'pipe', 'pipe']
        });

        let stderr = '';
        child.stderr.on('data', (chunk) => {
          stderr += chunk.toString();
        });

        child.on('error', (error) => {
          reject(error);
        });

        child.on('close', (code) => {
          if (code === 0) {
            resolve();
            return;
          }

          reject(new Error(stderr.trim() || `Whisper exited with code ${code}`));
        });
      });

      const transcriptPath = path.join(outputDir, `${path.parse(audioFilePath).name}.txt`);
      if (!fs.existsSync(transcriptPath)) {
        return '';
      }

      return fs.readFileSync(transcriptPath, 'utf8').trim();
    } finally {
      this._removeTempDir(outputDir);
    }
  }

  _createWavBuffer(rawPcmBuffer) {
    const header = Buffer.alloc(44);
    const sampleRate = 16000;
    const channels = 1;
    const bitsPerSample = 16;
    const byteRate = sampleRate * channels * (bitsPerSample / 8);
    const blockAlign = channels * (bitsPerSample / 8);

    header.write('RIFF', 0);
    header.writeUInt32LE(36 + rawPcmBuffer.length, 4);
    header.write('WAVE', 8);
    header.write('fmt ', 12);
    header.writeUInt32LE(16, 16);
    header.writeUInt16LE(1, 20);
    header.writeUInt16LE(channels, 22);
    header.writeUInt32LE(sampleRate, 24);
    header.writeUInt32LE(byteRate, 28);
    header.writeUInt16LE(blockAlign, 32);
    header.writeUInt16LE(bitsPerSample, 34);
    header.write('data', 36);
    header.writeUInt32LE(rawPcmBuffer.length, 40);

    return Buffer.concat([header, rawPcmBuffer]);
  }

  _removeTempDir(tempDir) {
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
      logger.error('Failed to remove Whisper temp directory', {
        tempDir,
        error: error.message
      });
    }
  }
}

module.exports = new SpeechService();
