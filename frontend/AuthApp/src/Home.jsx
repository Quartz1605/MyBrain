import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect } from "react";
import { useAppStore } from "./store";


export default function Home() {

  const { userInfo, setUserInfo } = useAppStore();

  
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <div className="flex flex-1 items-center justify-center gap-8 relative">
            <div className="flex items-center gap-2 text-2xl absolute left-0">
              <BrainCircuit />
              MyBrain
            </div>
            <span
              className="text-2xl font-bold text-purple-600 quirky-font animate-bounce text-center"
              style={{ fontFamily: 'Indie Flower, cursive', letterSpacing: '1px' }}
            >
              Got a Link, Save it Here!
            </span>
            {userInfo?.firstName && (
              <div className="absolute right-0 flex items-center gap-2">
                <span className="text-purple-600 font-semibold text-lg tracking-wide mr-2">
                  {`Hi, ${userInfo.firstName}!`}
                </span>
              </div>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
          <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
