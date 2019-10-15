import React from 'react'
import {getAllRecipes} from '../utils/api'

class Dashboard extends React.Component {
    componentDidMount() {
        getAllRecipes()
    }
    render() {
        return (
            <div>noodles</div>
        )
    }
}

export default Dashboard