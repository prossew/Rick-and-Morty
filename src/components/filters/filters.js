import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../providers';

const EMPTY_FILTERS = {
  name: '',
  stuts: '',
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
      <input
        placeholder="Name"
        value={local.name}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      <input
        placeholder="Type"
        value={local.type}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, type: e.target.value }))
        }
      />

      <select
        value={local.species}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, species: e.target.value }))
        }
      >
        <option value="">Species</option>
        <option value="Human">Human</option>
        <option value="Alien">Alien</option>
        <option value="Humanoid">Humanoid</option>
        <option value="Poopybutthole">Poopybutthole</option>
        <option value="Mythological Creature">Mythological Creature</option>
        <option value="Animal">Animal</option>
        <option value="Robot">Robot</option>
        <option value="Cronenberg">Cronenberg</option>
        <option value="Disease">Disease</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        value={local.status}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, status: e.target.value }))
        }
      >
        <option value="">Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <select
        value={local.gender}
        onChange={(e) =>
          setLocal((prev) => ({ ...prev, gender: e.target.value }))
        }
      >
        <option value="">Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <button onClick={handleApply}>Apply</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}
