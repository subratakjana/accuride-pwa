export const GTMEventFn = (getEvent, trackinigCode = false) => {
  const IfGtmLoad = localStorage.getItem('IfGtmLoad');
  try {
      if (IfGtmLoad) {
          if (trackinigCode) {
              const validEval = window;
              window.dataLayer.push({
                  event: 'sli-api-tracking',
                  sliApiTrackingCode: () => validEval.eval(trackinigCode.code),
              });
          }
          if (getEvent) {
              window.dataLayer.push(getEvent);
          }
      }
  } catch (error) {
      console.log('error', error);
  }
};
