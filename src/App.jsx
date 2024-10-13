import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar1 from './Components/Navbar1'
import { v4 as uuidv4 } from 'uuid'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {

  // let idref = useRef(0)
  const [inputdata, setinputdata] = useState('')
  const [workarray, setworkarray] = useState(localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [])
  const [showfinished, setshowfinished] = useState(false)

  useEffect(() => {
    let issomething = localStorage.getItem("todolist")
    if (issomething) {

      let arr = JSON.parse(localStorage.getItem("todolist"))
      setworkarray(arr)
    }

  }, [])

  useEffect(() => {

    savelocal();
    console.log(workarray);


  }, [workarray])



  const savelocal = () => {
    localStorage.setItem("todolist", JSON.stringify(workarray))
  }


  const handleadd = () => {
    // idref.current = idref.current + 1
    // also you can use uuid instead of idref

    setworkarray([...workarray, { todo: inputdata, iscompleted: false, id: uuidv4() }])
    setinputdata('');

  }


  const handledelete = (e) => {

    let currentlistid = e.target.name;
    let index = workarray.findIndex((item) => {
      return item.id == currentlistid

    }
    )
    let newarr = [...workarray]
    //also you can use splice method instead of for loop
    for (let i = index; i < (newarr.length) - 1; i++) {
      newarr[i] = newarr[i + 1];
    }
    newarr.length = newarr.length - 1
    setworkarray(newarr)

  }


  const handleedit = (e, todo) => {

    setinputdata(todo);
    let newarr = workarray.filter((item) => {
      return item.todo !== todo
    }
    )
    setworkarray(newarr);

  }


  const handleinput = (e) => {
    setinputdata(e.target.value)
  }


  const handlecheckbox = (e) => {
    let currentlistid = e.target.name
    let index = workarray.findIndex((item) => {
      return item.id == currentlistid
    })
    //  [...workarray] means we are assigning a copy of workarray to newarr
    // and not directly modifying workarray because component do not re-render
    // if we modify like this 
    let newarr = [...workarray]
    newarr[index].iscompleted = !newarr[index].iscompleted
    setworkarray(newarr)

  }


  const handleshowfinished = () => {
    setshowfinished(!showfinished)
  }



  return (
    <>
      <div className="cont ">
        <Navbar1 />
        <div className="maintodo w-[85vw] xl:w-[50vw] min-h-[70vh] border border-black m-auto my-10 rounded-2xl bg-slate-200 px-5 py-5">

          <div className='flex justify-center'>
            <div className='font-bold text-xl'> i Task - Manage your todos at one place</div>
          </div>

          <h2 className='font-bold my-2'>Add a todo</h2>


          <div className="input flex gap-5">
            <input type="text" value={inputdata} onChange={handleinput} className='w-1/2 rounded-md px-1' />
            <button onClick={handleadd} disabled={inputdata.length < 1} className='border-2 disabled:border-none disabled:bg-purple-500 border-black bg-purple-700 rounded-xl px-2 py-1 text-white font-bold'>Save</button>
          </div>

          <div className="showcomplete flex gap-3 mt-3">

            <input type="checkbox" onChange={handleshowfinished} checked={showfinished} name="" id="" />
            <div>Show finished</div>
          </div>

            <div className="separation w-[46vw] h-[1px] m-3  bg-black"></div>

          <h2 className='font-bold my-2'>Your todos</h2>
          <div className="alllist flex flex-col gap-5  ">


            {workarray.length === 0 && <div>Your todos will be show here.</div>}

            {workarray.map(obj => {
              return (!showfinished || obj.iscompleted) && <div key={obj.id ? obj.id : '-1'} className="list bg-white  p-1 rounded-lg flex justify-between items-center h-fit">

                <div className="inp flex gap-3">
                  <input type="checkbox" checked={obj.iscompleted} onChange={handlecheckbox} name={obj.id} className='cursor-pointer' />
                  <span className={obj.iscompleted ? 'max-w-[35vw] h-fit flex flex-wrap line-through' : ' max-w-[35vw] h-fit flex flex-wrap'}  >{obj.todo ? obj.todo : ' '}</span>
                </div>

                <div className="buttons flex gap-3">

                  <button onClick={(e) => {
                    handleedit(e, obj.todo);
                  }
                  } className='flex gap-1 items-center border border-black bg-purple-700 rounded-xl h-8 px-2 py-1 text-white font-bold'><FaRegEdit /> Edit</button>
                  <button onClick={handledelete} name={obj.id} className='flex gap-1 items-center border border-black bg-purple-700 rounded-xl h-8 px-2 py-1 text-white font-bold'><RiDeleteBin6Line /> Delete</button>
                </div>
              </div>

            }
            )}

          </div>
        </div>
      </div>
    </>
  )
}

export default App
