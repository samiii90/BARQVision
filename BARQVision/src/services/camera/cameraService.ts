import { STREAM_URL } from './cameraConfig';
import { CameraConnectionState, CameraStatus } from './cameraTypes';

/**
 * Service responsible for managing the connection and state of the camera stream.
 */
export class CameraService {
  private status: CameraStatus = {
    state: CameraConnectionState.Idle,
    message: 'Camera is idle',
  };

  private streamUrl: string = STREAM_URL;

  /**
   * Retrieves the current connection status of the camera.
   * @returns The current CameraStatus object.
   */
  public getStatus(): CameraStatus {
    return this.status;
  }

  /**
   * Retrieves the designated stream URL for the camera.
   * @returns The stream URL as a string.
   */
  public getStreamUrl(): string {
    return this.streamUrl;
  }

  /**
   * Initiates a connection sequence to the camera.
   * Simulates a successful connection after a brief delay.
   * @returns A Promise that resolves when the camera successfully connects.
   */
  public connect(): Promise<void> {
    this.status = {
      state: CameraConnectionState.Connecting,
      message: 'Connecting to camera...',
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        this.status = {
          state: CameraConnectionState.Connected,
          message: 'Camera connected successfully',
        };
        resolve();
      }, 1000);
    });
  }

  /**
   * Terminates the current connection and returns the camera to an idle state.
   */
  public disconnect(): void {
    this.status = {
      state: CameraConnectionState.Idle,
      message: 'Camera is disconnected',
    };
  }
}
