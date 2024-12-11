import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { useThemeStore } from '../themeStore';

export type Option = {
  name: string;
  id: string;
};

interface FormDropdownP {
  options: Option[];
  handleChange: (id: string) => void;
}

const FormDropdown = ({ options, handleChange }: FormDropdownP) => {
  const selectedCloudForm = useThemeStore((s) => s.selectedCloudForm);

  const currOption = options.filter(
    (item) => item.id === selectedCloudForm
  )[0];

  return (
    <Listbox value={selectedCloudForm} onChange={handleChange}>
      <ListboxButton className="listbox__btn">
        {currOption?.name || ''}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className="listbox__options"
        style={{ background: '#fff' }}
        transition
      >
        {options.map((item) => (
          <ListboxOption
            key={item.id}
            value={item.id}
            className="listbox__option"
            style={{ padding: '1rem' }}
          >
            {item.name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-check"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
};

export default FormDropdown;
