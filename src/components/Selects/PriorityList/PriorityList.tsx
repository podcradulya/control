import { useEffect, useState } from 'react';
import { taskStore } from '../../../main';
import Input from '../../Input/Input';
import './PriorityList.css'
import { PriorityResponse } from '../../../models/response/PriorityResponse';


function PriorityList(){
  
  const [isActive, setIsActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<PriorityResponse>();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const selectItem = (item: PriorityResponse) => {
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
      {isActive && (<ul id="datalist_priority">
            {

                            Object.entries(taskStore.priority).map(([key, value]) => (
                              <li onClick={() => {
                                taskStore.setSelectedPriority(value)
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

export default PriorityList