import { Navbar, NavbarProps } from "../navbar";

type Props = {
  navbar?: NavbarProps;
  children: React.ReactNode
}

export function MainLayoutWrapper({ navbar, children }: Props) {
  return (
    <>
      <header>
        <Navbar
          variant={navbar?.variant}
          mainRef={navbar?.mainRef}
          hasSidenav={navbar?.hasSidenav}
          enableShrink={navbar?.enableShrink}
          isSidebarOpen={navbar?.isSidebarOpen}
          onToggleSideNav={navbar?.onToggleSideNav}
        />
      </header>
      {children}
    </>
  );
}