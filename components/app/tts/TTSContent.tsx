"use client"
import { subtitle, title } from "@/components/primitives";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import {
  Check,
  CircleAlert,
  CircleHelp, CircleX,
  ClipboardCheck,
  Copy,
  Paintbrush,
  PartyPopper,
  SquareChevronRight,
  X
} from "lucide-react";
import { globalLink, roles } from "@/config/site";
import { Button } from "@heroui/button";
import { useEffect, useRef, useState } from "react";
import { Tab, Tabs } from "@heroui/tabs";
import { Switch } from "@heroui/switch";
import { Select, SelectItem } from "@heroui/select";
import { NumberInput } from "@heroui/number-input";
import { SharedSelection } from "@heroui/system";
import { useStore } from "@/components/lib/utils";
import { Spinner } from "@heroui/spinner";

interface ChangedVal {
  key:string,
  val:any
}

// @ts-ignore
export default function TTSContent() {

  let userData:any = useStore((state) => state.userData);

  const [rewardCreatedText, setRewardCreatedText] = useState("A error occurred");
  const [rewardClicked, setRewardClicked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isCopied, setCopied] = useState(false);
  const [isCreated, setCreated] = useState(false);

  const [ttsCmdEnabled, setTTSCmdEnabled] = useState(false);
  const [ttsCmdRoles, setTTSCmdRoles] = useState(new Set([]));
  const [ttsCmdCooldown, setTTSCmdCooldown] = useState(0);
  const [ttsCmdAlias, setTTSCmdAlias] = useState<string[]>([]);

  const [ttsRewardEnabled, setTTSRewardEnabled] = useState(false);
  const [ttsRewardRoles, setTTSRewardRoles] = useState(new Set([]));
  const [ttsRewardId, setTTSRewardId] = useState(false);


  let overlayInputRef:any = useRef(null);
  let commandInputRef:any = useRef(null);
  let cmdRolesRef:any = useRef(null);
  let rewardRolesRef:any = useRef(null);

  const loadData = async () => {
    let response = await fetch("https://strimlyapi.marcey.xyz/tts/get?cacheCode=" + userData.cacheCode);

    if(!response.ok) return;
    let data = await response.json();
    setTTSCmdEnabled(data.ttsCmdEnabled);
    setTTSCmdRoles(data.ttsCmdRoles);
    setTTSCmdCooldown(data.ttsCmdCooldown);
    setTTSCmdAlias(data.ttsCmdAlias);
    setTTSRewardEnabled(data.ttsRewardEnabled);
    setTTSRewardRoles(data.ttsRewardRoles);
    setTTSRewardId(data.ttsRewardId);

    setLoaded(true);
  }

  const updateData = async (changedVal?:ChangedVal) => {
    let body:any = {
      cacheCode: userData.cacheCode,
      ttsCmdEnabled,
      ttsCmdRoles,
      ttsCmdCooldown,
      ttsCmdAlias,
      ttsRewardEnabled,
      ttsRewardRoles,
      ttsRewardId
    }
    if(changedVal){
      body[changedVal.key] = changedVal.val;
    }

    await fetch("https://strimlyapi.marcey.xyz/tts/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  useEffect(() => {
    if(!userData?.overlayId) return;
    if(loaded) return;
    loadData();
  }, [userData?.overlayId]);

  return (
    <div className={"justify-center items-center flex flex-col"}>
      <div className={"animate-fade-up animate-duration-1000 animate-ease-in-out animate-once justify-center items-center flex flex-col"}>
        <h1 className={title()}>Text-To-Speech</h1>
        <div className={subtitle({ class: "mt-4 max-w-lg" })}>
          Viewers can make text-to-speech messages using commands or channel point rewards.
        </div>
      </div>

      {
        !loaded ? <></>
          :
          <div className={"animate-fade-up animate-duration-1000 animate-ease-in-out animate-once justify-center items-center flex flex-col"}>
            <div className={"flex flex-col mt-[20px] w-[450px]"}>
              <Popover placement={"right"}>
                <PopoverTrigger>
                  <div className={"flex items-center justify-end cursor-pointer"}>
                    <div className="text-[13px]">How it works</div>
                    <CircleHelp className={"outline-none w-[16px] ml-[5px]"} />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="px-1 py-2">
                    <div className="text-tiny">1. Create a new browser source in OBS</div>
                    <div className="text-tiny">2. Paste the link below</div>
                    <div className="text-tiny">3. Enable "Shutdown source when not visible"</div>
                    <div className="text-tiny">4. Adjust the size as needed</div>
                  </div>
                </PopoverContent>
              </Popover>
              <div className={"flex gap-[6px]"}>
                <input ref={overlayInputRef} className={"flex-grow bg-[#39393F] pl-[10px] pr-[10px] rounded-[12px]"} type={"text"} value={globalLink + "/overlay/tts?id=" + (userData !== undefined ? userData.overlayId : "notloadedyet")} />
                <Button onPress={() => {
                  navigator.clipboard.writeText(overlayInputRef.current.value);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 5000);
                }} className={"rounded-[12px]"}>
                  {!isCopied ? <Copy className={""} size={"18px"} /> : <ClipboardCheck className={"animate-jump animate-ease-in-out animate-duration-500"} size={"18px"} />}
                </Button>
              </div>
            </div>

            <div className={"mt-[20px]"}>
              <Tabs color={"primary"} size={"lg"} aria-label="Options" placement={"top"} disabledKeys={["settings"]}>
                <Tab title={
                  <div className={"flex items-center space-x-2"}>
                    <SquareChevronRight />
                    <span>Commands</span>
                  </div>
                } key="commands">
                  <div className={"w-[600px] min-h-[400px] border-[1px] border-[rgba(255,255,255,0.05)] bg-[#27272A] rounded-[14px] pl-[20px] pr-[20px] pt-[20px] mt-[12px] flex flex-col"}>

                    {
                      !loaded ?
                        <div className={"flex w-full h-[360px] justify-center items-center"}>
                          <Spinner classNames={{label: "text-foreground mt-4"}} size={"lg"} color={"default"} variant="dots" />
                        </div>
                        :
                        <div className={""}>
                          <div className={"border-[2px] border-[#3F3F46] flex rounded-[14px] w-full h-[50px]"}>
                            <div className={"flex-grow flex flex-col h-full items-start justify-center gap-[4px] pl-[10px] pr-[10px]"}>
                              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>Enabled</p>
                              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Enables TTS via commands</p>
                            </div>
                            <div className={"flex w-[70px] justify-center items-center"}>
                              <Switch isSelected={ttsCmdEnabled} onValueChange={async (e) => {
                                setTTSCmdEnabled(e);
                                await updateData({key: "ttsCmdEnabled", val: e});
                              }}>
                              </Switch>
                            </div>
                          </div>

                          <Select
                            className="w-full mt-[12px] border-[2px] border-[#3F3F46] rounded-[14px]"
                            label="Allowed roles"
                            placeholder="Select roles"
                            selectionMode="multiple"
                            selectedKeys={ttsCmdRoles}
                            ref={cmdRolesRef}
                            onSelectionChange={async (keys:any) => {
                              setTTSCmdRoles(keys);
                              let arr:string[] = []
                              if(keys === "all") {
                                roles.map(role => {
                                  arr.push(role.key);
                                });
                              } else {
                                // @ts-ignore
                                arr = Array.from(keys);
                              }
                              await updateData({key: "ttsCmdRoles", val: arr});
                            }}
                          >
                            {roles.map((role) => (
                              <SelectItem key={role.key}>{role.label}</SelectItem>
                            ))}
                          </Select>

                          <NumberInput
                            className={"mt-[12px] border-[2px] border-[#3F3F46] rounded-[14px]"}
                            key={"placement"}
                            label="Cooldown"
                            labelPlacement={"inside"}
                            placeholder="Enter the time in seconds"
                            value={ttsCmdCooldown}
                            onValueChange={async (num) => {
                              setTTSCmdCooldown(num);
                              await updateData({key: "ttsCmdCooldown", val: num});
                            }}
                          />

                          <div className={"w-full min-h-[70px] h-auto border-[2px] border-[#3F3F46] rounded-[14px] mt-[12px] flex flex-col justify-end"}>
                            <div className={"flex-grow w-full h-auto flex pl-[10px] pr-[10px] pt-[5px] gap-[5px] flex-wrap"}>
                              {ttsCmdAlias.map((cmd, index) => (
                                <div key={index} onClick={async (e) => {
                                  const text = (e.currentTarget.querySelector("p") as HTMLElement)?.innerText;
                                  const newArr = ttsCmdAlias.filter(item => item !== text);
                                  setTTSCmdAlias(newArr);
                                  await updateData({key: "ttsCmdAlias", val: newArr});
                                }} className={"text-[14px] border-[1px] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] cursor-pointer flex rounded-[16px] pl-[5px] pr-[5px] justify-center items-center"}>
                                  <p className={"leading-none"}>{cmd}</p>
                                  <div className={"ml-[3px] leading-none"}><X size={"15px"} color={"#f54257"} /></div>
                                </div>
                              ))}

                            </div>
                            <input onKeyUp={async (e) => {
                              if(e.key === "Enter" && commandInputRef.current.value !== "") {
                                const text = commandInputRef.current.value;
                                let arr = ttsCmdAlias;
                                arr.push(text);
                                setTTSCmdAlias(prev => [...prev, text]);
                                commandInputRef.current.value = "";
                                await updateData({key: "ttsCmdAlias", val: arr});
                              }
                            }} ref={commandInputRef} className={"bg-[#27272A] pl-[10px] pr-[10px] pb-[10px] pt-[5px] outline-none rounded-b-[16px]"} placeholder="Enter a command" type="email" />
                          </div>
                          <div className={"flex justify-center items-center w-full gap-[12px] mt-[12px]"}>
                            <textarea className={"border-[2px] bg-transparent border-[#3F3F46] rounded-[14px] flex-grow h-[70px] outline-none resize-none p-[10px]"}  placeholder={"Write a sample text"} />
                            <Button className={"h-[70px] bg-[#27272A] border-[2px] border-[#3F3F46] rounded-[14px]"}>Send</Button>
                          </div>
                        </div>
                    }
                  </div>
                </Tab>
                <Tab title={
                  <div className={"flex items-center space-x-2"}>
                    <PartyPopper />
                    <span>Channel Rewards</span>
                  </div>
                } key="channelrewards">

                  <div className={"w-[600px] min-h-[400px] border-[1px] border-[rgba(255,255,255,0.05)] bg-[#27272A] rounded-[14px] pl-[20px] pr-[20px] pt-[20px] mt-[12px] flex flex-col"}>

                    {
                      !loaded ?
                        <div className={"flex w-full h-[360px] justify-center items-center"}>
                          <Spinner classNames={{label: "text-foreground mt-4"}} size={"lg"} color={"default"} variant="dots" />
                        </div>
                        :
                        <div className={""}>
                          <div className={"border-[2px] border-[#3F3F46] flex rounded-[14px] w-full h-[50px]"}>
                            <div className={"flex-grow flex flex-col h-full items-start justify-center gap-[4px] pl-[10px] pr-[10px]"}>
                              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>Enabled</p>
                              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Enables TTS via channel rewards</p>
                            </div>
                            <div className={"flex w-[70px] justify-center items-center"}>
                              <Switch isSelected={ttsRewardEnabled} onValueChange={async (e) => {
                                setTTSRewardEnabled(e);
                                await updateData({key: "ttsRewardEnabled", val: e});
                              }}>
                              </Switch>
                            </div>
                          </div>

                          <Select
                            ref={rewardRolesRef}
                            className="w-full mt-[12px] border-[2px] border-[#3F3F46] rounded-[14px] "
                            label="Allowed roles"
                            placeholder="Select roles"
                            selectionMode="multiple"
                            selectedKeys={ttsRewardRoles}
                            onSelectionChange={async (keys:any) => {
                              setTTSRewardRoles(keys);
                              let arr:string[] = []
                              if(keys === "all") {
                                roles.map(role => {
                                  arr.push(role.key);
                                });
                              } else {
                                // @ts-ignore
                                arr = Array.from(keys);
                              }
                              await updateData({key: "ttsRewardRoles", val: arr});
                            }}
                          >
                            {roles.map((role) => (
                              <SelectItem key={role.key}>{role.label}</SelectItem>
                            ))}
                          </Select>

                          <Button
                            onPress={() => {
                              if(rewardClicked) return;
                              setRewardClicked(true);
                              let body = {
                                cacheCode: userData.cacheCode,
                              }
                              fetch("https://strimlyapi.marcey.xyz/twitch/reward/create", {
                                method: "POST",
                                headers: {
                                  "Content-Type": "application/json",
                                },
                                body: JSON.stringify(body)
                              })
                                .then(res => {
                                  if(!res.ok) {
                                    setRewardCreatedText("You don't have the affiliate status");
                                    setCreated(true);
                                    return;
                                  }
                                  if(res.status === 201) {
                                    setRewardCreatedText("Channel reward created");
                                  } else if(res.status === 203){
                                    setRewardCreatedText("Channel reward already exists");
                                  } else if(res.status === 209 || res.status === 403) {
                                    setRewardCreatedText("You don't have the affiliate status");
                                  } else setRewardCreatedText("A error occurred");
                                  setCreated(true);
                                })
                            }}
                            className={"w-full mt-[12px] h-[55.5px] bg-[#27272A] border-[2px] border-[#3F3F46] rounded-[14px] hover:bg-[rgba(255,255,255,0.02)] transition-colors"}>
                            {

                              (!rewardClicked ) ?
                                <div className={"flex gap-[12px] justify-center items-center text-center"}>
                                  <p className={"leading-none"}>Create channel reward</p>
                                </div> : (rewardClicked && !isCreated) ?
                                <div className={"flex gap-[12px] justify-center items-center text-center"}>
                                  <Spinner variant={"gradient"} color={"default"} size={"md"} />
                                </div> : (isCreated && rewardCreatedText.includes("created")) ?
                                  <div className={"flex gap-[12px] justify-center items-center text-center"}>
                                    <Check className={"leading-none"} size={"25px"}/>
                                    <p className={"leading-none"}>{rewardCreatedText}</p>
                                  </div> : (isCreated && rewardCreatedText.includes("already")) ?
                                    <div className={"flex gap-[12px] justify-center items-center text-center"}>
                                      <CircleAlert className={"leading-none"} size={"25px"}/>
                                      <p className={"leading-none"}>{rewardCreatedText}</p>
                                    </div> : (isCreated && rewardCreatedText.includes("affiliate")) ?
                                        <div className={"flex gap-[12px] justify-center items-center text-center"}>
                                          <CircleX className={"leading-none"} size={"25px"}/>
                                          <p className={"leading-none"}>{rewardCreatedText}</p>
                                        </div>
                                        : <></>
                            }
                          </Button>

                          <div className={"flex justify-center items-center w-full gap-[12px] mt-[12px] "}>
                            <textarea className={"bg-[#27272A] flex-grow h-[130px] outline-none resize-none p-[10px] border-[2px] border-[#3F3F46] rounded-[14px] "}  placeholder={"Write a sample text"} />
                            <Button className={"h-[130px] bg-[#27272A] border-[2px] border-[#3F3F46] rounded-[14px] "}>Send</Button>
                          </div>
                        </div>
                    }

                  </div>

                </Tab>
                <Tab title={
                  <div className={"flex items-center space-x-2"}>
                    <Paintbrush />
                    <span>Overlay Settings</span>
                  </div>
                } key={"settings"}>
                  <p>3</p>
                </Tab>
              </Tabs>
            </div>
          </div>
      }

    </div>
  );
}

