import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/auth";

export function useAutoLogout(
  timeout = 10 * 60 * 1000, // 10분
  modalTimeout = 10 * 1000 // 10초
) {
  const router = useRouter();
  const timer = useRef<NodeJS.Timeout>();
  const modalTimer = useRef<NodeJS.Timeout>();
  const countdownInterval = useRef<NodeJS.Timeout>();
  const [showAlert, setShowAlert] = useState(false);
  const [modalCountdown, setModalCountdown] = useState(modalTimeout / 1000);

  const doLogout = useCallback(async () => {
    try {
      setShowAlert(false);
      clearTimeout(timer.current);
      clearTimeout(modalTimer.current);
      clearInterval(countdownInterval.current);
      await logout();
      router.replace("/admin/login");
    } catch (err) {
      console.error("로그아웃 실패", err);
    }
  }, [router]);

  const resetModalTimer = useCallback(() => {
    if (modalTimer.current) clearTimeout(modalTimer.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);

    setModalCountdown(modalTimeout / 1000);

    modalTimer.current = setTimeout(() => {
      doLogout();
    }, modalTimeout);

    countdownInterval.current = setInterval(() => {
      setModalCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownInterval.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [modalTimeout, doLogout]);

  // 모달이 뜨면 바로 카운트다운 시작
  useEffect(() => {
    if (showAlert) {
      resetModalTimer();
    }
  }, [showAlert, resetModalTimer]);

  const triggerAlert = useCallback(() => {
    setShowAlert(true);
  }, []);

  const resetMainTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(triggerAlert, timeout);
  }, [timeout, triggerAlert]);

  useEffect(() => {
    const handleActivity = () => {
      if (showAlert) {
        resetModalTimer(); // 모달 상태에서는 모달 타이머만 리셋
      } else {
        resetMainTimer(); // 일반 상태에서는 메인 타이머 리셋
      }
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("click", handleActivity);

    resetMainTimer();

    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("click", handleActivity);
      clearTimeout(timer.current);
      clearTimeout(modalTimer.current);
      clearInterval(countdownInterval.current);
    };
  }, [showAlert, resetMainTimer, resetModalTimer]);

  return { showAlert, setShowAlert, doLogout, resetMainTimer, modalCountdown };
}
