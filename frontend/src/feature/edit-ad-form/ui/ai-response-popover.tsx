import { Lightbulb } from "lucide-react";

import { Button, Popover, PopoverAnchor, PopoverContent } from "@/shared/ui";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  content: string;
  onApply: () => void;
  onRetry: () => void;
  applyText?: string;
};

export function AiResponsePopover({
  open,
  onOpenChange,
  title = "Ответ AI:",
  content,
  onApply,
  onRetry,
  applyText = "Применить",
}: Props) {
  return (
    <div className="flex flex-col items-start gap-3">
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={12}
        className="w-[540px] rounded-[2px] border-0 bg-white p-4 shadow-lg"
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <p className="text-h-2 text-[12px]">{title}</p>

            <div className="whitespace-pre-wrap text-based text-[12px]">
              {content}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={onApply}
              className="h-[22px] rounded-[4px] bg-blue2 px-[7px] text-white border-0"
            >
              {applyText}
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="h-[22px] rounded-[4px] border border-gray2 bg-white px-[7px] text-foreground"
            >
              Закрыть
            </Button>
          </div>
        </div>
      </PopoverContent>
    </div>
  );
}
