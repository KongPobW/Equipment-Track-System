// import Image from "next/image";
// import localFont from "next/font/local";
import Link from "next/link";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export default function SignIn() {
  return (
    // <div
    // className={`${geistSans.variable}`}
    // >
    <>
      <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-gray-100 text-gray-800">
        <form action="" className="flex flex-col gap-8 rounded-2xl p-12 px-20 bg-white shadow-lg">
          <div className="flex items-center justify-center gap-4">
            <h1 className="uppercase text-2xl font-bold text-blue-600">เข้าสู่ระบบ</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
          />
          <button type="submit" className="py-4 px-8 border-none font-bold cursor-pointer rounded-md text-base uppercase bg-blue-600 text-white hover:bg-blue-500">
            เข้าสู่ระบบ
          </button>
          <span className="uppercase">
            ยังไม่มีบัญชีผู้ใช้? <Link className="no-underline font-bold text-blue-600" href="/sign-up">ลงทะเบียน</Link>
          </span>
        </form>
      </div>
    </>
  );
}