/* eslint-disable import/no-unused-modules */
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../providers';
import { Select } from '../common/Select';
import styled from 'styled-components';

const EMPTY_FILTERS = {
  name: '',
  status: '',
  gender: '',
  species: '',
  type: ''
};

export function Filters() {
  const { applyFilters } = useData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [local, setLocal] = useState({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    gender: searchParams.get('gender') || '',
    species: searchParams.get('species') || '',
    type: searchParams.get('type') || ''
  });

  useEffect(() => {
    applyFilters(local);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleApply = () => {
    setSearchParams(
      Object.fromEntries(Object.entries(local).filter(([, val]) => val))
    );
    applyFilters(local);
  };

  const handleReset = () => {
    setLocal(EMPTY_FILTERS);
    setSearchParams({});
    applyFilters(EMPTY_FILTERS);
  };

  return (
    <div>
      <StyledInput
        placeholder="Name"
        value={local.name}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <StyledInput
        placeholder="Type"
        value={local.type}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, type: e.target.value }))
        }
      />
      <Select
        placeholder="Species"
        value={local.species}
        onChange={(val) => setLocal((prev) => ({ ...prev, species: val }))}
        options={[
          { value: 'Human', label: 'Human' },
          { value: 'Alien', label: 'Alien' },
          { value: 'Humanoid', label: 'Humanoid' },
          { value: 'Poopybutthole', label: 'Poopybutthole' },
          { value: 'Mythological Creature', label: 'Mythological Creature' },
          { value: 'Animal', label: 'Animal' },
          { value: 'Robot', label: 'Robot' },
          { value: 'Cronenberg', label: 'Cronenberg' },
          { value: 'Disease', label: 'Disease' },
          { value: 'unknown', label: 'Unknown' }
        ]}
      />

      <Select
        placeholder="Status"
        value={local.status}
        onChange={(val) => setLocal((prev) => ({ ...prev, status: val }))}
        options={[
          { value: 'alive', label: 'Alive' },
          { value: 'dead', label: 'Dead' },
          { value: 'unknown', label: 'Unknown' }
        ]}
      />

      <Select
        placeholder="Gender"
        value={local.gender}
        onChange={(val) => setLocal((prev) => ({ ...prev, gender: val }))}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'genderless', label: 'Genderless' },
          { value: 'unknown', label: 'Unknown' }
        ]}
      />
      <ApplyButton onClick={handleApply}>Apply</ApplyButton>
      <ResetButton onClick={handleReset}>Reset</ResetButton>
    </div>
  );
}

const StyledInput = styled.input`
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #fff;
  width: 180px;
  height: 40px;
  font-size: 14px;
  text-align: start;
  padding-left: 10px;
  outline: none;

  &::placeholder {
    color: #aaa;
  }

  &:hover,
  &:focus {
    background: #1a2a3a;
  }
`;

const ApplyButton = styled.button`
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #83bf46;
  width: 85px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1a2a3a;
  }
`;

const ResetButton = styled.button`
  background: #263750;
  border: 1px solid #ff5152;
  border-radius: 8px;
  color: #ff5152;
  width: 85px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1a2a3a;
  }
`;
