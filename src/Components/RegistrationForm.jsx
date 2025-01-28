import React, { useState } from 'react'

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
});

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:8080/api/users/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });
        if (response.ok) {
            alert("Registration successful!");
        }
    } catch (error) {
        console.error("Error registering user:", error);
    }
};

return (
    <div className='h-full'>
        <h1 className='text-center pb-6 text-2xl font-bold'>Register the Account</h1>
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
        <input  className=' rounded-md p-1' type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input  className=' rounded-md p-1'type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input  className=' rounded-md p-1'type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <div className='flex justify-center py-2'>
        <button className='bg-zinc-900 rounded-md px-4 text-white text-lg w-1/2 hover:bg-white hover:text-black ' type="submit">Register</button>
        </div>
    </form>
    </div>
);
}

export default RegistrationForm