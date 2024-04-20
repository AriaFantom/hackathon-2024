'use client';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export function SubmitButton({ children, pendingText, pending, ...props }) {
  return (
    <>
      {pending ? (
        <Button {...props} disabled>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {pendingText}
        </Button>
      ) : (
        <Button {...props}>{children}</Button>
      )}
    </>
  );
}
