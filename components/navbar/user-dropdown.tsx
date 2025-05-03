"use client"

import { useState } from "react"
import { Button } from "@heroui/button"
import { Link } from "@heroui/link"
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown"

// @ts-ignore
export function UserDropdown({ userData }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await removeCookie("cacheCode")
    setTimeout(() => window.location.reload(), 50)
  }

  const handleProfileClick = () => {
    console.log(userData.profilePictureUrl)
    console.log(JSON.stringify(userData))
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isExternal
          as={Link}
          className="text-sm font-normal text-default-600 bg-default-100"
          endContent={
            <img
              alt="Profile Picture"
              className="rounded-full w-[18px]"
              src={userData.profilePictureUrl || "/placeholder.svg"}
            />
          }
          variant="flat"
          onPress={handleProfileClick}
        >
          {userData.displayName}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" disabledKeys={["settings"]}>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem onPress={handleLogout} key="delete" className="text-danger" color="danger">
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

// Helper function for removing cookies
// @ts-ignore
async function removeCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999;"
}
