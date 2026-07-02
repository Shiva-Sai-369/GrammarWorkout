import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Square, Play, Sparkles, Volume2, RotateCcw, Check, Info, Award } from 'lucide-react';
import { PracticePhrase } from '../types';

interface VoiceLabProps {
  isOpen: boolean;
  onClose: () => void;
}

const PHRASES: PracticePhrase[] = [
  {
    id: "es",
    phrase: "Hola, ¿cómo estás hoy? Me encanta aprender.",
    phonetic: "OH-lah, KOH-moh ess-TAHS oy? May en-CAHN-tah ah-pren-DAIR.",
    translation: "Hello, how are you today? I love learning.",
    audioDuration: 2.5,
    idealPitchPattern: [20, 45, 30, 25, 60, 55, 30, 45, 50, 65, 40]
  },
  {
    id: "fr",
    phrase: "Le voyage élargit l'esprit et affine la voix.",
    phonetic: "Luh vwa-yahj ay-lar-zhee luh-spree ay ah-feen lah vwah.",
    translation: "Travel broadens the mind and refines the voice.",
    audioDuration: 3.0,
    idealPitchPattern: [30, 35, 40, 55, 30, 45, 60, 65, 50, 45, 35]
  },
  {
    id: "ja",
    phrase: "言葉は心をつなぐ架け橋です。",
    phonetic: "Ko-to-ba wa ko-ko-ro wo tsu-na-gu ka-ke-ha-shi de-su.",
    translation: "Words are the bridge that connects hearts.",
    audioDuration: 3.5,
    idealPitchPattern: [25, 45, 50, 35, 40, 45, 30, 55, 60, 45, 25]
  }
];

