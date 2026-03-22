import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
}

export function Button({ variant = "primary", children, className = "", onClick, ...props }: ButtonProps) {
  const handleNavClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (props.href?.startsWith("#")) {
      e.preventDefault();
      const targetId = props.href;
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
    if (onClick) onClick(e);
  };

  const baseClass = variant === "primary" ? "btn-primary" : "btn-secondary";
  
  return (
    <a 
      className={`${baseClass} ${className}`} 
      onClick={handleNavClick}
      {...props}
    >
      {children}
    </a>
  );
}
