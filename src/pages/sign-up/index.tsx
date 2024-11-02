import Link from "next/link";
import { useState, FormEvent } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

type SignUpValues = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const [values, setValues] = useState<SignUpValues>({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, password, confirmPassword } = values;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const result = await fetch(`/api/user/${username}/${password}`, {
        method: "POST"
      });

      if (!result.ok) {
        throw new Error("Failed to register");
      }

      toast.success("Registration successful");
      router.push("/sign-in");

    } catch (error) {
      toast.error("An error occurred. Please try again");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-gray-100 text-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8 rounded-2xl p-12 px-20 bg-white shadow-lg">
        <div className="flex items-center justify-center gap-4">
          <h1 className="uppercase text-2xl font-bold text-blue-600">ลงทะเบียน</h1>
        </div>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={values.username}
          onChange={(e) => setValues({ ...values, username: e.target.value })}
          className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
          className="bg-transparent p-4 border border-solid border-slate-500 rounded-md w-full text-base focus:outline-none"
        />
        <button type="submit" className="py-4 px-8 border-none font-bold cursor-pointer rounded-md text-base uppercase bg-blue-600 text-white hover:bg-blue-500">
          ลงทะเบียน
        </button>
        <span className="uppercase">
          มีบัญชีผู้ใช้อยู่แล้ว? <Link className="no-underline font-bold text-blue-600" href="/sign-in">เข้าสู่ระบบ</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}
