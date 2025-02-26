import { useEffect, useState } from 'react';
import { taskStore, userStore } from '../../../main';
import Input from '../../Input/Input';
import './UsersList.css'
import { IUser } from '../../../models/IUser';


function UsersList(){
  
  const [isActive, setIsActive] = useState(false)
  const [selectedItem, setSelectedItem] = useState<IUser>();

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  const selectItem = (item: IUser) => {
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
console.log(userStore.users);

  return(
    <div className='select_container'>
      <Input
      value={selectedItem?.father_name}
       onClick={()=>{setIsActive(true)
        toggleDropdown()
      }}/>
      {isActive && (<ul id="datalist_status">
            {

                            Object.entries(userStore.users).map(([key, value]) => (
                              <li onClick={() => {
                                userStore.setSelectedUser(value)
                                selectItem(value)
                              }}
                              key={value.id}
                              >{value.father_name}</li>
                            ))
                            }
                            </ul>)}
    </div>
  )
}

export default UsersList