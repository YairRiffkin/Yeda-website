import Logo from "./Logo";
import { useI18n } from "../i18n/I18nProvider";

const Footer = () => {
  const { dict } = useI18n();
  const slogan = dict.main.slogan;
  const ft = dict.main.footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-card py-6 mt-auto">
      <div className="container-main grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center">
        <div className="flex justify-center">
          <Logo size="sm" />
        </div>
        <p className="text-base sm:text-lg font-semibold text-foreground text-center">
          {slogan}
        </p>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {ft.copyright.replace("{year}", String(currentYear))}
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            {ft.builtBy}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
