import { useEffect, useRef, useState } from 'react';
import { ConnectionState, TelemetrySnapshot } from '../types';

const INITIAL: TelemetrySnapshot = {
  wifiBars: 4,
  latencyMs: 42,
  fps: 30,
  batteryPercent: 78,
  isCharging: false,
};

/**
 * Placeholder telemetry generator so the HUD has believable, moving
 * numbers in absence of a real link. Replace with a hook that reads
 * from your actual telemetry channel (MAVLink, custom UDP, etc).
 * No networking is implemented here by design.
 */
export function useMockTelemetry(connectionState: ConnectionState): TelemetrySnapshot {
  const [telemetry, setTelemetry] = useState<TelemetrySnapshot>(INITIAL);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (connectionState !== 'connected') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTelemetry((prev) => {
        const jitter = (base: number, spread: number) =>
          Math.round(base + (Math.random() - 0.5) * spread);

        return {
          wifiBars: (Math.max(2, Math.min(4, jitter(prev.wifiBars, 1))) as 0 | 1 | 2 | 3 | 4),
          latencyMs: Math.max(18, jitter(prev.latencyMs, 20)),
          fps: Math.max(24, Math.min(30, jitter(prev.fps, 2))),
          batteryPercent: Math.max(0, prev.batteryPercent - (Math.random() < 0.1 ? 1 : 0)),
          isCharging: prev.isCharging,
        };
      });
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [connectionState]);

  return telemetry;
}
