import { useState, useEffect, useRef } from 'react';

/**
 * useMinimumDelay(isReady, delayMs)
 * 
 * Returns `true` (still loading) until BOTH conditions are met:
 *   1. `isReady` becomes true (real data loaded)
 *   2. At least `delayMs` milliseconds have passed since mount
 * 
 * This prevents the skeleton/loader from "flashing" on fast connections
 * without ever blocking the real data fetch.
 */
export function useMinimumDelay(isReady, delayMs = 400) {
    const [delayPassed, setDelayPassed] = useState(false);
    const mountTime = useRef(Date.now());

    useEffect(() => {
        const elapsed = Date.now() - mountTime.current;
        const remaining = Math.max(0, delayMs - elapsed);

        const timer = setTimeout(() => setDelayPassed(true), remaining);
        return () => clearTimeout(timer);
    }, [delayMs]);

    // Still "loading" if either condition hasn't been met
    return !isReady || !delayPassed;
}
