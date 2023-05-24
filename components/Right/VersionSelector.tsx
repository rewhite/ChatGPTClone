"user client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";

export default function VersionSelector() {
  const router = useRouter();
  const [hoverGPTF, setHoverGPTF] = useState(false);
  const [hoverGPTT, setHoverGPTT] = useState(false);

  const params = useSearchParams();
  const isGPTF = params.get("v") == "gpt-4" ? true : false;

  return (
    <div className=" flex w-full flex-col place-items-center justify-center gap-2 p-4 relative">
      <Tabs defaultValue="v3" className="h-[50px] w-[300px]">
        <TabsList className="h-full w-full">
          <TabsTrigger
            className="group h-full w-full gap-1"
            value="v3"
            onClick={() => {
              router.replace("/?v=gpt-3");
            }}
            onMouseEnter={() => {
              setHoverGPTT(true);
            }}
            onMouseLeave={() => {
              setHoverGPTT(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-4 w-4 ${
                !isGPTF ? "fill-teal-400" : "fill-slate-400"
              } group-hover:fill-slate-800 group-focus:fill-teal-400`}
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              />
            </svg>
            <span className="group-hover:text-slate-800">GPT 3.5</span>
          </TabsTrigger>
          <TabsTrigger
            className="group h-full w-full gap-1"
            value="v4"
            onClick={() => {
              router.replace("/?v=gpt-4");
            }}
            onMouseEnter={() => {
              setHoverGPTF(true);
            }}
            onMouseLeave={() => {
              setHoverGPTF(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`h-4 w-4 ${
                isGPTF ? "fill-purple-400" : "fill-slate-400"
              } fill-slate-400 group-hover:fill-slate-800 group-focus:fill-purple-400`}
            >
              <path
                fillRule="evenodd"
                d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z"
                clipRule="evenodd"
              />
            </svg>
            <span className="group-hover:text-slate-800">GPT 4</span>
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="account">
          Make changes to your account here.
          </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
      </Tabs>

      {(hoverGPTF || hoverGPTT) && (
        <Card
          className={`w-[300px] absolute ${
            hoverGPTF ? "-bottom-[127px]" : "-bottom-[103px]"
          }`}
        >
          <CardHeader className="p-5">
            <CardTitle className="text-base">
              {hoverGPTF
                ? "Our most capable model, great for tasks that require creativity and advanced reasoning."
                : "Our fastest model. Great for most every tasks."}
            </CardTitle>
            <CardDescription className="text-xs">
              {hoverGPTF
                ? "Currently not supported."
                : "Available to Free and Plus users"}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
