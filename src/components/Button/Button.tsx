import './Button.css'


function Button(props: { iconURL?: string | undefined,
  text?: string | undefined,
  link?: string | "#",
  type?: "submit" | "button",
  onClick?: () => void;
 }) {
  return (
    <>
      <button className="button" onClick={props.onClick} type={props.type}>
        <a href={props.link} target="_blank">
          {props.iconURL != undefined && (
            <img src={props.iconURL} alt="icon" />
          )}
          {props.text}
        </a>
      </button>
    </>
  )
}

export default Button