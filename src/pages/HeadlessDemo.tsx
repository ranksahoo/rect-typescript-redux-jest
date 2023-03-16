// import ComboboxAutocomplete from '@components/headless/ComboboxAutocomplete'
// import DialogModal from '@components/headless/DialogModal'
// import DisclosureDemo from '@components/headless/DisclosureDemo'
// import ListboxSelect from '@components/headless/ListboxSelect'
// import MenuDropdown from '@components/headless/MenuDropdown'
import PopoverDemo from '@components/headless/PopoverDemo'
// import RadioGroupDemo from '@components/headless/RadioGroupDemo'
// import SwitchToggle from '@components/headless/SwitchToggle'
// import TabsDemo from '@components/headless/TabsDemo'
// import TransitionDemo from '@components/headless/TransitionDemo'

const HeadlessDemo = () => {
  return (
    <div className="container mx-auto bg-gray-400">
      <h1 className="text-lg font-bold">Components</h1>
      {/* <div className="my-3 flex items-center gap-3">
        Menu Dropdown : <MenuDropdown />
      </div>
      <div className="my-3 flex items-center gap-3">
        Listbox Select : <ListboxSelect />
      </div>
      <div className="my-3 flex items-center gap-3">
        Combobox Autocomplete: <ComboboxAutocomplete />
      </div>
      <div className="my-3 flex w-96 items-center justify-between gap-3">
        Switch Toggle: <SwitchToggle />
      </div>
      <DisclosureDemo />
      <DialogModal /> */}
      <div className="my-3 flex h-full items-center gap-3 bg-gray-400">
        <PopoverDemo />
      </div>
      {/* <RadioGroupDemo /> */}
      {/* <TabsDemo /> */}
      {/* <TransitionDemo /> */}
    </div>
  )
}
export default HeadlessDemo
