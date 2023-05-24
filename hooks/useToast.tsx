

import React, { useEffect, useState } from 'react'
import Toast from '@/components/Toast'
import { uid } from 'uid'
export interface IToast {
    id: string
    icon?: string,
    message: JSX.Element
}

export default function useToast() {
    const [toastList, setToastList] = useState<IToast[]>([])

    const addToast = (message:JSX.Element, {icon}: {icon?: string} = {}) => {
      const toast: IToast = {
        icon: icon,
        message: message,
        id: uid()
      }
        setToastList([...toastList, toast])
    }


    const removeToast = (id:string) => {
      setToastList(toastList.filter(toast => toast.id !== id))
    }

    const removeToasts = () => {
      setToastList([])
    }
    


    const ToastContainer = React.useMemo(() => {
        const ToastContainerComponent: React.FC<{}> = ({}) => {
          return (
            <div>
              {
                toastList.map(toast => <Toast key={toast.id} toast={toast} removeToast={() => removeToast(toast.id)} />)
              }
            </div>
          )
        };
        return ToastContainerComponent;
      }, [toastList]);

  return {ToastContainer, addToast, removeToasts}
}
