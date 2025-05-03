"use client"
import NextLink from "next/link"
import clsx from "clsx"
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar"
import { Input } from "@heroui/input"
import { Kbd } from "@heroui/kbd"
import { Link } from "@heroui/link"
import { link as linkStyles } from "@heroui/theme"

import { apiLink, siteConfig } from "@/config/site";
import { TwitterIcon, GithubIcon, DiscordIcon, SearchIcon, Logo } from "@/components/icons"
import { LoginButton } from "./login-button"
import { UserDropdown } from "./user-dropdown"
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useStore } from "@/components/lib/utils";
import { Button } from "@heroui/button";
import { Twitch } from "lucide-react";
import { Spinner } from "@heroui/spinner";

// @ts-ignore
export const Navbar = ({}) => {
  const [cookies, setCookie, removeCookie] = useCookies(['cacheCode']);
  let userData:any = useStore((state) => state.userData);
  let setUserData = useStore((state) => state.setUserData);
  const [loaded, setLoaded] = useState(false);

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={<SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />}
      type="search"
    />
  )

  const loadData = async () => {
    let params = new URLSearchParams(window.location.search);
    if (!cookies.cacheCode && !params.has("code")) {
      return undefined;
    }
    if(params.has("code")){
      console.log("has code");
      let response = await fetch(apiLink + "/account/register?code=" + params.get("code"));
      console.log("response: " + response);
      if(!response.ok) return undefined;
      let data = await response.json();
      setCookie("cacheCode", data.cacheCode);
      window.history.pushState(null, '', '/');
      return data;
    }
    const cacheCode = cookies.cacheCode;
    let response = await fetch(
      apiLink + "/account/login?cacheCode=" + cacheCode, {
      });
    if (!response.ok) return undefined;
    return await response.json();
  }

  const loadAsync = async () => {
    if(userData !== undefined){
      setLoaded(true);
    }
    let data = await loadData();
    setUserData(data);
    setLoaded(true);
  }

  useEffect(() => {
    loadAsync();
  }, []);



  return (
    <div>
      <HeroUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
          <NavbarBrand as="li" className="gap-3 max-w-fit">
            <NextLink className="flex justify-start items-center gap-1" href="/">
              <Logo />
              <p className="font-bold text-inherit">STRIMLY</p>
            </NextLink>
          </NavbarBrand>
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>


        <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
          <NavbarItem className="hidden sm:flex gap-2">
            <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
              <TwitterIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Discord" href={siteConfig.links.discord}>
              <DiscordIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="Github" href={siteConfig.links.github}>
              <GithubIcon className="text-default-500" />
            </Link>
            {/*<ThemeSwitch />*/}
          </NavbarItem>

          {/* Login-/Profile Button */}
          {!loaded ?
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-default-600 bg-default-100 min-w-[120px] flex justify-center items-center"
              variant="flat"
            >
              <Spinner variant={"default"} color={"default"} size={"sm"}/>
            </Button>
            :
            <NavbarItem className="hidden md:flex">
              {userData ? <UserDropdown userData={userData} /> : <LoginButton />}
            </NavbarItem>
          }
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          <NavbarMenuToggle />
        </NavbarContent>

        <NavbarMenu>
          {searchInput}
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link color={"foreground"} href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </HeroUINavbar>
    </div>

  )
}
