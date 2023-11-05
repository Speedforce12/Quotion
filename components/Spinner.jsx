import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const spinnerVariants = cva("animate-spin text-muted-foreground", {
  variants: {
    size: {
      default: "h-5 w-5",
      sm: "h-4 w-4 ",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },

    defaultVariants: {
      size: "default",
    },
  },
});

export const Spinner = ({ size, className }) => {
  return <Loader className={cn(spinnerVariants({ size, className }))} />;
};
