import { ptSerif } from "@/lib/fonts";
import FocusBtn from "./focus-btn";
import ChatBtn from "./chat-btn";

export default function Nav() {
  return (
    <header className="bg flex items-center justify-between border-b-4 bg-background p-4">
      <div className="relative ml-20 flex w-[200px]">
        <div className="absolute bottom-0 left-0 top-0 my-auto ml-[-24px] h-fit">
          <Logo />
        </div>
        <h1 className="pl-2 text-2xl font-bold">
          Fin
          <span className={`${ptSerif.className}`}>
            <span className="text-green-900">T</span>ech
          </span>
        </h1>
      </div>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <FocusBtn />
          </li>
          <li>
            <ChatBtn />
          </li>
        </ul>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="text-green-900"
    >
      <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17" />
      <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      <path d="m2 16 6 6" />
      <circle cx="16" cy="9" r="2.9" />
      <circle cx="6" cy="5" r="3" />
    </svg>
  );
}
