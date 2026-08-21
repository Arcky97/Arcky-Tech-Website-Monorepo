import ErrorMain from "./ErrorMain";

export function UnderConstruction() {
  return (
    <ErrorMain
      sub="Under Construction"
      title="This Page is under construction"
      description="We are working hard to get this page finished as soon as possible. Please come back later!"
    />
  );
}