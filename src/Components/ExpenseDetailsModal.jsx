import React from 'react'

const ExpenseDetailsModal = ({expense , onClose}) => {
    return (
        <div className="modal fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
            <div className="modal-content bg-zinc-100 w-[40%] h-1/2 p-5 rounded-lg">
                <h2 className='text-center text-2xl py-2 font-bold'>Expense Details</h2>
                <p className='text-xl py-1'><strong>Title:</strong> {expense.title}</p>
                <p className='text-xl py-1'><strong>Category:</strong> {expense.category}</p>
                <p className='text-xl py-1'><strong>Description:</strong> {expense.description}</p>
                <p className='text-xl py-1'><strong>Date:</strong> {expense.date}</p>
                <p className='text-xl py-1'><strong>Amount:</strong> {expense.amount}</p>
                <button className='bg-blue-800 px-4 rounded-full text-lg font-semibold my-5' onClick={onClose}>Close</button>
            </div>
        </div>
    )
}

export default ExpenseDetailsModal