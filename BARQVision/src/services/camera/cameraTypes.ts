/**
 * Represents the current connection state of the camera.
 */
export enum CameraConnectionState {
  Idle = 'Idle',
  Connecting = 'Connecting',
  Connected = 'Connected',
  Error = 'Error',
}

/**
 * Encapsulates the overall status of the camera including its connection state
 * and any relevant descriptive message.
 */
export interface CameraStatus {
  state: CameraConnectionState;
  message: string;
}
