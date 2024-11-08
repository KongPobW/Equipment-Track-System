import { Home, PlusCircle, LogOut, User, Eye } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Noto_Sans_Thai } from "next/font/google";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const notoSansThai = Noto_Sans_Thai({
    subsets: ["latin"],
});

const items = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "ติดตามอุปกรณ์",
        url: "/track-equip",
        icon: Eye,
    },
    {
        title: "เพิ่มอุปกรณ์",
        url: "/add-equip",
        icon: PlusCircle,
    },
    {
        title: "ออกจากระบบ",
        url: "/",
        icon: LogOut,
    },
];

export function AppSidebar() {

    const { data: session } = useSession();
    const userName = session && session.user && session.user.name ? session.user.name.username : "Guest";

    const router = useRouter()

    const handleLogout = async () => {
        localStorage.clear();
        router.replace("/sign-in");
    };

    return (
        <Sidebar className={`${notoSansThai.className} h-full`}>
            <SidebarContent className="flex flex-col justify-between bg-blue-600 py-4">
                <SidebarGroup className="flex flex-col gap-4">
                    <SidebarGroupLabel className="font-bold text-lg text-white">Equipment Track System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton className="hover:bg-blue-500">
                                        {item.title === "ออกจากระบบ" ? (
                                            <div className="flex items-center p-2 rounded transition duration-150" onClick={handleLogout}>
                                                <item.icon className="mr-3 text-white" />
                                                <span className="text-white">{item.title}</span>
                                            </div>
                                        ) : (
                                            <a href={item.url} className="flex items-center p-2 rounded transition duration-150">
                                                <item.icon className="mr-3 text-white" />
                                                <span className="text-white">{item.title}</span>
                                            </a>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupContent>
                        <div className="flex items-center p-3 bg-blue-500 rounded-md">
                            <User className="text-white" />
                            <span className="ml-2 font-medium text-white">{userName}</span>
                        </div>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}