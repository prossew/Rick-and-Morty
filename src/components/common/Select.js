import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as ChevronDown } from '../../assets/Chevron-down.svg';

export function Select({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const selectedLabel = options.find((o) => o.value === value)?.label;

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange('');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Container ref={ref}>
      <Field onClick={() => setIsOpen((prev) => !prev)} $active={isOpen}>
        <FieldText $hasValue={!!value}>
          {selectedLabel || placeholder}
        </FieldText>

        {value ? (
          <Icon onClick={handleClear}>✕</Icon>
        ) : (
          <Icon>{isOpen ? '▲' : <ChevronDown />}</Icon>
        )}
      </Field>

      {isOpen && (
        <Dropdown>
          {options.map((option) => (
            <Option
              key={option.value}
              onClick={() => handleSelect(option.value)}
              $selected={option.value === value}
            >
              {option.label}
            </Option>
          ))}
        </Dropdown>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 180px;

  @media (max-width: 530px) {
    width: 100%;
  }
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  width: 180px;
  height: 40px;
  background: ${({ $active }) => ($active ? '#1a2a3a' : '#263750')};
  border: 1px solid #83bf46;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: background 0.2s;

  &:hover {
    background: #1a2a3a;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
`;

const FieldText = styled.span`
  color: ${({ $hasValue }) => ($hasValue ? '#fff' : '#aaa')};
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Icon = styled.span`
  color: #aaa;
  font-size: 12px;
  margin-left: 8px;
  flex-shrink: 0;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  z-index: 100;
  max-height: 200px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Option = styled.div`
  padding: 8px 12px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
  transition: background 0.2s;

  &:hover {
    background: #83bf4633;
  }
`;
