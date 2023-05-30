import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import * as Icons from "@heroicons/react/outline";

let titles = [
  ["Apple's newest iPhone is here", "Watch our July event"],
  [
    "Nintendo's Newsletter for July",
    "Introducing Strike, a 5-on-5 soccer game",
  ],
  ["Your funds have been processed", "See your latest deposit online"],
  ["This Week in Sports", "The finals are heating up"],
  ["Changelog update", "Edge subroutines and more"],
  ["React Hawaii is here!", "Time for fun in the sun"],
];

export default function EmailComponent() {
  const [messages, setMessages] = useState([...Array(9).keys()]);
  const [selectedMessages, setSelectedMessages] = useState([]);

  // console.log({ selectedMessages });
  // console.log({ messages });
  useEffect(() => {
    // setSelectedMessages([8]);
    let x = setInterval(() => {
      addMessage();
      // setStep((step) => {
      //   return step !== 5 ? step + 1 : 1;
      // });
    }, 1000);
    return () => clearInterval(x);
  }, [addMessage]);

  function toggleMessage(mid) {
    if (selectedMessages.includes(mid)) {
      setSelectedMessages((messages) => messages.filter((id) => id !== mid));
    } else {
      setSelectedMessages((messages) => [mid, ...messages]);
    }
  }

  function addMessage() {
    let newId = (messages.at(-1) || 0) + 1;
    setMessages((messages) => [...messages, newId]);
  }

  function archiveMessages() {
    setMessages((messages) =>
      messages.filter((id) => !selectedMessages.includes(id))
    );
    setSelectedMessages([]);
  }

  return (
    <div className="mx-auto flex max-h-full w-full max-w-3xl flex-1 overflow-hidden rounded-lg bg-white shadow">
      <div className="flex w-[45%] flex-col bg-neutral-50 py-2">
        <div className="border-b px-5">
          <div className="flex justify-between py-2 text-right">
            <button
              onClick={addMessage}
              className="-mx-2 rounded px-2 py-1 text-neutral-400 hover:text-neutral-500 active:bg-neutral-200"
            >
              <Icons.MailIcon className="h-5 w-5 " />
            </button>
            <button
              onClick={archiveMessages}
              className="-mx-2 rounded px-2 py-1 text-neutral-400 hover:text-neutral-500 active:bg-neutral-200"
            >
              <Icons.ArchiveIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <ul className="overflow-y-scroll px-3 pt-2">
          <AnimatePresence initial={false}>
            {[...messages].reverse().map((mid) => (
              <motion.li
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ opacity: { duration: 0.2 } }}
                key={mid}
                className="relative"
              >
                <div className="py-0.5">
                  <button
                    onClick={() => toggleMessage(mid)}
                    className={`${
                      selectedMessages.includes(mid)
                        ? "bg-blue-500"
                        : "hover:bg-neutral-200"
                    } block w-full cursor-pointer truncate rounded py-3 px-3 text-left`}
                  >
                    <p
                      className={`${
                        selectedMessages.includes(mid)
                          ? "text-white"
                          : "text-neutral-500"
                      } truncate text-sm font-medium`}
                    >
                      {titles[mid % titles.length][0]}
                    </p>
                    <p
                      className={`${
                        selectedMessages.includes(mid)
                          ? "text-blue-200"
                          : "text-neutral-400"
                      } truncate text-xs`}
                    >
                      {titles[mid % titles.length][1]}
                    </p>
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>

      <div className="flex-1 overflow-y-scroll border-l px-8 py-8">
        <h1 className="h-8 rounded bg-neutral-100 text-2xl font-bold" />
        <div className="mt-8 space-y-6">
          {[...Array(2).keys()].map((i) => (
            <div key={i} className="space-y-2 text-sm">
              <p className="h-4 w-5/6 rounded bg-neutral-100" />
              <p className="h-4 rounded bg-neutral-100" />
              <p className="h-4 w-4/6 rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
