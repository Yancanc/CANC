"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export interface ManagedWindow {
  id: string;
  title: string;
  isMinimized: boolean;
}

export interface WindowBounds {
  position: { x: number; y: number };
  size: { width: number; height: number };
}

interface PersistedState {
  windows: ManagedWindow[];
  focusedWindowId: string | null;
  updatedAt: number;
  boundsById?: Record<string, WindowBounds>;
}

interface WindowManagerContextValue {
  windows: ManagedWindow[];
  focusedWindowId: string | null;
  openWindow: (id: string, title?: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  toggleMinimize: (id: string) => void;
  focusWindow: (id: string) => void;
  isMobile: boolean;
  getWindowBounds: (id: string) => WindowBounds | undefined;
  setWindowBounds: (id: string, bounds: WindowBounds) => void;
}

const WindowManagerContext = createContext<
  WindowManagerContextValue | undefined
>(undefined);

const STORAGE_KEY = "wm_state_v1";
const STATE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

export function WindowManagerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [windows, setWindows] = useState<ManagedWindow[]>([]);
  const [focusedWindowId, setFocusedWindowId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [boundsById, setBoundsById] = useState<Record<string, WindowBounds>>(
    {}
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Carregar estado persistido
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: PersistedState = JSON.parse(raw);
        if (Date.now() - parsed.updatedAt < STATE_TTL_MS) {
          const isValidWindow = (w: any): w is ManagedWindow =>
            !!w &&
            typeof w.id === "string" &&
            typeof w.title === "string" &&
            typeof w.isMinimized === "boolean";
          const safeWindows = (parsed.windows || []).filter(isValidWindow);
          setWindows(safeWindows);
          setFocusedWindowId(parsed.focusedWindowId || null);
          if (parsed.boundsById) setBoundsById(parsed.boundsById);
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      } else {
        // Primeiro acesso: abrir "about" por padrão
        setWindows([{ id: "about", title: "Sobre Mim", isMinimized: false }]);
        setFocusedWindowId("about");
      }
    } catch {
      // Ignorar erros de parse
    }
  }, []);

  // Deep-link via query w=projects,skills
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const w = params.get("w");
      if (w) {
        const ids = w
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        ids.forEach((id) => openWindow(id));
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persistir estado
  const persist = useCallback(
    (
      win: ManagedWindow[],
      focus: string | null,
      bounds: Record<string, WindowBounds> = boundsById
    ) => {
      const data: PersistedState = {
        windows: win,
        focusedWindowId: focus,
        updatedAt: Date.now(),
        boundsById: bounds,
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
        // ignore
      }
    },
    [boundsById]
  );

  const focusWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const list = prev.filter(
          (w): w is ManagedWindow => !!w && typeof w.id === "string"
        );
        const exists = list.find((w) => w.id === id);
        if (!exists) return prev;
        const others = list.filter((w) => w.id !== id);
        const next = [...others, { ...exists }];
        persist(next, id);
        return next;
      });
      setFocusedWindowId(id);
    },
    [persist]
  );

  const openWindow = useCallback(
    (id: string, title?: string) => {
      // Restrição mobile para snake-game
      if (id === "snake-game" && window.innerWidth < 768) return;
      setWindows((prev) => {
        const list = prev.filter(
          (w): w is ManagedWindow => !!w && typeof w.id === "string"
        );
        const exists = list.find((w) => w.id === id);
        if (exists) {
          const updated = list.map((w) =>
            w.id === id ? { ...w, isMinimized: false } : w
          );
          persist(updated, id);
          return updated;
        }
        const newWin: ManagedWindow = {
          id,
          title: title || defaultTitleFor(id),
          isMinimized: false,
        };
        const next = [...list, newWin];
        persist(next, id);
        return next;
      });
      setFocusedWindowId(id);
    },
    [persist]
  );

  const closeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const list = prev.filter(
          (w): w is ManagedWindow => !!w && typeof w.id === "string"
        );
        const next = list.filter((w) => w.id !== id);
        const newFocus = next.length ? next[next.length - 1].id : null;
        persist(next, newFocus);
        return next;
      });
      setFocusedWindowId((cur) => (cur === id ? null : cur));
    },
    [persist]
  );

  const minimizeWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const list = prev.filter(
          (w): w is ManagedWindow => !!w && typeof w.id === "string"
        );
        const next = list.map((w) =>
          w.id === id ? { ...w, isMinimized: true } : w
        );
        persist(next, null);
        return next;
      });
      setFocusedWindowId((cur) => (cur === id ? null : cur));
    },
    [persist]
  );

  const restoreWindow = useCallback(
    (id: string) => {
      setWindows((prev) => {
        const list = prev.filter(
          (w): w is ManagedWindow => !!w && typeof w.id === "string"
        );
        const updated = list.map((w) =>
          w.id === id ? { ...w, isMinimized: false } : w
        );
        // mover para frente
        const target = updated.find((w) => w.id === id);
        if (!target) {
          persist(updated, null);
          return updated;
        }
        const others = updated.filter((w) => w.id !== id);
        const next = [...others, target];
        persist(next, id);
        return next;
      });
      setFocusedWindowId(id);
    },
    [persist]
  );

  const toggleMinimize = useCallback(
    (id: string) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      if (win.isMinimized) restoreWindow(id);
      else minimizeWindow(id);
    },
    [windows, minimizeWindow, restoreWindow]
  );

  const value = useMemo<WindowManagerContextValue>(
    () => ({
      windows,
      focusedWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMinimize,
      focusWindow,
      isMobile,
      getWindowBounds: (id: string) => boundsById[id],
      setWindowBounds: (id: string, bounds: WindowBounds) => {
        setBoundsById((prev) => {
          const next = { ...prev, [id]: bounds };
          persist(windows, focusedWindowId, next);
          return next;
        });
      },
    }),
    [
      windows,
      focusedWindowId,
      openWindow,
      closeWindow,
      minimizeWindow,
      restoreWindow,
      toggleMinimize,
      focusWindow,
      isMobile,
      boundsById,
      persist,
    ]
  );

  return (
    <WindowManagerContext.Provider value={value}>
      {children}
    </WindowManagerContext.Provider>
  );
}

export function useWindowManager() {
  const ctx = useContext(WindowManagerContext);
  if (!ctx)
    throw new Error(
      "useWindowManager deve ser usado dentro de WindowManagerProvider"
    );
  return ctx;
}

function defaultTitleFor(id: string): string {
  const map: Record<string, string> = {
    about: "Sobre Mim",
    contact: "Contato",
    skills: "Habilidades",
    portfolio: "Portfólio",
    projects: "Projetos",
    experience: "Experiência",
    webcam: "WebCam",
    "snake-game": "Snake Game",
  };
  return map[id] || id;
}
