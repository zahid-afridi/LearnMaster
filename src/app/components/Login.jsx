import React from "react";
import Sidebar from "./Sidebar";

const Login = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-lg">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full"></div>
              <h1 className="text-3xl font-bold">InnovateU</h1>
            </div>
          </div>

          <div className="bg-background-light dark:bg-subtle-dark/30 border border-border-light dark:border-border-dark rounded-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-center text-text-light/70 dark:text-text-dark/70 mb-8">
              Log in to continue your learning journey.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="form-input w-full rounded-lg border-border-light dark:border-border-dark bg-subtle-light dark:bg-subtle-dark focus:ring-primary focus:border-primary placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Password</label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot Password?
                  </a>
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="form-input w-full rounded-lg border-border-light dark:border-border-dark bg-subtle-light dark:bg-subtle-dark focus:ring-primary focus:border-primary placeholder:text-text-light/50 dark:placeholder:text-text-dark/50"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Login with Email
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
                <span className="flex-shrink mx-4 text-sm text-text-light/50 dark:text-text-dark/50">
                  OR
                </span>
                <div className="flex-grow border-t border-border-light dark:border-border-dark"></div>
              </div>

              <button
                type="button"
                className="w-full bg-subtle-light dark:bg-subtle-dark text-text-light dark:text-text-dark font-bold py-3 px-4 rounded-lg hover:bg-subtle-light/80 dark:hover:bg-subtle-dark/80 transition-colors flex items-center justify-center gap-2"
              >
                <img
                  src="https://www.svgrepo.com/show/355037/google.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Login with Google
              </button>
            </form>

            <p className="text-center text-sm mt-8">
              Don't have an account?{" "}
              <a href="/register" className="font-bold text-primary hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
