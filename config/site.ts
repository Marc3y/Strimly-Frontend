export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Strimly",
  description: "the best utilities for your twitch stream.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "TTS",
      href: "/tts",
    },
    {
      label: "Song-Requests",
      href: "/sr",
    },
    {
      label: "Video-Requests",
      href: "/blog",
    },
    {
      label: "Game-Detection",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Marc3y",
    twitter: "https://twitter.com/marcey____",
    discord: "https://discord.gg/JJaZGMcgyg",
  },
};

export const roles = [
  {key: "user", label: "User"},
  {key: "vip", label: "VIP"},
  {key: "mods", label: "Mods"},
];

export const apiLink = "https://strimlyapi.marcey.xyz";
export const globalLink = "https://strimly.marcey.xyz";
export const loginLink = "https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=012nyl7y9owvlzwadu2qljbg8qp0nr&redirect_uri=https://strimly.marcey.xyz/&scope=channel:manage:redemptions channel:read:redemptions chat:edit chat:read&state=strimly";