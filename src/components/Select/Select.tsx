import './Select.css'


function Select(props: {
  list_option: string[],
  value?: string | undefined,
  onClick?: () => void;
  name?: string | undefined;
  placeholder?: string | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

 }) {
 const i = props.list_option.length
  return (
    <>
      <input value={props.value} className="select" onClick={props.onClick} name={props.name} onChange={props.onChange} list="datalist" placeholder={props.placeholder}/>
      <datalist id="datalist">
      {props.list_option.map((el, i) => (<option key={el}>{el}</option>))}
      </datalist> 
    </>
  )
}

export default Select