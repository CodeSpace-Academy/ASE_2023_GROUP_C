/**
 * Layout component that provides a common structure for pages.
 * @param {Object} props - Component properties.
 * @param {ReactNode} props.children - The content to be displayed within the layout.
 */
export default function Layout(props) {
  const { children } = props;
  return (
    <div>
      <div className="search-bar-container items-center mb-4" />
      {/* Render the content passed as children */}
      {children}
    </div>
  );
}
