import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/auth-store";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Logo from "../../../public/images/CodeCraftedLogo.png";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex gap-2">
          <Image src={Logo} alt="logo" width={30} />
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">
              CodeCrafted
            </span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium ${
              pathname === "/"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}>
            Home
          </Link>

          <Link
            href="/courses"
            className={`text-sm font-medium ${
              pathname === "/courses"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            }`}>
            Courses
          </Link>

          {!user ? (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              {user.role === "teacher" ? (
                <Link
                  href="/dashboard/teacher/dashboard"
                  className={`text-sm font-medium ${
                    pathname?.includes("/teacher")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}>
                  Teacher Dashboard
                </Link>
              ) : (
                <Link
                  href="/dashboard/student/dashboard"
                  className={`text-sm font-medium ${
                    pathname?.includes("/student")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}>
                  My Dashboard
                </Link>
              )}

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </>
          )}
        </nav>

        {/* Mobile navigation button */}
        <button className="block md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6 text-gray-700">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
