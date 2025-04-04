"use client"
import { useState } from "react"

import ListUser from "@/components/ListUser"
import ModalFormUser from "@/components/ModalFormUser"

export default function Page(){

    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState<any>(null)

    const openModalCreate = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        setUser(null)
    }

    return (
        <>
            <ListUser modalCreate={openModalCreate}/>
            <ModalFormUser isOpen={isOpen} closeModal={closeModal} user={user}/>
        </>
    )
}