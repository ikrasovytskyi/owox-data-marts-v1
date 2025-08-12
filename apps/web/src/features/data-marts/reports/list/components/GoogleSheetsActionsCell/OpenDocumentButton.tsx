import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '@owox/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@owox/ui/components/tooltip';
import { getGoogleSheetTabUrl } from '../../../shared';
import type {
  DataMartReport,
  GoogleSheetsDestinationConfig,
} from '../../../shared/model/types/data-mart-report.ts';

interface OpenDocumentButtonProps {
  row: { original: DataMartReport };
}

export function OpenDocumentButton({ row }: OpenDocumentButtonProps) {
  const documentUrl = getGoogleSheetTabUrl(
    (row.original.destinationConfig as GoogleSheetsDestinationConfig).spreadsheetId,
    (row.original.destinationConfig as GoogleSheetsDestinationConfig).sheetId
  );

  const handleOpenDocument = () => {
    window.open(documentUrl, '_blank', 'noopener,noreferrer');
  };

  // Generate unique ID for tooltip
  const tooltipId = `open-document-tooltip-${row.original.id}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='dm-card-table-body-row-actionbtn opacity-0 transition-opacity group-hover:opacity-100'
            aria-label={`Open document: ${row.original.title}`}
            aria-describedby={tooltipId}
            tabIndex={0}
            onClick={e => {
              e.stopPropagation();
              handleOpenDocument();
            }}
          >
            <SquareArrowOutUpRight className='h-4 w-4' aria-hidden='true' />
          </Button>
        </TooltipTrigger>
        <TooltipContent id={tooltipId} side='bottom' role='tooltip'>
          <div className='text-xs'>Open document</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
