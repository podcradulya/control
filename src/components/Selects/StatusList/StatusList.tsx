import { useEffect, useState } from 'react';
import { taskStore } from '../../../main';
import Input from '../../Input/Input';
import './StatusList.css'
import { StatusResponse } from '../../../models/response/StatusResponse';


function StatusList(){
  
  const [isActive, setIsActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<StatusResponse>();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const selectItem = (item: StatusResponse) => {
    setSelectedItem(item);
    setIsActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
        if (target.closest('.dropdown') === null) {
          setIsActive(false);
        }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
        document.removeEventListener('click', handleClickOutside);
    };
}, []);

  return(
    <div className='select_container'>
      <Input
      value={selectedItem?.name}
       onClick={()=>{setIsActive(true)
        toggleDropdown()
      }}/>
      {isActive && (<ul id="datalist_status">
            {

                            Object.entries(taskStore.status).map(([key, value]) => (
                              <li onClick={() => {
                                taskStore.setSelectedStatus(value)
                                selectItem(value)
                              }}
                              key={value.id}
                              >{value.name}</li>
                            ))
                            }
                            </ul>)}
    </div>
  )
}

export default StatusList