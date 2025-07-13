
import { useState } from "react";
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

  // Use translated name and description if available
  const translatedName = t.apartmentNames[apartment.name] || apartment.name;

  const translatedDescription = t.apartmentDescriptionsShort[apartment.description] || apartment.description;

  return (
    <div
      className="rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-xl bg-card group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden h-64">
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

        <div className="flex items-end justify-between pt-2">
          <div>
            <span className="text-xl font-bold">€{apartment.priceeur}</span>
            <span className="text-muted-foreground text-sm"> / {t.booking.summary.night}</span>
          </div>
          <div>
            <span className="text-xl font-bold">DZD{apartment.pricedz}</span>
            <span className="text-muted-foreground text-sm"> / {t.booking.summary.night}</span>
          </div>
          <Button
            className="btn-primary"
            onClick={() => setIsDialogOpen(true)}
          >
            {t.apartments.filters.viewDetails}
          </Button>
        </div>
      </div>

      <ApartmentDetailsDialog
        apartment={apartment}
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}
