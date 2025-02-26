import { ReactElement } from "react";

export function SidebarItem({icon,text}:{
    icon:ReactElement,
    text: string
}){
    return <div className="flex text-gray-500 cursor-pointer hover:bg-gray-200 rounded pl-2 max-w-60 transition-all duration-200">
        <div className="p-2">{icon}</div> <div className="p-2">{text}</div>
    </div>

}