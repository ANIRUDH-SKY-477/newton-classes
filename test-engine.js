
/* NEWTON CLASSES - Shared Online Test Engine */

window.NewtonTest = (() => {
  const QUESTION_COUNT = 20;

  function shuffle(items) {
    const list = [...items];

    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }

    return list;
  }

  function makeTest(questionBank) {
    if (!Array.isArray(questionBank) || questionBank.length < QUESTION_COUNT) {
      throw new Error("Test ke liye kam se kam 20 questions chahiye.");
    }

    return shuffle(questionBank)
      .slice(0, QUESTION_COUNT)
      .map((question, index) => ({
        ...question,
        id: index + 1,
        options: shuffle(question.options)
      }));
  }

  function getResult(score) {
    const percentage = Math.round((score / QUESTION_COUNT) * 100);

    return {
      score,
      total: QUESTION_COUNT,
      percentage,
      success: percentage > 80,
      message: percentage > 80
        ? "🎉 Congratulations! 🏆 शानदार प्रदर्शन! 🌟"
        : "💪 Doing Well but Need More Preparation 📚 मेहनत जारी रखो! 🚀"
    };
  }

  function playResultSound(success) {
    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) return;

      const context = new AudioContextClass();
      const notes = success
        ? [523.25, 659.25, 783.99]
        : [392, 329.63];

      notes.forEach((frequency, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = context.currentTime + index * 0.16;

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.exponentialRampToValueAtTime(0.12, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        oscillator.connect(gain);
        gain.connect(context.destination);

        oscillator.start(start);
        oscillator.stop(start + 0.23);
      });

      setTimeout(() => context.close(), 1000);
    } catch (error) {
      // Sound unavailable hone par bhi test chalega.
    }
  }

  return {
    QUESTION_COUNT,
    makeTest,
    getResult,
    playResultSound
  };
})();
    
