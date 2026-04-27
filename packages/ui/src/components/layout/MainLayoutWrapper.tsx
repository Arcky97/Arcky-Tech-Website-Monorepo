import { Navbar, NavbarProps } from "../navbar";
import PageVisitTracker from "../PageVisitTracker";

type Props = {
  navbar: NavbarProps;
  children: React.ReactNode
}

export function MainLayoutWrapper({ navbar, children }: Props) {
  return (
    <>
      <PageVisitTracker/>
      <header>
        <Navbar
          variant={navbar?.variant}
          hasSidenav={navbar?.hasSidenav}
          enableShrink={navbar?.enableShrink}
          isSidebarOpen={navbar?.isSidebarOpen}
          onToggleSideNav={navbar?.onToggleSideNav}
          routes={navbar.routes}
        />
      </header>
      {children}
    </>
  );
}