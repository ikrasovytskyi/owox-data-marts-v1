import { OpenDocumentButton } from './OpenDocumentButton';
import { RunReportButton } from './RunReportButton';
import { DropdownMenu } from './DropdownMenu';
import type { DataMartReport } from '../../../shared/model/types/data-mart-report.ts';

interface GoogleSheetsActionsCellProps {
  row: { original: DataMartReport };
  onDeleteSuccess?: () => void;
  onEditReport?: (reportId: string) => void;
}

export function GoogleSheetsActionsCell({
  row,
  onDeleteSuccess,
  onEditReport,
}: GoogleSheetsActionsCellProps) {
  return (
    <div
      className='items-right flex justify-end gap-1'
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <OpenDocumentButton row={row} />
      <RunReportButton row={row} />
      <DropdownMenu row={row} onDeleteSuccess={onDeleteSuccess} onEditReport={onEditReport} />
    </div>
  );
}
