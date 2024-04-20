import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowBigRight } from "lucide-react";

export default function Home() {


  return (
    <main className=" flex flex-col items-center justify-between pt-40">
      <section className="relative w-full flex flex-col items-center">
        <div className="absolute left-0 top-0 h-96 w-28 md:w-56 z-0 opacity-50 md:opacity-100">
          <Image
            className=" left-0 top-0"
            src="/left.png"
            alt="logo"
            fill={true}
          />
        </div>
        <div className="absolute right-0 top-0 h-96 w-28 opacity-50 md:opacity-100 md:w-56">
          <Image
            className=" right-0 top-0"
            src="/right.png"
            alt="logo"
            fill={true}
          />
        </div>
        <div className="z-10 w-3/4 flex flex-col gap-5 text-center">
          <h1 className="text-5xl">
            Transform Your Classroom Management Experience
          </h1>
          <h3 className="text-gray-500 text-4xl">
            Simplify teaching and learning with <span>cLASSY</span>, the
            all-in-one classroom management solution designed for educators and
            students.
          </h3>
        </div>
        <Button className="my-20 text-2xl px-5 py-6">Get Started
        <ArrowBigRight size={30} className="ml-1" />
        </Button>
      </section>
     
    </main>
  );
}
