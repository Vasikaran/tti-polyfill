'use strict';

console.log("Loading Time to Interactive Polyfill");

(function() {

  // Set a marker at around 1 second it is slightly easier in devtools timeline
  // to see where FirstInteractive fired.
  setTimeout(() => {
    console.log("Setting a marker for 1 second");
    console.timeStamp("Roughly 1s mark");
  }, 1000);

  const FirstConsistentlyInteractiveDetector =
        window._firstConsistentlyInteractiveDetector.FirstConsistentlyInteractiveDetector;
  const firstConsistentlyInteractiveDetector =
        new FirstConsistentlyInteractiveDetector({debugMode: true});

  if (document.readyState === "complete" || document.readyState === "loaded") {
    console.log("Document already sufficiently loaded. Scheduling FirstInteractive timer tasks.");
    firstConsistentlyInteractiveDetector.startSchedulingTimerTasks();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      console.log("DOM Content Loaded fired - scheduling FirstInteractive timer tasks");

      // You can use this to set a custom minimum value.
      // firstConsistentlyInteractiveDetector.setMinValue(20000);

      firstConsistentlyInteractiveDetector.startSchedulingTimerTasks();
    });
  }
})();
