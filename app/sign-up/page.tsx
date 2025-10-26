import Image from "next/image"

import { SignUpForm } from "@/components/signup-form"

export default function SignupPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  let callbackURL = process.env.NEXT_PUBLIC_HOME_URL!;
  const rawCallback = Array.isArray(searchParams?.callbackURL)
    ? searchParams?.callbackURL[0]
    : searchParams?.callbackURL;
  if (rawCallback) {
    callbackURL = rawCallback;
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Image src="/favicon-256x256.png" alt="Logo" width={32} height={32} />
            </div>
            Miners Online.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm callbackURL={callbackURL} />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
