export type ConnectionState = 'disconnected' | 'connecting' | 'connected';

export interface CameraInfo {
  /** Human readable feed name, e.g. "UGV-07 / FRONT" */
  name: string;
  /** e.g. "1920x1080" */
  resolution: string;
}

export interface TelemetrySnapshot {
  /** 0..4 signal bars */
  wifiBars: 0 | 1 | 2 | 3 | 4;
  /** round trip latency in ms */
  latencyMs: number;
  /** decoded frames per second */
  fps: number;
  /** battery state of charge, 0..100 */
  batteryPercent: number;
  /** true when battery is charging (rare for a UGV field unit, but supported) */
  isCharging?: boolean;
}

export interface ToolbarAction {
  id: 'connect' | 'snapshot' | 'record' | 'fullscreen' | 'settings';
  active?: boolean;
  disabled?: boolean;
}
