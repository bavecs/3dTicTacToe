import { Symbol } from "@/interfaces/Symbol.enum";
import Modal from "./Modal";
import Style from "@/styles/NewPlayerModal.module.css"

export default function SymbolSelector({ symState, init }: { symState: [Symbol | null, (v: Symbol) => void], init: Symbol | null }) {
  
    const [sym, setSym] = symState
  
  return <Modal>
    <div className='mb-2'>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select symbol</label>
        <div className={Style.SymSelector}>
            <span data-selected={sym === Symbol.O} data-selectable={!init} onClick={() => setSym(Symbol.O)}>O</span>
            <span data-selected={sym === Symbol.X} data-selectable={!init} onClick={() => setSym(Symbol.X)}>X</span>
        </div>
    </div>
  </Modal>
}
