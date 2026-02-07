/**
 * Centralized API configuration
 * Single source of truth for API base URL
 */

/**
 * Gets the API base URL from environment variables.
 * Throws a clear error if NEXT_PUBLIC_API_URL is not set.
 * 
 * @throws {Error} If NEXT_PUBLIC_API_URL is not defined
 * @returns {string} The API base URL
 */
export function getApiBaseUrl(): string {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
        throw new Error(
            '❌ NEXT_PUBLIC_API_URL is not defined!\n\n' +
            'Please set NEXT_PUBLIC_API_URL in your .env.local file.\n' +
            'Example: NEXT_PUBLIC_API_URL=http://localhost:3001\n\n' +
            'This is required for the application to communicate with the backend API.'
        );
    }

    return apiUrl;
}

/**
 * API base URL constant - single source of truth
 * Use this for all API calls throughout the application
 */
export const API_BASE_URL = getApiBaseUrl();
