"use client"

import { useEffect, useState } from 'react'
import './style.css'
import axios from 'axios'
import TableRow from './Components/TableRow/TableRow';
import InfoWrapper from './Components/InfoWrapper/InfoWrapper'


export default function Home() {
  
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('')
  const [filterUserData, setFilterUserData] = useState([])
  const [activeRowIndex, setActiveRowIndex] = useState(2);
  const [activeRowId, setActiveRowId] = useState()
  const [activeRowData, setActiveRowData] = useState()

  useEffect(()=>{
    axios.get("https://admin-panel-data-edyoda-sourav.vercel.app/admin/data")
    .then(res => {
      setUserData(res.data)
      setActiveRowId(res.data[activeRowIndex].id)
      setActiveRowData(res.data[activeRowIndex])
    
    })
    .catch(err => console.log(err))
  },[])

  const getSearchValue = (e) =>{
    let search = e.target.value
    let filteredUser = userData.filter((item)=>item.firstName.toLowerCase().includes(search.toLowerCase()))
    setFilterUserData(filteredUser);
    setSearchQuery(e.target.value)
  }

  const hanldeSelectedRow = (id) => {
    let selectedRowRecords = userData.find(user => user.id == id)
    setActiveRowId(id)
    setActiveRowData(selectedRowRecords)
  }
  return (
    <main>
  <div id="table-section">

<form action="/">
    {/* <img src='./img/search-icon.svg' alt="Search Icon" /> */}
    <input 
        type="text" 
        placeholder="Enter something" 
        name="search-box" 
        id="search-box" 
        onChange={(e)=>getSearchValue(e)}
        value={searchQuery} 
    />
</form>

<div id="table-wrapper">

    <div id="table-headers">
        <table>
            <thead>
                <tr>
                    <th className="column1">Id</th>
                    <th className="column2">FirstName</th>
                    <th className="column3">LastName</th>
                    <th className="column4">Email</th>
                    <th className="column5">Phone</th>
                </tr>
            </thead>
        </table>
    </div>

    <div id="table-data">
        <table>
            <tbody>
                {/* <tr className="data-row">
                    <td className="column1">28</td>
                    <td className="column2">Larisa</td>
                    <td className="column3">Llaneza</td>
                    <td className="column4">SCallison@non.org</td>
                    <td className="column5">(763)248-9034</td>
                </tr> */}
                {
                  searchQuery == "" && filterUserData.length == 0 ? 
                  userData.map(item => <TableRow 
                                         user = {item} 
                                         key={item.id} 
                                         selectedItem = {activeRowId}
                                         handleClick = {hanldeSelectedRow}
                                        />) :
                  filterUserData.map(item => <TableRow 
                                              user = {item} 
                                              key={item.id} 
                                              selectedItem = {activeRowId}
                                              handleClick = {hanldeSelectedRow}
                                              />)
                }
            </tbody>
        </table>
    </div>

</div>

</div>



{/* <div id="info-wrapper">
<h1>Details</h1>
<p>Click on a table item to get detailed information</p>
<div id="info-content">
    <div><b>User selected:</b> Marcellin Shrestha</div>
    <div>
        <b>Description: </b>
        <textarea cols="50" rows="5" readonly>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, quia nihil. Est, illum minima libero rerum, nihil distinctio placeat sint nam quae repellendus obcaecati delectus totam non odio. Sint, reprehenderit?
        </textarea>
    </div>
    <div><b>Address:</b> 6480 Nec Ct</div>
    <div><b>City:</b> Dinwiddie</div>
    <div><b>State:</b> NV</div>
    <div><b>Zip:</b> 91295</div>
</div>
</div> */}
       {
          activeRowData && <InfoWrapper info={activeRowData}/>
        }
    </main>
  )
}
