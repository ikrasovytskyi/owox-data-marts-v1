import { useState, useCallback } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@owox/ui/components/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@owox/ui/components/tooltip';
import {
  DropdownMenu as DropdownMenuPrimitive,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@owox/ui/components/dropdown-menu';
import type { DataMartReport } from '../../../shared/model/types/data-mart-report.ts';
import { useReport } from '../../../shared';

interface DropdownMenuProps {
  row: { original: DataMartReport };
  onDeleteSuccess?: () => void;
  onEditReport?: (reportId: string) => void;
}

export function DropdownMenu({ row, onDeleteSuccess, onEditReport }: DropdownMenuProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { deleteReport, fetchReportsByDataMartId } = useReport();

  // Generate unique ID for the actions menu
  const actionsMenuId = `actions-menu-${row.original.id}`;

  // Memoize delete handler to avoid unnecessary re-renders
  const handleDelete = useCallback(async () => {
    try {
      setIsDeleting(true);
      await deleteReport(row.original.id);
      await fetchReportsByDataMartId(row.original.dataMart.id);
      onDeleteSuccess?.();
    } catch (error) {
      console.error('Failed to delete Google Sheet:', error);
    } finally {
      setIsDeleting(false);
    }
  }, [
    deleteReport,
    fetchReportsByDataMartId,
    onDeleteSuccess,
    row.original.id,
    row.original.dataMart.id,
  ]);

  const handleEdit = useCallback(() => {
    onEditReport?.(row.original.id);
    setMenuOpen(false);
  }, [onEditReport, row.original.id]);

  // Generate unique ID for tooltip
  const tooltipId = `dropdown-menu-tooltip-${row.original.id}`;

  return (
    <DropdownMenuPrimitive open={menuOpen} onOpenChange={setMenuOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                size='sm'
                className={`dm-card-table-body-row-actionbtn opacity-0 transition-opacity ${menuOpen ? 'opacity-100' : 'group-hover:opacity-100'}`}
                aria-label={`More actions for report: ${row.original.title}`}
                aria-haspopup='true'
                aria-expanded={menuOpen}
                aria-controls={actionsMenuId}
                aria-describedby={tooltipId}
                tabIndex={0}
                onClick={e => {
                  e.stopPropagation();
                }}
              >
                <MoreHorizontal className='h-4 w-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent id={tooltipId} side='bottom' role='tooltip'>
            <div className='text-xs'>More actions</div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent id={actionsMenuId} align='end' role='menu'>
        <DropdownMenuItem
          onClick={e => {
            e.stopPropagation();
            handleEdit();
          }}
          role='menuitem'
        >
          Edit report
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='text-red-600'
          onClick={e => {
            e.stopPropagation();
            void handleDelete();
          }}
          disabled={isDeleting}
          role='menuitem'
          aria-label={isDeleting ? 'Deleting report...' : `Delete report: ${row.original.title}`}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuPrimitive>
  );
}
