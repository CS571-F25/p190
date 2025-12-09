import { Dropdown } from 'react-bootstrap';

export default function SortDropdown({ onSort }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" size="sm" id="sort-menu" aria-label="Sort results">
        Sort
      </Dropdown.Toggle>
      <Dropdown.Menu aria-labelledby="sort-menu">
        <Dropdown.Item onClick={() => onSort('az')}>Name (A→Z)</Dropdown.Item>
        <Dropdown.Item onClick={() => onSort('za')}>Name (Z→A)</Dropdown.Item>
        <Dropdown.Item onClick={() => onSort('distance')}>Distance (near→far)</Dropdown.Item>
        <Dropdown.Item onClick={() => onSort('distance_desc')}>Distance (far→near)</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
