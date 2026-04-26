export function DocsHeader ({title, children}: {title:string; children?: React.ReactNode;}) {
  return (
    <header className="text-white text-center">
      <h1 className="head1">{title}</h1>
      <div className="[&>p]:text-center [&>p]:text-lg font-normal py-4">{children}</div>
      <hr className="horRule pb-4"/>
    </header>
  )
}