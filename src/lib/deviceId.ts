const DEVICE_ID_KEY = 'manzil_device_id';
const SESSION_SECRET_KEY = 'manzil_session_secret';

/**
 * Generates a unique device ID using crypto API
 */
function generateDeviceId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Gets or creates a persistent device ID stored in localStorage
 */
export function getDeviceId(): string {
  try {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    
    if (!deviceId) {
      deviceId = generateDeviceId();
      localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    
    return deviceId;
  } catch {
    // Fallback if localStorage is not available
    return generateDeviceId();
  }
}

/**
 * Clears the device ID (useful for testing)
 */
export function clearDeviceId(): void {
  try {
    localStorage.removeItem(DEVICE_ID_KEY);
  } catch {
    // Ignore errors
  }
}

/**
 * Gets the stored session secret for anonymous session validation
 */
export function getSessionSecret(): string | null {
  try {
    return localStorage.getItem(SESSION_SECRET_KEY);
  } catch {
    return null;
  }
}

/**
 * Stores a session secret for anonymous session validation
 */
export function setSessionSecret(secret: string): void {
  try {
    localStorage.setItem(SESSION_SECRET_KEY, secret);
  } catch {
    // Ignore errors
  }
}

/**
 * Clears the session secret
 */
export function clearSessionSecret(): void {
  try {
    localStorage.removeItem(SESSION_SECRET_KEY);
  } catch {
    // Ignore errors
  }
}
