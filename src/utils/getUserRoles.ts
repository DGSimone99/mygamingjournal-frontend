import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  exp: number;
  roles?: any;
}

export function getUserRoles(): string[] {
  const token = localStorage.getItem("token");
  if (!token) return [];

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    const roles = decoded.roles;

    if (Array.isArray(roles)) {
      return roles
        .map((role) =>
          typeof role === "string" ? role : typeof role === "object" && role.authority ? role.authority : ""
        )
        .filter(Boolean);
    }

    if (typeof roles === "string") return [roles];

    return [];
  } catch (e) {
    console.error("Errore nel decoding del token:", e);
    return [];
  }
}

export function isAdmin(): boolean {
  return getUserRoles().includes("ROLE_ADMIN");
}

export function isUser(): boolean {
  return getUserRoles().includes("ROLE_USER");
}

export function isGuest(): boolean {
  return getUserRoles().length === 0;
}