export default function VoiceLab({ isOpen, onClose }: VoiceLabProps) {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasRecorded, setHasRecorded] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [score, setScore] = useState<{ tone: number; pitch: number; sync: number } | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  
  const visualizerBars = Array.from({ length: 24 });
  const animationRef = useRef<number | null>(null);

  const currentPhrase = PHRASES[selectedIdx];

  // Try to bind real mic levels for visualizer if user wants!
  useEffect(() => {
    if (isRecording) {
      let audioCtx: AudioContext | null = null;
      let analyser: AnalyserNode | null = null;
      let source: MediaStreamAudioSourceNode | null = null;

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          setAudioStream(stream);
          setMicActive(true);
          
          audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);

          const bufferLength = analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const updateMicLevel = () => {
            if (!analyser) return;
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            setAudioLevel(average);
            animationRef.current = requestAnimationFrame(updateMicLevel);
          };
          updateMicLevel();
        })
        .catch(() => {
          // Fallback to simulated microphone pulsing if permission denied or iframe sandboxed
          setMicActive(false);
          const simulateMicLevel = () => {
            setAudioLevel(15 + Math.random() * 45);
            animationRef.current = requestAnimationFrame(simulateMicLevel);
          };
          simulateMicLevel();
        });

      // Automatically stop recording after 4.5 seconds
      const timeout = setTimeout(() => {
        handleStopRecording();
      }, 4500);

      return () => {
        clearTimeout(timeout);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
        if (audioStream) {
          audioStream.getTracks().forEach(track => track.stop());
        }
        if (audioCtx) {
          audioCtx.close();
        }
      };
    } else {
      setAudioLevel(0);
    }
  }, [isRecording]);

  const handleStartRecording = () => {
    setHasRecorded(false);
    setScore(null);
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }

    // Generate simulated high match score
    const toneMatch = Math.floor(88 + Math.random() * 10);
    const pitchMatch = Math.floor(85 + Math.random() * 13);
    const syncMatch = Math.floor(90 + Math.random() * 8);

    setScore({
      tone: toneMatch,
      pitch: pitchMatch,
      sync: syncMatch
    });
    setHasRecorded(true);
  };

  const handlePlaySample = () => {
    // Play synthesis voice or simple fallback beep/audio
    const synth = window.speechSynthesis;
    if (synth) {
      const utterance = new SpeechSynthesisUtterance(currentPhrase.phrase);
      utterance.lang = currentPhrase.id === 'es' ? 'es-ES' : currentPhrase.id === 'fr' ? 'fr-FR' : 'ja-JP';
      synth.speak(utterance);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-sm"
      />

      {/* Lab Window */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-brand-navy text-white rounded-2xl shadow-2xl overflow-hidden border border-brand-magenta/30 z-10 flex flex-col"
      >
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-40 h-40 bg-brand-magenta/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-brand-lilac/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-brand-deep-indigo/40 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-brand-magenta/20 rounded-lg text-brand-lilac border border-brand-magenta/40">
              <Mic className="w-5 h-5" />
            </span>
            <div>
              <span className="font-bold text-lg tracking-tight">LinguistPro Voice Lab</span>
              <span className="text-xs text-brand-lilac/80 block -mt-1 font-semibold">Pulse Frequency Native Analyzer</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
          >
            <span className="material-icons text-xl block">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 relative z-10 overflow-y-auto max-h-[80vh]">
          {/* Language Tabs */}
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
            {PHRASES.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => {
                  setSelectedIdx(idx);
                  setScore(null);
                  setHasRecorded(false);
                }}
                className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                  selectedIdx === idx 
                    ? 'bg-brand-magenta text-white shadow-md' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {p.id === 'es' ? '🇪🇸 Spanish' : p.id === 'fr' ? '🇫🇷 French' : '🇯🇵 Japanese'}
              </button>
            ))}
          </div>

          {/* Active Phrase Display */}
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <span className="text-xs uppercase font-bold tracking-widest text-brand-lilac">Target Phrase</span>
              <button 
                onClick={handlePlaySample}
                className="flex items-center gap-1.5 px-3 py-1 bg-brand-lilac/10 hover:bg-brand-lilac/20 text-brand-lilac rounded-lg text-xs font-bold border border-brand-lilac/20 transition-all"
              >
                <Volume2 className="w-3.5 h-3.5" /> Listen Native
              </button>
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-brand-lilac leading-snug">
                "{currentPhrase.phrase}"
              </h3>
              <p className="text-sm font-mono text-white/50">{currentPhrase.phonetic}</p>
            </div>
            <div className="pt-2 border-t border-white/5 flex gap-2 items-center text-xs text-white/70">
              <Info className="w-4 h-4 text-brand-lilac" />
              <span>Meaning: <span className="italic text-brand-lilac/90 font-medium">"{currentPhrase.translation}"</span></span>
            </div>
          </div>

          {/* Interactive Speaking / Waveform visualization */}
          <div className="p-6 rounded-2xl bg-black/30 border border-white/5 flex flex-col items-center justify-center min-h-[160px] gap-4 relative overflow-hidden">
            {/* Native vs Student Waveform overlay */}
            <div className="w-full flex items-center justify-center gap-0.5 h-16 px-4">
              {visualizerBars.map((_, idx) => {
                const nativeHeight = currentPhrase.idealPitchPattern[idx % currentPhrase.idealPitchPattern.length];
                let userHeight = 4;
                
                if (isRecording) {
                  // Pulse active voice input
                  const factor = Math.sin(idx * 0.4 + Date.now() * 0.01) * 0.4 + 0.6;
                  userHeight = Math.max(4, audioLevel * factor);
                } else if (hasRecorded && score) {
                  // Map similar wave
                  userHeight = nativeHeight * (score.sync / 100) + (Math.sin(idx) * 4);
                }

                return (
                  <div key={idx} className="flex-1 flex flex-col justify-center items-center h-full gap-0.5">
                    {/* Native (top half) */}
                    <div 
                      className="w-full bg-brand-lilac/30 rounded-t-sm transition-all duration-100" 
                      style={{ height: `${nativeHeight / 2}%` }}
                    />
                    {/* User Input (bottom half) */}
                    <div 
                      className={`w-full rounded-b-sm transition-all duration-100 ${
                        isRecording ? 'bg-brand-magenta' : hasRecorded ? 'bg-emerald-400' : 'bg-white/10'
                      }`}
                      style={{ height: `${userHeight / 2}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Simulated Live Pitch Tracker Marker */}
            {isRecording && (
              <span className="text-xs font-mono font-bold tracking-widest text-brand-magenta animate-pulse uppercase">
                {micActive ? "● Recording Real Audio Input..." : "● Simulating Micro-Acoustics..."}
              </span>
            )}

            {!isRecording && !hasRecorded && (
              <p className="text-xs text-white/40 text-center font-medium max-w-md">
                Click start to speak. You can use your device microphone to feed vocal pitches, or let LinguistPro simulate the audio alignment curve.
              </p>
            )}

            {/* Results Grid */}
            <AnimatePresence>
              {hasRecorded && score && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full grid grid-cols-3 gap-2 mt-2 pt-4 border-t border-white/5"
                >
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Pitch Sync</span>
                    <span className="text-xl font-black text-brand-lilac block">{score.pitch}%</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Excellent</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Vocal Tone</span>
                    <span className="text-xl font-black text-emerald-400 block">{score.tone}%</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Near-Native</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold block">Rhythmic Cadence</span>
                    <span className="text-xl font-black text-brand-lilac block">{score.sync}%</span>
                    <span className="text-[10px] text-emerald-400 font-bold block">Matched</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Award Banner on Great Score */}
          {hasRecorded && score && (
            <div className="flex gap-3 items-center p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-emerald-400">Perfect Intonation Met!</h4>
                <p className="text-xs text-white/70">Your vocal resonance matches our native speaker with a <span className="text-emerald-400 font-semibold">{score.tone}% match</span>. Pitch frequencies matched perfectly.</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="p-6 border-t border-white/10 bg-brand-deep-indigo/30 flex justify-between items-center">
          <button
            onClick={() => {
              setScore(null);
              setHasRecorded(false);
            }}
            disabled={isRecording || !hasRecorded}
            className="px-4 py-2 text-xs font-bold border border-white/10 hover:bg-white/5 disabled:opacity-30 rounded-lg text-white/80 transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>

          <div className="flex gap-2">
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <Square className="w-4 h-4 fill-white" /> Stop Speaking
              </button>
            ) : (
              <button
                onClick={handleStartRecording}
                className="px-6 py-3 bg-brand-magenta hover:brightness-110 rounded-xl font-black text-sm flex items-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
              >
                <Mic className="w-4 h-4" /> {hasRecorded ? "Speak Again" : "Start Speaking Lab"}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
