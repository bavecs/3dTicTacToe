import { ReactNode } from "react";


export default function Modal(props: { children: ReactNode }) {
    return <div className="fixed top-0 bg-slate-800/50 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-lg max-h-full mx-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">

                {props.children}

            </div>
        </div>
    </div>
}
