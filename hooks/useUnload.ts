import { useEffect, useRef } from "react";

export default function useUnload (cb: (e: any) => void) {

    useEffect(() => {
        const onUnload = cb;
        window.addEventListener('beforeunload', onUnload);
        return () => {
            window.removeEventListener('beforeunload', onUnload);
        };
    }, [cb]);
};

