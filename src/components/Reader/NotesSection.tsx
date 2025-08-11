"use client";

import { useState, useEffect } from "react";
import { StickyNote, Save, Check, Edit3 } from "lucide-react";

// Compact Textarea
function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none transition-all duration-200 ${props.className || ""}`}
    />
  );
}

// Compact Button
function Button({
  children,
  onClick,
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-700 text-white ${className}`}
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
      await new Promise((resolve) => setTimeout(resolve, 500));
      onSave(notes);
      setHasUnsavedChanges(false);
    } finally {
      setIsSaving(false);
    }
  };

  const getSaveStatus = () => {
    if (isSaving) return { text: "Saving...", icon: Save, color: "text-blue-500" };
    if (hasUnsavedChanges) return { text: "Unsaved", icon: Edit3, color: "text-orange-500" };
    return { text: "Saved", icon: Check, color: "text-green-500" };
  };

  const saveStatus = getSaveStatus();
  const StatusIcon = saveStatus.icon;

  return (
    <div className="px-4 sm:px-8 pb-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <StickyNote className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-gray-900">Notes</h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Status */}
              <div className={`flex items-center gap-1 text-xs ${saveStatus.color}`}>
                <StatusIcon className={`w-3 h-3 ${isSaving ? 'animate-spin' : ''}`} />
                <span>{saveStatus.text}</span>
              </div>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isSaving}
                className={!hasUnsavedChanges && !isSaving ? 'opacity-50' : ''}
              >
                <Save className="w-3 h-3" />
                Save
              </Button>
            </div>
          </div>

          {/* Textarea */}
          <Textarea
            value={notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            placeholder="Take notes about this lesson..."
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}