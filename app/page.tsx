"use client"
import { Link } from "@heroui/link";
import { title, subtitle } from "@/components/primitives";
import { Navbar } from "@/components/navbar/navbar";
import { Pins } from "@/components/home/pins";
import { useStore } from "@/components/lib/utils";

// @ts-ignore
export default function HomePage(){
  let userData:any = useStore((state) => state.userData);

  return (
    <div className="relative flex flex-col h-screen bg-black">
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        <Home userData={userData} />
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <Link
          isExternal
          className="flex items-center gap-1 text-current"
          href="https://x.com/marcey____"
          title="twitter marcey"
        >
          <span className="text-default-600">powered by</span>
          <p className="text-primary">marcey</p>
        </Link>
      </footer>
    </div>
  );
}


// @ts-ignore
function Home({userData}) {

    return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Take your stream to the next&nbsp;</span>
        <span className={title({ color: "violet" })}>level</span>
        <span className={title()}>.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Powerful. Stream-ready. Wallet-friendly.
        </div>
      </div>

      <Pins />

      {/*<p>Trusted by</p>
      <InfiniteMovingCards items={[{quote: "quotename", name: "name", title: "title"}, {quote: "quotename", name: "name", title: "title"}]} />*/}


    </section>
  );
}

