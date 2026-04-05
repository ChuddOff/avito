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
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverAnchor asChild>
          <div className="h-0 w-0" />
        </PopoverAnchor>

        <PopoverContent
          align="start"
          side="bottom"
          sideOffset={12}
          className="w-[540px] rounded-[16px] border-0 bg-white p-4 shadow-lg"
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <p className="text-h-3 font-semibold">{title}</p>

              <div className="whitespace-pre-wrap text-[18px] leading-8 text-foreground">
                {content}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                type="button"
                onClick={onApply}
                className="h-[50px] rounded-[10px] bg-blue2 px-6 text-white border-0"
              >
                {applyText}
              </Button>

              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="h-[50px] rounded-[10px] border border-gray2 bg-white px-6 text-foreground"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button
        type="button"
        variant="outline"
        onClick={onRetry}
        className="h-14 rounded-[16px] border-0 bg-alert px-6 text-alert-text"
      >
        <Lightbulb className="mr-2 h-[18px] w-[18px]" />
        Повторить запрос
      </Button>
    </div>
  );
}
