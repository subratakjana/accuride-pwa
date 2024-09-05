import { useIdleTimer } from 'react-idle-timer';

const useIdleTimeout = ({
    token, handleIdlePrompt, onIdle, idleTime = 1, promptRemain, onAction,
}) => {
    const idleTimeout = idleTime * 60 * 1000;
    const promptRatio = idleTimeout / (promptRemain * 60 * 1000);
    const {
        idleTimer, getRemainingTime, reset, isLeader,
    } = useIdleTimer({
        timeout: idleTimeout,
        promptBeforeIdle: idleTimeout / promptRatio,
        onPrompt: handleIdlePrompt,
        onIdle,
        debounce: 500,
        disabled: !token,
        onAction,
        crossTab: true,
        syncTimers: 100,
        leaderElection: true,
    });
    return {
        idleTimer,
        getRemainingTime,
        reset,
        isLeader,
    };
};
export default useIdleTimeout;
