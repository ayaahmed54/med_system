"use client"

import React, { useEffect, useState } from 'react'
import {
    Users, UserPlus, Bookmark, LucideUserRoundMinus, ArrowUpRight
} from "lucide-react"
import { Card } from "@/components/ui/card"
import TablePatients from '@/components/tablePatients/tablePatients'
import { useSession } from 'next-auth/react'
import Patients from './_Components/Patients/Patients'

export default function PatientsPage() {



    return <>
        <Patients />
    </>


}


