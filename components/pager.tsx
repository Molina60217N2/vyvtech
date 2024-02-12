import classNames from "classnames";

import { usePagination, usePaginationProps } from "hooks/use-pagination";
import { Link } from "./link";

export interface PagerProps extends React.HTMLAttributes<HTMLElement> {
  current: number;
  total: number;
  href: usePaginationProps["href"];
}

export function Pager({ current, total, href, ...props }: PagerProps) {
  const items = usePagination({
    current,
    total,
    href,
  });

  return (
    <nav
      className="pt-10"
      role="navigation"
      aria-labelledby="pagination-heading"
      {...props}
    >
      <h4 className="sr-only">Pagination</h4>
      <ul className="flex items-center justify-center w-auto gap-3">
        {items.map((link, index) => (
          <li key={index}>
            {link.type === "previous" && (
              <Link href={link.href as string}>
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl hover:text-darkBlue">
                  <span className="sr-only">Previous page</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                </div>
              </Link>
            )}
            {link.type === "page" && (
              <Link href={link.href as string} passHref>
                <div
                  className={classNames(
                    "flex items-center justify-center w-12 h-12 font-bold border-2 rounded-xl border-gray-300 bg-white hover:text-darkBlue",
                    {
                      "text-red-600 font-bold border-2 border-darkBlue":
                        link.isCurrent,
                    }
                  )}
                >
                  {link.display}
                </div>
              </Link>
            )}
            {link.type === "next" && (
              <Link href={link.href as string}>
                <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl hover:text-darkBlue">
                  <span className="sr-only">Next page</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