/*

<div className={"flex gap-[12px] mt-[30px]"}>
        <div className={"w-[400px] h-[450px] border-[1px] border-[#131313] rounded-[16px] flex flex-col items-start pt-[30px] pl-[30px] pr-[30px] pb-[30px]"}>
          <p className={"text-[#E5E9ED] text-[22px] font-semibold leading-none"}>Commands</p>

          <div className={"border-[1px] border-[#131313] bg-[#27272A] flex rounded-[14px] w-full h-[50px] mt-[12px]"}>
            <div className={"flex-grow flex flex-col h-full items-start justify-center gap-[4px] pl-[10px] pr-[10px]"}>
              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>Enabled</p>
              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Enables TTS via commands</p>
            </div>
            <div className={"flex w-[70px] justify-center items-center"}>
              <Switch isSelected={isCommandsEnabled} onValueChange={setCommandsEnabled}>
              </Switch>
            </div>
          </div>

          <Select
            className="w-full mt-[12px]"
            label="Allowed roles"
            placeholder="Select roles"
            selectionMode="multiple"
          >
            {roles.map((role) => (
              <SelectItem key={role.key}>{role.label}</SelectItem>
            ))}
          </Select>

          <NumberInput
            className={"mt-[12px]"}
            key={"placement"}
            label="Cooldown"
            labelPlacement={"inside"}
            placeholder="Enter the time in seconds"
          />

          <div className={"w-full min-h-[70px] h-auto rounded-[16px] bg-[#27272A] mt-[12px] flex flex-col justify-end"}>
            <div className={"flex-grow w-full h-auto flex pl-[10px] pr-[10px] pt-[5px] gap-[5px] flex-wrap"}>
              {commands.map((cmd, index) => (
                <div key={index} onClick={(e) => {
                  const text = (e.currentTarget.querySelector("p") as HTMLElement)?.innerText;
                  const newArr = commands.filter(item => item !== text);
                  setCommands(newArr);
                }} className={"text-[14px] border-[1px] border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)] cursor-pointer flex rounded-[16px] pl-[5px] pr-[5px] justify-center items-center"}>
                  <p className={"leading-none"}>{cmd}</p>
                  <div className={"ml-[3px] leading-none"}><X size={"15px"} color={"#f54257"} /></div>
                </div>
              ))}

            </div>
            <input onKeyUp={(e) => {
              if(e.key === "Enter" && commandInputRef.current.value !== "") {
                const text = commandInputRef.current.value;
                setCommands(prev => [...prev, text]);
                commandInputRef.current.value = "";
              }
            }} ref={commandInputRef} className={"bg-[#27272A] pl-[10px] pr-[10px] pb-[10px] pt-[5px] outline-none rounded-b-[16px]"} placeholder="Enter a command" type="email" />
          </div>
          <div className={"flex justify-center items-center w-full gap-[12px] mt-[12px] "}>
            <textarea className={"bg-[#27272A] flex-grow rounded-[16px] h-[50px] outline-none resize-none p-[10px]"}  placeholder={"Write a sample text"} />
            <Button className={"h-[50px] bg-[#27272A]"}>Send</Button>
          </div>
        </div>
        <div className={"w-[400px] h-[450px] border-[1px] border-[#131313] rounded-[16px] flex flex-col items-start pt-[30px] pl-[30px] pr-[30px] pb-[30px]"}>
          <p className={"text-[#E5E9ED] text-[22px] font-semibold leading-none"}>Channel rewards</p>

          <div className={"border-[1px] border-[#131313] bg-[#27272A] flex rounded-[14px] w-full h-[50px] mt-[12px]"}>
            <div className={"flex-grow flex flex-col h-full items-start justify-center gap-[4px] pl-[10px] pr-[10px]"}>
              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>Enabled</p>
              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Enables TTS via channel rewards</p>
            </div>
            <div className={"flex w-[70px] justify-center items-center"}>
              <Switch isSelected={isChannelpointsEnabled} onValueChange={setChannelpointsEnabled}>
              </Switch>
            </div>
          </div>

          <Select
            className="w-full mt-[12px]"
            label="Allowed roles"
            placeholder="Select roles"
            selectionMode="multiple"
          >
            {roles.map((role) => (
              <SelectItem key={role.key}>{role.label}</SelectItem>
            ))}
          </Select>

          <Button
            onPress={() => {
              if(isCreated) return;
              //TODO: create channelreward
              setCreated(true);
            }}
            className={"w-full mt-[12px] h-[55.5px] bg-[#27272A]"}>
            {
              !isCreated ? (channelpointId ? "Create a new channel reward" : "Create channel reward")
                :
                <div className={"animate-jump animate-ease-in-out animate-duration-500 flex gap-[12px] justify-center items-center text-center"}>
                  <Check className={"leading-none"} size={"25px"}/>
                  <p className={"leading-none"}>Channel reward created</p>
                </div>
            }
          </Button>

          <div className={"flex justify-center items-center w-full gap-[12px] mt-[12px] "}>
            <textarea className={"bg-[#27272A] flex-grow rounded-[16px] h-[130px] outline-none resize-none p-[10px]"}  placeholder={"Write a sample text"} />
            <Button className={"h-[130px] bg-[#27272A]"}>Send</Button>
          </div>
        </div>

        <div className={"w-[400px] h-[450px] border-[1px] border-[#131313] rounded-[16px] flex flex-col items-start pt-[30px] pl-[30px] pr-[30px] pb-[30px]"}>
          <p className={"text-[#E5E9ED] text-[22px] font-semibold leading-none"}>Overlay-Settings</p>

          <Input label={"Username layout"} placeholder={"TTS from {user}"} className={"mt-[12px]"} defaultValue={"TTS from {user}"} />
          <Input label={"Text layout"} placeholder={"This is the text: {text}"} className={"mt-[12px]"} defaultValue={"{text}"} />

          <div className={"bg-[#27272A] w-full h-[50px] rounded-[16px] mt-[12px] flex items-center pl-[10px] pr-[10px] justify-start"}>
            <div className={"flex-grow flex flex-col items-start gap-[3px]"}>
              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>User color</p>
              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Set the color of the text with the username</p>
            </div>
            <input className={"w-[45px] h-[35px] rounded-[4px]"} type="color" id="favcolor" defaultValue="#A32BF3"/>
          </div>

          <div className={"bg-[#27272A] w-full h-[50px] rounded-[16px] mt-[12px] flex items-center pl-[10px] pr-[10px] justify-start"}>
            <div className={"flex-grow flex flex-col items-start gap-[3px]"}>
              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>Text color</p>
              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Set the color of the user's text</p>
            </div>
            <input className={"w-[45px] h-[35px] rounded-[4px]"} type="color" id="favcolor" defaultValue="#ffffff"/>
          </div>

          <div className={"border-[1px] border-[#131313] bg-[#27272A] flex rounded-[14px] w-full h-[50px] mt-[12px]"}>
            <div className={"flex-grow flex flex-col h-full items-start justify-center gap-[4px] pl-[10px] pr-[10px]"}>
              <p className={"text-[14px] text-[rgba(255,255,255,0.7)] leading-none"}>Shadow</p>
              <p className={"text-[12px] text-[rgba(255,255,255,0.5)] leading-none"}>Enables shadow on the text</p>
            </div>
            <div className={"flex w-[70px] justify-center items-center"}>
              <Switch isSelected={isOverlayShadow} onValueChange={setOverlayShadow}>
              </Switch>
            </div>
          </div>

        </div>

 */