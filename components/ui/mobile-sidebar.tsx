"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react"

interface MobileSideBarProps {
  apiLimitCount: number | undefined,
  isPro: boolean,
}

const MobileSidebar = ({ apiLimitCount=0,isPro=false }:MobileSideBarProps) => {

  // for dealing with hydration error that come with this component
  const [isMounted, setIsMounted] = useState(false);
  useEffect(()=>{
    setIsMounted(true);
  },[]);
  if(!isMounted) return null;


  return (
    <Sheet>
      <SheetTrigger>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} isPro={isPro} />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSidebar
