import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { BrainCircuit } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogDemo } from "./DialogLinkCreation";
import { DialogProfileLink } from "./DialogProfileLink";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [userInfo, setUserInfo] = useState("");
  const [contents, setContents] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogProfileLink, setOpenDialogProfileLink] = useState(false);
  const navigate = useNavigate();

  const getAllLinks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/content/get-all-links",
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log(response.data.contents);
        setContents(response.data.contents);
      } else {
        alert(response.data.message);
      }
    } catch (e) {
      alert("Some backend error happened " + e);
    }
  };

  const getUserInfo = async () => {
    const response = await axios.get("http://localhost:3000/api/user-info", {
      withCredentials: true,
    });

    console.log(response.data.firstName);

    if (response.status === 404) {
      setUserInfo("Pls login !");
      navigate("/login");
    }

    if (response.status === 200) {
      setUserInfo(response.data.firstName);
    }
  };

  useEffect(() => {
    getAllLinks();
    getUserInfo();
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (e) {
      console.log(e);
      alert("Some backend error happened " + e);
    }
  };

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
            <div className="flex items-center gap-3 text-2xl absolute left-0">
              <BrainCircuit />
              MyBrain
              <DialogProfileLink />
            </div>

            <span
              className="text-2xl font-bold text-purple-600 quirky-font animate-bounce text-center"
              style={{
                fontFamily: "Indie Flower, cursive",
                letterSpacing: "1px",
              }}
            >
              Got a Link, Save it Here!
            </span>
            {userInfo && (
              <div
                className="absolute right-0 top-1 flex items-center gap-3"
                style={{ height: "100%" }}
              >
                <DialogDemo />

                <DropdownMenu>
                  <DropdownMenuTrigger className="text-purple-600 font-semibold text-md tracking-wide px-3 py-[6px] rounded-lg bg-white shadow hover:bg-purple-50 border border-purple-200 transition-all duration-150">{`Hi, ${userInfo}!`}</DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-purple-700 hover:text-purple-700"></DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-purple-700 hover:text-purple-700"
                      onSelect={() => setOpenDialog(true)}
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-purple-700">
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This Action will Logout you, you will have to Login
                        again.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="text-purple-700 bg-white hover:bg-gray-200 hover:text-purple-700">
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="text-purple-700 bg-white hover:bg-gray-200 border-1 border-gray-200"
                        onClick={logoutUser}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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
                    <span className="text-lg font-bold text-purple-700 truncate max-w-[70%]">
                      {item.title}
                    </span>
                    <span className="ml-auto px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700 uppercase">
                      {item.type}
                    </span>
                  </div>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline break-all hover:text-blue-800"
                  >
                    {item.link}
                  </a>
                  {item.description && (
                    <div className="text-black text-sm mt-1 mb-1 line-clamp-3">
                      {item.description}
                    </div>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.tagName.map((tag, idx) => (
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
};

export default Home;
