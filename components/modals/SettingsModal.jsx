"use client";

import { ModeToggle } from "@/app/(marketing)/_components/ModeToggle";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useSettings } from "@/hooks/use-settings";

const SettingsModal = () => {
  const { isOpen, onClose } = useSettings();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className='border-b pb-3 dark:border-zinc-700 '>
          <h2 className='text-lg font-medium'>My settings</h2>
        </DialogHeader>
        <div className='flex items-center justify-between'>
          <div>
            <span className='font-semibold text-sm'>Appearance</span>
            <p className='text-xs text-muted-foreground'>
              Customize the appearance of your Quotion workspace
            </p>
          </div>
          <ModeToggle />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
