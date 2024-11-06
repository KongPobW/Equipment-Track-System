import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, FormEvent, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["latin"],
});

export default function SignIn() {

  const [username, setUsername] = useState<string>("admin1");
  const [password, setPassword] = useState<string>("admin1eiei");
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res && res.error) {
        setError("Incorrect username or password");
        setUsername("");
        setPassword("");
        return;
      }

      localStorage.setItem("equip-track-user", JSON.stringify(username));
      router.replace("dashboard");

    } catch (error) {
      toast.error("Error 500");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("equip-track-user")) {
      router.replace("/dashboard");
    }
  }, []);

  return (
    <div className={`${notoSansThai.className} h-screen w-screen flex flex-col justify-center gap-4 items-center bg-gray-100 text-gray-800`}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-2xl p-12 px-20 bg-white shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <h1 className="uppercase text-2xl font-bold text-blue-600">เข้าสู่ระบบ</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
        />
        {error && (
          <div className="text-rose-500 font-bold">{error}</div>
        )}
        <button type="submit" className="py-4 px-8 border-none font-bold cursor-pointer rounded-md text-base uppercase bg-blue-600 text-white hover:bg-blue-500">
          เข้าสู่ระบบ
        </button>
        <span className="uppercase">
          ยังไม่มีบัญชีผู้ใช้? <Link className="no-underline font-bold text-blue-600" href="/sign-up">ลงทะเบียน</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}