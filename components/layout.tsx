import Header from "./header";

export default function Layout({ children }): JSX.Element {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
