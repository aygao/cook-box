import {settings} from '../settings/config'

export const getAllRecipes = () => {
    fetch(settings.api_uri)
        .then(res => res.json())
        .then(res => console.log(res))
}