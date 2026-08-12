// Renders a translation string that may contain inline HTML (<br>, <em>).
export default function RichText({ as: Tag = "span", html, className, ...rest }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} {...rest} />;
}
