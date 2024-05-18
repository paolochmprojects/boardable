import { Button } from "@headlessui/react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      Bordeable project.
      <Button className="rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[hover]:data-[active]:bg-sky-700">Paolo</Button>
    </main>
  );
}
