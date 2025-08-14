import { ChartColumn, CircleQuestionMark, ClipboardList, Cog, FilePenLine, MonitorCog, SquarePen, UserStar } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Accordion from "./Accordion";

export default function Sidebar() {
  const [accordions, setAccordion] = useState([
        {
            key: 1,
            title: <NavLink to="/orders" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :inactiveStyle }><FilePenLine />Pedidos</NavLink>,
            data: [<NavLink to="/orders" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyleAccordion :inactiveStyleAccordion }><SquarePen />Gerar Pedido</NavLink>],
            isOpen: false
        }])
    const activeStyle = "rounded-md p-2 hover:bg-gray-800  text-orange-300 flex gap-2"
    const activeStyleAccordion = "rounded-md p-2 hover:bg-gray-800  text-orange-300 flex gap-2 bg-black/30"
    const inactiveStyle = "rounded-md p-2 hover:bg-gray-800  hover:text-orange-300 flex gap-2"
    const inactiveStyleAccordion = "rounded-md p-2 flex gap-2 bg-black/30"
    
    const toggleAccordion = (accordionkey: any) => {
    const updatedAccordions = accordions.map((accord) => {
            if (accord.key === accordionkey) {
                return { ...accord, isOpen: !accord.isOpen };
            } else {
                return { ...accord, isOpen: false };
            }
        });

      setAccordion(updatedAccordions);
    };

  return (
    <div className="min-w-54 h-screen bg-gray-900 text-white justify-between flex flex-col">
      <div>
      <h2 className="text-xl text-orange-400 pl-8 font-semibold mb-1 p-5 border-b-5 border-b-gray-800 border-r-5 border-r-gray-800">Company Name</h2>
      <nav className="flex flex-col gap-4 p-4 ">
        <NavLink to="/" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :inactiveStyle }><ChartColumn/>Dashboard</NavLink>
                {accordions.map((accordion) => (
                    <Accordion
                        key={accordion.key}
                        title={accordion.title}
                        data={accordion.data}
                        isOpen={accordion.isOpen}
                        toggleAccordion={() => toggleAccordion(accordion.key)}
                    />
                ))}
        <NavLink to="/parts" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :inactiveStyle }><Cog />Peças & Produtos</NavLink>
        <NavLink to="/customers" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :  inactiveStyle}><UserStar />Clientes</NavLink>
      </nav>
      </div>
      <div id="BottomNav" className="flex flex-col gap-4 p-4 ">
        <NavLink to="/admin" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :  inactiveStyle}><MonitorCog />Administração</NavLink>
        <NavLink to="/about" className={({ isActive, isPending }) =>  isPending ? "pending" : isActive ? activeStyle :  inactiveStyle}><CircleQuestionMark />Mais Informações</NavLink>
      </div>
    </div>
  );
}