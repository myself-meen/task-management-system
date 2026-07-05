const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/v1').replace(/\/$/, '')

export const buildApiUrl = (path = '') => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    return `${API_BASE_URL}${normalizedPath}`
}

export const requestJson = async (path, options = {}) => {
    const response = await fetch(buildApiUrl(path), options)
    const contentType = response.headers.get('content-type') || ''

    let data = {}
    if (contentType.includes('application/json')) {
        data = await response.json().catch(() => ({}))
    } else {
        data = await response.text().catch(() => '')
    }

    if (!response.ok) {
        const message = typeof data === 'string'
            ? data
            : data.error || data.message || 'Something went wrong. Please try again.'

        throw new Error(message)
    }

    return data
}
