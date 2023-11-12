import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Smile, X } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

const IconPicker = ({ document, preview }) => {
  const { resolvedTheme } = useTheme();

  const updateIcon = useMutation(api.documents.updateDoc);

  const onIconSelect = (icon) => {
    updateIcon({
      documentId: document._id,
      emoji: icon.emoji,
      title: document.title,
    });
  };

  const onIconRemove = (e) => {
    e.stopPropagation();
    updateIcon({
      documentId: document._id,
      emoji: "",
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {!!document?.emoji ? (
          <>
            <div className='flex items-center gap-x-2 group/icon'>
              <p className='text-6xl  hover:opacity-70'>{document?.emoji}</p>
              {!preview && (
                <Button
                  onClick={onIconRemove}
                  size='icon'
                  variant='outline'
                  className='rounded-full group-hover/icon:opacity-100 opacity-0'>
                  <X size={17} />
                </Button>
              )}
            </div>
          </>
        ) : (
          <Button
            size='sm'
            variant='outline'
            className='gap-x-1  text-xs text-muted-foreground'>
            <Smile size={17} /> Add Icon
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent className='p-0'>
        <EmojiPicker
          onEmojiClick={onIconSelect}
          width={350}
          height={350}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </PopoverContent>
    </Popover>
  );
};
export default IconPicker;
