import axios, { Axios } from 'axios';
import React, { useState, useEffect } from 'react'
import ExpenseForm from './ExpenseForm';
import ExpenseDetailsModal from './ExpenseDetailsModal';

const Section = ({userId}) => {
    const [showForm, setshowForm] = useState(false);
    const [expenses, setExpenses] = useState([]);
    const [editingExpense, setEditingExpense] = useState(null);
    const [selectedExpense, setSelectedExpense] = useState(null);
    //Fetch expenses from backend
    
    const result = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/expense/user/${userId}`);
            const data = response.data;
            if (Array.isArray(data)) {
                setExpenses(data);
              } else {
                console.error("Expected an array but got:", data);
                setExpenses([]);
              }
        } catch (error) {
            console.error("Error fetching expenses", error);
        }
    };

    // Edit expense
    const handleEdit = (expense) => {
        setEditingExpense(expense);
        setshowForm(true); // Open the form with the expense details
    };

    // Fetch a specific expense by ID
    const fetchExpenseById = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/expense/${id}`);
            const data = response.data;     // Set the fetched expense as the selected one
            if (Array.isArray(data)) {
                setExpenses(data);
              } else if (data && typeof data === "object") {
                setSelectedExpense(data); // If it's a single object
              } else {
                console.error("Unexpected data format:", data);
              }
        } catch (error) {
            console.error("Error fetching expense by ID", error);
        }
    };


    //Delete Expenses
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/expense/${id}`);
            alert("Expense deleted successfully!");
            setExpenses(expenses.filter((expense) => expense.id !== id)); // Remove the deleted expense locally
        } catch (error) {
            console.error("Error deleting expense", error);
            alert("Failed to delete expense.");
        }
    };
    useEffect(() => {
        result();
    }, [userId]);

    return (
        <div className='px-10 h-screen w-full bg-slate-100'>
            <div className='w-full flex items-center justify-between border-b py-4 border-zinc-400'>
                <h1 className='text-lg font-medium text-zinc-700'>Your Expense</h1>
                <button onClick={() => setshowForm(true)} type="button" className='bg-[#577BC1] px-4 py-1  rounded-lg border-none '>Add Expenses</button>
                {showForm && (
                    <ExpenseForm onClose={() => {
                        setshowForm(false);
                        setEditingExpense(null);
                    }
                    } 
                        userId={userId}
                        onExpenseAdded={result}
                        editingExpense={editingExpense}
                    />
                )}
            </div>
           <div className='flex gap-5'>
            <div className='w-[80%] grid grid-cols-3 gap-5 pt-7'>
            {Array.isArray(expenses) ?(
                expenses.map((dataobj) => (
                    <div key={dataobj.id} className='bg-white  rounded-md  px-5 py-3 relative'>
                        <div className='flex justify-between pb-1'>
                            <h1 className='text-xl font-semibold'>{dataobj.title}</h1>
                            <h1>{dataobj.date}</h1>
                        </div>
                        <h1 className='pb-2'>Category: {dataobj.category}</h1>
                        <h1 className='pb-2'>Amount: {dataobj.amount}</h1>
                        <hr />
                        <div className='flex border-black pt-2 items-center justify-around'>
                            <button onClick={() => fetchExpenseById(dataobj.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                                <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" clipRule="evenodd" />
                            </svg>
                            </button>
                            {selectedExpense && (
                                <ExpenseDetailsModal
                                    expense={selectedExpense}
                                    onClose={() => setSelectedExpense(null)} // Close the modal
                                />
                            )}

                            <button onClick={() => handleEdit(dataobj)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="blue" className="size-5">
                                <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
                            </svg>
                            </button>

                            <button onClick={() => deleteExpense(dataobj.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red" class="size-5">
                                <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clip-rule="evenodd" />
                            </svg>
                            </button>
                        </div>
                    </div>
                ))) : (
                    <p>No expenses found</p>
                )}
            </div>
            <div className='h-l border-l border-zinc-400 pt-7 pl-5'>
                <h1 className='text-xl font-medium text-zinc-700'>Total Expenses: {expenses.reduce((acc, curr) => acc + curr.amount, 0)}</h1>
                <h2>Weekly Expenses</h2>
                <h2>Monthly Expenses</h2>
            </div>
            </div>
        </div>
    )
}

export default Section