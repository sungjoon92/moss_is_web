import React, { useState } from "react";

interface LoginFormProps {
  onLoginSuccess?: () => void;
}

export function LoginForm({ onLoginSuccess }: LoginFormProps): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    setError("");
    localStorage.setItem("adminToken", "dummy-token");
    onLoginSuccess?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-400 via-green-300 to-emerald-300 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-emerald-800 mb-6 text-center">
          moss is 관리자 로그인
        </h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-emerald-700 font-semibold"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 text-emerald-700 font-semibold flex justify-between items-center"
            >
              비밀번호
              <a
                href="/auth/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                비밀번호 찾기
              </a>
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-lg border border-emerald-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-medium text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            로그인
          </button>
        </form>

        {/* <p className="mt-6 text-center text-emerald-700 text-sm">
          계정이 없나요?
          <a href="/auth/sign-up" className="font-semibold hover:underline">
            회원가입
          </a>
        </p> */}
      </div>
    </div>
  );
}
