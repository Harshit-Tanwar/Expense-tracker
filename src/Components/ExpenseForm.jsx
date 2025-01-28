import axios from 'axios';
import React, { useEffect, useState } from 'react'

const ExpenseForm = ({ onClose, onExpenseAdded, editingExpense ,userId}) => {

    const [formData, setFormData] = useState({
        title: "",
        category: "",
        description: "",
        date: "",
        amount: "",
    });
    useEffect(() => {
        if (editingExpense) {
            setFormData(editingExpense); // Pre-fill the form with the expense details for editing
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form submission's default behavior
        try {
            if (editingExpense) {
                // Update existing expense
                await axios.put(
                    `http://localhost:8080/api/expense/${editingExpense.id}`,
                    formData
                );
                alert("Expense updated successfully!");
            }
            else {
                    await axios.post(`http://localhost:8080/api/expense/${userId}`, formData);
                alert("Expense added successfully!");
                setFormData({
                    title: "",
                    category: "",
                    description: "",
                    date: "",
                    amount: "", 
                })
            } // Clear the form after submission
            onExpenseAdded(); // Trigger parent to fetch updated expenses
            onClose();
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Failed to add expense.");
        }
    };


    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10'>
            <div className='bg-zinc-300 h-[75%] w-[40%] relative rounded-lg'>
                <button onClick={onClose} className='m-3 absolute right-0'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
                <form onSubmit={handleSubmit} className='m-5 py-4 flex flex-col gap-2'>
                    <h1 className='font-bold text-xl'>ADD EXPENSES</h1>
                    <div>
                        <label className=' py-1 text-lg'>Title</label>
                        <input type="text"
                            name="title"
                            className='w-full rounded-md py-1 px-2'
                            value={formData.title}
                            onChange={handleChange}
                            required />
                    </div>
                    <div>
                        <label className='py-1 text-lg'>Category</label>
                        <input type="text"
                            name="category"
                            className='w-full rounded-md py-1 px-2'
                            value={formData.category}
                            onChange={handleChange}
                            required />
                    </div>
                    <div>
                        <label className='py-1 text-lg'>Date</label>
                        <input type="date"
                            name="date"
                            className='w-full rounded-md py-1 px-2'
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='py-1 text-lg'>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div>
                        <label className='py-1 text-lg'>Amount</label>
                        <input type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className='w-full rounded-md py-1 px-2' />
                    </div>

                    <div className='w-full flex justify-end'>
                        <button type="submit" className='bg-violet-600 mt-5 font-semibold text-lg rounded-md px-4 py-1'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ExpenseForm