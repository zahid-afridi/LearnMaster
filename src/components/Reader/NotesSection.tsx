"use client";

import { useState, useEffect } from "react";
import { StickyNote, Save, Check } from "lucide-react";

// Tailwind Card Components
function Card({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-white flex flex-col gap-6 rounded-xl border shadow-sm ${className}`}
      {...props}
    />
  );
}
function CardHeader({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 pt-6 ${className}`} {...props} />;
}
function CardTitle({ className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h4 className={`leading-none font-semibold ${className}`} {...props} />;
}
function CardContent({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`px-6 pb-6 ${className}`} {...props} />;
}

// Tailwind Textarea
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 outline-none resize-none ${props.className || ""}`}
    />
  );
}

// Tailwind Button
function Button({
  children,
  onClick,
  disabled,
  size = "sm",
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}) {
  const sizeClasses = size === "sm" ? "px-3 py-1.5 text-sm" : "px-4 py-2 text-base";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses} ${className}`}
    >
      {children}
    </button>
  );
}

interface NotesSectionProps {
  lessonId: number;
  initialNotes?: string;
  onSave: (notes: string) => void;
}

export function NotesSection({
  lessonId,
  initialNotes = "",
  onSave,
}: NotesSectionProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Auto-save after inactivity
  useEffect(() => {
    if (hasUnsavedChanges) {
      const timer = setTimeout(() => {
        handleSave();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notes, hasUnsavedChanges]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
      onSave(notes);
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const getSaveStatus = () => {
    if (isSaving) return { text: "Saving...", icon: Save, color: "text-[#60A5FA]" };
    if (hasUnsavedChanges) return { text: "Unsaved changes", icon: Save, color: "text-orange-500" };
    if (lastSaved) return { text: "Saved", icon: Check, color: "text-green-500" };
    return { text: "No changes", icon: StickyNote, color: "text-gray-500" };
  };

  const saveStatus = getSaveStatus();
  const StatusIcon = saveStatus.icon;

  return (
    <div className="px-8 pb-8">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg">
                <StickyNote className="w-5 h-5 text-[#2563EB]" />
                My Notes
              </CardTitle>

              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1 text-sm ${saveStatus.color}`}>
                  <StatusIcon className="w-4 h-4" />
                  <span>{saveStatus.text}</span>
                </div>

                <Button
                  onClick={handleSave}
                  disabled={!hasUnsavedChanges || isSaving}
                  size="sm"
                  className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                >
                  {isSaving ? (
                    <Save className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  Save
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Textarea
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Take notes about this lesson... Your notes will be automatically saved."
              className="min-h-[120px]"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
