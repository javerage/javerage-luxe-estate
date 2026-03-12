'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

interface VisibilityToggleProps {
  propertyId: string;
  initialStatus: 'Active' | 'Pending' | 'Sold' | 'Archived';
  title: string;
}

/**
 * Premium Visibility Toggle for LUXE ESTATE Admin.
 * Replaces the 'delete' icon with a logical visibility control.
 */
export default function VisibilityToggle({ 
  propertyId, 
  initialStatus,
  title 
}: VisibilityToggleProps) {
  const supabase = createClient();
  const router = useRouter();
  const [isArchived, setIsArchived] = useState(initialStatus === 'Archived');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = async (checked: boolean) => {
    // If status is Pending or Sold, we might not want to toggle visibility 
    // unless explicitly handled, but for Soft Delete requirements, we toggle to/from Archived.
    const newStatus = checked ? 'Active' : 'Archived';
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: newStatus })
        .eq('id', propertyId);

      if (error) throw error;

      setIsArchived(!checked);
      
      toast.success(checked ? 'Property published' : 'Property hidden', {
        description: checked 
          ? `"${title}" is now visible to the public.` 
          : `"${title}" has been moved to archives.`,
      });

      // Refresh the server component data
      router.refresh();
    } catch (error: any) {
      toast.error('Failed to update visibility', {
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
      <span className={cn(
        "material-icons text-lg transition-colors duration-300",
        !isArchived ? "text-mosque" : "text-gray-300"
      )}>
        {!isArchived ? 'visibility' : 'visibility_off'}
      </span>
      
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
          {!isArchived ? 'Online' : 'Hidden'}
        </span>
        <Switch 
          checked={!isArchived} 
          onCheckedChange={toggleVisibility}
          disabled={isLoading}
          className="data-[state=checked]:bg-mosque"
        />
      </div>
    </div>
  );
}
