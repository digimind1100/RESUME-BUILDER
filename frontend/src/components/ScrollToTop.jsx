import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    if (state?.preserveTemplateScroll) {
      return;
    }

    if (hash) {
      const targetId = decodeURIComponent(hash.slice(1));
      let attempts = 0;

      const scrollToHashTarget = () => {
        const target = document.getElementById(targetId);

        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
          return;
        }

        attempts += 1;

        if (attempts < 30) {
          window.setTimeout(scrollToHashTarget, 100);
        }
      };

      scrollToHashTarget();
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, [pathname, hash, state]);

  return null;
}
