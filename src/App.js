import React, { useState } from 'react'
import "./index.css"
function App() {
  const [total, setTotal] = useState(0);
  const [incomeList, setincomeList] = useState([]);
  const [inputValues, setInputValues] = useState({ desc: "", amount: 0, type: "income" });

  const Formsub = (e) => {
    e.preventDefault();
    console.log("values", inputValues)
    const { desc, amount, type } = inputValues; // destructuring from object
    if (type === "income") {
      setTotal(pre => pre + amount)
    } else if (type === "expense") {
      setTotal(pre => pre - amount)
    }
    const upd = [...incomeList];
    const obj = {
      id: Math.floor(Math.random() * 1000),
      description: desc,
      price: amount,
      type,
    }
    upd.push(obj)
    setincomeList(upd)
  }
  const Delete = (id) => {
    const IncArray = incomeList.filter(item => item.id !== id);
    const deletedItem = incomeList.find(x => x.id === id);
    console.log("d", deletedItem)
    setincomeList(IncArray);
    setTotal(pre => pre - deletedItem.price);
  }
  console.log("inc", incomeList)
  return (
    <>
      <div className='heading'>
        <h2 >Expense Tracker</h2>
      </div>
      <div className='container'>
        <div className='form-container'>
          <h1 className='new'>Add expenses</h1>
          <form className='form' onSubmit={Formsub}>
            <label>Description</label>
            <input type="text" placeholder='Enter Budget title' value={inputValues.desc} required onChange={e => setInputValues(prev => ({ ...prev, desc: e.target.value }))} /><br />
            <label className='amount'  >Amount</label>
            <input type="number" placeholder="Enter amount" value={inputValues.amount} required onChange={e => setInputValues(prev => ({ ...prev, amount: parseInt(e.target.value) }))} /><br />
            <label>Select</label>
            <select className='select' value={inputValues.type} onChange={e => setInputValues(prev => ({ ...prev, type: e.target.value }))}  >
              <option value="income" >Income</option>
              <option value="expense" >Expense</option>
            </select><br />
            <button type='Submit' className='sub'>Submit</button>
          </form>
        </div>
        <div className='tamount'>
          <h1 className=' new'>Total Expenses :${total}</h1>
          <div className='table-container'>
            <h2 className='total'>expense list</h2>
            <table className='style-table'>

              <tr>
                <th>Name</th>
                <th>type</th>
                <th>budget amount</th>
                <th>Action</th>
              </tr>

              {incomeList.map((item, id) => (
                <tr>
                  <td>{item.description}</td>
                  <td>{item.type}</td>
                  <td>{item.price}</td>
                  <td><button className='del-btn' onClick={() => Delete(item.id)}>Delete</button></td>
                </tr>
              ))}

            </table>
          </div>

        </div>


      </div >
    </>
  )
}

export default App