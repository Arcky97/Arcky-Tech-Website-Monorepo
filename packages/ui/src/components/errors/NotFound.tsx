import ErrorMain from "./ErrorMain";

export function NotFoundComp() {
  return (
    <ErrorMain
      sub="Not found"
      title="This Page was not found"
      description="we searched far and wide but couldn't find what you're looking for..."
    />
  );
}
