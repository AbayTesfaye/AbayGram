import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
export default async function Home() {
  await prisma.
  return (
    <div className="m-4">
      <h1>Home page content!</h1>
    </div>
  );
}
