import {settings} from '../settings/config'

export const getAllRecipes = async () => {
    try {
        const response = await fetch(settings.api_uri)
        return await response.json()
    } catch (e) {
        return e.message;
    }
}