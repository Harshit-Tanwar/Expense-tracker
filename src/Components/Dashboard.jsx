import React from 'react'
import Section from './Section'

const Dashboard = ({ user, onLogout }) => {
    return (
        <div className='w-full'>
            <main>
                <Section userId={user.id} />
            </main>
        </div>
    )
}

export default Dashboard