import React from 'react';
import { useKey } from 'react-use';
import { ESC } from '@codesandbox/common/lib/utils/keycodes';
import { SearchElement, InputWrapper } from './elements';

type SearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export const SearchBox = ({
  value,
  onChange,
  placeholder = 'Search',
}: SearchProps) => {
  const inputEl = React.useRef<HTMLInputElement>();

  useKey('/', () => {
    if (inputEl.current) {
      requestAnimationFrame(() => {
        inputEl.current.focus();
      });
    }
  });

  const handleEsc = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (evt.keyCode === ESC && inputEl.current) {
      evt.stopPropagation();
      inputEl.current.blur();
    }
  };

  return (
    <form
      noValidate
      action=""
      role="search"
      onSubmit={e => {
        e.preventDefault();
      }}
    >
      <InputWrapper>
        <SearchElement
          placeholder={placeholder}
          ref={inputEl}
          value={value}
          onChange={onChange}
          onKeyDown={handleEsc}
          type="search"
        />
      </InputWrapper>
    </form>
  );
};
