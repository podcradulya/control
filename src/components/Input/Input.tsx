import './Input.css'


function Input(props: {
  placeholder?: string | undefined,
  name?: string | undefined,
  type?: string | undefined,
  value?: string | undefined,
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
 }) {
  return (
    <>
      <input className="input" onClick={props.onClick}  onChange={props.onChange} placeholder={props.placeholder} name={props.name} type={props.type} value={props.value}/>
    </>
  )
}

export default Input