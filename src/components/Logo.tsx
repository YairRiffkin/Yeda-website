import { useI18n } from "../i18n/I18nProvider";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "hero";
  showText?: boolean;
  variant?: "dark" | "light";
}

const Logo = ({ size = "md", showText = true, variant = "dark" }: LogoProps) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10",
    lg: "h-60",
    hero: "h-36",
  };
  const { dict } = useI18n();
  const companyName = dict.main.footer.companyName;
  const src = variant === "light" ? "/yeda-logo-light.jpg" : "/yeda-logo-dark.jpg";

  return (
    <div className="flex items-center gap-3">
      <img
        src={src}
        alt={companyName}
        className={`${sizeClasses[size]} w-auto`}
      />
      {showText && (
        <span className="font-semibold text-foreground text-lg tracking-tight">
          {companyName}
        </span>
      )}
    </div>
  );
};

export default Logo;
