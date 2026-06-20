import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state?.preserveTemplateScroll) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, [pathname, state]);

  return null;
}
