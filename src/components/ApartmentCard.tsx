
import { useState, useRef } from "react";
import {
  FaUsers,
  FaExpand,
  FaMapMarkerAlt
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getFeatureIcon } from "@/lib/iconUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import ApartmentDetailsDialog from "./ApartmentDetailsDialog";
import CalendarAvailability from "./CalendarAvailability";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export interface ApartmentProps {
  id: string;
  name: string;
  description: string;
  priceeur: number;
  pricedz: number;
  capacity: number;
  size: number;
  image: string;
  images: string[];
  location: string;
  type: string;
  features: string[];
}



export default function ApartmentCard({ apartment }: { apartment: ApartmentProps }) {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarLoading, setCalendarLoading] = useState(false);
  // Use translated name and description if available
  const translatedName = t.apartmentNames[apartment.name] || apartment.name;

  const translatedDescription = t.apartmentDescriptionsShort[apartment.description] || apartment.description;

  const handleCalendarClick = () => {
    setCalendarLoading(true);
    // Simulate the time it takes to load calendar data
    setTimeout(() => {
      setCalendarLoading(false);
      setCalendarOpen(true);
    }, 800);
  };

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl bg-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
        {/* Apartment Number Label */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-secondary text-secondary-foreground font-semibold text-xs px-2 py-1 rounded-full shadow-sm border border-secondary/20">
            {t.apartmentNumber[apartment.id as keyof typeof t.apartmentNumber] || `${t.apartmentNumber.appartement} ${t.apartmentNumber.numero} ${apartment.id}`}
          </div>
        </div>
        <img
          src={apartment.image}
          alt={translatedName}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700",
            isHovered ? "scale-110" : "scale-100"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 flex items-end p-6">
          <div>
            <h3 className="text-white text-xl font-bold mb-1">{translatedName}</h3>
            <div className="flex items-center text-white/80 text-sm mb-2">
              <FaMapMarkerAlt className="h-4 w-4 mr-1" />
              <span>{t.locations[apartment.location] || apartment.location}</span>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <div className="flex items-center">
                <FaUsers className="h-4 w-4 mr-1" />
                <span>{apartment.capacity} {apartment.capacity === 1 ?
                  t.apartments.filters.guests : t.apartments.filters.guests}</span>
              </div>
              <div className="flex items-center">
                <FaExpand className="h-4 w-4 mr-1" />
                <span>{apartment.size} m²</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-muted-foreground line-clamp-2">{translatedDescription}</p>

        <div className="flex flex-wrap gap-2">
          {apartment.features.slice(0, 5).map((feature, index) => {
            const translatedFeature = t.features[feature] || feature;
            return (
              <div
                key={index}
                className="flex items-center text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
              >
                <span className="mr-1">
                  {getFeatureIcon(feature)}
                </span>
                <span>{translatedFeature}</span>
              </div>
            );
          })}
          {apartment.features.length > 3 && (
            <div className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
              +{apartment.features.length - 3} {t.apartments.filters.more}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center pt-2">
          <span className="text-xl font-bold">€{apartment.priceeur}</span>
          <span className="text-muted-foreground text-sm ml-1">/ {t.booking.summary.night}</span>
          <span className="text-muted-foreground text-sm font-medium mx-6">{t.apartments.or || 'ou'}</span>
          <span className="text-xl font-bold">DZD{apartment.pricedz}</span>
          <span className="text-muted-foreground text-sm ml-1">/ {t.booking.summary.night}</span>
        </div>
        <hr className="my-4" />
        <div className="flex justify-center gap-4">
          <Button
            className="btn-primary"
            onClick={() => setIsDialogOpen(true)}
          >
            {t.apartments.filters.viewDetails}
          </Button>
          <Button
            className="btn-primary bg-green-600 hover:bg-green-700 text-white"
            onClick={handleCalendarClick}
          >
            {t.apartments.availability || 'Availability'}
          </Button>
        </div>
      </div>

      <ApartmentDetailsDialog
        apartment={apartment}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      {/* Loading Overlay */}
      <Dialog open={calendarLoading} onOpenChange={() => {}}>
        <DialogContent className="max-w-sm w-full">
          <DialogHeader>
            <DialogTitle>{t.apartments.loadingCalendar || 'Loading Calendar'}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-800 mb-6"></div>
            <div className="text-gray-600 text-center">
              <div className="text-sm text-gray-500">{t.apartments.loadingData || 'Loading availabilities...'}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <DialogContent className="w-fit max-w-[95vw] p-0">
          <DialogHeader className="px-4 py-3 text-center sm:text-center">
            <DialogTitle className="text-center sm:text-center">{t.apartments.availability || 'Availability'}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4">
            <CalendarAvailability
              apartmentId={apartment.id}
              label={t.apartments.availability || 'Availability'}
              availableLabel={t.apartments.available || 'Available'}
              unavailableLabel={t.apartments.unavailable || 'Unavailable'}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
