import { Button } from 'react-bootstrap'

function toCsv(rows) {
  const csv = rows.map(r => r.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n')
  return new Blob([csv], { type: 'text/csv;charset=utf-8;' })
}

export default function ExportCsvButton({ items = [], filename = 'shortlist.csv' }) {
  function onExport() {
    const rows = [
      ['Name', 'Address', 'Latitude', 'Longitude'],
      ...items.map(x => [
        x.name || '',
        x.formattedAddress || '',
        x.latitude ?? '',
        x.longitude ?? ''
      ])
    ]
    const blob = toCsv(rows)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button size="sm" variant="success" onClick={onExport}>
      Export CSV
    </Button>
  )
}
