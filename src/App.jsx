import { useCallback,useEffect, useState,useRef } from 'react'

//const [variable_name,set_variable]=useState(deafault value)

function App() {
 
  const [length,setLength]=useState(8)
  const [numberAllowed,setnumberAllowed]=useState(false)
  const [charAllowed,setcharAllowed]=useState(false)
  const [password,setPassword]=useState("")
//use ref hook
  let refpassword=useRef(null)

  const passwordGenerator=useCallback(()=>{
    let pass=""
    let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numberAllowed){str+="0123456789"}
    if(charAllowed){str+="@#$%&~!*_-+=[]{}"}

    for(let i=1;i<length;i++)
    {
    let charindex= Math.floor(Math.random()*str.length+1) ;
    pass+=str.charAt(charindex)
  
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])
useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])

 const copypasswordtoclipboard=useCallback(()=>{
  refpassword.current?.select()
//   document.querySelector("button").innerText="copied"
  window.navigator.clipboard.writeText(password)
 },[password])

return (
     
    
          <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-orange-500">
  <h3 className='hover:text-black bg-pink-400 text-white text-center my-3' >PASSWORD GENERATOR</h3>
  <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              className="w-full py-1 px-3 focus:outline-none"
              readOnly
              ref={refpassword}
              value={password}
              placeholder=" password "
            />
            <button onClick={copypasswordtoclipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>

          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" 
              min={6}
              max={100}
              value={length} 
              className='cursor-pointer'
              onChange={(event)=>{setLength(event.target.value)}}/>
              <label >length:{length}</label>
            </div>
            <div  className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={
                ()=>{setnumberAllowed((prev)=>!prev)}
                        }
              />
              <label >numbers</label>
            </div>
            <div  className='flex items-center gap-x-1'>
              <input type="checkbox" 
              defaultChecked={charAllowed}
              id='charInput'
              onChange={
                ()=>{setcharAllowed((prev)=>!prev)}
                        }
              />
              <label >characters</label>
            </div>
            
          </div>
</div>

    
  )
}

export default App

     