import { Button } from "../components/Button"
import { Plusicon } from "../icons/Plusicon"
import { Shareicon } from "../icons/Shareicon"
import { Card } from "../components/Card"
import { Modal } from "../components/Modal"
import { useState } from "react"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hook/useContent"
import axios from "axios"
import { BACKEND_URL } from "../config"
import copy from "copy-to-clipboard"



function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false) ;
  const contents = useContent() ;


  return (
    
    <div>
       <Sidebar />
        <div className="p-4 ml-72 min-h-screen bg-slate-200 border-2">
      <Modal open={modalOpen} onClose={()=>{
        setModalOpen(false) ;
      }}  />
      <div className="flex justify-end gap-4">
      <Button onClick={()=>{
        setModalOpen(true)
      }} text="Add content" variant="primary" startIcon={<Plusicon />}></Button>
      <Button text="Share Brain" variant="secondary" startIcon={<Shareicon />} onClick={async()=>{
       const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`,{
          share:true
        },{
          headers:{
            "Authorization" : localStorage.getItem("token")
          }
        })
        const shareUrl = `http://localhost:5173/share/${response.data.hash}` ;
        alert(shareUrl) ;
      }}></Button>
      </div>
    


    <div className="flex gap-4 flex-wrap">
    {contents.map(({title,type,link})=> <Card 
      title={title} 
      type={type} 
      link={link} 
    />)}
   
    </div>
     
         </div>
    </div>
  )
}

export default Dashboard
