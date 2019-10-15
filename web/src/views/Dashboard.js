import React from 'react'
import {settings} from '../settings/config'

class Dashboard extends React.Component {
    componentDidMount() {
        console.log(settings)
    }
    render() {
        return (
            <div>noodles</div>
        )
    }
}

export default Dashboard