"use client"

import { Button } from "@heroui/button"
import { Link } from "@heroui/link"
import { Twitch } from "lucide-react"
import { User } from "@heroui/user";
import { loginLink } from "@/config/site";

// @ts-ignore
export function LoginButton() {
  const handleLogin = () => {
    window.location.href = loginLink;
  }

  return (
    <Button
      isExternal
      as={Link}
      className="text-sm font-normal text-default-600 bg-default-100"
      startContent={<Twitch width={"18px"} />}
      variant="flat"
      onPress={handleLogin}
    >
      Einloggen
    </Button>
  )
}
