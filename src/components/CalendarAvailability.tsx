import React, { useEffect, useState, useCallback } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { supabase } from '@/services/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

// Import calendar locales for proper localization
import 'react-calendar/dist/Calendar.css';

interface CalendarAvailabilityProps {
  apartmentId: string;
  label: string;
  availableLabel: string;
  unavailableLabel: string;
}

const CALENDAR_MODIFICATION = 'c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd472634dfac71cd34ebc35d16ab7fb8a90c81f975113d6c7538dc69dd8de9077ec';

async function sha512(str: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest('SHA-512', data);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getSecretFromUrl() {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  return params.get('calendar');
}

interface Note {
  id: string;
  note: string;
  date: string;
  created_at: string;
  author?: string;
}

export default function CalendarAvailability({ apartmentId, label, availableLabel, unavailableLabel }: CalendarAvailabilityProps) {
  const { t, language } = useLanguage();
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);
  const [saving, setSaving] = useState(false);
  const [selectedDates, setSelectedDates] = useState<string[]>([]); // ISO date strings
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInput, setNoteInput] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);

  // Set today's date as default selected date
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  }, []);

  // Fetch notes when selectedDate changes
  useEffect(() => {
    if (selectedDate) {
      fetchNotes(selectedDate);
    }
  }, [selectedDate]);

  // Check if user is admin based on URL secret
  useEffect(() => {
    const checkSecret = async () => {
      const secret = getSecretFromUrl();
      if (!secret) return setIsAdmin(false);
      const hash = await sha512(secret);
      setIsAdmin(hash === CALENDAR_MODIFICATION);
    };
    checkSecret();
  }, []);

  // Fetch unavailable dates from Supabase
  const fetchDates = useCallback(async () => {
    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn('Calendar loading timeout - showing calendar anyway');
    }, 3000); // 3 second timeout

    try {
      const { data, error } = await supabase
        .from('apartment_availability')
        .select('date')
        .eq('apartment_id', apartmentId);
      if (!error && data) {
        setUnavailableDates(data.map((row: { date: string }) => new Date(row.date)));
      } else {
        console.error('Error fetching unavailable dates:', error);
        setUnavailableDates([]);
      }
    } catch (err) {
      console.error('Error fetching unavailable dates:', err);
      setUnavailableDates([]);
    } finally {
      clearTimeout(timeoutId);
    }
  }, [apartmentId]);

  useEffect(() => {
    fetchDates();
  }, [fetchDates]);

  // Fetch notes for selected date
  const fetchNotes = useCallback(async (date: Date | null) => {
    if (!date) return setNotes([]);
    setNotesLoading(true);
    const iso = date.toISOString().slice(0, 10);
    const { data, error } = await supabase
      .from('apartment_notes')
      .select('*')
      .eq('apartment_id', apartmentId)
      .eq('date', iso)
      .order('created_at', { ascending: true });
    if (!error && data) {
      setNotes(data);
    } else {
      setNotes([]);
    }
    setNotesLoading(false);
  }, [apartmentId]);

  // Add note (admin only)
  const addNote = async () => {
    if (!isAdmin || !selectedDate || !noteInput.trim()) return;
    const iso = selectedDate.toISOString().slice(0, 10);
    const { error } = await supabase.from('apartment_notes').insert({
      apartment_id: apartmentId,
      date: iso,
      note: noteInput.trim(),
    });
    setNoteInput("");
    await fetchNotes(selectedDate);
  };

  // Delete note (admin only)
  const deleteNote = async (id: string) => {
    if (!isAdmin) return;
    await supabase.from('apartment_notes').delete().eq('id', id);
    await fetchNotes(selectedDate);
  };

  // Handle day click for admin multi-select
  const onClickDay = (date: Date) => {
    if (!isAdmin) return;
    const iso = date.toISOString().slice(0, 10);
    setSelectedDates(prev =>
      prev.includes(iso) ? prev.filter(d => d !== iso) : [...prev, iso]
    );
  };

  // Toggle availability for selected dates
  const toggleSelectedDates = async () => {
    if (!isAdmin || selectedDates.length === 0) return;
    setSaving(true);
    // Determine if all selected are unavailable
    const allUnavailable = selectedDates.every(d =>
      unavailableDates.some(u => u.toISOString().slice(0, 10) === d)
    );
    if (allUnavailable) {
      // Make all available
      for (const d of selectedDates) {
        await supabase.from('apartment_availability')
          .delete()
          .eq('apartment_id', apartmentId)
          .eq('date', d);
      }
    } else {
      // Make all unavailable
      for (const d of selectedDates) {
        if (!unavailableDates.some(u => u.toISOString().slice(0, 10) === d)) {
          await supabase.from('apartment_availability').insert({ apartment_id: apartmentId, date: d });
        }
      }
    }
    setSelectedDates([]);
    await fetchDates();
    setSaving(false);
  };

  // Make selected dates available
  const makeAvailable = async () => {
    if (!isAdmin || selectedDates.length === 0) return;
    setSaving(true);
    for (const d of selectedDates) {
      await supabase.from('apartment_availability')
        .delete()
        .eq('apartment_id', apartmentId)
        .eq('date', d);
    }
    setSelectedDates([]);
    await fetchDates();
    setSaving(false);
  };

  // Make selected dates unavailable
  const makeUnavailable = async () => {
    if (!isAdmin || selectedDates.length === 0) return;
    setSaving(true);
    const rows = selectedDates.map(d => ({ apartment_id: apartmentId, date: d }));
    const { error, data } = await supabase.from('apartment_availability').upsert(rows, { onConflict: 'apartment_id,date' });
    if (error) {
      alert('Error making dates unavailable: ' + error.message);
    }
    setSelectedDates([]);
    await fetchDates();
    setSaving(false);
  };

  // Calendar tile disabling
  const tileDisabled = ({ date, view }: { date: Date, view: string }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const currentYear = today.getFullYear();
    const minYear = currentYear;
    const maxYear = currentYear + 2;
    if (view === 'month') {
      if (date.getFullYear() < minYear || date.getFullYear() > maxYear) return true;
      if (date < today) return true;
      return !isAdmin && unavailableDates.some(d => d.toDateString() === date.toDateString());
    }
    if (view === 'year') {
      if (date.getFullYear() < minYear || date.getFullYear() > maxYear) return true;
    }
    if (view === 'decade' || view === 'century') {
      if (date.getFullYear() < minYear || date.getFullYear() > maxYear) return true;
    }
    return false;
  };

  // Custom tile content for greying out past dates and showing availability dot and selection
  const tileContent = ({ date }: { date: Date }) => {
    const iso = date.toISOString().slice(0, 10);
    const isUnavailable = unavailableDates.some(d => d.toISOString().slice(0, 10) === iso);
    // Only show availability dot, no selection marker
    return (
      <span className={`dot-marker ${isUnavailable ? 'unavailable' : 'available'}`} style={{ pointerEvents: 'none' }} />
    );
  };

  // Custom tile class for selection and unavailable days
  const tileClassName = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const iso = date.toISOString().slice(0, 10);
    if (date < today) return 'bg-gray-200 text-gray-400 rounded-full opacity-60 cursor-not-allowed';
    if (selectedDates.includes(iso)) return 'admin-selected-date';
    if (unavailableDates.some(d => d.toISOString().slice(0, 10) === iso)) return 'calendar-day-unavailable';
    return '';
  };

  // Map language to locale for date formatting
  const getLocale = () => {
    switch (language) {
      case 'fr': return 'fr-FR';
      case 'ar': return 'ar-SA';
      default: return 'en-US';
    }
  };

  // Format date with proper capitalization for month names
  const formatDateWithCapitalizedMonth = (date: Date) => {
    const formatted = date.toLocaleDateString(getLocale(), { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    // Capitalize the first letter of each word (for month names)
    return formatted.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const minDate = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  const maxDate = new Date(currentYear + 2, 11, 31);

  // On calendar day click, set selectedDate
  const onCalendarDayClick = (date: Date) => {
    setSelectedDate(date);
    if (isAdmin) onClickDay(date);
  };

  return (
    <div className="flex flex-col md:flex-row gap-0 my-6 bg-card rounded-xl shadow-sm overflow-hidden">
      {/* Calendar */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="flex justify-center">
          <div className="rounded-xl border border-border bg-background p-4 shadow-sm">
            <Calendar
              onClickDay={onCalendarDayClick}
              selectRange={false}
              tileClassName={tileClassName}
              tileDisabled={tileDisabled}
              showNeighboringMonth={false}
              value={selectedDate || undefined}
              tileContent={tileContent}
              minDate={minDate}
              maxDate={maxDate}
              locale={getLocale()}
              className="capitalize-calendar-header"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 text-xs justify-center">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e' }} />
            <span className="text-muted-foreground">{availableLabel}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444' }} />
            <span className="text-muted-foreground">{unavailableLabel}</span>
          </span>
        </div>
        {isAdmin && (
          <div className="flex gap-2 mt-3 justify-center">
            <button
              className="px-4 py-2 rounded border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50"
              disabled={saving || selectedDates.length === 0}
              onClick={makeAvailable}
            >
              {availableLabel}
            </button>
            <button
              className="px-4 py-2 rounded border border-border bg-background text-foreground hover:bg-muted disabled:opacity-50"
              disabled={saving || selectedDates.length === 0}
              onClick={makeUnavailable}
            >
              {unavailableLabel}
            </button>
          </div>
        )}
        {saving && <div className="text-xs text-muted-foreground mt-1 text-center">{t.apartments.saving}</div>}
      </div>
      {/* Notes Sidebar */}
      <div className="w-full md:w-96 p-6 flex flex-col min-h-[400px] max-h-[500px]">
        <div className="mb-6">
          <div className="text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
            {selectedDate ? formatDateWithCapitalizedMonth(selectedDate) : label}
          </div>
          <div className="text-foreground text-lg font-bold">
            {selectedDate ? '' : label}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {notesLoading ? (
            <div className="text-muted-foreground text-sm">{t.apartments.loadingNotes}</div>
          ) : notes.length === 0 ? (
            <div className="text-muted-foreground text-sm">{isAdmin ? t.apartments.noNotesForDate : t.apartments.noNotesAvailable}</div>
          ) : (
            <ul className="space-y-2">
              {notes.map(note => (
                <li key={note.id} className="flex items-center justify-between bg-muted border border-border rounded px-3 py-2">
                  <span className="text-foreground text-sm">{note.note}</span>
                  {isAdmin && (
                    <button className="ml-2 text-muted-foreground hover:text-foreground text-xs" onClick={() => deleteNote(note.id)} title={t.apartments.deleteNote}>✕</button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
        {isAdmin && selectedDate && (
          <form className="mt-4 flex gap-0" onSubmit={e => { e.preventDefault(); addNote(); }}>
            <input
              type="text"
              className="w-48 rounded-l px-3 py-2 border-0 focus:outline-none focus:ring-0 text-sm bg-muted"
              placeholder={t.apartments.addNote}
              value={noteInput}
              onChange={e => setNoteInput(e.target.value)}
              disabled={notesLoading}
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-2 rounded-r text-sm font-semibold disabled:opacity-50 flex-shrink-0"
              disabled={notesLoading || !noteInput.trim()}
            >+
            </button>
          </form>
        )}
      </div>
    </div>
  );
}