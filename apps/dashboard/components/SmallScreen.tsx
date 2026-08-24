import ErrorMain from "ui/src/components/errors/ErrorMain";

export default function SmallScreenError() {
  return (
    <ErrorMain
      sub="Desktop only"
      title="Dashboard is not supported for mobile"
      description="We're sorry but the Dashboard is not available for Mobile Devices or Devices with a Screen smaller than 1024px in width. Please concider using the Dashboard for a Laptop or PC instead."
    />
  )
}