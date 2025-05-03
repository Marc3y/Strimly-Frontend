"use client"
import { Navbar } from "@/components/navbar/navbar";
import { Link } from "@heroui/link";
import TTSContent from "@/components/app/tts/TTSContent";
import { useStore } from "@/components/lib/utils";

// @ts-ignore
export default function TTS(){

  let userData:any = useStore((state) => state.userData);

    return (
      <>
          <Navbar />
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow text-center">
              <TTSContent />
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
      </>
    )
}
