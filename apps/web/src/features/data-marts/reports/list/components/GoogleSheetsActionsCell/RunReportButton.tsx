import { useState, useCallback } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@owox/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@owox/ui/components/tooltip';
import { useReport } from '../../../shared';
import { ReportStatusEnum } from '../../../shared';
import type { DataMartReport } from '../../../shared/model/types/data-mart-report.ts';

interface RunReportButtonProps {
  row: { original: DataMartReport };
}

export function RunReportButton({ row }: RunReportButtonProps) {
  const [isRunning, setIsRunning] = useState(false);
  const { runReport } = useReport();

  // Check if report is already running from the row data
  const isReportRunning = row.original.lastRunStatus === ReportStatusEnum.RUNNING;

  // Button should be disabled if we're running OR if report is already running
  const isDisabled = isRunning || isReportRunning;

  // Handle report execution with loading state
  const handleRun = useCallback(async () => {
    try {
      setIsRunning(true);
      await runReport(row.original.id);
    } catch (error) {
      console.error('Failed to run report:', error);
    } finally {
      setIsRunning(false);
    }
  }, [runReport, row.original.id]);

  // Generate unique ID for tooltip
  const tooltipId = `run-report-tooltip-${row.original.id}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='dm-card-table-body-row-actionbtn opacity-0 transition-opacity group-hover:opacity-100'
            onClick={e => {
              e.stopPropagation();
              void handleRun();
            }}
            disabled={isDisabled}
            aria-label={
              isDisabled
                ? isReportRunning
                  ? 'Report is already running'
                  : 'Running report...'
                : `Run report: ${row.original.title}`
            }
            aria-describedby={tooltipId}
            tabIndex={0}
          >
            <Play className='h-4 w-4' aria-hidden='true' />
          </Button>
        </TooltipTrigger>
        <TooltipContent id={tooltipId} side='bottom' role='tooltip'>
          <div className='text-xs'>
            {isDisabled
              ? isReportRunning
                ? 'Report is already running'
                : 'Running report...'
              : 'Run report'}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
