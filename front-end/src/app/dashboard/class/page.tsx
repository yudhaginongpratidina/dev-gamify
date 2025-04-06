"use client"
import { useState } from "react"
import ListClass from "@/components/ListClass"
import ModalFormClass from "@/components/ModalFormClass"

export default function Page(){

    const [isOpen, setIsOpen] = useState(false)
    const [data, setData]= useState<any>(null)

    const openModalCreate = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setData(null)
    }

    return (
        <>
            <ListClass modalCreate={openModalCreate}/>
            <ModalFormClass isOpen={isOpen} closeModal={closeModal} data={data}/>
        </>
    )
}