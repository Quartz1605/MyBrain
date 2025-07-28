import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect,useState } from "react";
import { useAppStore } from "./store";
import axios from "axios";



export default function Home() {

  const { userInfo, setUserInfo } = useAppStore();

  const [contents,setContents] = useState(null);

  const getAllLinks = async() => {

    try{

      const response = await axios.get("http://localhost:3000/api/content/get-all-links",{withCredentials : true})

      

      if(response.status === 200){
        
        console.log(response.data.contents)
        setContents(response.data.contents)
        

      }else{

        alert(response.data.message)
      
      }

    }catch(e){

      alert("Some backend error happened " +  e)
      
    }

  }


  useEffect(() => {
    getAllLinks();
  }, [])

  

  
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
          <div className="grid auto-rows-min gap-6 md:grid-cols-3">
            {Array.isArray(contents) && contents.length > 0 ? (
              contents.map((item) => (
                <div
                  key={item._id}
                  className="rounded-xl shadow-lg bg-white border border-purple-100 p-5 flex flex-col gap-2 hover:shadow-2xl transition-shadow duration-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-purple-700 truncate max-w-[70%]">{item.title}</span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700 uppercase">{item.type}</span>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all hover:text-blue-800"
                  >
                    {item.link}
                  </a>
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={tag + idx}
                          className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 text-lg py-10">
                No links to display yet.
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
