import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { Chatbox } from "../components/chatbox";
import { I18nProvider } from "../lib/i18n";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const THEME_INIT = `(function(){try{var t=localStorage.getItem('izg-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <p className="mt-4 text-sm text-muted-foreground">Sayfa bulunamadÄ±.</p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">
          Ana sayfa
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold text-foreground">Bir sorun oluÅŸtu</h1>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Tekrar dene
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ä°zmirGaz â€“ DoÄŸal Gaz UygarlÄ±ÄŸÄ±" },
      { name: "description", content: "Ä°zmirGaz olarak bir milyondan fazla hanenin doÄŸal gaz hizmetini gÃ¼venle, kesintisiz ve sÃ¼rdÃ¼rÃ¼lebilir bir ÅŸekilde saÄŸlÄ±yoruz." },
      { name: "theme-color", content: "#06140F" },
      { property: "og:title", content: "Ä°zmirGaz â€“ DoÄŸal Gaz UygarlÄ±ÄŸÄ±" },
      { name: "twitter:title", content: "Ä°zmirGaz â€“ DoÄŸal Gaz UygarlÄ±ÄŸÄ±" },
      { property: "og:description", content: "Ä°zmirGaz olarak bir milyondan fazla hanenin doÄŸal gaz hizmetini gÃ¼venle, kesintisiz ve sÃ¼rdÃ¼rÃ¼lebilir bir ÅŸekilde saÄŸlÄ±yoruz." },
      { name: "twitter:description", content: "Ä°zmirGaz olarak bir milyondan fazla hanenin doÄŸal gaz hizmetini gÃ¼venle, kesintisiz ve sÃ¼rdÃ¼rÃ¼lebilir bir ÅŸekilde saÄŸlÄ±yoruz." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8cc3483b-c2ae-47ca-95cf-36793f0a198e/id-preview-2f5d55bd--daea3600-97cd-4b13-b7c1-7aa914422170.lovable.app-1782741073447.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8cc3483b-c2ae-47ca-95cf-36793f0a198e/id-preview-2f5d55bd--daea3600-97cd-4b13-b7c1-7aa914422170.lovable.app-1782741073447.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,400..700;1,400..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <Outlet />
        <Chatbox />
      </I18nProvider>
    </QueryClientProvider>
  );
}



