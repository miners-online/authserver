import Link from "next/link"
import Image from "next/image"
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 rounded flex items-center justify-center">
            <Image src="/favicon-256x256.png" alt="" width={32} height={32}></Image>
          </div>
          <span className="font-bold text-xl">Miners Online</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="ml-auto gap-6 mr-6">
          <Link href={"https://minersonline.uk"} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            Home
          </Link>
        </nav>
        
        <UserButton variant="outline"/>
      </div>
    </header>
  )
}
