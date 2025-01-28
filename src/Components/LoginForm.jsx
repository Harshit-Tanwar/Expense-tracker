import React, { useState } from 'react'
const LoginForm = ({onLogin}) => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            const user = await response.json();
            if (response.ok) {
                onLogin(user); // Notify parent about logged-in user
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };
    return (
        <div className='h-full'> 
        <h1 className='text-center pb-12 text-2xl font-bold'>Login Into the Account</h1>
        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <input className=' rounded-md p-1' 
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
            />
            <input className=' rounded-md p-1'
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
            />
            <div className='flex justify-center py-2'>
            <button className='bg-zinc-900 rounded-md px-3 text-white text-lg w-1/2 hover:bg-white hover:text-black ' type="submit">login</button>
            </div>
        </form>
        </div>
    )
}

export default LoginForm