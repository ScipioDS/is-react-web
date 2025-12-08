import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Game-specific variants
        gameYellow: "bg-game-yellow text-primary-foreground font-game font-semibold hover:brightness-110 shadow-[0_0_20px_hsl(var(--game-yellow)/0.4)] hover:shadow-[0_0_30px_hsl(var(--game-yellow)/0.6)] transition-all",
        gameRed: "bg-game-red text-foreground font-game font-semibold hover:brightness-110 shadow-[0_0_20px_hsl(var(--game-red)/0.4)] hover:shadow-[0_0_30px_hsl(var(--game-red)/0.6)] transition-all",
        gameBlue: "bg-game-blue text-foreground font-game font-semibold hover:brightness-110 shadow-[0_0_20px_hsl(var(--game-blue)/0.4)] hover:shadow-[0_0_30px_hsl(var(--game-blue)/0.6)] transition-all",
        gameGreen: "bg-game-green text-foreground font-game font-semibold hover:brightness-110 shadow-[0_0_20px_hsl(var(--game-green)/0.4)] hover:shadow-[0_0_30px_hsl(var(--game-green)/0.6)] transition-all",
        gameGhost: "bg-secondary/50 text-foreground border border-border hover:bg-secondary hover:border-primary/50 font-game",
        reward: "bg-gradient-to-r from-game-yellow to-warning text-primary-foreground font-game font-bold hover:scale-105 shadow-[0_0_25px_hsl(var(--game-yellow)/0.5)] transition-transform",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-6 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
