/* eslint-disable import/no-unused-modules */
import { useState, useEffect, useCallback } from 'react';
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

const STATUS_OPTIONS = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
];

const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'genderless', label: 'Genderless' },
  { value: 'unknown', label: 'Unknown' }
];

const SPECIES_OPTIONS = [
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
];

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

  const handleStatusChange = useCallback(
    (val) => setLocal((prev) => ({ ...prev, status: val })),
    []
  );

  const handleGenderChange = useCallback(
    (val) => setLocal((prev) => ({ ...prev, gender: val })),
    []
  );

  const handleSpeciesChange = useCallback(
    (val) => setLocal((prev) => ({ ...prev, species: val })),
    []
  );

  const handleNameChange = useCallback(
    (e) => setLocal((prev) => ({ ...prev, name: e.target.value })),
    []
  );

  const handleTypeChange = useCallback(
    (e) => setLocal((prev) => ({ ...prev, type: e.target.value })),
    []
  );

  const handleApply = useCallback(() => {
    setSearchParams(
      Object.fromEntries(Object.entries(local).filter(([, val]) => val))
    );
    applyFilters(local);
  }, [local, applyFilters, setSearchParams]);

  const handleReset = useCallback(() => {
    setLocal(EMPTY_FILTERS);
    setSearchParams({});
    applyFilters(EMPTY_FILTERS);
  }, [applyFilters, setSearchParams]);

  return (
    <FiltersContainer>
      <FiltersRow>
        <Select
          placeholder="Status"
          value={local.status}
          onChange={handleStatusChange}
          options={STATUS_OPTIONS}
        />
        <Select
          placeholder="Gender"
          value={local.gender}
          onChange={handleGenderChange}
          options={GENDER_OPTIONS}
        />
        <Select
          placeholder="Species"
          value={local.species}
          onChange={handleSpeciesChange}
          options={SPECIES_OPTIONS}
        />
      </FiltersRow>

      <FiltersRow>
        <StyledInput
          placeholder="Name"
          value={local.name}
          onChange={handleNameChange}
        />
        <StyledInput
          placeholder="Type"
          value={local.type}
          onChange={handleTypeChange}
        />
        <ApplyButton onClick={handleApply}>Apply</ApplyButton>
        <ResetButton onClick={handleReset}>Reset</ResetButton>
      </FiltersRow>
    </FiltersContainer>
  );
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 530px) {
    width: 50%;
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  @media (max-width: 530px) {
    flex-direction: column;
    width: 240px;
  }
`;

const StyledInput = styled.input`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: #263750;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #fff;
  width: 180px;
  height: 40px;
  font-size: 14px;
  padding-left: 10px;
  outline: none;

  @media (max-width: 530px) {
    width: 240px;
  }

  &::placeholder {
    color: #aaa;
  }

  &:focus {
    background: #1a2a3a;
  }
`;

const ApplyButton = styled.button`
  background: #001832;
  border: 1px solid #83bf46;
  border-radius: 8px;
  color: #83bf46;
  width: 85px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 530px) {
    width: 240px;
  }

  &:hover {
    background: #83bf46;
    color: #f5f5f5;
  }
`;

const ResetButton = styled.button`
  background: #001832;
  border: 1px solid #ff5152;
  border-radius: 8px;
  color: #ff5152;
  width: 85px;
  height: 40px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  @media (max-width: 530px) {
    width: 240px;
  }

  &:hover {
    background: #1a2a3a;
    color: #fff;
  }
`;
