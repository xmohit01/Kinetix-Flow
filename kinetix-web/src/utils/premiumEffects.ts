export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'medium') => {
    if (typeof window === 'undefined' || !navigator.vibrate) return;
  
    switch (type) {
      case 'light':
        navigator.vibrate(50);
        break;
      case 'medium':
        navigator.vibrate(100);
        break;
      case 'heavy':
        navigator.vibrate(200);
        break;
      case 'success':
        navigator.vibrate([100, 50, 100]); // double pulse
        break;
      case 'error':
        navigator.vibrate([50, 50, 50, 50, 50]); // rapid pulses
        break;
      default:
        navigator.vibrate(100);
    }
  };
  
  export const speakFeedback = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
    // Cancel any ongoing speech so new feedback is immediate
    window.speechSynthesis.cancel();
  
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.1; // Slightly faster for workout energy
    utterance.pitch = 1;
    
    // Attempt to use a female voice if available for a typical coaching feel, 
    // otherwise fallback to default
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Samantha') || v.name.includes('Female') || v.lang === 'en-US');
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
  
    window.speechSynthesis.speak(utterance);
  };
