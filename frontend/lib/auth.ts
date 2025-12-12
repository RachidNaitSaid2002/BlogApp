
export async function checkAuth(): Promise<boolean> {
    try {
        const response = await fetch('http://127.0.0.1:8000/test-cookie', {
            method: 'GET',
            credentials: 'include',
        });

        if (response.ok) {
            const data = await response.json();
            // If we get a cookie back, user is authenticated
            return data.cookie !== undefined && data.cookie !== null;
        }
        return false;
    } catch (error) {
        console.error('Auth check failed:', error);
        return false;
    }
}
