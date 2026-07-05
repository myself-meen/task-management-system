import { requestJson } from './api'

export const getDashboardData = async () => {
    return requestJson('/dashboard')
}