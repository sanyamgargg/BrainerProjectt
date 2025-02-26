import { Button } from "../components/Button"
import { Plusicon } from "../icons/Plusicon"
import { Shareicon } from "../icons/Shareicon"
import { Card } from "../components/Card"
import { Modal } from "../components/Modal"
import { useState } from "react"
import { Sidebar } from "../components/Sidebar"



function Dashboard() {
  const [modalOpen,setModalOpen] = useState(false) ;


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
      <Button text="Share Brain" variant="secondary" startIcon={<Shareicon />}></Button>
      </div>
    


    <div className="flex gap-4">
    <Card title="first tweet" type="twitter" link="https://x.com/Cristiano/status/1893393533576392717?ref_src=twsrc%5Etfw"></Card>
    <Card title="first youtube" type="youtube" link="https://youtu.be/ddAOQwxzq1o?si=uPKznJHFr94tq_Cg"></Card>
    </div>
     
         </div>
    </div>
  )
}

export default Dashboard
